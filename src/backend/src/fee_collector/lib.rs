#![allow(deprecated)]
use candid::{export_service, CandidType, Deserialize, Nat, Principal};
use ic_cdk::{api::call::CallResult, init, query, update};
pub mod api;
pub mod env;
pub mod storage;
use crate::storage::storages::ENV;
use crate::env::{EnvName, EnvVars};
use crate::api::api_clients::ApiClients;
use crate::api::ropecoin_ledger_api::{Account, TransferArg, TransferResult};

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct DefiniteCanisterSettings {
    pub freezing_threshold: u64,
    pub controllers: Vec<Principal>,
    pub memory_allocation: u64,
    pub compute_allocation: u64,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub enum CanisterStatus {
    Stopped,
    Stopping,
    Running,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct CanisterStatusResponse {
    pub status: CanisterStatus,
    pub memory_size: u64,
    pub cycles: u64,
    pub settings: DefiniteCanisterSettings,
    pub module_hash: Option<Vec<u8>>,
}

#[derive(CandidType, Deserialize)]
pub struct CanisterStatusRequest {
    pub canister_id: Principal,
}

#[derive(CandidType, Deserialize)]
pub struct BurnAndSendFeesResponse {
    pub amount_burned: Nat,
    pub amount_sent: Nat,
}

// IC Management Canister Principal
const IC_MANAGEMENT_CANISTER: &str = "aaaaa-aa";
const ROPECOIN_LEDGER_FEE: u64 = 200_000; // 0.002 Ropecoin

#[init]
pub fn init(env: EnvName) {
    ENV.with(|e| e.borrow_mut().set(env).expect("Failed to set environment"));
    ic_cdk::println!("Fee collector canister initialized");
}

#[query]
pub fn get_env() -> EnvName {
    ENV.with(|e| *e.borrow().get())
}

#[query]
pub fn get_env_vars() -> EnvVars {
    ENV.with(|e| *e.borrow().get()).get_env_vars()
}

#[query]
pub async fn canister_status(request: CanisterStatusRequest) -> CallResult<CanisterStatusResponse> {
    let ic_management_canister = Principal::from_text(IC_MANAGEMENT_CANISTER).unwrap();
    let (status,) = ic_cdk::call(ic_management_canister, "canister_status", (request,)).await?;
    Ok(status)
}

#[update]
pub async fn burn_and_send_fees() -> Result<BurnAndSendFeesResponse, String> {
    // get ropecoin balance of this canister
    let env = ENV.with(|e| *e.borrow().get());
    let env_vars = env.get_env_vars();
    let canister_account = Account {
        owner: ic_cdk::api::canister_self(),
        subaccount: None,
    };
    let balance = ApiClients::ropecoin_ledger()
        .icrc_1_balance_of(canister_account)
        .await
        .map_err(|e| format!("Failed to get balance: {:?}", e))?
        .0;

    // Calculate transfer amounts
    let burn_amount = balance.clone() / Nat::from(2u64) - Nat::from(ROPECOIN_LEDGER_FEE);
    let marketing_amount = balance / Nat::from(2u64) - Nat::from(ROPECOIN_LEDGER_FEE);

    // burn half of the balance - by sending to the blackhole canister
    let burn_transfer_args = TransferArg {
        to: Account {
            owner: Principal::from_text(env_vars.blackhole_account).unwrap(),
            subaccount: None,
        },
        amount: burn_amount.clone(),
        fee: None,
        memo: None,
        from_subaccount: None,
        created_at_time: None,
    };
    let (burn_result,) = ApiClients::ropecoin_ledger()
        .icrc_1_transfer(burn_transfer_args)
        .await
        .map_err(|e| format!("Failed to burn tokens: {:?}", e))?;

    // check if burn was successful
    match burn_result {
        TransferResult::Ok(_) => {}
        TransferResult::Err(e) => return Err(format!("Failed to burn tokens: {:?}", e)),
    }

    // send the other half to the marketing account
    let marketing_transfer_args = TransferArg {
        to: Account {
            owner: Principal::from_text(env_vars.marketing_account).unwrap(),
            subaccount: None,
        },
        amount: marketing_amount.clone(),
        fee: None,
        memo: None,
        from_subaccount: None,
        created_at_time: None,
    };
    let (send_result,) = ApiClients::ropecoin_ledger()
        .icrc_1_transfer(marketing_transfer_args)
        .await
        .map_err(|e| format!("Failed to send tokens: {:?}", e))?;

    // check if send was successful
    match send_result {
        TransferResult::Ok(_) => {}
        TransferResult::Err(e) => return Err(format!("Failed to send tokens: {:?}", e)),
    }

    // For now, return a placeholder result
    Ok(BurnAndSendFeesResponse {
        amount_burned: burn_amount,
        amount_sent: marketing_amount,
    })
}

#[query]
pub fn __get_candid_interface_tmp_hack() -> String {
    export_service!();
    __export_service()
}

#[test]
pub fn candid() {
    use std::env;
    use std::fs::write;
    use std::path::PathBuf;

    let dir = PathBuf::from(env::var("CARGO_MANIFEST_DIR").unwrap());
    write(dir.join("fee_collector.did"), __get_candid_interface_tmp_hack()).expect("Write failed.");
}
