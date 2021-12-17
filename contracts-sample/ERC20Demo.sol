// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Capped.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol';


// the caller who deploy the project can mint the token
// can use addMinter to delegate minting of token to another address other than the address that deploy the project
contract HToken is ERC20, ERC20Detailed, ERC20Burnable, ERC20Mintable, ERC20Pausable {
  constructor () ERC20Detailed("XXX Token", "XXX", 18) public {}


}
