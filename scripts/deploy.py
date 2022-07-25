from brownie import WarrantyNFT, accounts, config, network
from scripts.helpful_scripts import get_account, get_publish_source, getDateInt, returnDateFromInt, upload_to_ipfs
import json
import requests
import os
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
    # test_pinata_and_ipfs()
    # retrieve_pinata()
    add_pk = "address_1"
    tokenId = deploy_seller_to_buyer_transaction(
        customerAddress, expiry=24, price=40000, name=items_for_sale[1], ipfs=items_for_sale_address[1], address=add_pk)
    bill(objectId=tokenId, address=add_pk)
    # buyerToBuyer(customerAddress, customerAddress2,
    #              tokenId, 10000, address="address_1")
    # bill(objectId=tokenId, address="address_2")
    # res = expire(warranty=warranty, customer=customerAddress, tokenId=0)
    # print(res)


def retrieve_pinata():
    url = "https://api.pinata.cloud/pinning/pinJobs?status=retrieving&sort=ASC"

    payload = {}
    headers = {
        'pinata_api_key': config["pinata"]["api_key"],
        'pinata_secret_api_key': config["pinata"]["secret"]
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    print(response.text)
    return True


def test_pinata_and_ipfs():
    imageFile = './metadata/img/laptop.png'
    name = 'Laptop'
    description = 'Lenovo Legion Y540 Gaming Laptop'
    trait = {
        "Battery Backup": "100"
    }

    uri = save_uploaded_ipfs_link(
        imageFile=imageFile, name=name, description=description, trait=trait)
    print(uri)


def deploy_seller_to_buyer_transaction(customerAddress, expiry=12, price=20000, name=None, ipfs=None, address="address_1"):
    if not name or not ipfs:
        return False
    privateKey = config["wallets"]["from_key"][address]
    i = 2  # Item index selected for sale!
    account = get_account(address=address)
    startDate = getDateInt()
    endDate = getDateInt(expiry)
    if WarrantyNFT == []:
        warranty_nft = WarrantyNFT.deploy(
            {"from": account})  # , publish_source=get_publish_source())
    else:
        warranty_nft = WarrantyNFT[-1]
    sales_id_tx = warranty_nft.recordSales(
        name, expiry, startDate, endDate, price, customerAddress, {"from": account})
    sales_id_tx.wait(1)

    token_id = warranty_nft.objectCounter()

    assignWarranty_tx = warranty_nft.setNFTWarranty(
        ipfs, customerAddress, {"from": account})
    assignWarranty_tx.wait(1)

    link = set_tokenURI(token_id, warranty_nft,
                        warranty_nft.trackTokenURI(token_id), privateKey)

    print(f"Bill number {token_id} confirmed! Warranty has been generated!")
    return token_id


def set_tokenURI(token_id, nft_contract, tokenURI, privateKey):
    dev = accounts.add(privateKey)
    nft_contract.setTokenURI(token_id, tokenURI, {"from": dev})
    link = "https://testnet.rarible.com/token/polygon/" + \
        str(nft_contract.address)+":"+str(token_id)
    print(f"Awesome! You can view your NFT at {link}")
    print('Please give up to 20 minutes, and hit the "refresh metadata" button')
    return link


def buyerToBuyer(_from, _to, _tokenId, price=20000, address="address_1"):
    if WarrantyNFT == []:
        return False
    else:
        warranty_nft = WarrantyNFT[-1]
    account = get_account(address=address)
    date_of_purchase = getDateInt()
    tx = warranty_nft.buyerToBuyerSales(
        _from, _to, _tokenId, date_of_purchase, price, {"from": account})
    tx.wait(1)
    if isOwner(_to, _tokenId, address="address_2"):
        print("Successfully Transferred!")
        return True
    else:
        print("Could not be transferred!")
        return False


def isOwner(customer, objectId, address="address_1"):
    if WarrantyNFT == []:
        return False
    else:
        warranty = WarrantyNFT[-1]
    return warranty.returnOwner(objectId, customer, {"from": get_account(address=address)})


def bill(objectId, address="address_1"):
    if WarrantyNFT == []:
        return False
    else:
        warranty = WarrantyNFT[-1]

    objectName, start, end, period, price = warranty.returnBill(
        objectId, {"from": get_account(address=address)})

    print(f"Object Name - {objectName}")
    print(
        f"Object Warranty Start Date (for the current owner) - {returnDateFromInt(start)}")
    print(f"Object Warranty Period (overall) - {period}")
    print(f"Object Warranty End Period (overall) - {returnDateFromInt(end)}")
    print(f"Object Price (for the current user) - {price}")
    return (objectName, returnDateFromInt(start), period, returnDateFromInt(end), price)


def expire(customer=customerAddress, tokenId=None, address="address_1"):

    if WarrantyNFT == []:
        return False
    else:
        warranty = WarrantyNFT[-1]

    if not tokenId:
        print("Bill number is required to fetch details!")
        return False

    warranty_end = warranty.returnWarrantyEnd(
        customer, tokenId, {"from": get_account(address=address)})

    if warranty_end == 0:
        print("Warranty expired or warranty does not exist (Bill Number might not exist)!")
        return False
    else:
        if getDateInt() >= warranty_end:
            warranty.expired(tokenId, customer, {
                             "from": get_account(address=address)})
            print(
                f"Warranty end date was {returnDateFromInt(warranty_end)}. The warranty has expired. The NFT has been burnt!")
            return False
        else:
            print(
                f"Warranty expiry date is {returnDateFromInt(warranty_end)}. You can still claim the warranty!")
            return True


def save_uploaded_ipfs_link(imageFile=None, name=None, description=None, trait: dict = None, address="address_1"):
    if not imageFile or not name or not description or not trait:
        return False

    try:
        warranty = WarrantyNFT[-1]
    except:
        return False

    image_uri = upload_to_ipfs(imageFile)
    tx = warranty.incrementIPFS({"from": get_account(address=address)})
    tx.wait(1)
    objectId = warranty.ipfsCounter()
    #json_path = f".\metadata\json\object-{objectId}.json"
    jsonObject = {
        "name": name,
        "description": description,
        "image_uri": image_uri,
        "attributes": trait
    }

    jsonFile = json.dumps(jsonObject)

    ipfs_url = "http://127.0.0.1:5001"
    endpoint = "/api/v0/add"
    response = requests.post(
        ipfs_url + endpoint, files={"file": jsonFile})
    ipfs_hash = response.json()["Hash"]
    filename = f'object-{objectId}.json'
    json_uri = f"https://ipfs.io/ipfs/{ipfs_hash}?filename={filename}"

    print(ipfs_hash)
    pinata_url = "https://api.pinata.cloud/pinning/pinByHash"
    payload = json.dumps({
        "hashToPin": ipfs_hash,
        "options": {
            "name": f"Object - {objectId}",
            "pinataMetadata": jsonObject
        }
    })
    headers = {
        'Content-Type': 'application/json',
        'pinata_api_key': config["pinata"]["api_key"],
        'pinata_secret_api_key': config["pinata"]["secret"]
    }

    print(payload)
    response = requests.request(
        "POST", pinata_url, headers=headers, data=payload)

    print(response.text)
    return json_uri
