// components/charts/CandlestickChart.tsx
'use client'

import React, { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
} from 'recharts'
import axios from 'axios'
import styles from './CandlestickChart.module.css'

interface CandlestickData {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
}

const CandlestickChart: React.FC = () => {
  const [data, setData] = useState<CandlestickData[]>([])

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get('/api/chart')
        setData(res.data)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }

    fetchChartData()
    const interval = setInterval(fetchChartData, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.chartWrapper}>
      <h2 className={styles.title}>ETH / USDC Live Candlestick</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tick={{ fill: '#fff', fontSize: 12 }} />
          <YAxis domain={['auto', 'auto']} tick={{ fill: '#fff', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: '6px' }}
            labelStyle={{ color: '#00ffcc' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="low" stackId="a" fill="#ff4c4c" />
          <Bar dataKey="high" stackId="a" fill="#4caf50" />
          <Line type="monotone" dataKey="open" stroke="#ffa726" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="close" stroke="#29b6f6" dot={false} strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CandlestickChart
