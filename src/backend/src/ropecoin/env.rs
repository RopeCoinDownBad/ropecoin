use candid::CandidType;
use ic_stable_structures::storable::{Storable, Bound};
use std::borrow::Cow;
use serde_cbor::{to_vec, from_slice};
use serde::{Serialize, Deserialize};

#[derive(CandidType, Serialize, Deserialize, Debug, Clone, Copy)]
pub enum EnvName {
    Local,
    Staging,
    IC,
}

impl Storable for EnvName {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(to_vec(self).unwrap())
    }
    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        from_slice(&bytes).unwrap()
    }
    const BOUND: Bound = Bound::Unbounded;
}

#[derive(CandidType, Serialize, Deserialize, Debug, Clone)]
pub struct EnvVars {
    pub ropecoin_ledger_canister_id: &'static str,
    pub authorized_principal: &'static str,
}

impl EnvName {
    pub fn get_env_vars(&self) -> EnvVars {
        match self {
            EnvName::Local => EnvVars {
                ropecoin_ledger_canister_id: "73a74-biaaa-aaaai-q3yjq-cai",
                authorized_principal: "fimqt-gp5ke-bnovt-6nfku-xa2z6-ft5eu-yo5pb-fevxk-euahv-ah6zo-oqe",
            },
            EnvName::Staging => EnvVars {
                ropecoin_ledger_canister_id: "73a74-biaaa-aaaai-q3yjq-cai",
                authorized_principal: "fimqt-gp5ke-bnovt-6nfku-xa2z6-ft5eu-yo5pb-fevxk-euahv-ah6zo-oqe",
            },
            EnvName::IC => EnvVars {
                ropecoin_ledger_canister_id: "xoa3b-4yaaa-aaaai-q3z4q-cai",
                authorized_principal: "sjqps-rujax-svg4l-whcfs-xxnqz-ydips-a2dw6-4x5gf-r7kob-kwxjd-6ae",
            },
        }
    }
}