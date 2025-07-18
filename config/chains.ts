// config/chains.ts

export type ChainInfo = {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  explorer: string;
  nativeCurrency: string;
};

export const CHAINS: Record<string, ChainInfo> = {
  ethereum: {
    id: 1,
    name: "Ethereum Mainnet",
    symbol: "ETH",
    rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY", // You can override from .env if needed
    explorer: "https://etherscan.io",
    nativeCurrency: "ETH",
  },
  polygon: {
    id: 137,
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://polygon-rpc.com",
    explorer: "https://polygonscan.com",
    nativeCurrency: "MATIC",
  },
  arbitrum: {
    id: 42161,
    name: "Arbitrum One",
    symbol: "ETH",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    explorer: "https://arbiscan.io",
    nativeCurrency: "ETH",
  },
  optimism: {
    id: 10,
    name: "Optimism",
    symbol: "ETH",
    rpcUrl: "https://mainnet.optimism.io",
    explorer: "https://optimistic.etherscan.io",
    nativeCurrency: "ETH",
  },
  base: {
    id: 8453,
    name: "Base",
    symbol: "ETH",
    rpcUrl: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    nativeCurrency: "ETH",
  },
};

export const getChainInfoById = (chainId: number): ChainInfo | undefined => {
  return Object.values(CHAINS).find((chain) => chain.id === chainId);
};
