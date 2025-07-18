// utils/fetchGasData.ts
import axios from 'axios'
import { useGasStore } from '@/store/useGasStore'

export const fetchGasData = async (chainId: string) => {
  try {
    const res = await axios.get(`/api/gas?chainId=${chainId}`)
    const gasPoints = res.data // should be GasPoint[]
    useGasStore.getState().setGasData(chainId, gasPoints)
  } catch (error) {
    console.error('Failed to fetch gas data:', error)
  }
}
