import type { NextApiRequest, NextApiResponse } from 'next'
import { BigNumber, ethers } from 'ethers'
import { calculateGasInUsd } from '@/utils/gasCalculator'

type SimRequest = { ethAmount: string; slippage: string }
type SimResponse = { outputAmount: string } | { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SimResponse>
) {
  try {
    if (req.method !== 'POST') throw new Error('Only POST allowed')

    const { ethAmount, slippage } = req.body as SimRequest

    if (!ethAmount || isNaN(Number(ethAmount))) throw new Error('Invalid ETH amount')
    if (!slippage || isNaN(Number(slippage))) throw new Error('Invalid slippage')

    const ethAmt = parseFloat(ethAmount)
    const slippagePct = parseFloat(slippage)

    // Dummy quote logic: assume 1 ETH = 3000 USDC
    const quoteUsd = ethAmt * 3000
    const slippageFactor = 1 - slippagePct / 100
    const output = quoteUsd * slippageFactor

    // Simple gas cost estimate at 30 Gwei and $3000/ETH
    const gasCostUsd = calculateGasInUsd(21000, 30, 3000)

    return res.status(200).json({ outputAmount: (output - gasCostUsd).toFixed(2) })
  } catch (err: any) {
    console.error('Simulate error:', err)
    return res.status(400).json({ error: err.message ?? 'Simulation failed' })
  }
}
