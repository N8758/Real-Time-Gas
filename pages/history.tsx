// pages/history.tsx

import dynamic from 'next/dynamic';
import Head from 'next/head';
import styles from '../styles/History.module.css';
import { useEffect, useState } from 'react';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type CandleData = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type GasTrend = {
  time: string;
  gasPrice: number;
};

type Volatility = {
  time: string;
  value: number;
};

export default function HistoryPage() {
  const [candleSeries, setCandleSeries] = useState<any[]>([]);
  const [gasSeries, setGasSeries] = useState<any[]>([]);
  const [volatilitySeries, setVolatilitySeries] = useState<any[]>([]);
  const [avgGas, setAvgGas] = useState<number>(0);

  useEffect(() => {
    const mockCandles: CandleData[] = [
      { time: '2024-07-14', open: 3030, high: 3100, low: 3020, close: 3085 },
      { time: '2024-07-15', open: 3085, high: 3115, low: 3050, close: 3060 },
      { time: '2024-07-16', open: 3060, high: 3090, low: 3005, close: 3015 },
      { time: '2024-07-17', open: 3015, high: 3045, low: 2980, close: 2990 },
    ];

    const mockGas: GasTrend[] = [
      { time: '2024-07-14', gasPrice: 35 },
      { time: '2024-07-15', gasPrice: 50 },
      { time: '2024-07-16', gasPrice: 42 },
      { time: '2024-07-17', gasPrice: 48 },
    ];

    const mockVolatility: Volatility[] = mockCandles.map((item) => ({
      time: item.time,
      value: Math.abs(item.high - item.low),
    }));

    const avg = mockGas.reduce((sum, g) => sum + g.gasPrice, 0) / mockGas.length;
    setAvgGas(avg);

    setCandleSeries([
      {
        data: mockCandles.map((item) => ({
          x: item.time,
          y: [item.open, item.high, item.low, item.close],
        })),
      },
    ]);

    setGasSeries([
      {
        name: 'Gas Price (Gwei)',
        data: mockGas.map((item) => ({
          x: item.time,
          y: item.gasPrice,
        })),
      },
    ]);

    setVolatilitySeries([
      {
        name: 'Volatility Index',
        data: mockVolatility.map((item) => ({
          x: item.time,
          y: item.value,
        })),
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Gas Tracker | Historical Analytics</title>
        <meta name="description" content="Historical ETH/USDC chart, gas trend, and volatility index" />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.title}>📊 ETH Historical Analytics</h1>

        <div className={styles.summaryBox}>
          <p><strong>📆 Period:</strong> Last 4 Days</p>
          <p><strong>⛽ Avg Gas:</strong> {avgGas.toFixed(2)} Gwei</p>
          <p><strong>📈 Data Source:</strong> Mock dataset</p>
        </div>

        <section className={styles.chartBox}>
          <h2>💹 ETH/USDC Candlestick Chart</h2>
          <ApexChart
            type="candlestick"
            height={350}
            options={{
              chart: { id: 'candles', toolbar: { show: true }, background: 'transparent' },
              xaxis: { type: 'category' },
              yaxis: { tooltip: { enabled: true } },
            }}
            series={candleSeries}
          />
        </section>

        <section className={styles.chartBox}>
          <h2>⛽ Gas Price Trend</h2>
          <ApexChart
            type="area"
            height={300}
            options={{
              chart: { id: 'gas-line', toolbar: { show: true }, background: 'transparent' },
              xaxis: { type: 'category' },
              yaxis: { title: { text: 'Gas (Gwei)' } },
              fill: { gradient: { enabled: true } },
            }}
            series={gasSeries}
          />
        </section>

        <section className={styles.chartBox}>
          <h2>📉 Volatility Index</h2>
          <ApexChart
            type="bar"
            height={250}
            options={{
              chart: { id: 'volatility', toolbar: { show: false }, background: 'transparent' },
              xaxis: { type: 'category' },
              yaxis: { title: { text: 'Volatility (High - Low)' } },
              plotOptions: { bar: { borderRadius: 6 } },
              colors: ['#FF5F6D'],
            }}
            series={volatilitySeries}
          />
        </section>
      </main>
    </>
  );
}
