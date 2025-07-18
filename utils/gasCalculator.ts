/**
 * Calculates USD gas cost.
 *
 * @param gasUsed - Total gas used in units (e.g. 21000)
 * @param gasPrice - Gas price in gwei (e.g. 35)
 * @param ethPrice - ETH/USD price (e.g. 3450.50)
 */
export const calculateGasInUsd = (
  gasUsed: number,
  gasPrice: number,
  ethPrice: number
): number => {
  const ethUsed = (gasUsed * gasPrice) / 1e9;
  const usdCost = ethUsed * ethPrice;
  return parseFloat(usdCost.toFixed(4));
};
