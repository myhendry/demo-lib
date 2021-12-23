// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './interfaces/IERC721Enumerable.sol';
import './ERC721.sol';

/*
    _allTokens [
        1
        2
        3
    ]

    _allTokensIndex [
        1 => 1,
        2 => 2,
        3 => 3,
        tokenId => allTokens.length
    ]

    _ownedTokens[to] [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
    ]
    _ownedTokensIndex[tokenId] [
        1 => 1,
        2 => 2,
        3 => 3,
        _ownedTokensIndex[tokenId] => _ownedTokens[to].length
    ]
*/
contract ERC721Enumerable is ERC721, IERC721Enumerable {
	uint256[] private _allTokens;

    //todo what is the purpose of these mappings?
	// mapping from tokenId to position in _allTokens array
	mapping(uint256 => uint256) private _allTokensIndex;
	// mapping of owner to list of all owner token ids
	mapping(address => uint256[]) private _ownedTokens;
	// mapping from token ID index to the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    /// notice Enumerate valid NFTs
    /// dev Throws if `_index` >= `totalSupply()`.
    /// param _index A counter less than `totalSupply()`
    /// return The token identifier for the `_index`th NFT,
    ///  (sort order not specified)
    // function tokenByIndex(uint256 _index) external view returns (uint256);

    /// notice Enumerate NFTs assigned to an owner
    /// dev Throws if `_index` >= `balanceOf(_owner)` or if
    ///  `_owner` is the zero address, representing invalid NFTs.
    /// param _owner An address where we are interested in NFTs owned by them
    /// param _index A counter less than `balanceOf(_owner)`
    /// return The token identifier for the `_index`th NFT assigned to `_owner`,
    ///   (sort order not specified)
    // function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256);

    constructor() {
        _registerInterface(bytes4(keccak256('totalSupply(bytes4)')^keccak256('tokenByIndex(bytes4)')^keccak256('tokenOfOwnerByIndex(bytes4)')));
    }

    function _mint(address to, uint256 tokenId) internal override(ERC721) {
	    super._mint(to, tokenId);
        // 2 things! A. add tokens to the owner
        _addTokensToAllTotalEnumeration(tokenId);
        // B. all tokens to our totalsupply to allTokens
        _addTokensToOwnerEmuneration(to, tokenId);
    }

    // add tokens to the allTokens array and set the position of the token indexes 
    function _addTokensToAllTotalEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    function _addTokensToOwnerEmuneration(address to, uint256 tokenId) private {
        // 1. _ownedTokensIndex tokenId set to address of ownedTokens
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        // 2. add address and token id to the _ownedTokens
        _ownedTokens[to].push(tokenId);
        // 3. we want to execute the function with minting

    }

    // two helper functions - one that returns tokenByIndex and another one that returns
    // tokenOfOwnerByIndex
    function tokenByIndex(uint256 index) public view override returns(uint256) {
        require(index < totalSupply(), 'global index out of bounds');
        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) public view override returns(uint256) {
        require(index < balanceOf(owner), 'owner index out of bounds');
        return _ownedTokens[owner][index];
    }

    // return the total supply of the _allTokens array
	// / Count NFTs tracked by this contract
    // / A count of valid NFTs tracked by this contract, where each one of
    // /  them has an assigned and queryable owner not equal to the zero address
    function totalSupply() public view override returns(uint256) {
        return _allTokens.length;      
    }

}