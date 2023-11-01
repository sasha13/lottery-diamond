// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library LibLottery {

    bytes32 constant LOTTERY_STORAGE_POSITION = keccak256("diamond.storage.LibLottery");

    struct AdminAndParticipantsData {
        address admin;
        address[] participants;
        mapping(address => bool) userParticipates;
    }


    function adminAndParticipantsData() internal pure returns (AdminAndParticipantsData storage adminAndParticipantData) {
        bytes32 position = LOTTERY_STORAGE_POSITION;
        assembly {
            adminAndParticipantData.slot := position
        }
    }

    // just the storage is ok to go here
    // everything else can go in Facets
    function setAdminAddress(address _newAddress) internal {
        AdminAndParticipantsData storage data = adminAndParticipantsData();
        data.admin = _newAddress;
    }

    function getAdminAddress() internal view returns (address) {
        AdminAndParticipantsData storage data = adminAndParticipantsData();
        return data.admin;
    }

    function setParticipant(address _newAddress) internal {
        AdminAndParticipantsData storage data = adminAndParticipantsData();
        data.participants.push(_newAddress);
    }

    function getParticipants() internal view returns (address[] memory) {
        AdminAndParticipantsData storage data = adminAndParticipantsData();
        return data.participants;
    }

    function getBalance() internal view returns (uint256) {
        return address(this).balance;
    }

}