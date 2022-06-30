import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"
import Image from "next/image"
import { Card, useNotification } from "web3uikit"
import { ethers } from "ethers"
import truncateStr from "../utils/truncateHash"
import UpdateListingModal from "./UpdateListingModal"

const NftCard = ({ nftAddress, price, seller, tokenId, marketplaceAddress }) => {
    const [imageUri, setImageUri] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [description, setDescription] = useState("")
    const { isWeb3Enabled, account } = useMoralis()
    const isOwnedByUser = seller == account || seller == undefined
    const sellerAddress = isOwnedByUser ? "you" : truncateStr(seller || "", 11)
    const [openModal, setOpenModal] = useState(false)

    const dispatch = useNotification()
    const hideModal = () => setOpenModal(false)

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    const { runContractFunction: buyItem } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "buyItem",
        msgValue: price,
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    })

    const updateUI = async () => {
        const tokenURI = await getTokenURI()
        if (tokenURI) {
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const tokenURIResponse = await (await fetch(requestURL)).json()
            console.log(tokenURIResponse)
            setTokenName(tokenURIResponse.name)
            setDescription(tokenURIResponse.description)
            const imageURI = tokenURIResponse.image
            const imageURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            setImageUri(imageURL)
        }
    }

    const handleCardClick = () => {
        isOwnedByUser
            ? setOpenModal(true)
            : buyItem({
                  onError: (error) => console.log(error),
                  onSuccess: handleBuyItemSuccess,
              })
    }

    const handleBuyItemSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "Item bought!",
            title: "Item Bought",
            position: "topR",
        })
    }

    useEffect(() => {
        updateUI()
    }, [isWeb3Enabled])

    return (
        <div>
            <div className="w-72">
                {imageUri ? (
                    <div>
                        <UpdateListingModal
                            nftAddress={nftAddress}
                            tokenId={tokenId}
                            isVisible={openModal}
                            marketplaceAddress={marketplaceAddress}
                            onClose={hideModal}
                        />
                        <Card
                            title={tokenName}
                            description={description}
                            onClick={handleCardClick}
                        >
                            <div className="p-2">
                                <div className="flex flex-col items-center gap-2">
                                    <div>#{tokenId}</div>
                                    <div className="italic text-sm">Owned by: {sellerAddress}</div>
                                    <Image src={imageUri} width={200} height={200} />
                                    <div className="font-bold">
                                        {ethers.utils.formatUnits(price, "ether")} ETH
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default NftCard
