// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private favouriteNumber;

    struct Person {
        string name;
        uint uId;
    }
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "You don't have access to add People.");
        _;
    }

    Person[] private listOfPeople;
    mapping(uint => string) private mapToGetPerson;

    function addPerson(string memory _name, uint _uId) public onlyOwner {
        listOfPeople.push(Person(_name, _uId));
        mapToGetPerson[_uId] = _name;
    }

    function getPersonById(uint _id)
        public
        view
        onlyOwner
        returns (Person memory)
    {
        for (uint i = 0; i < listOfPeople.length; i++) {
            if (listOfPeople[i].uId == _id) {
                return listOfPeople[i];
            }
        }
        return Person("NA", 0);
    }

    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    function store(uint256 _favNo) public {
        favouriteNumber = _favNo;
    }
}
