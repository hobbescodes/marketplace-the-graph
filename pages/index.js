import { useQuery } from "@apollo/client"
import { useMoralis } from "react-moralis"
import NftCard from "../components/NftCard"
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"

const Home = () => {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]

    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

    return (
        <div className="container mx-auto">
            <h1 className="p-4 font-bold text-2xl">Recently Listed</h1>
            {loading || !listedNfts ? (
                <div>Loading...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listedNfts.activeItems.map((nft, index) => {
                        const { nftAddress, price, seller, tokenId } = nft
                        // console.log(nft)
                        return (
                            <div key={index} className="mx-auto">
                                <NftCard
                                    nftAddress={nftAddress}
                                    price={price}
                                    seller={seller}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                />
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Home
