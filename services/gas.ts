import { ethers } from 'ethers';
import { CHAIN_CONFIG } from '@/config/chains';

type GasData = {
  chainId: number;
  gasPrice: number;
  timestamp: number;
};

export const fetchGasData = async (): Promise<GasData[]> => {
  const gasResults: GasData[] = [];

  for (const chainId in CHAIN_CONFIG) {
    const { rpcUrl } = CHAIN_CONFIG[parseInt(chainId)];
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const gasPrice = await provider.getGasPrice();
      gasResults.push({
        chainId: parseInt(chainId),
        gasPrice: Number(gasPrice),
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error(`Failed to fetch gas for chain ${chainId}`, error);
    }
  }

  return gasResults;
};
