export const idlFactory = ({ IDL }) => {
  const EnvName = IDL.Variant({
    'IC' : IDL.Null,
    'Local' : IDL.Null,
    'Staging' : IDL.Null,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : IDL.Text });
  const Result_2 = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64)),
    'Err' : IDL.Text,
  });
  const PreSaleStatistics = IDL.Record({
    'end_timestamp' : IDL.Nat64,
    'amount_of_ropecoin_to_distribute' : IDL.Nat64,
    'total_icp_deposited' : IDL.Nat64,
  });
  const Result_3 = IDL.Variant({ 'Ok' : PreSaleStatistics, 'Err' : IDL.Text });
  const SupportedStandard = IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text });
  const ConsentMessageMetadata = IDL.Record({
    'utc_offset_minutes' : IDL.Opt(IDL.Int16),
    'language' : IDL.Text,
  });
  const DisplayMessageType = IDL.Variant({
    'GenericDisplay' : IDL.Null,
    'LineDisplay' : IDL.Record({
      'characters_per_line' : IDL.Nat16,
      'lines_per_page' : IDL.Nat16,
    }),
  });
  const ConsentMessageSpec = IDL.Record({
    'metadata' : ConsentMessageMetadata,
    'device_spec' : IDL.Opt(DisplayMessageType),
  });
  const ConsentMessageRequest = IDL.Record({
    'arg' : IDL.Vec(IDL.Nat8),
    'method' : IDL.Text,
    'user_preferences' : ConsentMessageSpec,
  });
  const LineDisplayPage = IDL.Record({ 'lines' : IDL.Vec(IDL.Text) });
  const ConsentMessage = IDL.Variant({
    'LineDisplayMessage' : IDL.Record({ 'pages' : IDL.Vec(LineDisplayPage) }),
    'GenericDisplayMessage' : IDL.Text,
  });
  const ConsentInfo = IDL.Record({
    'metadata' : ConsentMessageMetadata,
    'consent_message' : ConsentMessage,
  });
  const ErrorInfo = IDL.Record({ 'description' : IDL.Text });
  const Result_4 = IDL.Variant({ 'Ok' : ConsentInfo, 'Err' : ErrorInfo });
  return IDL.Service({
    '__get_candid_interface_tmp_hack' : IDL.Func([], [IDL.Text], ['query']),
    'add_deposit' : IDL.Func([IDL.Nat64], [Result], []),
    'add_word' : IDL.Func([IDL.Text], [Result], []),
    'get_amount_contributed' : IDL.Func([IDL.Principal], [Result_1], ['query']),
    'get_deposits' : IDL.Func([], [Result_2], ['query']),
    'get_pre_sale_statistics' : IDL.Func([], [Result_3], ['query']),
    'get_words' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'icrc10_supported_standards' : IDL.Func(
        [],
        [IDL.Vec(SupportedStandard)],
        ['query'],
      ),
    'icrc21_canister_call_consent_message' : IDL.Func(
        [ConsentMessageRequest],
        [Result_4],
        [],
      ),
    'manually_distribute_rope' : IDL.Func([], [Result], []),
    'mint_ropes' : IDL.Func([IDL.Principal, IDL.Nat64], [Result], []),
    'withdraw_icp' : IDL.Func([IDL.Nat64, IDL.Principal], [Result], []),
  });
};
export const init = ({ IDL }) => {
  const EnvName = IDL.Variant({
    'IC' : IDL.Null,
    'Local' : IDL.Null,
    'Staging' : IDL.Null,
  });
  return [EnvName];
};
