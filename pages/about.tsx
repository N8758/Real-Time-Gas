// pages/about.tsx
import styles from '../styles/About.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>About Gas Tracker</h1>
        <p className={styles.tagline}>
          A real-time dashboard for Ethereum gas prices & Uniswap pool data.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>🚀 What is Gas Tracker?</h2>
        <p className={styles.text}>
          Gas Tracker gives you real-time insight into Ethereum gas prices and the ETH-USDC Uniswap v3 pool. Built for developers, traders, and DeFi users to optimize smart contract deployments and swaps.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>🛠 Tech Stack Used</h2>
        <ul className={styles.list}>
          <li>Next.js (App Router, TypeScript)</li>
          <li>Zustand for state management</li>
          <li>WebSockets for real-time data</li>
          <li>Custom CSS Modules for styling (no Tailwind)</li>
          <li>Uniswap V3 SDK + ETH Gas APIs</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>📡 Live Data Sources</h2>
        <p className={styles.text}>
          Data is streamed live via WebSockets from the Ethereum mempool and the Uniswap V3 pool smart contracts. No delays, no guessing.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>👨‍💻 Meet the Builder</h2>
        <p className={styles.text}>
          I'm Nilesh Pulate — a passionate full-stack developer who builds real-world crypto apps with real-time systems, decentralized data, and clean UI/UX. I love Web3, analytics, and solving complex engineering problems.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>🧭 What’s Next?</h2>
        <ul className={styles.list}>
          <li>📊 Historical gas fee visualization</li>
          <li>📉 Predictive models using ML for gas forecast</li>
          <li>🧪 Custom token pool tracker</li>
          <li>📤 Export analytics as CSV / PDF</li>
        </ul>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaHeading}>✨ Start exploring now!</h2>
        <p className={styles.text}>Get live Ethereum gas data and stay ahead in DeFi.</p>
      </section>
    </div>
  );
}
