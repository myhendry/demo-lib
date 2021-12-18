//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
	// counters for keeping track of tokenIds
	using Counters for Counters.Counter;
	
	Counters.Counter private _nftTokenCount;

	// address of marketplace for NFTs to interact
	address contractAddress;	

	// giv the NFT market the ability to transact with tokens
	// setApprovalForAll allows us to do that with contract address
	constructor(address marketplaceAddress) ERC721("HushHush", "HH") {
		contractAddress = marketplaceAddress;
	}

	/*
		link nftId to caller and tokenURI
		caller ^ nftId
		tokenURI ^ nftId
	*/
	function mintToken(string memory  tokenURI) public returns(uint) {
		_nftTokenCount.increment();
		uint256 newNFTId = _nftTokenCount.current();
		// caller : nftId
		_mint(msg.sender, newNFTId); // virtual inside ERC721.sol
		// tokenURI : nftId 
		_setTokenURI(newNFTId, tokenURI);	// virtual inside ERC721URIStorage.sol
		// give the marketplace to approval to transact between users
		setApprovalForAll(contractAddress, true);  // virtual inside ERC721.sol
		// mint the token and set it for sale - return the id to do so
		return newNFTId;
	}
}