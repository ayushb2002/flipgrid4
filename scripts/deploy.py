from brownie import WarrantyNFT, accounts, config, network
from flask import Flask,jsonify,request
from flask_cors import CORS, cross_origin
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
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
#deployeraddress='0x133aFe86B6cB9fEc747A45e1420F50db6149947a'
#=========================================================
@app.route("/")
@cross_origin()
def hello_world():
    r={'abcd':3434,'(423423,123123)':True}
    notmain()
    return jsonify(r)
@app.route("/check/<int:id>/<string:xyz>")
def check(id,xyz):
    print (id,xyz)
    return str(id)+xyz
@app.route("/checkOwner/<string:userwallet>/<string:tokenid>")#completed
def owns(userwallet,tokenid):
    returning={'result':str(isOwner(userwallet,tokenid))}
    return jsonify(returning)
@app.route("/checkWarranty/<string:userwallet>/<string:tokenid>")#completed
def isExistwarranty(userwallet,tokenid):
    tf,message=expire(customer=userwallet, tokenId=tokenid)
    return jsonify({'result':tf,'message':message})
@app.route("/List",methods=['POST'])
def upload():
    imagefile =request.files.get('file')
    imagefile.save(imagefile.filename)
    imagefilepath=imagefile.filename
    name=request.form.get('Product') +' | '+request.form.get('Serial number')
    description=request.form.get('Description')

    trait={'Product':request.form.get('Product'),
        'Serial number':request.form.get('Serial number'),
        'Product type':request.form.get('Product type'),
        'Seller':request.form.get('Seller'),
        'Manufacturer':request.form.get('Manufacturer'),
        'Price':request.form.get('Price'),
        'Country  of origin':request.form.get('Country  of origin'),
        'Warranty Period(in months)':request.form.get('Warranty Period(in months)')
    }
    pvtkey=request.form.get('pvtkey')
    uri=save_uploaded_ipfs_link(imageFile=imagefilepath, name=name, description=description, trait=trait,address=pvtkey)
    print(uri)
    return jsonify({"result":uri})
@app.route("/sale/<string:cust>/<int:expiry>/<int:price>/<string:name>/<string:privateKey>/<string:address>",methods=['POST'])
def newsale(cust, expiry, price, name,  privateKey, address):
    print(privateKey)
    ipfs=request.form.get('ipfs')
    tokenId,link=deploy_seller_to_buyer_transaction(cust, expiry=expiry, price=price, name=name, ipfs=ipfs, privateKey=privateKey, address=address)
    return jsonify({"token":tokenId,'NFT':link})
#=========================================================
def main():
    
    app.run(debug=True)
def notmain():
    # test_pinata_and_ipfs()
    add_pk = "address_1"
    privateKey =' 0x11d53eaacb4f33eefe35f6ee4a36bd2bff73d096a6e5c6c232cf26b32213280c'
    #WarrantyNFT.deploy({"from" :get_account(address=add_pk)})
    tokenId,link = deploy_seller_to_buyer_transaction(
        customerAddress, expiry=24, price=40000, name=items_for_sale[1], ipfs=items_for_sale_address[1],privateKey=privateKey, address=add_pk)
    bill(objectId=tokenId, address=add_pk)
    # buyerToBuyer(customerAddress, customerAddress2,
    #              tokenId, 10000, address="address_1")
    # bill(objectId=tokenId, address="address_2")
    # res = expire(warranty=warranty, customer=customerAddress, tokenId=0)
    # print(res)

#=========================================================
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


