import { WebSocketProvider, ethers } from 'ethers';
import { getEnv } from '@/config/env';

const ETH_WSS_URL = getEnv('NEXT_PUBLIC_ETH_WSS');

let provider: WebSocketProvider;

export const getEthWsProvider = (): WebSocketProvider => {
  if (!provider) {
    provider = new ethers.WebSocketProvider(ETH_WSS_URL);
    provider._websocket.on('close', () => {
      console.warn('🔁 WebSocket closed. Reconnecting...');
      provider = new ethers.WebSocketProvider(ETH_WSS_URL);
    });
  }
  return provider;
};
