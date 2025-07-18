// pages/api/chart.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const mockData = [
      {
        timestamp: '12:00',
        open: 1800,
        high: 1820,
        low: 1790,
        close: 1810,
      },
      {
        timestamp: '12:01',
        open: 1810,
        high: 1830,
        low: 1805,
        close: 1825,
      },
      {
        timestamp: '12:02',
        open: 1825,
        high: 1835,
        low: 1815,
        close: 1820,
      },
    ]

    res.status(200).json(mockData)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching chart data' })
  }
}