def deploy_seller_to_buyer_transaction(customerAddress, expiry=12, price=20000, name=None, ipfs=None, privateKey=None, address="address_1"):#address is of seller
    if not name or not ipfs or not privateKey:
        print('hehehehe')
        return False
    
   
    account = get_account(address='0x11d53eaacb4f33eefe35f6ee4a36bd2bff73d096a6e5c6c232cf26b32213280c')
    startDate = getDateInt()
    endDate = getDateInt(expiry)
    if WarrantyNFT == []:
        warranty_nft = WarrantyNFT.deploy(
            {"from": account})  # , publish_source=get_publish_source())
    else:
        warranty_nft = WarrantyNFT[-1]
    print(1)
    sales_id_tx = warranty_nft.recordSales(
        name, expiry, startDate, endDate, price, customerAddress, {"from": account})
    print(2)
    sales_id_tx.wait(1)

    token_id = warranty_nft.objectCounter()

    assignWarranty_tx = warranty_nft.setNFTWarranty(
        ipfs, customerAddress, {"from": account})
    assignWarranty_tx.wait(1)

    link = set_tokenURI(token_id, warranty_nft,
                        warranty_nft.trackTokenURI(token_id), privateKey)

    print(f"Bill number {token_id} confirmed! Warranty has been generated!")
    return token_id,link


def set_tokenURI(token_id, nft_contract, tokenURI, privateKey):#get pvt key of buyer
    dev = accounts.add(privateKey)
    nft_contract.setTokenURI(token_id, tokenURI, {"from": dev})
    link = "https://testnet.rarible.com/token/polygon/" + \
        str(nft_contract.address)+":"+str(token_id)
    print(f"Awesome! You can view your NFT at {link}")
    print('Please give up to 20 minutes, and hit the "refresh metadata" button')
    return link


def buyerToBuyer(_from, _to, _tokenId, price=20000, address="address_1"):#from and address is , of seller
    if WarrantyNFT == []:
        return False
    else:
        warranty_nft = WarrantyNFT[-1]
    account = get_account(address=address)
    date_of_purchase = getDateInt()
    tx = warranty_nft.buyerToBuyerSales(
        _from, _to, _tokenId, date_of_purchase, price, {"from": account})
    tx.wait(1)
    if isOwner(_to, _tokenId, address="address_2"):#_to and address is same, of the owner 
        print("Successfully Transferred!")
        return True
    else:
        print("Could not be transferred!")
        return False


def isOwner(customer, objectId, address="address_1"):#customer,tokenid,contract deployer address
    try:
        if WarrantyNFT == []:
            return False
        else:
            warranty = WarrantyNFT[-1]
        return warranty.returnOwner(objectId, customer, {"from": get_account(address=address)})
    except:
        return False

def bill(objectId, address="address_1"):#new owner/BUyer when bought
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


def expire(customer=customerAddress, tokenId=None, address="address_1"):#address and customer are same

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
        return False,"Warranty expired or warranty does not exist (Token Number might not exist)!"
    else:
        if getDateInt() >= warranty_end:
            warranty.expired(tokenId, customer, {
                             "from": get_account(address=address)})
            print(
                f"Warranty end date was {returnDateFromInt(warranty_end)}. The warranty has expired. The NFT has been burnt!")
            return False,f"Warranty end date was {returnDateFromInt(warranty_end)}. The warranty has expired. The NFT has been burnt!"
        else:
            print(
                f"Warranty expiry date is {returnDateFromInt(warranty_end)}. You can still claim the warranty!")
            return True,f"Warranty expiry date is {returnDateFromInt(warranty_end)}. You can still claim the warranty!"


def save_uploaded_ipfs_link(imageFile=None, name=None, description=None, trait: dict = None, address="address_1"):#address is of sellers
    if not imageFile or not name or not description or not trait:
        
        return False

    try:
        warranty = WarrantyNFT[-1]
    except:

        return False

    image_uri = upload_to_ipfs(imageFile)
    # print(get_account(address=address),'hahahaha')
    tx = warranty.incrementIPFS({"from": accounts.add(address)})
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
    # pinata_url = "https://api.pinata.cloud/pinning/pinByHash"
    # payload = json.dumps({
    #     "hashToPin": ipfs_hash,
    #     "options": {
    #         "name": f"Object - {objectId}",
    #         "pinataMetadata": jsonObject
    #     }
    # })
    # headers = {
    #     'Content-Type': 'application/json',
    #     'pinata_api_key': config["pinata"]["api_key"],
    #     'pinata_secret_api_key': config["pinata"]["secret"]
    # }

    # #print(payload)
    # response = requests.request(
    #     "POST", pinata_url, headers=headers, data=payload)

    # #print(response.text)
    return json_uri