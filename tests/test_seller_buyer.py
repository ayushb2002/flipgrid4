import pytest
from scripts.deploy import items_for_sale, items_for_sale_address
from scripts.helpful_scripts import get_account
from brownie import WarrantyNFT


def test_buyer_can_buy_from_seller():
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
