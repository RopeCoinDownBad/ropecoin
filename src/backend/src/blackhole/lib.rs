#![allow(deprecated)]
use candid::{export_service, CandidType, Deserialize, Principal};
use ic_cdk::{api::call::CallResult, query};

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

// IC Management Canister Principal
const IC_MANAGEMENT_CANISTER: &str = "aaaaa-aa";

#[query]
pub async fn canister_status(request: CanisterStatusRequest) -> CallResult<CanisterStatusResponse> {
    let ic_management_canister = Principal::from_text(IC_MANAGEMENT_CANISTER).unwrap();
    let (status,) = ic_cdk::call(ic_management_canister, "canister_status", (request,)).await?;
    Ok(status)
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
    write(
        dir.join("blackhole.did"),
        __get_candid_interface_tmp_hack(),
    )
    .expect("Write failed.");
}
