#!/bin/bash

dfx canister call ropecoin --network staging mint_ropes '(principal "PRINCIPAL_ID", 100000000000000000:nat64)'

# Loop to call transfer 1100 times
echo "Starting loop of 1100 transfers..."
for i in {1..1100}; do
    echo "Transfer $i of 1100"
    dfx canister call ropecoin_ledger_canister --network staging icrc1_transfer "(record {
        to= record {owner = principal \"PRINCIPAL_ID\"; subaccount=null;};
        amount = 100_000:nat;
        fee=null;
    })"

    # Add a small delay to avoid overwhelming the network
    sleep 0.1
done

echo "Completed 1100 transfers"
