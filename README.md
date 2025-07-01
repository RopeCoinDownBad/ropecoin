# 🪢 Ropecoin

Welcome to the official Ropecoin repo. This is where all the chaos lives — token smart contracts, frontend code, and a community’s last degen hope before the market pulls the floor.

Ropecoin is a decentralized memecoin born in the ashes of modern finance — a last-ditch bet for the terminally degen. Built on the Internet Computer (ICP), Ropecoin fuses meme culture with multichain tech using Chain Key and Chain Fusion.

> It's not salvation. It's resignation — in style.

---

## 🌐 About

Ropecoin isn't just a coin — it's a statement. One that says:

- "Yes, I read the whitepaper (no I didn't)."
- "Yes, I YOLO'd everything into a coin named after rope."
- "Yes, I deserve to touch grass."

---

## 🧱 Monorepo Structure

This is a monorepo containing all the core components of the Ropecoin ecosystem:

```text
ropecoin/
├── 🎯 src/
│   ├── 🦀 backend/             # Rust canisters (because we're not animals)
│   │   └── src/
│   │       ├── ropecoin/       # Main canister (the brain)
│   │       ├── blackhole/      # Minting account (so no one has the power to print anymore money)
│   │       ├── fee_collector/  # Fee collector (half burned and half sent to the treasury)
│   │       └── test_helper/    # Testing utilities (we actually test stuff)
│   ├── 🎨 frontend/            # React + TypeScript (pretty pixels)
│   │   ├── src/
│   │   │   ├── components/     # UI components (including a hangman game!)
│   │   │   ├── context/        # State management (not your ex's)
│   │   │   └── hooks/          # Custom hooks (fishing for data)
│   │   └── public/             # Static assets (images, CSS, etc.)
│   └── 📋 declarations/        # Auto-generated Candid interfaces
├── 🚀 scripts/                 # Deployment scripts (because we're lazy)
├── 📦 wasm/                    # Compiled WebAssembly (the magic)
└── ⚙️ config files             # dfx.json, Cargo.toml, etc.
```

---

## 🛠️ Tech Stack

- 💻 React + TypeScript
- 🧾 Rust Smart Contracts
- 🧪 PocketIC (testing)
- 🔗 Internet Computer + ICRC1/2/3
- 🧠 Chain Key & Chain Fusion (multichain support)
- 🐍 Scripts in Bash
- 🧵 Rope

---

## 🪙 Token Info

### Basic Stats

