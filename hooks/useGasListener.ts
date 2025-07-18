// hooks/useGasListener.ts

import { useEffect, useRef } from "react";
import { useGasStore } from "@/store/gasStore";

export const useGasListener = () => {
  const ws = useRef<WebSocket | null>(null);
  const setGas = useGasStore((s) => s.setGas);
  const setError = useGasStore((s) => s.setError);
  const setLoading = useGasStore((s) => s.setLoading);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_ETH_WSS;

    if (!url) {
      setError("Missing Ethereum WebSocket URL");
      return;
    }

    setLoading(true);
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      const payload = {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_subscribe",
        params: ["newPendingTransactions"],
      };
      ws.current?.send(JSON.stringify(payload));
    };

    ws.current.onmessage = async (message) => {
      const data = JSON.parse(message.data);

      if (data.method === "eth_subscription" && data.params?.result) {
        try {
          const txHash = data.params.result;

          const txPayload = {
            jsonrpc: "2.0",
            id: 2,
            method: "eth_getTransactionByHash",
            params: [txHash],
          };

          ws.current?.send(JSON.stringify(txPayload));
        } catch (err) {
          console.error("Gas listener error:", err);
          setError("Gas listener parsing error");
        }
      } else if (data.result?.gasPrice) {
        const gasPriceGwei = parseInt(data.result.gasPrice, 16) / 1e9;
        setGas({ gasPriceGwei });
        setLoading(false);
      }
    };

    ws.current.onerror = (err) => {
      setError("WebSocket error");
      console.error(err);
    };

    return () => {
      ws.current?.close();
    };
  }, [setGas, setError, setLoading]);
};
