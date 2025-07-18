import { GasPoint } from './chain';

export interface PriceState {
  token: string;
  network: string;
  ethPrice: number;
  gasPrice: number;
  isLoading: boolean;
  lastUpdated: number;
  history: GasPoint[];

  setToken: (token: string) => void;
  setNetwork: (network: string) => void;
  setEthPrice: (price: number) => void;
  setGasPrice: (gwei: number) => void;
  setLoading: (status: boolean) => void;
  setHistory: (points: GasPoint[]) => void;
}
