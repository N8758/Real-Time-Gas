/**
 * Converts sqrtPriceX96 from Uniswap to ETH/USD price.
 * Formula: (sqrtPriceX96 / 2^96)^2
 */
export const sqrtPriceX96ToUsd = (sqrtPriceX96: bigint): number => {
  const Q96 = BigInt(2) ** BigInt(96);
  const sqrt = Number(sqrtPriceX96);
  const price = (sqrt / Number(Q96)) ** 2;
  return parseFloat(price.toFixed(6));
};
