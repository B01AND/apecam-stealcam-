// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-contracts/contracts/utils/Counters.sol";

contract HistoryCam is ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    uint256 lastMintedBlock;

    mapping(uint256 => uint256) public prevPrice;

    constructor() ERC721("HistoryCam", "HCAM") {}

    function mint(address recipient, string memory _tokenURI) public returns (uint256) {
        require(lastMintedBlock < block.number);

        _tokenIds.increment();

        uint256 newId = _tokenIds.current();
        _mint(recipient, newId);
        _setTokenURI(newId, _tokenURI);
        lastMintedBlock = block.number;
        prevPrice[newId] = 1000000000000000;

        return newId;
    }

    function steal(uint256 tokenId) public payable {
        address owner = ownerOf(tokenId);
        require(msg.sender != owner, "cannot steal from yourself");
        require(msg.value > prevPrice[tokenId], "must pay more than previous person to steal");

        _transfer(owner, msg.sender, tokenId);
        _transferFund(payable(owner), msg.value);

        prevPrice[tokenId] = msg.value;
    }

    function _transferFund(address payable to, uint256 amount) internal {
        if (amount == 0) {
            return;
        }
        require(to != address(0));

        (bool transferSent,) = to.call{value: amount}("");
        require(transferSent, "Failed to send ETH");
    }

    function getOwnedTokenIds(address wallet) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(wallet);
        uint256[] memory ids = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            ids[i] = IERC721Enumerable(this).tokenOfOwnerByIndex(wallet, i);
        }
        return ids;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }
}
