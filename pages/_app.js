import '../tree.css'
import '../styles/globals.css'
import Header from '../components/Header'
import Head from 'next/head'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <>

    <Head>
      <title>polbac</title>


    </Head>
    <Header />
    <main><Component {...pageProps} /></main>
    <link href="/fonts3/stylesheet.css" rel="stylesheet" />

    <footer className="social">
      <a href="https://www.linkedin.com/in/polbac/">lkd</a>
      <a href="mailto:polbac@gmail.com">@</a>
      <a href="https://www.instagram.com/polbac_______/">ig</a>
    </footer>
    <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap" rel="stylesheet"></link>
  </>
}