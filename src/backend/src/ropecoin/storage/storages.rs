use candid::Principal;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BTreeMap, DefaultMemoryImpl, StableVec, StableCell};
use std::cell::RefCell;
use crate::env::EnvName;
use crate::types::words::BoundedString;

type Memory = VirtualMemory<DefaultMemoryImpl>;

// Thread-local memory manager and stable vector for words
thread_local! {
    pub static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    pub static WORDS: RefCell<StableVec<BoundedString<100>, Memory>> = RefCell::new({
        StableVec::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        ).expect("Failed to initialize words storage")
    });
    pub static DEPOSITS: RefCell<BTreeMap<Principal, u64, Memory>> = RefCell::new({
        BTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1))),
        )
    });

    pub static ENV: RefCell<StableCell<EnvName, DefaultMemoryImpl>> =
        RefCell::new(StableCell::init(DefaultMemoryImpl::default(), EnvName::Local).unwrap());
}
