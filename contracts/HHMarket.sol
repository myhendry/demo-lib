//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// security against transactions for multiple requests - double spent
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HHMarket is ReentrancyGuard {
	using Counters for Counters.Counter;

	/* 
	number of items minting, number of transactions, tokens that have not been sold
	keep track of tokens total number - tokenId, 
	arrays need to know the length - help to keep track of array
	*/

	Counters.Counter private _listingItemsCount;
	Counters.Counter private _listingItemsSold;

	// determine who is the owner of the contract
	// charge a listing fee so the owner makes a commission

	address payable owner;

	// we are deploying to MATIC API. It is the same as use Ethereum
	// they both have 18 decimals

	// listing fee charged by owner of marketplace
	uint256 listingPrice = 0.045 ether;

	constructor() {
		// set the owner
		owner = payable(msg.sender);
	}

	// structs can act like object
	struct ListingItem {
		uint itemId;
		address nftContract;
		uint256 nftTokenId;
		address payable seller;
		address payable owner;
		uint256 price;
		bool sold;
	}

	// tokenId return which marketToken - fetch which one it is
	mapping(uint256 => ListingItem) private IdToListingItem;

	// listen to events from front end applications
	event emitListingItem (
		uint indexed itemId,
		address indexed nftContract,
		uint256 indexed nftTokenId,
		address seller,
		address owner,
		uint256 price,
		bool sold
	);

	// to be called by minter aka seller
	// get the listing price
	function getListingPrice() public view returns(uint256) {
		return listingPrice;
	} 

	/*
		two functions to interact with contract
		1. create a market item to put it for sale
		2. create a market sale for buying and selling between parties
	*/
	function mintListingItem(
		address nftContract,
		uint nftTokenId, // what tokenId is this?
		uint price
	) public payable nonReentrant {
		// nonReentrant is a modifier to prevent reentry attack
		require(price > 0, "Price must be at least one wei");
		require(msg.value == listingPrice, "Price must be equal to listing price");

		// not zero based index
		_listingItemsCount.increment();
		uint itemId = _listingItemsCount.current();

		// putting it up for sale
		IdToListingItem[itemId] = ListingItem(
			itemId,			// what is this itemId? - listingId
			nftContract,
			nftTokenId, 		// what is this tokenId?
			payable(msg.sender), 	// seller
			payable(address(0)), 	// owner
			price,
			false
		);
		
		// NFT Transaction
		// TransferFrom: Pass NFTToken from Seller to HHMarket
		IERC721(nftContract).transferFrom(msg.sender, address(this), nftTokenId);

		emit emitListingItem (
			itemId,
			nftContract,
			nftTokenId,
			msg.sender,
			address(0),
			price,
			false
		);
	}

	// to be called by buyer
	// function to conduct transactions and market sales
	// PARAMS: nftContract, itemId, { msg.value }
	function createMarketSale(address nftContract, uint itemId) public payable nonReentrant {
			uint price = IdToListingItem[itemId].price;
			uint nftTokenId = IdToListingItem[itemId].nftTokenId;

			require(msg.value == price, "Please submit the asking price in order to continue");

			// transfer amount to seller
			IdToListingItem[itemId].seller.transfer(msg.value);
			// transfer the token from contract address to the buyer
			// TransferFrom: Pass NFTToken from HHMarket to Buyer
			IERC721(nftContract).transferFrom(address(this), msg.sender, nftTokenId);
			IdToListingItem[itemId].owner = payable(msg.sender);
			IdToListingItem[itemId].sold = true;
			// increase number of tokens sold
			_listingItemsSold.increment();
			
			// transfer 0.045 ether to owner of HHMarket 
			payable(owner).transfer(listingPrice);
	}

	// function to fetch market items - minting, buying and selling
	// return the number of unsold items
	function fetchUnsoldListingItems() public view returns(ListingItem[] memory) {
		uint itemCount = _listingItemsCount.current();
		uint unsoldItemCount = _listingItemsCount.current() - _listingItemsSold.current();
		uint currentIndex = 0;

		// looping over the number of items created (if number has not been sold populate the array)
		ListingItem[] memory items = new ListingItem[](unsoldItemCount);

		for(uint i = 0; i < itemCount; i++) {
			if (IdToListingItem[i + 1].owner == address(0)) {
				uint currentId = i + 1;
				ListingItem storage currentItem = IdToListingItem[currentId];
				items[currentIndex] = currentItem;
				currentIndex += 1;

			}
		}
		return items;
	}

	// return nfts that the BUYER has purchased
	function fetchMyNFTs() public view returns(ListingItem[] memory) {
		uint totalItemCount = _listingItemsCount.current();
		// a second counter for each individual user
		uint itemCount = 0;
		uint currentIndex = 0;

		for (uint i = 0; i < totalItemCount; i++) {
			if (IdToListingItem[i + 1].owner == msg.sender) {
				itemCount += 1;
			}
		}

		// second loop to loop through the amount you have purchased with itemcount
		// check to see if the owner address is equal to msg.sender
		ListingItem[] memory items = new ListingItem[](itemCount);

		for (uint i = 0; i < totalItemCount; i++) {
			if (IdToListingItem[i + 1].owner == msg.sender) {
				uint currentId = IdToListingItem[i + 1].itemId;
				// current array
				ListingItem storage currentItem = IdToListingItem[currentId];
				items[currentIndex] = currentItem;
				currentIndex += 1;
			}
		} 
		return items;
	}

	// function for returning an array of minted NFTs by SELLER
	function fetchItemsMinted() public view returns(ListingItem[] memory) {
		uint totalItemCount = _listingItemsCount.current();
		uint itemCount = 0;
		uint currentIndex = 0;

		for (uint i = 0; i < totalItemCount; i++) {
			if (IdToListingItem[i + 1].seller == msg.sender) {
				itemCount += 1;
			}
		}

		ListingItem[] memory items = new ListingItem[](itemCount);

		for (uint i = 0; i < totalItemCount; i++) {
		if (IdToListingItem[i + 1].seller == msg.sender) {
			uint currentId = IdToListingItem[i + 1].itemId;
			ListingItem storage currentItem = IdToListingItem[currentId];
			items[currentIndex] = currentItem;
			currentIndex += 1;
		}
	}

		return items;

	}
}

