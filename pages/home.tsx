import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import React, { useEffect } from 'react'
import { Button, Divider } from '@mui/material'

export default function Home() {
  const [count, setCount] = React.useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem("test");
    setCount(stored ? JSON.parse(stored) : 0);
}, [0, "test"]);

  const inc = (event) => {
    setCount(count + 1);
    localStorage.setItem("test", JSON.stringify(count + 1));
  };
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Graph And Chart Maker</title>
        <meta name="description" content="Make your own graphs, charts, or plots!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p>Your projects will appear here</p>
        <br/>
        <br/>
        <Button onClick={inc} variant='contained'>
          Click Me!
        </Button>
        <h2>{count}</h2>
      </main>
    </div>
  )
}
