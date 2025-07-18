// pages/_app.tsx
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

// ✅ Only global CSS should be imported here
import '@/styles/globals.css'
import '@/styles/theme.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = stored || (prefersDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  return <Component {...pageProps} />
}
