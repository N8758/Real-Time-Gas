// components/forms/SimulationForm.tsx
'use client'
import { useState } from 'react'
import styles from './SimulationForm.module.css'

type FormData = { ethAmount: string; slippage: string }

export default function SimulationForm() {
  const [formData, setFormData] = useState<FormData>({ ethAmount: '', slippage: '0.5' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if ('error' in data) throw new Error(data.error)

      setResult(`You’ll receive approximately ${data.outputAmount} USDC`)
    } catch (err: any) {
      setError(err.message || 'Simulation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Simulate Swap</h2>
      <label className={styles.label}>
        ETH Amount
        <input
          type="number"
          name="ethAmount"
          value={formData.ethAmount}
          onChange={handleChange}
          required
          placeholder="e.g. 0.5"
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Slippage Tolerance (%)
        <input
          type="number"
          step="0.1"
          name="slippage"
          value={formData.slippage}
          onChange={handleChange}
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Simulating...' : 'Simulate'}
      </button>
      {result && <p className={styles.success}>{result}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  )
}
