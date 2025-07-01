use std::{env, path::PathBuf};

use candid::{encode_args, CandidType, Decode, Nat, Principal};

use crate::sender::Sender;
use ic_management_canister_types::CanisterSettings;
use pocket_ic::{PocketIc, PocketIcBuilder};
use ropecoin::{api::{
    icp_ledger_api::{Account as IcpAccount, Allowance, AllowanceArgs, ApproveArgs, TransferArg},
    ropecoin_ledger_api::{
        Account as RopecoinLedgerAccount, FeatureFlags, InitArgs, InitArgsArchiveOptions,
        LedgerArg, Subaccount as RopecoinSubaccount,
    },
}, env::EnvName};
use serde::de::DeserializeOwned;
use serde_bytes::ByteBuf;

/// Id of the ledger canister on the IC.
pub const MAINNET_LEDGER_CANISTER_ID: Principal =
    Principal::from_slice(&[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x01, 0x01]);

/// Id of the governance canister on the IC.
pub const MAINNET_GOVERNANCE_CANISTER_ID: Principal =
    Principal::from_slice(&[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x01]);

/// Owner of the ropecoin canister.
pub static OWNER_PRINCIPAL: &str =
    "vafd2-aurwj-5igu3-htth5-olb42-6ficf-ttehy-2oyrp-u6nsy-qjlay-7ae";

pub struct Context {
    pub pic: PocketIc,
    pub ropecoin_canister: Principal,
    pub ropecoin_ledger_canister: Principal,
    pub owner_account: Principal,
}

impl Default for Context {
    fn default() -> Self {
        Self::new()
    }
}

impl Context {
    pub fn new() -> Self {
        let owner_account = IcpAccount {
            owner: Principal::from_text(OWNER_PRINCIPAL).unwrap(),
            subaccount: None,
        };

        let default_install_settings: Option<CanisterSettings> = Some(CanisterSettings {
            controllers: Some(vec![owner_account.owner]),
            compute_allocation: None,
            memory_allocation: None,
            freezing_threshold: None,
            reserved_cycles_limit: None,
            log_visibility: None,
            wasm_memory_limit: None,
            wasm_memory_threshold: None,
        });

        if !PathBuf::from(env::var("CARGO_MANIFEST_DIR").unwrap())
            .parent()
            .expect("Failed to get parent dir")
            .join("test_helper/nns_state")
            .exists()
        {
            panic!("NNS state not found. Please run `bash scripts/prepare_test.sh` to load the NNS state.");
        }

        let nns_state_path = PathBuf::from(env::var("CARGO_MANIFEST_DIR").unwrap())
            .parent()
            .expect("Failed to get parent dir")
            .join("test_helper/nns_state");

        let pic = PocketIcBuilder::new()
            .with_nns_state(nns_state_path)
            .with_sns_subnet()
            .with_application_subnet()
            .build();

        let ropecoin_canister = pic.create_canister_on_subnet(
            None,
            default_install_settings.clone(),
            pic.topology().get_app_subnets()[0],
        );

        let ropecoin_ledger_canister = pic.create_canister_with_id(
            None,
            default_install_settings.clone(),
            Principal::from_text("73a74-biaaa-aaaai-q3yjq-cai").unwrap(),
        ).expect("Failed to create canister");

        pic.add_cycles(ropecoin_canister, 2_000_000_000_000);

        pic.add_cycles(ropecoin_ledger_canister, 2_000_000_000_000);

        let ropecoin_wasm_bytes = include_bytes!("../../../../wasm/ropecoin.wasm.gz");
        let ropecoin_ledger_wasm_bytes = include_bytes!("../../../../wasm/ic-icrc1-ledger.wasm.gz");

        let context = Context {
            pic,
            ropecoin_canister,
            ropecoin_ledger_canister,
            owner_account: owner_account.owner,
        };

        context.pic.install_canister(
            ropecoin_canister,
            ropecoin_wasm_bytes.to_vec(),
            encode_args(((EnvName::Local),)).unwrap(),
            Some(owner_account.owner),
        );

        let dev_team_principal =
            Principal::from_text("fimqt-gp5ke-bnovt-6nfku-xa2z6-ft5eu-yo5pb-fevxk-euahv-ah6zo-oqe")
                .unwrap();

        let dev_team_account = RopecoinLedgerAccount {
            owner: dev_team_principal,
            subaccount: None,
        };
        let marketing_principal =
            Principal::from_text("hwrjv-nmrb3-jzkfv-aj4id-u35yt-oto2e-5fpyi-mqkcd-wcdib-7s2cn-7ae")
                .unwrap();
        let marketing_account = RopecoinLedgerAccount {
            owner: marketing_principal,
            subaccount: None,
        };

        let ropecoin_canister_account = RopecoinLedgerAccount {
            owner: ropecoin_canister,
            subaccount: None,
        };
        let initial_balances = vec![
            (
                ropecoin_canister_account.clone(),
                candid::Nat::from(800_000_000_000_000u64),
            ),
            (dev_team_account, candid::Nat::from(50_000_000_000_000u64)),
            (marketing_account, candid::Nat::from(150_000_000_000_000u64)),
        ];

        let init_ledger_args = InitArgs {
            minting_account: RopecoinLedgerAccount {
                owner: Principal::from_text(
                    "fimqt-gp5ke-bnovt-6nfku-xa2z6-ft5eu-yo5pb-fevxk-euahv-ah6zo-oqe",
                )
                .unwrap(),
                subaccount: None,
            },
            fee_collector_account: Some(RopecoinLedgerAccount {
                owner: Principal::from_text(
                    "zlmvo-baaaa-aaaai-q3y4a-cai",
                )
                .unwrap(),
                subaccount: None,
            }),
            transfer_fee: candid::Nat::from(10u64),
            decimals: Some(8),
            max_memo_length: None,
            token_symbol: "ROPE".to_string(),
            token_name: "Ropecoin".to_string(),
            metadata: vec![],
            initial_balances,
            feature_flags: Some(FeatureFlags { icrc2: true }),
            archive_options: InitArgsArchiveOptions {
                num_blocks_to_archive: 1000u64,
                max_transactions_per_response: None,
                trigger_threshold: 1000u64,
                max_message_size_bytes: None,
                cycles_for_archive_creation: None,
                node_max_memory_size_bytes: None,
                controller_id: Principal::from_text(
                    "fimqt-gp5ke-bnovt-6nfku-xa2z6-ft5eu-yo5pb-fevxk-euahv-ah6zo-oqe",
                )
                .unwrap(),
                more_controller_ids: Some(vec![Principal::from_text(
                    "uxrrr-q7777-77774-qaaaq-cai",
                )
                .unwrap()]),
            },
        };

        println!(
            "ropecoin_ledger_canister_id: {:?}",
            ropecoin_ledger_canister.to_text()
        );
        context.pic.install_canister(
            ropecoin_ledger_canister,
            ropecoin_ledger_wasm_bytes.to_vec(),
            encode_args((LedgerArg::Init(init_ledger_args),)).unwrap(),
            Some(owner_account.owner),
        );

        context.mint_icp(100_000_000, owner_account.owner);

        context
    }

