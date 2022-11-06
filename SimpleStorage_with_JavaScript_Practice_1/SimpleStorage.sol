// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private favouriteNumber;

    struct People {
        string name;
        uint256 id;
        uint age;
    }

    People[] private peopleList;
    mapping(uint => People) private mapPeople;

    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    function store(uint256 _favouriteNumber) public {
        favouriteNumber = _favouriteNumber;
    }

    function addPeople(
        string memory _name,
        uint256 _id,
        uint _age
    ) public {
        peopleList.push(People(_name, _id, _age));
        mapPeople[_id] = People(_name, _id, _age);
    }

    function getPeople(uint _id) public view returns (People memory) {
        People memory people = mapPeople[_id];
        return people;
    }
}
