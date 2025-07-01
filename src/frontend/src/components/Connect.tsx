import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { PreSaleStatsRef } from "./PreSaleStats";
import GetRope from "./GetRope";

export default function Connect({
  preSaleStatsRef,
}: {
  preSaleStatsRef: React.RefObject<PreSaleStatsRef>;
}) {
  const { wallet, setWallet, pnp, showWalletOptions, setShowWalletOptions } =
    useWallet();
  const [availableWallets, setAvailableWallets] = useState<any[]>([]);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const wallets = pnp.getEnabledWallets();
    setAvailableWallets(wallets);
  }, []);

  const handleConnect = async (walletId: string) => {
    // Prevent multiple simultaneous connection attempts
    if (connecting) {
      console.log("Connection already in progress, ignoring click");
      return;
    }

    try {
      setConnecting(true);

      // Try to disconnect first if there's any existing connection
      try {
        await pnp.disconnect();
      } catch (disconnectError) {
        // Ignore disconnect errors, just continue
        console.log(
          "Disconnect before connect failed (this is usually fine):",
          disconnectError
        );
      }

      const account = await pnp.connect(walletId);
      console.log(
        "Account connected: ",
        account,
        "\nView in dashboard: ",
        `https://dashboard.internetcomputer.org/account/${account.subaccount?.toString()}`
      );
      setShowWalletOptions(false);

      // Track wallet connection event
      if (window.gtag) {
        window.gtag("event", "wallet_connected", {
          event_category: "wallet",
          event_label: walletId,
          value: 1,
        });
      }

      setWallet(account);
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);

      // Track failed connection event
      if (window.gtag) {
        window.gtag("event", "wallet_connection_failed", {
          event_category: "wallet",
          event_label: walletId,
          value: 0,
        });
      }
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div>
      {wallet ? (
        <>
          <p>
            Connected to {wallet.owner?.toString().slice(0, 9)}...
            {wallet.owner?.toString().slice(-9)}{" "}
            <span style={{ margin: "0 10px" }} />
            <button
              className="button golden"
              onClick={() =>
                navigator.clipboard.writeText(wallet.owner?.toString() || "")
              }
            >
              <p>Copy</p>
            </button>
          </p>
          <button
            className="button"
            onClick={() => {
              pnp.disconnect();
              setWallet(null);
            }}
            style={{ minWidth: "250px" }}
          >
            <p>Disconnect</p>
          </button>
        </>
      ) : (
        <button
          className="button"
          onClick={() => setShowWalletOptions(true)}
          style={{ minWidth: "250px" }}
          disabled={connecting}
        >
          <p>{connecting ? "Connecting..." : "Connect Wallet"}</p>
        </button>
      )}

      <GetRope
        onDepositSuccess={() => preSaleStatsRef.current?.refreshStats()}
      />

      {showWalletOptions && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
            onClick={() => {
              setShowWalletOptions(false);
              setConnecting(false);
            }}
          />
          <div
            className="container framed center"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1001,
              minWidth: "300px",
              padding: "2rem",
            }}
          >
            <h2>Select Wallet</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {availableWallets.map((wallet) => (
                <button
                  className="button"
                  onClick={() => handleConnect(wallet.id)}
                  disabled={connecting}
                >
                  <p>{connecting ? "Connecting..." : wallet.walletName}</p>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
