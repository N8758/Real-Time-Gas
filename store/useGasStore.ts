import { create } from 'zustand';

export interface GasPoint {
  timestamp: number;
  gasPrice: number;
}

interface GasStoreState {
  gasData: Record<string, GasPoint[]>;
  loading: boolean;
  fetchGasData: () => Promise<void>;
  setGasData: (chainId: string, data: GasPoint[]) => void;
  getLatestGas: (chainId: string) => GasPoint | null;
  resetGasData: () => void;
}

export const useGasStore = create<GasStoreState>((set, get) => ({
  gasData: {},
  loading: false,

  setGasData: (chainId, data) =>
    set((state) => ({
      gasData: {
        ...state.gasData,
        [chainId]: data,
      },
    })),

  getLatestGas: (chainId) => {
    const chainData = get().gasData[chainId];
    if (!chainData || chainData.length === 0) return null;
    return chainData[chainData.length - 1];
  },

  resetGasData: () => set(() => ({ gasData: {} })),

  fetchGasData: async () => {
    set({ loading: true });

    try {
      // 🔁 Add more chains if needed
      const chainIds = ['1']; // Ethereum Mainnet as example
      const fetchedData: Record<string, GasPoint[]> = {};

      for (const chainId of chainIds) {
        const res = await fetch(`/api/gas?chainId=${chainId}`);
        const json = await res.json();

        fetchedData[chainId] = json.gasPoints;
      }

      set({ gasData: fetchedData });
    } catch (err) {
      console.error('Failed to fetch gas data:', err);
    } finally {
      set({ loading: false });
    }
  },
}));
