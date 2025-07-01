use candid::{CandidType};
use serde::Deserialize;

#[derive(CandidType, Deserialize)]
pub struct PreSaleStatistics {
    pub total_icp_deposited: u64,
    pub amount_of_ropecoin_to_distribute: u64,
    pub end_timestamp: u64,
}
