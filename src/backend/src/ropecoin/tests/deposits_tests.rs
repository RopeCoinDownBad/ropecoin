#[allow(deprecated)]
use candid::{encode_args, Nat, Principal};
use ropecoin::constants::{ICP_LEDGER_FEE, PRESALE_AMOUNT_OF_ROPECOIN_TO_DISTRIBUTE};
use ropecoin::{api::icp_ledger_api::Account, constants::PRESALE_END_TIMESTAMP};
use test_helper::utils::generate_principal;
use std::collections::HashMap;
use std::time::{Duration};
use test_helper::{context::Context, sender::Sender};

// #[test]
// fn test_distribute_rope_manually() -> Result<(), String> {
//     let context = Context::new();

//     let ropecoin_canister_id = context.ropecoin_canister;
//     println!("ropecoin_canister_id: {:?}", ropecoin_canister_id.to_text());

//     println!(
//         "ropecoin_ledger_canister_id: {:?}",
//         context.ropecoin_ledger_canister.to_text()
//     );

//     let rope_canister_balance = context.get_rope_balance(context.ropecoin_canister)?;
//     println!("rope_canister_balance: {:?}", rope_canister_balance);

//     const USER_ICP_AMOUNT: u64 = 100_000_000u64;
//     // mint ICP to user
//     context.mint_icp(USER_ICP_AMOUNT, Sender::Owner.principal());

//     // get user balance
//     let initial_user_icp_balance = context.get_icp_balance(Sender::Owner.principal())?;

//     // approve ICP amount
//     let cansiter_account = Account {
//         owner: context.ropecoin_canister,
//         subaccount: None,
//     };

//     let initial_canister_icp_balance = context.get_icp_balance(context.ropecoin_canister)?;
//     let owner_account = Account {
//         owner: Sender::Owner.principal(),
//         subaccount: None,
//     };
//     context.approve_icp(
//         None,
//         Sender::Owner.principal(),
//         cansiter_account.clone(),
//         USER_ICP_AMOUNT + ICP_LEDGER_FEE,
//         None,
//     );

//     // get allowance
//     let allowance = context.get_allowance(owner_account, cansiter_account)?;
//     assert_eq!(allowance.allowance, USER_ICP_AMOUNT + ICP_LEDGER_FEE);

//     // add deposit
//     let _: Result<(), String> = context.update(
//         Sender::Owner,
//         "add_deposit",
//         Some(encode_args((USER_ICP_AMOUNT,)).unwrap()),
//     )?;

//     // make sure user balance is updated
//     let new_user_icp_balance = context.get_icp_balance(Sender::Owner.principal())?;
//     let new_canister_icp_balance = context.get_icp_balance(context.ropecoin_canister)?;
//     // TODO: check this IT MAKES NO SENSE
//     assert_eq!(
//         new_user_icp_balance + ICP_LEDGER_FEE * 2,
//         initial_user_icp_balance.clone() - USER_ICP_AMOUNT
//     );
//     assert_eq!(
//         new_canister_icp_balance,
//         initial_canister_icp_balance + USER_ICP_AMOUNT
//     );

//     let user_rope_balance = context.get_rope_balance(Sender::Owner.principal())?;
//     assert_eq!(user_rope_balance, Nat::from(0u64));

//     // distribute rope
//     let _: Result<(), String> = context.update(Sender::Owner, "manually_distribute_rope", None)?;

//     // check users rope balance
//     let new_user_rope_balance = context.get_rope_balance(Sender::Owner.principal())?;
//     assert_eq!(
//         new_user_rope_balance,
//         Nat::from(PRESALE_AMOUNT_OF_ROPECOIN_TO_DISTRIBUTE)
//     );

//     Ok(())
// }

