/**
 * Abbreviates large numbers with suffixes (K, M, B)
 * e.g., 1234567 -> 1.23M
 */
export const formatNumber = (value: number, decimals = 2): string => {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let tier = Math.floor(Math.log10(Math.abs(value)) / 3);
  tier = Math.min(tier, suffixes.length - 1);
  const scaled = value / Math.pow(10, tier * 3);
  return scaled.toFixed(decimals) + suffixes[tier];
};

/**
 * Formats a number as currency (e.g., $1,234.56)
 */
export const formatUsd = (amount: number): string =>
  `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/**
 * Converts Gwei to ETH
 */
export const gweiToEth = (gwei: number): number => gwei / 1e9;

/**
 * Formats a timestamp to human-readable time
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour12: false });
};
