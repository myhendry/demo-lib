// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './interfaces/IERC721.sol';
import './ERC165.sol';

contract ERC721 is ERC165, IERC721 {
	/*
		Building out the minting function
		1. nft to point to an address
		2. keep track of the token ids
		3. keep track of the token owner addresses to token ids
		4. keep track of how many tokens an owner address has
		5. create an event that emits a transfer log - contract address, where it is being minted to and the id
	*/

	// can remove since inherit from IERC721
	// event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
	// event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

	// mapping from token id to the owner
	mapping(uint => address) private _tokenOwner;

	// mapping from owner to number of owned tokens
	mapping(address => uint) private _OwnedTokensCount;

	// mapping from token id to approved addresses
	mapping(uint256 => address) private _tokenApprovals;

	constructor() {
		_registerInterface(bytes4(keccak256('balanceOf(bytes4)')^keccak256('transferFrom(bytes4)')^keccak256('ownerOf(bytes4)')));
	}

	// check if tokenId exists and is valid
	function _exists(uint256 tokenId) internal view returns(bool) {
		// setting the address to nft owner to check the mapping
		// of the address from tokenOwner at the tokenId
		address owner = _tokenOwner[tokenId];
		/*
			{
				0: "0xcAD105805fED01FCDcE47894314b05377DbBe3C2",
				1: "0x6d32C0f9D7411E80ddF764DfCD61dD2FC2A1b5ae",
			}
		*/
		return owner != address(0);
	}

	// check how many token the address holds
	/// @notice Count all NFTs assigned to an owner
	/// @dev NFTs assigned to the zero address are considered invalid, and this
	///  function throws for queries about the zero address.
	/// @param _owner An address for whom to query the balance
	/// @return The number of NFTs owned by `_owner`, possibly zero
	function balanceOf(address _owner) public override view returns (uint256) {
		require(_owner != address(0), 'Owner not found');
		return _OwnedTokensCount[_owner];
	}

	// find owner address based on tokenId
	/// @notice Find the owner of an NFT
	/// @dev NFTs assigned to zero address are considered invalid, and queries
	///  about them do throw.
	/// @param _tokenId The identifier for an NFT
	/// @return The address of the owner of the NFT
	function ownerOf(uint256 _tokenId) public override view returns (address) {
		require(_exists(_tokenId), 'Token does not exist');
		address owner = _tokenOwner[_tokenId];
		require(owner != address(0), 'Owner address not valid');
		return owner;
	}

	// Link an ERC721 token to one KryptoBird
	function _mint(address to, uint256 tokenId) internal virtual {	
		// requires that the address isn't zero
		require(to != address(0), 'ERC721: Invalid ERC Address');
		// requires that the token does not already exists
		
		require(!_exists(tokenId), 'ERC721: Token already minted');
		// we are adding a new address with a token id for minting
		// which token belongs to which owner
		_tokenOwner[tokenId] = to;
		/*
			{
				0: "0xcAD105805fED01FCDcE47894314b05377DbBe3C2",
				1: "0x6d32C0f9D7411E80ddF764DfCD61dD2FC2A1b5ae",
			}
		*/
		// keeping track of each address that is minting and add one to the count
		// how many tokens owner owns
		/*
			{
				"0xcAD105805fED01FCDcE47894314b05377DbBe3C2": 1,
				"0x6d32C0f9D7411E80ddF764DfCD61dD2FC2A1b5ae": 1,
			}	
		*/
		_OwnedTokensCount[to]++;
		// emit
		emit Transfer(address(0), to, tokenId);

	}

	function _transferFrom(address _from, address _to, uint256 _tokenId) private {
		require(_to != address(0), 'Error - ERC721 Transfer to the zero address');
		require(ownerOf(_tokenId) == _from, 'Trying to transfer a token the address does not own');

		_OwnedTokensCount[_from] -= 1;
		_OwnedTokensCount[_to] += 1;

		_tokenOwner[_tokenId] = _to;

		emit Transfer(_from, _to, _tokenId);
	}

	function transferFrom(address _from, address _to, uint256 _tokenId) override public {
		require(isApprovedOrOwner(msg.sender, _tokenId));
		_transferFrom(_from, _to, _tokenId);
	}

	// 1. require that the person approving is the owner
	// 2. we are approving an address to a token (tokenId)
	// 3. require that we can't approve sending tokens of the owner to the owner
	// 4. update the map of the approval addresses
	function approve(address _to, uint256 _tokenId) public {
		address owner = ownerOf(_tokenId);
		require(_to != owner, 'Error - approval to current owner');
		require(msg.sender == owner, 'Current Caller is not the owner of the token');

		_tokenApprovals[_tokenId] = _to;

		emit Approval(owner, _to, _tokenId);
	}

	function isApprovedOrOwner(address spender, uint256 tokenId) internal view returns(bool) {
		require(_exists(tokenId), "Token does not exist");
		address owner = ownerOf(tokenId);
		//todo to finish approval full
		return(spender == owner);
	}

}