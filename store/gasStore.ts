// store/gasStore.ts

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type GasData = {
  gasPriceGwei: number;        // Current gas price in Gwei
  ethUsd: number | null;       // Optional ETH price in USD
  lastUpdated: string | null;  // Timestamp
};

type GasStore = {
  gas: GasData;
  loading: boolean;
  error: string | null;

  setGas: (data: Partial<GasData>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

export const useGasStore = create<GasStore>()(
  devtools((set) => ({
    gas: {
      gasPriceGwei: 0,
      ethUsd: null,
      lastUpdated: null,
    },
    loading: false,
    error: null,

    setGas: (data) =>
      set((state) => ({
        gas: {
          ...state.gas,
          ...data,
          lastUpdated: new Date().toISOString(),
        },
        error: null,
      })),
      
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    reset: () =>
      set({
        gas: {
          gasPriceGwei: 0,
          ethUsd: null,
          lastUpdated: null,
        },
        loading: false,
        error: null,
      }),
  }))
);