#[test]
fn test_distribute_rope_timer() -> Result<(), String> {
    let context = Context::new();

    const USER_ICP_AMOUNT: u64 = 100_000_000u64;
    // mint ICP to user
    context.mint_icp(USER_ICP_AMOUNT, Sender::Owner.principal());

    // get user balance
    let initial_user_icp_balance = context.get_icp_balance(Sender::Owner.principal())?;

    // approve ICP amount
    let cansiter_account = Account {
        owner: context.ropecoin_canister,
        subaccount: None,
    };

    let initial_canister_icp_balance = context.get_icp_balance(context.ropecoin_canister)?;
    let owner_account = Account {
        owner: Sender::Owner.principal(),
        subaccount: None,
    };
    context.approve_icp(
        None,
        Sender::Owner.principal(),
        cansiter_account.clone(),
        USER_ICP_AMOUNT + ICP_LEDGER_FEE,
        None,
    );

    // get allowance
    let allowance = context.get_allowance(owner_account, cansiter_account)?;
    assert_eq!(allowance.allowance, USER_ICP_AMOUNT + ICP_LEDGER_FEE);

    // add deposit
    let _: Result<(), String> = context.update(
        Sender::Owner,
        "add_deposit",
        Some(encode_args((USER_ICP_AMOUNT,)).unwrap()),
    )?;


    // make sure user balance is updated
    let new_user_icp_balance = context.get_icp_balance(Sender::Owner.principal())?;
    let new_canister_icp_balance = context.get_icp_balance(context.ropecoin_canister)?;
    // TODO: check this IT MAKES NO SENSE
    assert_eq!(
        new_user_icp_balance + ICP_LEDGER_FEE * 2,
        initial_user_icp_balance.clone() - USER_ICP_AMOUNT
    );
    assert_eq!(
        new_canister_icp_balance,
        initial_canister_icp_balance + USER_ICP_AMOUNT
    );

    let user_rope_balance = context.get_rope_balance(Sender::Owner.principal())?;
    assert_eq!(user_rope_balance, Nat::from(0u64));

    // advance time to 1st august 2025
    let target_timestamp: u64 = PRESALE_END_TIMESTAMP;
    let now = context.pic.get_time().as_nanos_since_unix_epoch();
    let delay_nanos = target_timestamp.saturating_sub(now);
    ic_cdk::println!("delay_nanos: {:?}", delay_nanos);

    // Advance time and tick to process timers
    context
        .pic
        .advance_time(Duration::from_nanos(delay_nanos + 1_000_000_000));
    context.pic.tick(); // Process pending timers
    
    // Wait for async distribution to complete by advancing time in smaller increments
    for _ in 0..10 {
        context.pic.advance_time(Duration::from_millis(100));
        context.pic.tick();
    }
    // check users rope balance
    let new_user_rope_balance = context.get_rope_balance(Sender::Owner.principal())?;
    assert_eq!(
        new_user_rope_balance,
        Nat::from(PRESALE_AMOUNT_OF_ROPECOIN_TO_DISTRIBUTE)
    );

    Ok(())
}

#[test]
fn test_distribute_rope_timer_with_multiple_users() -> Result<(), String> {
    let context = Context::new();

    const USER_ICP_AMOUNT: u64 = 100_000_000;
    let mut user_map = HashMap::<Principal, u64>::new();
    for index in 0u64..10u64 {
        // generate random principal
        let principal = generate_principal();

        // multiply icp amount by index + 1
        let icp_amount = USER_ICP_AMOUNT * (index + 1);

        // store a map of principal to icp_amount
        user_map.insert(principal, icp_amount);

        // mint ICP to user
        context.mint_icp(icp_amount + ICP_LEDGER_FEE * 2, principal);

        // approve ICP amount
        let cansiter_account = Account {
            owner: context.ropecoin_canister,
            subaccount: None,
        };

        // make sure user balance is updated
        let initial_user_icp_balance = context.get_icp_balance(principal)?;
        let initial_canister_icp_balance = context.get_icp_balance(context.ropecoin_canister)?;
        context.approve_icp(
            None,
            principal,
            cansiter_account.clone(),
            icp_amount + ICP_LEDGER_FEE,
            None,
        );
        // add deposit
        let _ = context.update::<Result<(), String>>(
            Sender::Other(principal),
            "add_deposit",
            Some(encode_args((icp_amount,)).unwrap()),
        )?;

        let new_user_icp_balance = context.get_icp_balance(principal)?;
        println!("initial_user_icp_balance: {:?} new_user_icp_balance: {:?}", initial_user_icp_balance, new_user_icp_balance);

        let amount_contributed = context.update::<Result<u64, String>>(
            Sender::Other(principal),
            "get_amount_contributed",
            Some(encode_args((principal,)).unwrap()),
        )?;
        println!("amount_contributed: {:?} icp_amount: {:?}", amount_contributed, icp_amount);
        let new_canister_icp_balance = context.get_icp_balance(context.ropecoin_canister)?;
        // TODO: check this IT MAKES NO SENSE
        assert_eq!(
            new_user_icp_balance,
            initial_user_icp_balance.clone() - (icp_amount + ICP_LEDGER_FEE * 2)
        );
        assert_eq!(
            new_canister_icp_balance,
            initial_canister_icp_balance + icp_amount
        );
        let initial_rope_balance = context.get_rope_balance(principal)?;
        assert_eq!(initial_rope_balance, Nat::from(0u64));
    }

    // advance time to 1st august 2025
    let target_timestamp: u64 = PRESALE_END_TIMESTAMP;
    let now = context.pic.get_time().as_nanos_since_unix_epoch();
    let delay_nanos = target_timestamp.saturating_sub(now);
    ic_cdk::println!("delay_nanos: {:?}", delay_nanos);

    // Advance time and tick to process timers
    context
        .pic
        .advance_time(Duration::from_nanos(delay_nanos + 1_000_000_000));

    context.pic.tick(); // Process pending timers
    
    // Wait for async distribution to complete by advancing time in smaller increments
    for _ in 0..12 {
        context.pic.advance_time(Duration::from_millis(100));
        context.pic.tick();
    }

    let total_icp_amount: u64 = user_map.values().sum();

    for (principal, icp_amount) in user_map {
        
        // calculate the expected rope balance = their icp / totol icp * total rope

        let expected_rope_amount =
            (icp_amount as u128 * PRESALE_AMOUNT_OF_ROPECOIN_TO_DISTRIBUTE as u128 / total_icp_amount as u128) as u64;
        let new_user_rope_balance = context.get_rope_balance(principal)?;
        assert_eq!(new_user_rope_balance, expected_rope_amount);
    }
    Ok(())
}


