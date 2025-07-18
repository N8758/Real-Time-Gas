import React, { useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

// Components
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import CandlestickChart from '../components/charts/CandlestickChart';
import SimulationForm from '../components/forms/SimulationForm';
import ChainGasTable from '../components/tables/ChainGasTable';

// Store
import { useGasStore } from '../store/useGasStore';

const HomePage: React.FC = () => {
  const { gasData, fetchGasData, loading } = useGasStore();

  useEffect(() => {
    fetchGasData();
  }, [fetchGasData]);

  return (
    <>
      <Head>
        <title>Gas Tracker Dashboard</title>
        <meta name="description" content="Track gas fees and Uniswap pool data in real-time" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />

        <div className={styles.container}>
          <h1 className={styles.title}>Gas Tracker Dashboard</h1>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}></h2>
            <SimulationForm />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}></h2>
            {loading ? <Loader /> : <ChainGasTable data={gasData} />}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}></h2>
            <CandlestickChart />
          </section>

          {/* <section className={styles.section}>
            <Card title="Need more?">
              <p>Track individual transactions and optimize your costs.</p>
              <Button label="Learn More" onClick={() => alert('Coming soon!')} />
            </Card>
          </section> */}
        </div>
      </main>
    </>
  );
};

export default HomePage;
