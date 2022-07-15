from brownie import WarrantyNFT, accounts, config
from scripts.helpful_scripts import get_account, get_publish_source, OPENSEA_FORMAT

items_for_sale = [
    "Air Conditioner",
    "Microwave",
    "Refrigerator"
]

items_for_sale_address = [
    "https://ipfs.io/ipfs/QmT6LuFNWUB2r2y22XBDuWkt82nb7RuXTjYTeeCRJw22Pq?filename=air_conditioner.json",
    "https://ipfs.io/ipfs/QmWexXsvnp7iSeJbh9C2Np3ehCJdELQETfCc7EmoutzPAN?filename=microwave.json",
    "https://ipfs.io/ipfs/QmYH7G6epLpv15BE5B2656pbC168yDpwcQgmrThe5CtoYn?filename=refridgerator.json"
]


def main():
    deploy_seller_to_buyer_transaction()


def deploy_seller_to_buyer_transaction():
    i = 0  # Item index selected for sale!
    account = get_account()
    warranty_nft = WarrantyNFT.deploy(
        {"from": account}, publish_source=get_publish_source())
    sales_id_tx = warranty_nft.recordSales(
        items_for_sale[i], 12, 1, 2, {"from": account})
    sales_id_tx.wait(1)

    token_id = warranty_nft.objectCounter()

    assignWarranty_tx = warranty_nft.setNFTWarranty(
        items_for_sale_address[i], {"from": account})
    assignWarranty_tx.wait(1)

    set_tokenURI(token_id, warranty_nft, warranty_nft.trackTokenURI(token_id))
    print(f"Bill number {token_id} confirmed! Warranty has been generated!")


def set_tokenURI(token_id, nft_contract, tokenURI):
    dev = accounts.add(config["wallets"]["from_key"])
    nft_contract.setTokenURI(token_id, tokenURI, {"from": dev})
    print(
        "Awesome! You can view your NFT at {}".format(
            OPENSEA_FORMAT.format(nft_contract.address, token_id)
        )
    )
    print('Please give up to 20 minutes, and hit the "refresh metadata" button')
