use ic_stable_structures::{DefaultMemoryImpl, StableCell};
use std::cell::RefCell;
use crate::env::EnvName;

// Thread-local memory manager and stable vector for words
thread_local! {
    pub static ENV: RefCell<StableCell<EnvName, DefaultMemoryImpl>> =
        RefCell::new(StableCell::init(DefaultMemoryImpl::default(), EnvName::Local).unwrap());
}
    