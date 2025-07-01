export const idlFactory = ({ IDL }) => {
  const CanisterStatusRequest = IDL.Record({ 'canister_id' : IDL.Principal });
  const CanisterStatus = IDL.Variant({
    'Stopped' : IDL.Null,
    'Stopping' : IDL.Null,
    'Running' : IDL.Null,
  });
  const DefiniteCanisterSettings = IDL.Record({
    'freezing_threshold' : IDL.Nat64,
    'controllers' : IDL.Vec(IDL.Principal),
    'memory_allocation' : IDL.Nat64,
    'compute_allocation' : IDL.Nat64,
  });
  const CanisterStatusResponse = IDL.Record({
    'status' : CanisterStatus,
    'memory_size' : IDL.Nat64,
    'cycles' : IDL.Nat64,
    'settings' : DefiniteCanisterSettings,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const RejectionCode = IDL.Variant({
    'NoError' : IDL.Null,
    'CanisterError' : IDL.Null,
    'SysTransient' : IDL.Null,
    'DestinationInvalid' : IDL.Null,
    'Unknown' : IDL.Null,
    'SysFatal' : IDL.Null,
    'CanisterReject' : IDL.Null,
  });
  const Result = IDL.Variant({
    'Ok' : CanisterStatusResponse,
    'Err' : IDL.Tuple(RejectionCode, IDL.Text),
  });
  return IDL.Service({
    '__get_candid_interface_tmp_hack' : IDL.Func([], [IDL.Text], ['query']),
    'canister_status' : IDL.Func([CanisterStatusRequest], [Result], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
