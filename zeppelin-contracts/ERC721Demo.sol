// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721Full.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol';

contract NToken is ERC721Full {
	constructor() ERC721Full("N Token", "NST") public {}
}