// SPDX-License-Identifier: MIT

pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract WarrantyNFT is ERC721 {
    uint256 public objectCounter;
    struct BuyerData {
        uint256 objectId;
        string objectName;
        uint256 warrantyPeriod;
        uint256 startDate;
        uint256 endDate;
        uint256 price;
    }
    mapping(address => uint256[]) public trackBuyers;
    mapping(uint256 => string) public trackTokenURI;
    mapping(uint256 => BuyerData[]) public trackData;

    constructor() public ERC721("Warranty", "WRTY") {
        objectCounter = 0;
    }

    function recordSales(
        string memory _objectName,
        uint256 _warrantyPeriod,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _price,
        address _customer
    ) public {
        BuyerData memory buyer;
        buyer.objectId = objectCounter;
        buyer.objectName = _objectName;
        buyer.warrantyPeriod = _warrantyPeriod;
        buyer.startDate = _startDate;
        buyer.endDate = _endDate;
        buyer.price = _price;
        trackData[objectCounter].push(buyer);
        trackBuyers[_customer].push(objectCounter);
    }

    function setNFTWarranty(string memory tokenURI, address _customer) public {
        uint256 objectId = objectCounter;
        _safeMint(_customer, objectId);
        _setTokenURI(objectId, tokenURI);
        trackTokenURI[objectId] = tokenURI;
        objectCounter = objectCounter + 1; // Increment object ID
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }

    function returnWarrantyEnd(address _customer, uint256 _objectId)
        public
        view
        returns (uint256)
    {
        uint256[] memory objects = trackBuyers[_customer];
        int256 flag = 0;
        for (uint256 i = 0; i < objects.length; i = i + 1) {
            if (objects[i] == _objectId) {
                flag = 1;
                break;
            }
        }
        if (flag == 1)
            return
                trackData[_objectId][trackData[_objectId].length - 1].endDate;
        else return 0;
    }

    function buyerToBuyerSales(
        address _from,
        address _to,
        uint256 _tokenId,
        uint256 _buyingDate,
        uint256 _price
    ) public {
        safeTransferFrom(_from, _to, _tokenId);
        uint256[] memory objects = trackBuyers[_from];
        for (uint256 i = 0; i < objects.length; i = i + 1) {
            if (objects[i] == _tokenId) {
                delete trackBuyers[_from][i];
                break;
            }
        }
        trackBuyers[_to].push(_tokenId);
        BuyerData memory oldBuyer = trackData[_tokenId][
            trackData[_tokenId].length - 1
        ];
        BuyerData memory newBuyer;
        newBuyer.objectId = oldBuyer.objectId;
        newBuyer.objectName = oldBuyer.objectName;
        newBuyer.warrantyPeriod = oldBuyer.warrantyPeriod;
        newBuyer.startDate = _buyingDate;
        newBuyer.endDate = oldBuyer.endDate;
        newBuyer.price = _price;
        trackData[_tokenId].push(newBuyer);
    }

    function returnOwner(uint256 _tokenId, address _customer)
        public
        view
        returns (bool)
    {
        address owner = ownerOf(_tokenId);
        return owner == _customer;
    }

    function returnBill(uint256 _tokenId, address _customer)
        public
        view
        returns (
            string memory,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        BuyerData memory b = trackData[_tokenId][
            trackData[_tokenId].length - 1
        ];
        return (
            b.objectName,
            b.startDate,
            b.endDate,
            b.warrantyPeriod,
            b.price
        );
    }

    function expired(uint256 _tokenId, address _customer)
        public
        payable
        returns (bool)
    {
        if (returnOwner(_tokenId, _customer)) {
            _burn(_tokenId);
            return true;
        } else return false;
    }
}
