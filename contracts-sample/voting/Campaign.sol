// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    uint public numRequests;
    mapping (uint => Request) public requests;
    //Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager, "Manager Only");
        _;
    }

    constructor (uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "Less than minimum contribution");

        approvers[msg.sender] = true;
        approversCount++;
    }

    // ! doesn't work from solidity 0.7.0
    // function createRequest(string memory description, uint value, address recipient) public restricted {
    //     Request memory newRequest = Request({
    //        description: description,
    //        value: value,
    //        recipient: recipient,
    //        complete: false,
    //        approvalCount: 0
    //     });

    //     requests.push(newRequest);
    // }

    function createRequest(string memory description, uint value, address recipient) public restricted {            
        Request storage r = requests[numRequests++];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender], "A");
        require(!request.approvals[msg.sender], "A");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2), "Approval count less than 50%");
        require(!request.complete, "Request not completed");

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
        return (
          minimumContribution,
          address(this).balance,
          numRequests,
          approversCount,
          manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return numRequests;
    }
}