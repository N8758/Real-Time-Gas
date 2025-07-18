import { Interface, Log } from 'ethers';
import { getEnv } from '@/config/env';

const UNISWAP_POOL = getEnv('NEXT_PUBLIC_UNISWAP_POOL');

const SWAP_ABI = [
  'event Swap(address indexed sender,address indexed recipient,int256 amount0,int256 amount1,uint160 sqrtPriceX96,uint128 liquidity,int24 tick)'
];

const iface = new Interface(SWAP_ABI);

type SwapLog = {
  sender: string;
  recipient: string;
  amount0: string;
  amount1: string;
  price: number;
  timestamp: number;
};

export const parseSwapLog = (log: Log): SwapLog | null => {
  try {
    if (log.address.toLowerCase() !== UNISWAP_POOL.toLowerCase()) return null;

    const parsed = iface.parseLog(log);
    const { sender, recipient, amount0, amount1, sqrtPriceX96 } = parsed.args;

    const price = Math.pow(Number(sqrtPriceX96) / 2 ** 96, 2);

    return {
      sender,
      recipient,
      amount0: amount0.toString(),
      amount1: amount1.toString(),
      price,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('❌ Failed to parse Uniswap log:', error);
    return null;
  }
};
