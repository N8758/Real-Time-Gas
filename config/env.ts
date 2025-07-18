// config/env.ts

function getEnvVar(name: string, required = true): string | undefined {
  const value = process.env[name];
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ENV = {
  NODE_ENV: getEnvVar("NODE_ENV", false) || "development",
  ETH_WSS: getEnvVar("NEXT_PUBLIC_ETH_WSS"),
  UNISWAP_POOL: getEnvVar("NEXT_PUBLIC_UNISWAP_POOL"),
  ALCHEMY_KEY: getEnvVar("NEXT_PUBLIC_ALCHEMY_KEY", false),
  APP_NAME: getEnvVar("NEXT_PUBLIC_APP_NAME", false) || "Gas Tracker",
  SENTRY_DSN: getEnvVar("NEXT_PUBLIC_SENTRY_DSN", false),
  LOG_LEVEL: getEnvVar("NEXT_PUBLIC_LOG_LEVEL", false) || "info",
};
