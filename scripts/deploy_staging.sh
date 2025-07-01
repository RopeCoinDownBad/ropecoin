#!/bin/bash

set -e


dfx deploy blackhole --network staging

dfx deploy ropecoin --network staging --argument '(variant {Staging})'

dfx deploy ropecoin_ledger_canister --argument '(variant {
  Init = record {
    minting_account = record {
      owner = principal "MINT_PRINCIPAL_ID";
      subaccount = null;
    };
    fee_collector_account = opt record {
      owner = principal "FEE_COLLECTOR_PRINCIPAL_ID";
      subaccount = null;
    };
    transfer_fee = 200_000;
    decimals = opt 8;
    max_memo_length = null;
    token_symbol = "TESTROPE";
    token_name = "Test Ropecoin";
    metadata = vec {
    };
    initial_balances = vec {
      record {
        record {
          owner = principal "PRINCIPAL_ID";
          subaccount = null;
        };
        800_000_000_000_000;
      };
      record {
        record {
          owner = principal "MARKETING_PRINCIPAL_ID";
          subaccount = null;
        };
        150_000_000_000_000;
      };
      record {
        record {
          owner = principal "DEV_PRINCIPAL_ID";
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
      trigger_threshold = 2000;
      node_max_memory_size_bytes = opt 1_073_741_824;
      max_message_size_bytes = opt 131_072;
      max_transactions_per_response = null;
      cycles_for_archive_creation = opt 5_000_000_000_000;
      controller_id = principal "CONTROLLER_PRINCIPAL_ID";
      more_controller_ids = opt vec {principal "PRINCIPAL_ID"};
    };
  }
})' --network staging

dfx deploy ropecoin_index_canister --argument '(opt variant {
  Init = record {
    ledger_id = principal "LEDGER_PRINCIPAL_ID";
    retrieve_blocks_from_ledger_interval_seconds = opt 10;
  }
})' --network staging
