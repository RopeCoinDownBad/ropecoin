import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ConsentInfo {
  'metadata' : ConsentMessageMetadata,
  'consent_message' : ConsentMessage,
}
export type ConsentMessage = {
    'LineDisplayMessage' : { 'pages' : Array<LineDisplayPage> }
  } |
  { 'GenericDisplayMessage' : string };
export interface ConsentMessageMetadata {
  'utc_offset_minutes' : [] | [number],
  'language' : string,
}
export interface ConsentMessageRequest {
  'arg' : Uint8Array | number[],
  'method' : string,
  'user_preferences' : ConsentMessageSpec,
}
export interface ConsentMessageSpec {
  'metadata' : ConsentMessageMetadata,
  'device_spec' : [] | [DisplayMessageType],
}
export type DisplayMessageType = { 'GenericDisplay' : null } |
  {
    'LineDisplay' : {
      'characters_per_line' : number,
      'lines_per_page' : number,
    }
  };
export type EnvName = { 'IC' : null } |
  { 'Local' : null } |
  { 'Staging' : null };
export interface ErrorInfo { 'description' : string }
export interface LineDisplayPage { 'lines' : Array<string> }
export interface PreSaleStatistics {
  'end_timestamp' : bigint,
  'amount_of_ropecoin_to_distribute' : bigint,
  'total_icp_deposited' : bigint,
}
export type Result = { 'Ok' : null } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : bigint } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : Array<[Principal, bigint]> } |
  { 'Err' : string };
export type Result_3 = { 'Ok' : PreSaleStatistics } |
  { 'Err' : string };
export type Result_4 = { 'Ok' : ConsentInfo } |
  { 'Err' : ErrorInfo };
export interface SupportedStandard { 'url' : string, 'name' : string }
export interface _SERVICE {
  '__get_candid_interface_tmp_hack' : ActorMethod<[], string>,
  'add_deposit' : ActorMethod<[bigint], Result>,
  'add_word' : ActorMethod<[string], Result>,
  'get_amount_contributed' : ActorMethod<[Principal], Result_1>,
  'get_deposits' : ActorMethod<[], Result_2>,
  'get_pre_sale_statistics' : ActorMethod<[], Result_3>,
  'get_words' : ActorMethod<[], Array<string>>,
  'icrc10_supported_standards' : ActorMethod<[], Array<SupportedStandard>>,
  'icrc21_canister_call_consent_message' : ActorMethod<
    [ConsentMessageRequest],
    Result_4
  >,
  'withdraw' : ActorMethod<[Principal], Result_1>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
