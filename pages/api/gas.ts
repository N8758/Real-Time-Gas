import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { chainId } = req.query

  const data = [
    { timestamp: Date.now() - 120000, gasPrice: 32 },
    { timestamp: Date.now() - 60000, gasPrice: 30 },
    { timestamp: Date.now(), gasPrice: 35 },
  ]

  res.status(200).json(data)
}
