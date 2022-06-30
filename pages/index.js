import { useMoralisQuery } from "react-moralis"
import NftCard from "../components/NftCard"

const Home = () => {
    // TODO: add pagination with .skip
    const { data: listedNfts, isLoading: fetchingListedNfts } = useMoralisQuery(
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    )

    return (
        <div className="container mx-auto">
            <h1 className="p-4 font-bold text-2xl">Recently Listed</h1>
            {fetchingListedNfts ? (
                <div>Loading...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listedNfts.map((nft, index) => {
                        const { marketplaceAddress, nftAddress, price, seller, tokenId } =
                            nft.attributes
                        console.log(tokenId)
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
