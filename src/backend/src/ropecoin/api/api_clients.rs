use candid::Principal;

use crate::{
    api::{icp_ledger_api::IcpLedgerApi, ropecoin_ledger_api::RopecoinLedgerApi},
    constants::MAINNET_LEDGER_CANISTER_ID, storage::storages::ENV,
};

pub struct ApiClients;

impl ApiClients {
    pub fn icp_ledger() -> IcpLedgerApi {
        IcpLedgerApi(MAINNET_LEDGER_CANISTER_ID)
    }

    pub fn ropecoin_ledger() -> RopecoinLedgerApi {
        let env = ENV.with(|e| *e.borrow().get());
        let env_vars = env.get_env_vars();
        
        RopecoinLedgerApi(Principal::from_text(env_vars.ropecoin_ledger_canister_id).unwrap())
    }
}
