use candid::{decode_one, CandidType, Deserialize};
use ic_cdk::{query, update};
use icrc_ledger_types::icrc21::requests::{ConsentMessageMetadata, ConsentMessageRequest};
use icrc_ledger_types::icrc21::responses::{ConsentInfo, ConsentMessage};
use icrc_ledger_types::icrc21::errors::ErrorInfo;


#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct SupportedStandard {
    pub url: String,
    pub name: String,
}

#[query]
pub fn icrc10_supported_standards() -> Vec<SupportedStandard> {
    vec![
        SupportedStandard {
            url: "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-10/ICRC-10.md".to_string(),
            name: "ICRC-10".to_string(),
        },
        SupportedStandard {
            url: "https://github.com/dfinity/wg-identity-authentication/blob/main/topics/ICRC-21/icrc_21_consent_msg.md".to_string(),
            name: "ICRC-21".to_string(),
        },
    ]
}

#[update]
pub fn icrc21_canister_call_consent_message(consent_msg_request: ConsentMessageRequest) -> Result<ConsentInfo, ErrorInfo> {
    let consent_message = match consent_msg_request.method.as_str() {
        "add_deposit" | "add_deposit_async" => {
            let Ok(add_deposit_args) = decode_one::<u64>(&consent_msg_request.arg) else {
                Err(ErrorInfo {
                    description: "Failed to decode AddDepositArgs".to_string(),
                })?
            };
            
            let icp_amount = add_deposit_args as f64 / 100_000_000.0; // Convert e8s to ICP
            
            ConsentMessage::GenericDisplayMessage(format!(
                "# Approve Ropecoin Presale Deposit
                
**ICP Amount:**
{} ICP

**Note:** This will contribute to the Ropecoin presale and you will receive Ropecoin tokens in return.",
                icp_amount
            ))
        }
        _ => ConsentMessage::GenericDisplayMessage(format!("Approve Ropecoin to execute {}", consent_msg_request.method)),
    };

    let metadata = ConsentMessageMetadata {
        language: "en".to_string(),
        utc_offset_minutes: None,
    };

    Ok(ConsentInfo { metadata, consent_message })
}
