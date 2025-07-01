#![allow(deprecated)]
pub mod api;
pub mod constants;
pub mod env;
pub mod logic;
pub mod methods;
pub mod misc;
pub mod storage;
pub mod types;

use std::time::Duration;

use crate::constants::PRESALE_END_TIMESTAMP;
use crate::env::{EnvName, EnvVars};
use crate::logic::deposits::DepositsLogic;
use crate::logic::words::WordsLogic;
use crate::storage::storages::ENV;
use crate::types::deposits::PreSaleStatistics;
use candid::{export_service, Principal};
use ic_cdk::{init, query};
use crate::methods::icrc21::SupportedStandard;
use icrc_ledger_types::icrc21::requests::ConsentMessageRequest;
use icrc_ledger_types::icrc21::responses::ConsentInfo;
use icrc_ledger_types::icrc21::errors::ErrorInfo;

#[init]
pub fn init(env: EnvName) {
    ENV.with(|e| e.borrow_mut().set(env).expect("Failed to set environment"));

    WordsLogic::init();

    // Replace this with your target UNIX timestamp (in nanoseconds)
    let target_timestamp: u64 = PRESALE_END_TIMESTAMP; // in nanoseconds
    let now = ic_cdk::api::time(); // already in nanoseconds
    let delay_nanos = target_timestamp.saturating_sub(now);
    let delay = Duration::from_nanos(delay_nanos);

    ic_cdk::println!("Actual delay: {:?}", delay.as_nanos());

    ic_cdk_timers::set_timer(delay, || {
        ic_cdk::spawn(async {
            ic_cdk::println!("Distributing");
            let _ = DepositsLogic::distribute().await;
        });
    });
}

#[query]
pub fn __get_candid_interface_tmp_hack() -> String {
    export_service!();
    __export_service()
}

#[query]
pub fn get_env() -> EnvName {
    ENV.with(|e| *e.borrow().get())
}

#[query]
pub fn get_env_vars() -> EnvVars {
    ENV.with(|e| *e.borrow().get()).get_env_vars()
}

#[test]
pub fn candid() {
    use std::env;
    use std::fs::write;
    use std::path::PathBuf;

    let dir = PathBuf::from(env::var("CARGO_MANIFEST_DIR").unwrap());
    write(dir.join("ropecoin.did"), __get_candid_interface_tmp_hack()).expect("Write failed.");
}
