from datetime import datetime
from brownie import WarrantyNFT, accounts


def main():
    account = accounts[0]
    warranty_nft = WarrantyNFT.deploy({"from": account})
    sales_id_tx = warranty_nft.recordSales(
        "Fridge", 12, 1, 2, {"from": account})
    sales_id_tx.wait(1)
    print(warranty_nft.objectCounter())
