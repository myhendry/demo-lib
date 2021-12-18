// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {
    string public name;
    address private owner;
    
    constructor() {
        name="L";
        owner = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == owner, "Restricted to Owner");
        _;
    }

    function change_name(string memory new_name) external restricted {
        name = new_name;
    }
}