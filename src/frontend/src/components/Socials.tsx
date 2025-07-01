const socials = [
  {
    name: "Twitter",
    url: "https://x.com/ropecoin_",
    icon: "https://x.com/favicon.ico",
  },
  {
    name: "OpenChat",
    url: "https://oc.app/community/d6lkk-viaaa-aaaac-axama-cai/?ref=5epm2-7yaaa-aaaac-aw76a-cai",
    icon: "https://oc.app/icon.png",
  },
  {
    name: "GitHub",
    url: "https://github.com/RopeCoinDownBad/ropecoin",
    icon: "https://github.com/favicon.ico",
  },
];

export default function Socials() {
  return (
    <div className="center">
      {socials.map((social) => (
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "15px", display: "inline-block" }}
          key={social.name}
        >
          <img
            className="social-icon"
            style={{ height: "3em", verticalAlign: "middle" }}
            src={social.icon}
            alt={social.name}
          />
        </a>
      ))}
    </div>
  );
}
