// hooks/useUniswapPrice.ts

import { useEffect } from "react";
import { useGasStore } from "@/store/gasStore";
import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token, Price } from "@uniswap/sdk-core";
import IUniswapV3PoolABI from "@/abis/IUniswapV3Pool.json";

export const useUniswapPrice = () => {
  const setGas = useGasStore((s) => s.setGas);
  const setError = useGasStore((s) => s.setError);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_ETH_WSS?.replace("wss://", "https://")
        );

        const poolAddress = process.env.NEXT_PUBLIC_UNISWAP_POOL;

        if (!poolAddress) {
          throw new Error("Missing Uniswap pool address");
        }

        const poolContract = new ethers.Contract(
          poolAddress,
          IUniswapV3PoolABI,
          provider
        );

        const [slot0, token0, token1, fee, liquidity] = await Promise.all([
          poolContract.slot0(),
          poolContract.token0(),
          poolContract.token1(),
          poolContract.fee(),
          poolContract.liquidity(),
        ]);

        const TokenA = new Token(1, token0, 18, "ETH");
        const TokenB = new Token(1, token1, 6, "USDC");

        const pool = new Pool(
          TokenA,
          TokenB,
          fee,
          slot0.sqrtPriceX96.toString(),
          liquidity.toString(),
          slot0.tick
        );

        const price = pool.token0Price;
        const ethUsd = parseFloat(price.toSignificant(6));
        setGas({ ethUsd });
      } catch (err) {
        console.error("Uniswap price fetch error:", err);
        setError("Failed to fetch Uniswap ETH price");
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, [setGas, setError]);
};
