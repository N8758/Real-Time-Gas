"use client";

import React from "react";
import styles from "./ChainGasTable.module.css";

type GasData = {
  chain: string;
  symbol: string;
  gasPriceGwei: number;
  estimatedCostUSD: number;
};

const mockData: GasData[] = [
  { chain: "Ethereum", symbol: "ETH", gasPriceGwei: 34, estimatedCostUSD: 2.38 },
  { chain: "Polygon", symbol: "MATIC", gasPriceGwei: 0.3, estimatedCostUSD: 0.01 },
  { chain: "Binance Smart Chain", symbol: "BNB", gasPriceGwei: 2.5, estimatedCostUSD: 0.08 },
  { chain: "Arbitrum", symbol: "ETH", gasPriceGwei: 0.8, estimatedCostUSD: 0.05 },
  { chain: "Optimism", symbol: "ETH", gasPriceGwei: 0.9, estimatedCostUSD: 0.06 },
];

const ChainGasTable: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📊 Live Chain Gas Tracker</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>🔗 Chain</th>
            <th>⛽ Gas Price (Gwei)</th>
            <th>💰 Est. Cost (USD)</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((row, idx) => (
            <tr key={idx}>
              <td>{row.chain}</td>
              <td>{row.gasPriceGwei.toFixed(2)} {row.symbol}</td>
              <td>${row.estimatedCostUSD.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChainGasTable;
