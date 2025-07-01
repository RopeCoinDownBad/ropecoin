import { WalletProvider } from "./context/WalletContext";
import Header from "./components/Header";
import Connect from "./components/Connect";
import Hangman from "./components/Hangman/Hangman";
import About from "./components/About";
import Donate from "./components/Donate";
import Socials from "./components/Socials";
import { PreSaleStats, PreSaleStatsRef } from "./components/PreSaleStats";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const preSaleStatsRef = useRef<PreSaleStatsRef>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <WalletProvider>
      <div className="content cursor-default" style={{ overflowY: "scroll" }}>
        <div id="container">
          <div id="main"></div>
          <div
            className="inner container framed"
            style={{ position: "relative" }}
          >
            <Header />
            <div className="center">
              <Connect preSaleStatsRef={preSaleStatsRef} />
              <br />
              <PreSaleStats ref={preSaleStatsRef} />
              <div
                className="container framed-golden"
                style={{ position: "relative", width: "100%" }}
              >
                <Hangman />
              </div>
            </div>
            <br />
            <br />
            <About isMobile={isMobile} />
            <Socials />
            <hr style={{ clear: "both" }} />
            <Donate />
          </div>
        </div>
      </div>
    </WalletProvider>
  );
}
