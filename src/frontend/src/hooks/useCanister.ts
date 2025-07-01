import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { _SERVICE as RopecoinService } from "../../../declarations/ropecoin/ropecoin.did.d";
import { idlFactory as ropecoinIdl } from "../../../declarations/ropecoin/ropecoin.did.js";
import { idlFactory as ledgerIdl, _SERVICE as LedgerService } from "../../../declarations/icpLedger";
import { useWallet } from "../context/WalletContext";
import { useMemo } from "react";
import { PNP } from "@windoge98/plug-n-play";

const createRopecoinActor = (): ActorSubclass<RopecoinService> => {
  const agent = HttpAgent.createSync({
    host:
      import.meta.env.VITE_DFX_NETWORK === "ic" || import.meta.env.VITE_DFX_NETWORK === "staging"
        ? "https://ic0.app"
        : "http://localhost:4943",
    shouldFetchRootKey: import.meta.env.VITE_DFX_NETWORK !== "ic" && import.meta.env.VITE_DFX_NETWORK !== "staging",
  });

  return Actor.createActor<RopecoinService>(ropecoinIdl, {
    agent,
    canisterId: import.meta.env.VITE_ROPECOIN_CANISTER_ID,
  });
};

export const useRopecoinActor = () => {
  const actor = useMemo(() => createRopecoinActor(), []);
  return actor;
};

export const createSignedRopecoinActor = (pnp: PNP): ActorSubclass<RopecoinService> => {
  return pnp.getActor<RopecoinService>({
    canisterId: import.meta.env.VITE_ROPECOIN_CANISTER_ID,
    idl: ropecoinIdl,
    anon: false,
    requiresSigning: true,
  });
};

export const useSignedRopecoinActor = () => {
  const { pnp } = useWallet();
  if (!pnp) {
    throw new Error("Wallet not connected");
  }
  const actor = useMemo(() => createSignedRopecoinActor(pnp), [pnp]);
  return actor;
};


const createSignedICPLedgerActor = (pnp: PNP): ActorSubclass<LedgerService> => {
  return pnp.getActor<LedgerService>({
    canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    idl: ledgerIdl,
    anon: false,
    requiresSigning: true,
  });
};

export const useSignedICPLedgerActor = () => {
  const { pnp } = useWallet();
  if (!pnp) {
    throw new Error("Wallet not connected");
  }

  const actor = useMemo(() => createSignedICPLedgerActor(pnp), [pnp]);
  return actor;
};