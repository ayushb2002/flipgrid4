from brownie import WarrantyNFT, accounts, config
from scripts.helpful_scripts import get_account, get_publish_source, RARIBLE_FORMAT, getDateInt

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

customerAddress = config["wallets"]["address_1"]
customerAddress2 = config["wallets"]["address_2"]


def main():
    warranty = deploy_seller_to_buyer_transaction(customerAddress)
    bill(warranty=warranty, objectId=0,
         customer=customerAddress, address="address_1")
    buyerToBuyer(customerAddress, customerAddress2, 0,
                 warranty, 10000, address="address_1")
    bill(warranty=warranty, objectId=0,
         customer=customerAddress2, address="address_2")


def deploy_seller_to_buyer_transaction(customerAddress, address="address_1"):
    privateKey = config["wallets"]["from_key"][address]
    i = 0  # Item index selected for sale!
    account = get_account(address=address)
    expiry = 12
    startDate = getDateInt()
    endDate = getDateInt(expiry)
    price = 20000
    warranty_nft = WarrantyNFT.deploy(
        {"from": account}, publish_source=get_publish_source())
    sales_id_tx = warranty_nft.recordSales(
        items_for_sale[i], expiry, startDate, endDate, price, customerAddress, {"from": account})
    sales_id_tx.wait(1)

    token_id = warranty_nft.objectCounter()

    assignWarranty_tx = warranty_nft.setNFTWarranty(
        items_for_sale_address[i], customerAddress, {"from": account})
    assignWarranty_tx.wait(1)

    link = set_tokenURI(token_id, warranty_nft,
                        warranty_nft.trackTokenURI(token_id), privateKey)

    print(f"Bill number {token_id} confirmed! Warranty has been generated!")
    return warranty_nft


def set_tokenURI(token_id, nft_contract, tokenURI, privateKey):
    dev = accounts.add(privateKey)
    nft_contract.setTokenURI(token_id, tokenURI, {"from": dev})
    link = "https://testnet.rarible.com/token/" + \
        str(nft_contract.address)+":"+str(token_id)
    print(f"Awesome! You can view your NFT at {link}")
    print('Please give up to 20 minutes, and hit the "refresh metadata" button')
    return link


def buyerToBuyer(_from, _to, _tokenId, warranty_nft, price, address="address_1"):
    account = get_account(address=address)
    date_of_purchase = getDateInt()
    tx = warranty_nft.buyerToBuyerSales(
        _from, _to, _tokenId, date_of_purchase, price, {"from": account})
    tx.wait(1)
    if isOwner(_to, _tokenId, warranty_nft):
        print("Successfully Transferred!")
        return True
    else:
        print("Could not be transferred!")
        return False


def isOwner(customer, objectId, warranty, address="address_1"):
    return warranty.returnOwner(objectId, customer, {"from": get_account(address=address)})


def bill(warranty, objectId, customer, address="address_1"):
    objectName, start, end, period, price = warranty.returnBill(
        objectId, customer, {"from": get_account(address=address)})

    print(f"Object Name - {objectName}")
    print(f"Object Warranty Start Date (for the current owner) - {start}")
    print(f"Object Warranty Period (overall) - {period}")
    print(f"Object Warranty End Period (overall) - {end}")
    print(f"Object Price (for the current user) - {price}")