    pub fn query<T: DeserializeOwned + CandidType>(
        &self,
        sender: Sender,
        method: &str,
        args: Option<Vec<u8>>,
    ) -> Result<T, String> {
        let args = args.unwrap_or(encode_args(()).unwrap());
        let res = self
            .pic
            .query_call(self.ropecoin_canister, sender.principal(), method, args);

        match res {
            Ok(res) => Decode!(res.as_slice(), T).map_err(|e| e.to_string()),
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn update<T: DeserializeOwned + CandidType>(
        &self,
        sender: Sender,
        method: &str,
        args: Option<Vec<u8>>,
    ) -> Result<T, String> {
        let args = args.unwrap_or(encode_args(()).unwrap());
        let res = self
            .pic
            .update_call(self.ropecoin_canister, sender.principal(), method, args);

        match res {
            Ok(res) => Decode!(res.as_slice(), T).map_err(|e| e.to_string()),
            Err(e) => Err(e.to_string()),
        }
    }

    pub fn mint_icp(&self, amount: u64, user_principal: Principal) {
        let transfer_args = TransferArg {
            from_subaccount: None,
            to: IcpAccount {
                owner: user_principal,
                subaccount: None,
            },
            fee: None,
            created_at_time: None,
            memo: None,
            amount: Nat::from(amount),
        };

        self.pic
            .update_call(
                MAINNET_LEDGER_CANISTER_ID,
                MAINNET_GOVERNANCE_CANISTER_ID,
                "icrc1_transfer",
                encode_args((transfer_args,)).unwrap(),
            )
            .expect("Failed to call canister");
    }

    pub fn transfer_icp(&self, amount: u64, from: IcpAccount, to: IcpAccount) {
        let transfer_args = TransferArg {
            from_subaccount: None,
            to,
            fee: None,
            created_at_time: None,
            memo: None,
            amount: Nat::from(amount),
        };

        self.pic
            .update_call(
                MAINNET_LEDGER_CANISTER_ID,
                from.owner,
                "icrc1_transfer",
                encode_args((transfer_args,)).unwrap(),
            )
            .expect("Failed to call canister");
    }

    pub fn mint_icp_subaccount(
        &self,
        amount: u64,
        user_principal: Principal,
        subaccount: RopecoinSubaccount,
    ) {
        let transfer_args = TransferArg {
            from_subaccount: None,
            to: IcpAccount {
                owner: user_principal,
                subaccount: Some(subaccount),
            },
            fee: None,
            created_at_time: None,
            memo: None,
            amount: Nat::from(amount),
        };

        self.pic
            .update_call(
                MAINNET_LEDGER_CANISTER_ID,
                MAINNET_GOVERNANCE_CANISTER_ID,
                "icrc1_transfer",
                encode_args((transfer_args,)).unwrap(),
            )
            .expect("Failed to call canister");
    }

    pub fn approve_icp(
        &self,
        from_subaccount: Option<RopecoinSubaccount>,
        sender: Principal,
        spender: IcpAccount,
        amount: u64,
        expires_at: Option<u64>,
    ) {
        let approve_args = ApproveArgs {
            from_subaccount,
            spender,
            amount: Nat::from(amount),
            expected_allowance: None,
            expires_at,
            fee: None,
            memo: None,
            created_at_time: None,
        };

        self.pic
            .update_call(
                MAINNET_LEDGER_CANISTER_ID,
                sender,
                "icrc2_approve",
                encode_args((approve_args,)).unwrap(),
            )
            .expect("Failed to call canister");
    }

    pub fn get_allowance(
        &self,
        owner: IcpAccount,
        spender: IcpAccount,
    ) -> Result<Allowance, String> {
        let allowance_args = AllowanceArgs {
            account: owner,
            spender,
        };

        let icp_allowance_result = self
            .pic
            .update_call(
                MAINNET_LEDGER_CANISTER_ID,
                MAINNET_GOVERNANCE_CANISTER_ID,
                "icrc2_allowance",
                encode_args((allowance_args,)).unwrap(),
            )
            .expect("Failed to call canister");

        Decode!(icp_allowance_result.as_slice(), Allowance).map_err(|e| e.to_string())
    }


    pub fn get_icp_transfer_fee(&self) -> Result<Nat, String> {
        let transfer_fee = self
            .pic
            .query_call(
                MAINNET_LEDGER_CANISTER_ID,
                MAINNET_GOVERNANCE_CANISTER_ID,
                "icrc1_fee",
                encode_args(()).unwrap(),
            )
            .expect("Failed to call canister");

        Decode!(transfer_fee.as_slice(), Nat).map_err(|e| e.to_string())
    }


    pub fn get_icp_balance(&self, user_principal: Principal) -> Result<Nat, String> {
        let user_account = IcpAccount {
            owner: user_principal,
            subaccount: None,
        };

        let icp_balance_result = self
            .pic
            .update_call(
                MAINNET_LEDGER_CANISTER_ID,
                MAINNET_GOVERNANCE_CANISTER_ID,
                "icrc1_balance_of",
                encode_args((user_account,)).unwrap(),
            )
            .expect("Failed to call canister");

        Decode!(icp_balance_result.as_slice(), Nat).map_err(|e| e.to_string())
    }

    pub fn get_rope_balance(&self, user_principal: Principal) -> Result<Nat, String> {
        let user_account = IcpAccount {
            owner: user_principal,
            subaccount: None,
        };

        let rope_balance_result = self
            .pic
            .update_call(
                self.ropecoin_ledger_canister,
                self.owner_account,
                "icrc1_balance_of",
                encode_args((user_account,)).unwrap(),
            )
            .expect("Failed to call canister");

        Decode!(rope_balance_result.as_slice(), Nat).map_err(|e| e.to_string())
    }

    pub fn get_icp_balance_with_subaccount(
        &self,
        user_principal: Principal,
        subaccount: [u8; 32],
    ) -> Result<Nat, String> {
        let icp_balance_result = self
            .pic
            .update_call(
                MAINNET_LEDGER_CANISTER_ID,
                MAINNET_GOVERNANCE_CANISTER_ID,
                "icrc1_balance_of",
                encode_args((IcpAccount {
                    owner: user_principal,
                    subaccount: Some(ByteBuf::from(subaccount)),
                },))
                .unwrap(),
            )
            .expect("Failed to call canister");

        Decode!(icp_balance_result.as_slice(), Nat).map_err(|e| e.to_string())
    }
}
