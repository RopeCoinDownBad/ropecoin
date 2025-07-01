use crate::api::icp_ledger_api::{Account as IcpAccount, AllowanceArgs, Result3, TransferFromArgs};
use crate::api::ropecoin_ledger_api::{Account, TransferArg, TransferResult};
use crate::constants::{
    ICP_LEDGER_FEE, PRESALE_AMOUNT_OF_ROPECOIN_TO_DISTRIBUTE, PRESALE_END_TIMESTAMP,
};
use crate::types::deposits::PreSaleStatistics;
use crate::{api::api_clients::ApiClients, storage::storages::DEPOSITS};
use candid::{Nat, Principal};

pub struct DepositsLogic;

impl DepositsLogic {
    pub fn get_deposits() -> Vec<(Principal, u64)> {
        DEPOSITS.with(|deposits| deposits.borrow().iter().collect())
    }

    pub async fn make_deposit(principal: Principal, amount: u64) -> Result<(), String> {
        let transfer_from_args = TransferFromArgs {
            from: IcpAccount {
                owner: principal,
                subaccount: None,
            },
            memo: None,
            amount: Nat::from(amount),
            spender_subaccount: None,
            fee: Some(Nat::from(ICP_LEDGER_FEE)),
            to: IcpAccount {
                owner: ic_cdk::api::canister_self(),
                subaccount: None,
            },
            created_at_time: None,
        };

        let allowance_args = AllowanceArgs {
            account: IcpAccount {
                owner: principal,
                subaccount: None,
            },
            spender: IcpAccount {
                owner: ic_cdk::api::canister_self(),
                subaccount: None,
            },
        };

        let (allowance,) = ApiClients::icp_ledger()
            .icrc_2_allowance(allowance_args)
            .await
            .map_err(|e| e.1.to_string())?;

        let (transfer_result,) = ApiClients::icp_ledger()
            .icrc_2_transfer_from(transfer_from_args)
            .await
            .map_err(|e| {
                e.1.to_string()
                    + &format!(" allowance: {:?}", allowance.allowance)
                    + &format!(" amount: {:?}", amount)
            })?;

        match transfer_result {
            Result3::Ok(_) => {
                DEPOSITS.with(|deposits| {
                    let current_amount = deposits.borrow().get(&principal).unwrap_or(0);
                    deposits
                        .borrow_mut()
                        .insert(principal, current_amount + amount);
                });
            }
            Result3::Err(err) => {
                return Err(format!("Error making deposit: {:?}", err)
                    + &format!(" allowance: {:?}", allowance.allowance)
                    + &format!(" amount: {:?}", amount));
            }
        }

        Ok(())
    }

    pub async fn distribute() -> Result<(), String> {
        let amount_to_distribute = PRESALE_AMOUNT_OF_ROPECOIN_TO_DISTRIBUTE;
        let deposits = DepositsLogic::get_deposits();

        ic_cdk::println!("deposits: {:?}", deposits);

        let total_deposited_amount = deposits.iter().map(|(_, amount)| amount).sum::<u64>();
        let (canister_icp_balance,) = ApiClients::icp_ledger()
            .icrc_1_balance_of(IcpAccount {
                owner: ic_cdk::api::canister_self(),
                subaccount: None,
            })
            .await
            .map_err(|e| format!("Failed to get canister balance: {:?}", e))?;

        ic_cdk::println!(
            "Canister balance ({:?}) is and total deposited amount is({:?})",
            canister_icp_balance,
            total_deposited_amount
        );
        assert!(
            canister_icp_balance >= total_deposited_amount,
            "Canister balance ({:?}) is less than total deposited amount ({:?})",
            canister_icp_balance,
            total_deposited_amount
        );

        ic_cdk::println!("Starting distribution loop for {} deposits", deposits.len());
        for (principal, deposited_amount) in deposits {
            let amount_to_transfer: u64 =
                ((deposited_amount as u128) * (amount_to_distribute as u128)
                    / (total_deposited_amount as u128)) as u64;

            ic_cdk::println!("Attempting to transfer {} tokens to {}", amount_to_transfer, principal);

            let (transfer_result,) = ApiClients::ropecoin_ledger()
                .icrc_1_transfer(TransferArg {
                    to: Account {
                        owner: principal,
                        subaccount: None,
                    },
                    fee: None,
                    memo: None,
                    from_subaccount: None,
                    created_at_time: None,
                    amount: Nat::from(amount_to_transfer),
                })
                .await
                .map_err(|e| e.1.to_string())?;

            ic_cdk::println!("transfer_result: {:?}", transfer_result);

            match transfer_result {
                TransferResult::Ok(_) => {
                    ic_cdk::println!("Transferred {} tokens to {}", amount_to_transfer, principal);
                }
                TransferResult::Err(err) => {
                    ic_cdk::println!("Transfer failed for {}: {:?}", principal, err);
                    return Err(format!("Failed to transfer tokens to {}: {:?}", principal, err))
                }
            }
        }
        ic_cdk::println!("Distribution completed successfully");
        Ok(())
    }

    pub fn get_pre_sale_statistics() -> PreSaleStatistics {
        let deposits = DepositsLogic::get_deposits();
        let total_icp_deposited = deposits.iter().map(|(_, amount)| amount).sum::<u64>();
        let amount_of_ropecoin_to_distribute = PRESALE_AMOUNT_OF_ROPECOIN_TO_DISTRIBUTE;
        let end_timestamp = PRESALE_END_TIMESTAMP;
        PreSaleStatistics {
            total_icp_deposited,
            amount_of_ropecoin_to_distribute,
            end_timestamp,
        }
    }

    pub fn get_amount_contributed(principal: Principal) -> u64 {
        DEPOSITS.with(|deposits| deposits.borrow().get(&principal).unwrap_or(0))
    }
}
