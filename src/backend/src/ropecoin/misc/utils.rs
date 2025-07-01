use candid::Principal;
use ic_cdk::api::msg_caller;
use crate::storage::storages::ENV;
use crate::env::EnvName;

pub fn check_authorized_principal(caller: Principal) -> Result<(), String> {
    let env = ENV.with(|e| *e.borrow().get());
    let env_vars = env.get_env_vars();
    let authorized_principal = match env {
        EnvName::Staging => env_vars.authorized_principal,
        EnvName::IC => env_vars.authorized_principal,
        EnvName::Local => env_vars.authorized_principal,
    };

    if caller.to_string() != authorized_principal {
        return Err("Not authorized to perform this action".to_string());
    }
    Ok(())
}

pub fn is_not_anonymous() -> Result<(), String> {
    if msg_caller() == Principal::anonymous() {
        return Err("Caller is anonymous".to_string());
    }

    Ok(())
}
