import "../styles/globals.css"
import Head from "next/head"
import { createClient, chain, configureChains, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { MoralisProvider } from "react-moralis"

const { chains, provider, webSocketProvider } = configureChains(
    [chain.localhost, chain.rinkeby, chain.hardhat],
    [publicProvider()]
)

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
})

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
                <WagmiConfig client={client}>
                    <Component {...pageProps} />
                </WagmiConfig>
            </MoralisProvider>
        </>
    )
}

export default MyApp
