export interface ChainData {
  id: number;
  name: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  logoURI?: string;
}

export interface GasPoint {
  timestamp: number;      // Unix timestamp in ms
  gasUsed: number;        // Total gas units used
  gasPrice: number;       // Gwei
  ethPrice: number;       // USD
}
