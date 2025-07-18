// layout/Header.tsx

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <span>🚀 Gas Tracker</span>
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><Link href="/">Dashboard</Link></li>
          <li><Link href="/history">History</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
