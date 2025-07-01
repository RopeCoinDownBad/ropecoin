use candid::Nat;

pub fn nat_to_f64(n: &Nat) -> f64 {
    let n_str = n.0.to_string();
    n_str.parse::<f64>().unwrap()
}

pub fn f64_to_u64(f: f64) -> u64 {
    f.round() as u64
}

pub fn nat_to_u64(n: &Nat) -> u64 {
    f64_to_u64(nat_to_f64(n))
}
