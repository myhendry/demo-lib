// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract KryptoBird is ERC721Connector {
	// array to store our nfts
	string[] public kryptoBirdz;

	mapping(string => bool) _kryptoBirdzExists;

	function mint(string memory _kryptoBird) public {
		require(!_kryptoBirdzExists[_kryptoBird], "KryptoBird already exists");
		/*
			{
				"k1": true,	
			}
		*/
		// from solidity >= 0.8.0, push() no longer returns the id of the element but reference of the element
		kryptoBirdz.push(_kryptoBird);
		/*
			[ "k1", "new k2" ]
		*/
		uint _id = kryptoBirdz.length - 1;
		/*
			// who is the caller msg.sender?
			_mint(msg.sender, 1)
		*/
		_mint(msg.sender, _id);
		// KryptoBird now exists
		/*
			{
				"k1": true,
				"new k2": true,
			}
		*/
		_kryptoBirdzExists[_kryptoBird] = true;
	}

	// constructor(string memory name, string memory symbol) ERC721Connector(name, symbol) {

	// }
	constructor() ERC721Connector("KryptoBird", "KBIRDZ") {}


}
