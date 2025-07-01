use candid::Principal;

pub const INITIAL_WORDS: [&str; 80] = [
    "crypto", "cosmic", "echo", "dream", "spark", "rope", "pump", "coin", "block", "meme", "chain",
    "wallet", "hash", "mint", "token", "ledger",  "dump", "hodl", "moon", "ape", "gas", "airdrop", "dapp", 
    "canister", "cycles", "dfinity", "icp", "earn", "deposit", "build", "ordinal", "network", "computer",
    "stake", "neurons", "governance", "seed", "motoko", "principals", "degen", "fomo", "bridge",
    "burn", "minting", "key", "vault",  "swap", "cycle", "fusion", "snark", "genius", "winner",
    "proxy", "node", "oracle", "portal", "shard", "lambo", "byte", "rich", "consensus",
    "troll", "trader", "drop", "bag", "whale", "pool", "yield", "farm", "flip", "dumpster",
    "fungi", "tick", "runed", "satoshi", "bitcoin", "ethereum", "solana", "binance", "kong", 
];

pub const MAINNET_LEDGER_CANISTER_ID: Principal =
    Principal::from_slice(&[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x01, 0x01]);

pub const DECIMALS: u64 = 100_000_000;

pub const PRESALE_END_TIMESTAMP: u64 = 1_754_006_400 * 1_000_000_000; // 2025-08-01 00:00:00 UTC, in nanoseconds

pub const PRESALE_AMOUNT_OF_ROPECOIN_TO_DISTRIBUTE: u64 = 1_000_000 * DECIMALS; // 1_000_000 Ropecoin

pub const ICP_LEDGER_FEE: u64 = 10_000;