export default function About({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <h1>What is Ropecoin?</h1>
      <p>
        In the grim reality of modern finance, where dreams die on red candles
        and your life savings vanish quicker than your ex after a 90% dip,
        Ropecoin emerges like a shady rope salesman in a online chat. It's not
        salvation — it's resignation with style. Ropecoin isn't just a memecoin.
        It's your final degen bet before you decide to leave this earth.
      </p>

      <h1>
        <img
          src="animations/knot.gif"
          alt="Noose swinging animation"
          style={{
            height: isMobile ? "2em" : "4em",
            verticalAlign: "middle",
            marginRight: isMobile ? "12px" : "20px",
          }}
        />
        <a href="/whitepaper.pdf" target="_blank">
          {isMobile ? "Whitepaper" : "Read the Whitepaper"}
        </a>
        <img
          src="animations/knot.gif"
          alt="Noose swinging animation"
          style={{
            height: isMobile ? "2em" : "4em",
            verticalAlign: "middle",
            marginLeft: isMobile ? "12px" : "20px",
          }}
        />
      </h1>
    </div>
  );
}
