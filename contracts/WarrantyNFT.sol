// SPDX-License-Identifier: MIT

pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract WarrantyNFT is ERC721 {
    uint256 public objectCounter;
    struct BuyerData {
        uint256 objectId;
        string objectName;
        uint256 warrantyPeriod;
        uint256 startDate;
        uint256 endDate;
    }
    mapping(address => BuyerData) trackBuyers;

    constructor() public ERC721("Warranty", "WRTY") {
        objectCounter = 1;
    }

    function recordSales(
        string memory _objectName,
        uint256 _warrantyPeriod,
        uint256 _startDate,
        uint256 _endDate
    ) public returns (uint256) {
        BuyerData memory buyer;
        buyer.objectId = objectCounter;
        buyer.objectName = _objectName;
        buyer.warrantyPeriod = _warrantyPeriod;
        buyer.startDate = _startDate;
        buyer.endDate = _endDate;
        trackBuyers[msg.sender] = buyer;
        return objectCounter;
    }

    function setNFTWarranty(string memory tokenURI) public {
        address buyer = msg.sender;
        uint256 objectId = objectCounter;
        _safeMint(buyer, objectId);
        _setTokenURI(objectId, tokenURI);
        objectCounter = objectCounter + 1; // Increment object ID
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }
}
