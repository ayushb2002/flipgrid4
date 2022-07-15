from datetime import datetime
import pytest
from scripts.deploy import deploy_seller_to_buyer_transaction, items_for_sale, items_for_sale_address
from scripts.helpful_scripts import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS, getDateInt
from brownie import WarrantyNFT, network


def test_buyer_can_buy_from_seller():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local blockchain environment!")
    warranty = WarrantyNFT.deploy({"from": get_account()})
    recordSales_tx = warranty.recordSales(
        items_for_sale[0], 12, 1, 2, {"from": get_account()})
    recordSales_tx.wait(1)
    assert warranty.objectCounter() == 0
    setWarranty_tx = warranty.setNFTWarranty(
        items_for_sale_address[0], {"from": get_account()})
    setWarranty_tx.wait(1)
    assert warranty.objectCounter() == 1
    assert warranty.trackTokenURI(0) == items_for_sale_address[0]


def test_warranty_expiry():
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for testnet/mainnet!")
    warranty = deploy_seller_to_buyer_transaction()
    expiry = warranty.returnWarrantyEnd({"from": get_account()})
    today = getDateInt()
    expired = False
    if today > expiry:
        expired = True

    assert expired == False
