import { useEffect } from "react";
import { useGasStore } from "@/store/gasStore";
import { JsonRpcProvider, Contract } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import IUniswapV3PoolABI from "@/abis/IUniswapV3Pool.json";

export const useUniswapPrice = () => {
  const setGas = useGasStore((s) => s.setGas);
  const setError = useGasStore((s) => s.setError);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const rpcUrl = process.env.NEXT_PUBLIC_ETH_WSS;
        const poolAddress = process.env.NEXT_PUBLIC_UNISWAP_POOL;

        if (!rpcUrl || !poolAddress) {
          throw new Error("Missing RPC URL or Uniswap pool address");
        }

        const provider = new JsonRpcProvider(
          rpcUrl.replace("wss://", "https://")
        );

        const poolContract = new Contract(poolAddress, IUniswapV3PoolABI, provider);

        const [slot0, token0Addr, token1Addr, fee, liquidity] =
          await Promise.all([
            poolContract.slot0(),
            poolContract.token0(),
            poolContract.token1(),
            poolContract.fee(),
            poolContract.liquidity(),
          ]);

        const Token0 = new Token(1, token0Addr, 18, "ETH");
        const Token1 = new Token(1, token1Addr, 6, "USDC");

        const pool = new Pool(
          Token0,
          Token1,
          fee,
          slot0.sqrtPriceX96.toString(),
          liquidity.toString(),
          slot0.tick
        );

        const price = pool.token0Price;
        const ethUsd = parseFloat(price.toSignificant(6));
        setGas({ ethUsd });
      } catch (err) {
        console.error("Uniswap fetch error:", err);
        setError("Failed to fetch Uniswap ETH price");
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // refresh every 30 s

    return () => clearInterval(interval);
  }, [setGas, setError]);
};