#[test]
fn test_should_not_add_deposit_if_allowance_is_not_enough() -> Result<(), String> {
    let context = Context::new();

    const USER_ICP_AMOUNT: u64 = 100_000_000u64;
    // mint ICP to user
    context.mint_icp(USER_ICP_AMOUNT, Sender::Owner.principal());

    // approve ICP amount
    let cansiter_account = Account {
        owner: context.ropecoin_canister,
        subaccount: None,
    };

    context.approve_icp(
        None,
        Sender::Owner.principal(),
        cansiter_account.clone(),
        USER_ICP_AMOUNT,
        None,
    );

    // add deposit
    let add_deposit_result: Result<(), String> = context.update(
        Sender::Owner,
        "add_deposit",
        Some(encode_args((USER_ICP_AMOUNT,)).unwrap()),
    );

    assert!(add_deposit_result.is_err());

    let deposits_result = context.query::<Result<Vec<(Principal, u64)>, String>>(
        Sender::Owner,
        "get_deposits",
        None,
    )?;

    let deposits = deposits_result?;
    assert_eq!(deposits.len(), 0);

    Ok(())
}


#[test]
fn test_should_not_distribute_rope_if_canister_balance_is_less_than_total_deposited_amount() -> Result<(), String> {
    let context = Context::new();

    const USER_ICP_AMOUNT: u64 = 100_000_000u64;
    // mint ICP to user
    context.mint_icp(USER_ICP_AMOUNT, Sender::Owner.principal());

    // get user balance
    let initial_user_icp_balance = context.get_icp_balance(Sender::Owner.principal())?;

    // approve ICP amount
    let cansiter_account = Account {
        owner: context.ropecoin_canister,
        subaccount: None,
    };

    let initial_canister_icp_balance = context.get_icp_balance(context.ropecoin_canister)?;
    let owner_account = Account {
        owner: Sender::Owner.principal(),
        subaccount: None,
    };
    context.approve_icp(
        None,
        Sender::Owner.principal(),
        cansiter_account.clone(),
        USER_ICP_AMOUNT + ICP_LEDGER_FEE,
        None,
    );

    // get allowance
    let allowance = context.get_allowance(owner_account, cansiter_account)?;
    assert_eq!(allowance.allowance, USER_ICP_AMOUNT + ICP_LEDGER_FEE);

    // add deposit
    let _: Result<(), String> = context.update(
        Sender::Owner,
        "add_deposit",
        Some(encode_args((USER_ICP_AMOUNT,)).unwrap()),
    )?;


    // make sure user balance is updated
    let new_user_icp_balance = context.get_icp_balance(Sender::Owner.principal())?;
    let new_canister_icp_balance = context.get_icp_balance(context.ropecoin_canister)?;
    // TODO: check this IT MAKES NO SENSE
    assert_eq!(
        new_user_icp_balance + ICP_LEDGER_FEE * 2,
        initial_user_icp_balance.clone() - USER_ICP_AMOUNT
    );
    assert_eq!(
        new_canister_icp_balance,
        initial_canister_icp_balance + USER_ICP_AMOUNT
    );

    let user_rope_balance = context.get_rope_balance(Sender::Owner.principal())?;
    assert_eq!(user_rope_balance, Nat::from(0u64));


    let canister_account = Account {
        owner: context.ropecoin_canister,
        subaccount: None,
    };
    let owner_account = Account {
        owner: Sender::Owner.principal(),
        subaccount: None,
    };
    // remove canister ICP
    context.transfer_icp(USER_ICP_AMOUNT, canister_account, owner_account);

    let distribute_result: Result<(), String> = context.update(Sender::Owner, "manually_distribute_rope", None);
    assert!(distribute_result.is_err());

    // check users rope balance
    let new_user_rope_balance = context.get_rope_balance(Sender::Owner.principal())?;
    assert_eq!(
        new_user_rope_balance,
        Nat::from(0u64)
    );

    Ok(())
}