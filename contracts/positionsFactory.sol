//SPDX-License-Identifier:MIT

pragma solidity ^0.8.4;
pragma abicoder v2;

contract Positions {
    constructor () public {}

    uint[] public positions;
    mapping(address => uint) userPosition;

    struct Position {
        address user;
        uint creatorStake;
        uint proposersStake;
        address[] proposers;
        uint opposersStake;
        address[] opposers;
        uint createdOn;
        uint expiry;
    }

    function createPosition(uint _amount, uint _expiry, uint _stake) public returns (bool) {
        
    }

    function proposePosition(uint _amount, uint _expiry, uint _stake) public returns (bool) {
        
    }

    function opposePosition(uint _amount, uint _expiry, uint _stake) public returns (bool) {
        
    }

    function updatePosition(uint _amount, uint _expiry, uint _stake) public returns (bool) {
        
    }

    function getPositions(uint _number) view public returns (uint) {
        
    }

    function liquidatePosition(uint _positionId)  public returns (bool) {
        
    }
}