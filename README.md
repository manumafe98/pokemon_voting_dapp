# 🗳️ Pokémon Voting Dapp

A decentralized application (DApp) built on the Sepolia Ethereum testnet that allows users to vote for their favorite Pokémon! Users register with their wallet, name, and a profile image (IPFS hash), and can cast **one vote** for any Pokémon in the list. The DApp includes admin features for the contract owner to add new Pokémon with their image and name.

🔗 **Deployed Contract on Sepolia**: [0x7930bc98156049DBdF30Ba03a4968263568B5629](https://sepolia.etherscan.io/address/0x7930bc98156049DBdF30Ba03a4968263568B5629#code)

---

## 🛠️ Features

### 👥 Voter Flow

- Connect your wallet (must support Sepolia testnet).
- Register with:
  - Your wallet address (must match the connected wallet).
  - Your name.
  - An image uploaded to IPFS (via hash).
- Vote for **one** Pokémon (only once per voter).

### 🔐 Admin Functionality

- Only the **contract owner** (deployer wallet) can:
  - Add new Pokémon entries.
  - Each Pokémon requires:
    - A name.
    - An image uploaded to IPFS (via hash).

### 🧠 Smart Contract Logic

- Enforces:
  - Single vote per registered voter.
  - Only registered users can vote.
  - Only wallet owners can register themselves.
- Stores voter and Pokémon data including votes and IPFS image hashes.

---

## 💻 Technologies Used

### 📦 Smart Contract

- **Solidity** (v0.8.28)
- **Hardhat** for development, testing, and deployment

### 🖥️ Frontend

- **React**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **TypeScript**
- **Ethers.js** (Ethereum interaction)
