use crate::logic::deposits::DepositsLogic;
use crate::misc::utils::{is_not_anonymous};
use crate::types::deposits::PreSaleStatistics;
use candid::{Principal};
use ic_cdk::api::msg_caller;
use ic_cdk::{query, update};


#[query]
pub fn get_deposits() -> Result<Vec<(Principal, u64)>, String> {
    Ok(DepositsLogic::get_deposits())
}

#[query]
pub fn get_pre_sale_statistics() -> Result<PreSaleStatistics, String> {
    Ok(DepositsLogic::get_pre_sale_statistics())
}

#[query]
pub fn get_amount_contributed(principal: Principal) -> Result<u64, String> {
    Ok(DepositsLogic::get_amount_contributed(principal))
}

#[update]
pub async fn add_deposit(amount: u64) -> Result<(), String> {
    is_not_anonymous()?;

    let principal = msg_caller();

    DepositsLogic::make_deposit(principal, amount).await
}
