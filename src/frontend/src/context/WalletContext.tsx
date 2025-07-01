import React, { createContext, useContext, useState, ReactNode } from "react";
import { createPNP, type PNP } from "@windoge98/plug-n-play";
import { WalletAccount } from "@windoge98/plug-n-play/dist/types/WalletTypes";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE as RopecoinService } from "../../../declarations/ropecoin/ropecoin.did.d";
import { _SERVICE as LedgerService } from "../../../declarations/icpLedger";
import { idlFactory as ledgerIdl } from "../../../declarations/icpLedger";
import { idlFactory as ropecoinIdl } from "../../../declarations/ropecoin/ropecoin.did.js";

const pnp = createPNP({
  // Global settings
  hostUrl:
    import.meta.env.VITE_DFX_NETWORK === "ic" ||
    import.meta.env.VITE_DFX_NETWORK === "staging"
      ? "https://ic0.app"
      : "http://localhost:4943",
  fetchRootKeys:
    import.meta.env.VITE_DFX_NETWORK !== "ic" &&
    import.meta.env.VITE_DFX_NETWORK !== "staging",
  verifyQuerySignatures:
    import.meta.env.VITE_DFX_NETWORK !== "ic" &&
    import.meta.env.VITE_DFX_NETWORK !== "staging",
  derivationOrigin:
    import.meta.env.VITE_DERIVATION_ORIGIN ?? "http://ropecoin.xyz",
  dfxNetwork: import.meta.env.VITE_DFX_NETWORK,

  // Adapter-specific configurations
  adapters: {
    oisy: {
      enabled: true,
      config: {},
    },
    nfid: {
      enabled: true,
      config: {},
    },
    ii: {
      enabled: true,
      config: {
        identityProvider: "https://identity.ic0.app",
      },
    },
    plug: {
      enabled: true,
      config: {},
    },
  },
});

interface WalletContextType {
  wallet: WalletAccount | null;
  setWallet: (wallet: WalletAccount | null) => void;
  pnp: PNP;
  showWalletOptions: boolean;
  setShowWalletOptions: (show: boolean) => void;
  signedRopecoinActor: ActorSubclass<RopecoinService> | null;
  signedICPLedgerActor: ActorSubclass<LedgerService> | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<any>(null);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [signedRopecoinActor, setSignedRopecoinActor] =
    useState<ActorSubclass<RopecoinService> | null>(null);
  const [signedICPLedgerActor, setSignedICPLedgerActor] =
    useState<ActorSubclass<LedgerService> | null>(null);

  // Helper functions to create signed actors
  const createSignedRopecoinActor = (pnp: PNP) => {
    return pnp.getActor<RopecoinService>({
      canisterId: import.meta.env.VITE_ROPECOIN_CANISTER_ID,
      idl: ropecoinIdl,
      anon: false,
      requiresSigning: true,
    });
  };

  const createSignedICPLedgerActor = (pnp: PNP) => {
    return pnp.getActor<LedgerService>({
      canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
      idl: ledgerIdl,
      anon: false,
      requiresSigning: true,
    });
  };

  // Update signed actors when wallet changes
  // Only create actors if wallet is present
  React.useEffect(() => {
    if (wallet) {
      setSignedRopecoinActor(createSignedRopecoinActor(pnp));
      setSignedICPLedgerActor(createSignedICPLedgerActor(pnp));
    } else {
      setSignedRopecoinActor(null);
      setSignedICPLedgerActor(null);
    }
  }, [wallet, pnp]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
        pnp,
        showWalletOptions,
        setShowWalletOptions,
        signedRopecoinActor,
        signedICPLedgerActor,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
