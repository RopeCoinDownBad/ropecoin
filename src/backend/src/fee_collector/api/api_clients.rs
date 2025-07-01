use candid::Principal;

use crate::api::ropecoin_ledger_api::RopecoinLedgerApi;
use crate::storage::storages::ENV;

pub struct ApiClients;

impl ApiClients {
    pub fn ropecoin_ledger() -> RopecoinLedgerApi {
        let env = ENV.with(|e| *e.borrow().get());
        let env_vars = env.get_env_vars();
        RopecoinLedgerApi(Principal::from_text(env_vars.ropecoin_ledger_canister_id).unwrap())
    }
}
