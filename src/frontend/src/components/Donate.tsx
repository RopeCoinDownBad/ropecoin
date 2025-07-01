import { useState } from "react";

export default function Donate() {
  const [donate, setDonate] = useState(false);
  const principal = import.meta.env.VITE_DONATION_PRINCIPAL;

  return (
    <div className="center">
      <button
        className="button golden"
        onClick={() => {
          setDonate(true);
        }}
        style={{ minWidth: "250px" }}
      >
        <p>Donate</p>
      </button>

      {donate && (
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
            onClick={() => setDonate(false)}
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
              maxHeight: "99vh",
              padding: "2rem",
              overflowY: "scroll",
            }}
          >
            <h2>Donate to the Project</h2>
            <div>
              <p style={{ fontSize: "0.8rem", textAlign: "left" }}>
                Ropecoin isn&apos;t here to make the devs rich — this memecoin
                is for the community, powered by chaos, bad decisions, and life
                choices.
                <br />
                <span
                  style={{
                    textDecoration: "underline",
                    display: "block",
                    textAlign: "center",
                    margin: "10px 0",
                  }}
                >
                  Buying $ROPE is the best way to support the project.
                </span>
                ... but if you&apos;re enjoying the ride and want to keep the
                devs fed, caffeinated, and emotionally stable, feel free to send
                any IC token to:
                <textarea
                  value={principal}
                  readOnly
                  style={{
                    width: "100%",
                    height: "0px",
                    fontSize: "0.6rem",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "white",
                    resize: "none",
                    padding: "0",
                    margin: "0",
                  }}
                />
                <button
                  className="button"
                  onClick={() => {
                    navigator.clipboard.writeText(principal);
                  }}
                  style={{ 
                    alignItems: "center",
                    display: "block",
                    margin: "0 auto"
                  }}
                >
                  <p>Copy</p>
                </button>
                <br />
                No funds? No problem:
                <br />
                🗣 Shill us like your life depends on it 🗣
                <br />
                👨‍💻 Contribute code, memes, or vibes 👨‍💻
                <br />
                🤝 Be the community we meme about 🤝
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