- **Name**: Ropecoin
- **Symbol**: $ROPE
- **Decimals**: 8 (because precision matters)
- **Standard**: ICRC-1 / 2 / 3 (ICP's answer to ERC-20)

### Supply & Distribution

### 🧮 Token Allocation

- **Total Supply:** 10,000,000  
   _(bodies in the financial mass grave)_
  If you want to check this you can check the [ropecoin_ledger_canister](https://dashboard.internetcomputer.org/canister/xoa3b-4yaaa-aaaai-q3z4q-cair) minting account of the ledger canister which has been blackholed (it has no controllers) by running this command:

  ```bash
  dfx canister info wdo7p-tqaaa-aaaai-q3z3a-cai --network ic
  ```

  To get the minting account of the ledger canister you can run this command:

  ```bash
  dfx canister call xoa3b-4yaaa-aaaai-q3z4q-cai icrc1_minting_account --network ic
  ```

- **Liquidity Pool:** 7,000,000  
  _(So there's actually a market when you're panic-selling)_

- **Team & Development:** 500,000  
  _(For the undertakers hosting the funeral)_

- **Marketing, Partnerships & DAO Treasury:** 1,500,000  
  _(To plaster the web with memes of your downfall)_

- **Early Adopters:** 1,000,000  
  _(For the OG degenerates who were down bad early)_

- **Transfer Fee**: 0.002 ROPE per transaction

### Presale Details

- **End Date**: August 1st, 2025 (mark your calendars)
- **Distribution**: Proportional to ICP contribution
- **Minimum**: Whatever you can afford to lose

---

## 🛠️ Features (WIP)

- 🔒 Audited, locked contracts
- 🧠 Staking (eventually)
- 📉 NFT collection of tragic trades
- 📊 Mental health & financial recovery integration (future)
- 🤝 Charity & community compensation funds
- 🧠 Financial literacy & support resources
- 🌐 SNS integration (ICP)

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0 (because we're not savages)
- DFX (Internet Computer SDK)
- Rust toolchain
- A sense of humor (mandatory)

### Local Development

```bash
# Clone the repo (if you haven't already)
git clone <repo-url>
cd ropecoin

# Install dependencies
npm install

# Start local Internet Computer
dfx start --background

# Deploy everything locally
./scripts/deploy_local.sh

# Start the frontend
npm run start:frontend
```

### Production Deployment

```bash
# Deploy to staging
./scripts/deploy_staging.sh

# Deploy to production (when you're ready to YOLO)
./scripts/deploy_prod.sh
```

---

## 🧪 Testing

We actually write tests (shocking, I know):

```bash
# Run backend tests
cd src/backend
cargo test

```

---

### 🧾 License

MIT License. See the [`LICENSE`](./LICENSE.txt) file for full terms.

> tl;dr: Use it, fork it, ship it. Just don't sue us when your bags go to zero.

---

## 🤝 Contribute

We welcome contributors who are fluent in:

- Web3 dark humor
- Frontend development
- Rust smart contracts
- Charity integration, mental health support, or financial recovery services

### Guidelines

1. **Don't be a jerk** - We're all degens here, but be nice
2. **Write tests** - We actually care about quality
3. **Follow the code style** - Keep it pretty, and use the [Examples.tsx](src/frontend/src/components/Examples.tsx) file for frontend inspiration
4. **Add comments** - Future you will thank present you
5. **Update docs** - If you break something, document it

### Process

1. Fork the repo (if you haven't already)
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request and detail your changes
6. Complain to deaf ears when no one reviews it and it gets lost in the abyss

### What We're Looking For

- Bug fixes (because obviously)
- Utility and games (let's keep it entertaining)
- Performance improvements (faster = better)
- UI/UX enhancements (pretty pixels matter)
- Documentation improvements (because reading is hard)
- Meme suggestions (we're serious about this)

---

## 📞 Contact & Community

### Official Channels

- **Website**: [ropecoin.xyz](https://ropecoin.xyz) (when it exists)
- **Twitter**: [@ropecoin\_](https://x.com/ropecoin_) (for the memes)
- **Openchat**: [Ropecoin Community](https://oc.app/community/d6lkk-viaaa-aaaac-axama-cai/?ref=5epm2-7yaaa-aaaac-aw76a-cai) (for the vibes)

### Development

- **GitHub Issues**: [Report bugs here](https://github.com/RopeCoinDownBad/ropecoin/issues)
- **Email**: <ropecoin.downbad@gmail.com> (for serious stuff)

### Support

Need help? Don't ask us...

(just kidding)

---

## ⚠️ Disclaimer

This is a memecoin. It's meant to be fun, not financial advice.

- **DYOR** (Do Your Own Research) - We're not financial advisors
- **Never invest more than you can afford to lose** - Seriously, don't be stupid
- **This is not a get-rich-quick scheme** - It's a get-poor-quick scheme with style
- **Past performance does not guarantee future results** - Especially for memecoins

---

## 🎯 Roadmap

### Phase 1: Launch (Q2 2025)

- [x] Smart contract development
- [x] Frontend development
- [x] Presale launch
- [ ] Mainnet deployment

### Phase 2: Growth (Q3 2025)

- [ ] DEX integration
- [ ] Cross-chain bridges
- [ ] Community governance
- [ ] More memes

### Phase 3: World Domination (Q4 2025+)

- [ ] Moon landing
- [ ] Lambo purchases
- [ ] Touch grass (optional)
- [ ] Repeat

---

## In a world full of rugs, be the rope 🪢
