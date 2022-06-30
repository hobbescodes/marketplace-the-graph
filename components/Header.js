import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import Link from "next/link"

const Header = () => {
    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()

    return (
        <nav className="p-5 border-b-2 flex justify-between">
            <h1 className="p-4 font-bold text-3xl">NFT Marketplace</h1>
            <div className="flex items-center justify-between space-x-4">
                <Link href="/">
                    <a className="font-semibold">Home</a>
                </Link>
                <Link href="/sellnft">
                    <a className="font-semibold">Sell NFTs</a>
                </Link>
                {isConnected ? (
                    <button
                        className="py-1 px-2 rounded-md bg-blue-50 text-blue-500"
                        onClick={() => disconnect()}
                    >
                        {ensName ?? address}
                    </button>
                ) : (
                    <button
                        className="py-1 px-2 rounded-md bg-blue-50 text-blue-500"
                        onClick={() => connect()}
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Header
