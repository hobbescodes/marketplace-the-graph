import "../styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"

const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>NFT Marketplace</title>
                <meta name="description" content="NFT Marketplace" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider appId={appId} serverUrl={serverUrl}>
                <Header />
                <Component {...pageProps} />
            </MoralisProvider>
        </>
    )
}

export default MyApp
