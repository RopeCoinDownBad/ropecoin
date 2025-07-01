export default function Header() {
  return (
    <header>
      <br />
      <div
        className="container framed-golden-2"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <img
          src="assets/token.png"
          alt="RopeCoin Token Symbol"
          style={{ width: "15%" }}
        />
        <img
          src="assets/text.png"
          alt="RopeCoin"
          style={{ width: "75%", filter: "brightness(0) invert(1)" }}
        />
      </div>

      <hr className="golden" />
      <br />

      <h2 style={{ fontSize: "150%", textAlign: "center" }}>
        Your Last Shot Before the Drop!
        <img
          src="animations/noose-swinging.gif"
          alt="Noose swinging animation"
          style={{ height: "2em", verticalAlign: "middle" }}
        />
      </h2>
    </header>
  );
}
