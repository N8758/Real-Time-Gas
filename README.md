# ⛽ Gas Tracker – Real-Time ETH Gas & Uniswap Pool Tracker

Track Ethereum gas prices and real-time swaps on the Uniswap ETH-USDC pool using WebSocket and visualize data with beautiful UI cards and charts.



## 🚀 Features

- 🧠 **Live WebSocket Data**: Connects to Uniswap pool for real-time swaps.
- 📈 **Gas Info Cards**: Visualizes safe, propose, and fast gas metrics.
- 📊 **Candlestick Chart**: Shows real-time swap trends over time.
- ⚡ **Lightweight & Fast**: Built with modern Next.js App Router and Zustand.
- 🎯 **Production Ready**: Optimized CSS Modules, clean state management.

---

## 🛠 Tech Stack

| Category      | Stack                          |
|---------------|-------------------------------|
| Frontend      | Next.js 15.4.1 (App Router)   |
| Styling       | CSS Modules (no Tailwind)     |
| State         | Zustand                        |
| WebSocket     | Ethereum + Uniswap Pools       |
| Charting      | Recharts                       |
| Language      | TypeScript                     |

---

## 📁 Folder Structure

```

gas-tracker/
├── app/
│   ├── page.tsx               # Homepage (Gas Cards + Chart)
│   └── layout.tsx             # Global layout
├── components/
│   ├── GasCard.tsx            # Gas info card UI
│   ├── PriceChart.tsx         # Candlestick chart
│   └── SwapTable.tsx          # Latest swaps table
├── store/
│   └── useGasStore.ts         # Zustand store for global state
├── utils/
│   └── websocket.ts           # WebSocket connection logic
├── styles/
│   └── globals.css
│   └── GasCard.module.css
│   └── PriceChart.module.css
│   └── SwapTable.module.css
├── public/
│   └── favicon.ico
│   └── screenshot.png
├── tsconfig.json
├── package.json
└── README.md

````

---

## 📦 Installation

1. **Clone the repo**

```bash
git clone https://github.com/your-username/gas-tracker.git
cd gas-tracker
````

2. **Install dependencies**

```bash
npm install
```

3. **Run locally**

```bash
npm run dev
```

App will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🔧 Configuration

No .env needed unless you’re customizing RPCs or APIs. WebSocket endpoint is hardcoded to:

```
wss://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
```

> Replace with your Alchemy WebSocket key if needed inside `utils/websocket.ts`.

---

## 📤 Deployment

### 🟣 Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect your GitHub repo
4. Click “Deploy”

That’s it! Live in 60 seconds.

---

## ✅ Assignment Expectations Covered

| Requirement                        | Fulfilled ✅ |
| ---------------------------------- | ----------- |
| Real-time WebSocket connection     | ✅ Yes       |
| Zustand for state management       | ✅ Yes       |
| ETH-USDC Uniswap pool tracking     | ✅ Yes       |
| Gas data cards (Safe/Propose/Fast) | ✅ Yes       |
| Chart/Candlestick visualizations   | ✅ Yes       |
| Clean UI (no Tailwind)             | ✅ Yes       |
| Modern Next.js with App Router     | ✅ Yes       |
| Modular file structure             | ✅ Yes       |
| Deployment ready                   | ✅ Yes       |
| Scalable & readable codebase       | ✅ Yes       |


