// M

import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { useRopecoinActor } from "../hooks/useCanister";
import { PreSaleStatistics } from "../../../declarations/ropecoin/ropecoin.did";
import { useWallet } from "../context/WalletContext";
import { DECIMALS } from "../constants";
import { Principal } from "@dfinity/principal";

export interface PreSaleStatsRef {
  refreshStats: () => void;
}

export const PreSaleStats = forwardRef<PreSaleStatsRef>((props, ref) => {
  const { wallet } = useWallet();
  const ropecoinActor = useRopecoinActor();

  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const [stats, setStats] = useState<PreSaleStatistics | null>(null);
  const [contributed, setContributed] = useState<number | null>(null);

  const [showTargetInfo, setShowTargetInfo] = useState(false);

  const fetchStats = async () => {
    const statsResult = await ropecoinActor.get_pre_sale_statistics();
    if ("Ok" in statsResult) {
      setStats(statsResult.Ok);
    } else {
      console.error(statsResult.Err);
      setStats(null);
    }
  };

  const fetchContributed = async () => {
    if (wallet && wallet.owner) {
      const contributed = await ropecoinActor.get_amount_contributed(
        Principal.fromText(wallet.owner)
      );
      if ("Ok" in contributed) {
        setContributed(Number(contributed.Ok));
      } else {
        console.error(contributed.Err);
        setContributed(null);
      }
    }
  };

  // Expose refreshStats function through ref
  useImperativeHandle(ref, () => ({
    refreshStats: () => {
      fetchStats();
      fetchContributed();
    },
  }));

  // Countdown timer effect
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const endTimestamp = Number(stats?.end_timestamp) / 1000000 || 0;
      const end = new Date(endTimestamp).getTime();
      const difference = end - now;

      if (difference <= 0) {
        setTimeRemaining("Sale Ended");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [stats?.end_timestamp]);

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (wallet && wallet.owner) {
      fetchContributed();
    }
  }, [wallet]);

  return (
    <div>
      <h1>Pre Sale Stats</h1>
      <p>
        Total ICP Deposited:{" "}
        {(Number(stats?.total_icp_deposited) / DECIMALS).toLocaleString()}
      </p>
      <p>
        Amount of Ropecoin to Distribute:{" "}
        {(
          Number(stats?.amount_of_ropecoin_to_distribute) / DECIMALS
        ).toLocaleString()}
      </p>
      <p>Time Remaining: {timeRemaining}</p>
      {contributed !== null && (
        <p>Amount Contributed: {Number(contributed) / DECIMALS} Ropecoin</p>
      )}
      <h1>
        Target - 500 ICP{" "}
        <a onClick={() => setShowTargetInfo(!showTargetInfo)}>(i)</a>
      </h1>

      {showTargetInfo && (
        <>
          {/* Backdrop */}
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
            onClick={() => setShowTargetInfo(false)}
          />
          {/* Modal */}
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
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>
                The target is the minimum amount of ICP that the pre-sale needs to
                reach in order to be successful.
                <br />
                If the target is not reached, the pre-sale will be cancelled and
                all contributions will be refunded.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
