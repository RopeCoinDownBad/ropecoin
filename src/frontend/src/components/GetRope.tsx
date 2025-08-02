import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { Principal } from "@dfinity/principal";
import { DECIMALS, ICP_LEDGER_FEE } from "../constants";
import { stringifyJson, unwrapResult } from "../utils";

const PRESALE_TOTAL_ROPE = 1000000; // 1 million rope tokens
const PRESALE_END_DATE = new Date("2025-08-01T00:00:00Z");

interface GetRopeProps {
  onDepositSuccess?: () => void;
}

export default function GetRope({ onDepositSuccess }: GetRopeProps) {
  const {
    wallet,
    setShowWalletOptions,
    signedRopecoinActor,
    signedICPLedgerActor,
    showGetRope,
    setShowGetRope,
  } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [principal, setPrincipal] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const validateAmount = (
    amountStr: string
  ): { isValid: boolean; error?: string } => {
    if (!amountStr || isNaN(Number(amountStr))) {
      return { isValid: false, error: "Please enter a valid amount" };
    }

    const amountNum = Number(amountStr);
    if (amountNum <= 0) {
      return { isValid: false, error: "Amount must be greater than 0" };
    }

    // Convert to e8s and check against ICP fee
    const amountInE8s = BigInt(Math.floor(amountNum * DECIMALS));
    const icpFeeInE8s = BigInt(ICP_LEDGER_FEE);

    if (amountInE8s <= icpFeeInE8s) {
      const minAmount = (Number(icpFeeInE8s) / DECIMALS).toFixed(4);
      return {
        isValid: false,
        error: `Amount must be greater than the ICP fee (${minAmount} ICP)`,
      };
    }

    return { isValid: true };
  };

  const validatePrincipal = (input: string): boolean => {
    try {
      Principal.fromText(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleGetRope = async () => {
    setError(""); // Clear previous errors

    const validation = validateAmount(amount);
    if (!validation.isValid) {
      return;
    }

    if (!wallet) {
      setShowWalletOptions(true);
      return;
    }

    if (!signedRopecoinActor || !signedICPLedgerActor) {
      validation.error = "Wallet connection error. Please try reconnecting.";
      return;
    }

    setIsLoading(true);
    try {
      const bigIntAmount = BigInt(Math.floor(Number(amount) * DECIMALS));
      const result = await signedICPLedgerActor.icrc2_approve({
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        amount: bigIntAmount + BigInt(ICP_LEDGER_FEE),
        expected_allowance: [],
        expires_at: [],
        spender: {
          owner: Principal.fromText(import.meta.env.VITE_ROPECOIN_CANISTER_ID),
          subaccount: [],
        },
      });

      console.log("result", result);
      await unwrapResult(result);

      const result2 = await signedRopecoinActor.add_deposit(bigIntAmount);
      console.log("result2", result2);
      await unwrapResult(result2);

      // Call the success callback to refresh stats
      if (onDepositSuccess) {
        onDepositSuccess();
      }

      setShowGetRope(false);
      setAmount("");
    } catch (err) {
      console.error("Error during deposit:", err);
      setError(
        `Transaction failed due to ${stringifyJson(err)}. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setError(""); // Clear previous errors

    if (!validatePrincipal(principal)) {
      return;
    }

    if (!wallet) {
      setShowWalletOptions(true);
      return;
    }

    if (!signedRopecoinActor || !signedICPLedgerActor) {
      setError("Wallet connection error. Please try reconnecting.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signedRopecoinActor.withdraw(
        Principal.fromText(principal)
      );
      console.log("result", result);
      const amount = await unwrapResult(result);
      setWithdrawAmount(amount.toString());
    } catch (err) {
      console.error("Error during withdrawal:", err);
      setError(
        `Transaction failed due to ${stringifyJson(err)}. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <>
      <button
        className="button"
        onClick={() => {
          if (!wallet) {
            setShowWalletOptions(true);
            return;
          }
          setShowGetRope(true);
        }}
        style={{ minWidth: "250px" }}
      >
        <p>Withdraw</p>
      </button>

      {showGetRope && (
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
            onClick={() => setShowGetRope(false)}
          />
          <div
            className="container framed center"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1001,
              minWidth: "400px",
              padding: "2rem",
            }}
          >
            <h2> Presale&apos;s dead. We didn&apos;t make it.</h2>
            <div style={{ marginBottom: "1.5rem" }}>
              <p>No launch, no token, no hopium left to inhale.</p>
              <p>
                But hey, no rugs here. You can withdraw 100% of your deposit —
                just drop in the wallet principal and we&apos;ll send it back
                like it never happened.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div>
                <input
                  type="text"
                  value={principal}
                  onChange={(e) => {
                    setPrincipal(e.target.value);
                    setError(""); // Clear error when user types
                  }}
                  placeholder="ICP Principal"
                  className="input"
                  style={{ width: "100%" }}
                  disabled={isLoading}
                />
              </div>

              {amount && !isNaN(Number(amount)) && (
                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: "#2a2a2a",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                  }}
                >
                  <p style={{ marginBottom: "0.5rem" }}>
                    <strong>Your Contribution:</strong>{" "}
                    {Number(amount).toLocaleString()} ICP
                  </p>
                  <p style={{ color: "#666" }}>
                    After presale, you'll receive ROPE tokens proportional to
                    your contribution.
                  </p>
                  {(validateAmount(amount).isValid && (
                    <p style={{ color: "#4CAF50", marginTop: "0.5rem" }}>
                      ✓ Amount is valid
                    </p>
                  )) || (
                    <p style={{ color: "#ff6b6b", marginTop: "0.5rem" }}>
                      ✗ Amount is invalid due to {validateAmount(amount).error}
                    </p>
                  )}
                </div>
              )}

              {/* Display transaction errors */}
              {error && (
                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: "rgba(255, 107, 107, 0.1)",
                    border: "1px solid #ff6b6b",
                    borderRadius: "4px",
                    marginTop: "1rem",
                  }}
                >
                  <p style={{ color: "#ff6b6b", margin: 0 }}>
                    <strong>Error:</strong> {error}
                  </p>
                </div>
              )}

              {withdrawAmount ? (
                <div>
                  <p>Withdrawn amount: {withdrawAmount} ICP</p>
                </div>
              ) : (
                <button
                  className="button"
                  onClick={handleWithdraw}
                  disabled={isLoading || !validatePrincipal(principal)}
                  style={{ minWidth: "250px" }}
                >
                  <p>{isLoading ? "Processing..." : "Withdraw ICP"}</p>
                </button>
              )}
            </div>

            <p>Sometimes the rope slips. Try not to hang on too tight. 🪢</p>
          </div>
        </>
      )}
    </>
  );
}
