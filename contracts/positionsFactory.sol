//SPDX-License-Identifier:MIT

pragma solidity ^0.8.4;
pragma abicoder v2;

contract Positions {
    constructor () public {}

    string constant name="Predix V1 Positions Factory";

    struct Position {
        address user;
        uint creatorStake;
        uint proposersStake;
        address[] proposers;
        uint opposersStake;
        address[] opposers;
        uint createdOn;
        uint expiry;
        bool status;
    }

    uint[] public noOfpositions;
    mapping(uint => Position) userPosition;

    Position[] public positions;

    function createPosition(uint _amount, uint _expiry, uint _stake, address[] memory _proposers, address[] memory _opposers) public payable returns (bool) {

        positions.push(Position(msg.sender, _stake, 0, _proposers, 0, _opposers, block.timestamp, _expiry, true));

        return true;
        
    }

    function proposePosition(uint _positionId, uint _stake) public returns (bool) {

        Position storage currentPosition = positions[_positionId];
       
        currentPosition.proposers.push(payable(msg.sender));

        currentPosition.proposersStake += _stake;

        return true;
        
    }

    function opposePosition(uint _positionId, uint _stake) public returns (bool) {

        Position storage currentPosition = positions[_positionId];
       
        currentPosition.opposers.push(payable(msg.sender));

        currentPosition.opposersStake += _stake;

        return true;
        
    }

    function updatePosition(uint _positionId, uint _expiry, uint _stake, address[] memory _proposers, address[] memory _opposers) public returns (bool) {

        require(_expiry > block.timestamp, "Position Has Expired");
        
        Position storage activePosition = positions[_positionId];

        activePosition = Position(msg.sender, _stake, 0, _proposers, 0, _opposers, block.timestamp, _expiry, true);
        
    }

    function getPositions(uint _number) view public returns (Position[] memory) {

        Position[] memory positionsArray = new Position[](positions.length);
        
        for (uint i = 0; i < positions.length; i++) {
            positionsArray[i] = positions[i];
        }
        
        return positionsArray;
    }

    function liquidatePosition(uint _positionId, address payable _liquidator)  public returns (bool) {
        
        Position storage currentPosition = positions[_positionId];

        (bool sent, bytes memory data) = _liquidator.call{value: msg.value}("");
        
        require(sent, "Failed to send Ether");

        currentPosition.opposersStake = 0;
        currentPosition.proposersStake = 0;
        currentPosition.status = false;

        return true;
    }
}