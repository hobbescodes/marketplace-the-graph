import { ConnectButton } from "web3uikit"
import Link from "next/link"
import truncateStr from "../utils/truncateHash"

const Header = () => {
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
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}

export default Header
