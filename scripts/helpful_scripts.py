from brownie import (
    network,
    accounts,
    config
)
import os
from datetime import date
from dateutil.relativedelta import relativedelta

RARIBLE_FORMAT = "https://testnet.rarible.com/token/{}:{}"
NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS = [
    "hardhat", "development", "ganache"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS + [
    "mainnet-fork",
    "binance-fork",
    "matic-fork",
]


def get_account(index=None, id=None, address="address_1", privateKey=None):
    if privateKey:
        return accounts.add(privateKey)
    if index:
        return accounts[index]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    if id:
        return accounts.load(id)
    if network.show_active() in config["networks"]:
        return accounts.add(config["wallets"]["from_key"][address])

    return None


def get_publish_source():
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS or not os.getenv(
        "ETHERSCAN_TOKEN"
    ):
        return False
    else:
        return True


def getDateInt(exp=None):
    if exp:
        formattedDate = date.today()+relativedelta(month=+exp)
    else:
        formattedDate = date.today()

    strDate = str(formattedDate)
    oldLiDate = strDate.split('-')
    liDate = [int(i) for i in oldLiDate]
    inc = 100**2
    intDate = 0
    for i in liDate:
        intDate += i*inc
        inc /= 100

    Date = int(intDate)
    return Date
