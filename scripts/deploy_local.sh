#!/bin/bash

set -e

dfx stop
dfx start --background
dfx identity use development

MINTER_ACCOUNT_ID="MINT_ACCOUNT_ID"
DEFAULT_ACCOUNT_ID="DEFAULT_ACCOUNT_ID"

# Deploy local ICP ledger
INIT_ARG="(variant { Init = record {
  minting_account = \"${MINTER_ACCOUNT_ID}\";
  initial_values = vec {
    record {
      \"${DEFAULT_ACCOUNT_ID}\";
      record { e8s = 10_000_000_000 : nat64; };
    };
  };
  send_whitelist = vec {};
  transfer_fee = opt record { e8s = 10_000 : nat64; };
  token_symbol = opt \"LICP\";
  token_name = opt \"Local ICP\";
} })"

# Deploy the canister (assuming dfx.json is set up correctly)
dfx deploy --specified-id CANISTER_ID icp_ledger_canister --argument "$INIT_ARG"

dfx deploy blackhole

dfx deploy ropecoin

dfx deploy ropecoin_ledger_canister --argument '(variant {
  Init = record {
    minting_account = record {
      owner = principal "<new_blackhole_id>";
      subaccount = null;
    };
    fee_collector_account = opt record {
      owner = principal "<new_controller_id>";
      subaccount = null;
    };
    transfer_fee = 10;
    decimals = opt 8;
    max_memo_length = null;
    token_symbol = "ROPE";
    token_name = "Ropecoin";
    metadata = vec {
    };
    initial_balances = vec {
      record {
        record {
          owner = principal "<new_ropecoin_canister_id>";
          subaccount = null;
        };
        800_000_000_000_000;
      };
      record {
        record {
          owner = principal "<new_marketing_controller_id>";
          subaccount = null;
        };
        150_000_000_000_000;
      };
      record {
        record {
          owner = principal "<new_dev_controller_id>";
          subaccount = null;
        };
        50_000_000_000_000;
      };
    };
    feature_flags = opt record {
      icrc2 = true;
    };
    archive_options = record {
      num_blocks_to_archive = 1000;
      max_transactions_per_response = null;
      trigger_threshold = 1000;
      max_message_size_bytes = null;
      cycles_for_archive_creation = null;
      node_max_memory_size_bytes = null;
      controller_id = principal "<new_controller_id>";
      more_controller_ids = opt vec {principal "<new_controller_id>"};
    };
  }
})'

dfx deploy ropecoin_archive_canister --argument '(principal "ledger_id", 1000:nat64, null, null)'

dfx deploy ropecoin_index_canister --argument '(opt variant {
  Init = record {
    ledger_id = principal "ledger_id";
    retrieve_blocks_from_ledger_interval_seconds = null;
  }
})'