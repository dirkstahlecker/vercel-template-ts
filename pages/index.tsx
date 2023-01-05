import MainApp from "../components/MainApp";
import React from 'react';
import Head from 'next/head'

export default function Home()
{
  return <>
    <Head>
      <title>Journal Word Frequencies</title>
    </Head>
    <React.StrictMode>
      <MainApp/>
    </React.StrictMode>
  </>
}
