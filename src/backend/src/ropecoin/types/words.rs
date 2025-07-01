use ic_stable_structures::{Storable, storable::Bound};
use std::borrow::Cow;

#[derive(Clone, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct BoundedString<const N: usize>(pub String);

impl<const N: usize> Storable for BoundedString<N> {
    fn to_bytes(&self) -> Cow<[u8]> {
        self.0.to_bytes()
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Self(String::from_bytes(bytes))
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: N as u32,
        is_fixed_size: false,
    };
} 