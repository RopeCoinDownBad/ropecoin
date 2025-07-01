cargo test candid -p ropecoin

cargo build -p ropecoin --release --target wasm32-unknown-unknown

gzip -c target/wasm32-unknown-unknown/release/ropecoin.wasm > target/wasm32-unknown-unknown/release/ropecoin.wasm.gz

cp target/wasm32-unknown-unknown/release/ropecoin.wasm.gz wasm/ropecoin.wasm.gz
