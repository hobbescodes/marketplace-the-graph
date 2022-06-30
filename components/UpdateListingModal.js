import { Input, Modal, useNotification } from "web3uikit"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import { ethers } from "ethers"
import { useState } from "react"

const UpdateListingModal = ({ nftAddress, tokenId, isVisible, marketplaceAddress, onClose }) => {
    const [updatedPrice, setUpdatedPrice] = useState(0)
    console.log(updatedPrice)

    const handleCloseOrCancel = () => {
        setUpdatedPrice(0)
        onClose()
    }

    const dispatch = useNotification()

    const { runContractFunction: updateListing } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.utils.parseEther(updatedPrice || "0"),
        },
    })

    const handleUpdatedListingSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: `Listing has been updated to ${updatedPrice} ETH`,
            title: "Listing Updated (Refresh & Move Blocks)",
            position: "topR",
        })
        handleCloseOrCancel()
    }

    return (
        <Modal
            isVisible={isVisible}
            onCancel={handleCloseOrCancel}
            onCloseButtonPressed={handleCloseOrCancel}
            onOk={() => {
                updateListing({
                    onError: (error) => {
                        console.log(error)
                    },
                    onSuccess: handleUpdatedListingSuccess,
                })
            }}
        >
            <Input
                label="Update listing price"
                name="New listing price"
                type="number"
                onChange={(event) => {
                    setUpdatedPrice(event.target.value)
                }}
            />
        </Modal>
    )
}

export default UpdateListingModal
