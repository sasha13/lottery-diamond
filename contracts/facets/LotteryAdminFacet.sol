// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";
import "../libraries/LibLottery.sol";

contract LotteryAdminFacet {
    
    event WinnerAnnounced(address winner);

    function pickWinner() external payable {
        address[] memory participants = LibLottery.getParticipants();
        require(participants.length >= 3, "Minimum of 3 participants is necessary.");
        address winner = payable(participants[random() % participants.length]);
        (bool sent,) = winner.call{value: LibLottery.getBalance()}("");
        require(sent, "Failure! Ether not sent.");

        // emit an event with the winner - fetch it for test
        emit WinnerAnnounced(winner);
        
        /* 
            After we get the winner, we need to
            clear all the participants so they 
            can, if they wish, participate in the 
            next round.
        */
        
        LibLottery.AdminAndParticipantsData storage data = LibLottery.adminAndParticipantsData();
        
        for (uint i = 0; i < participants.length; i++) {
            data.userParticipates[participants[i]] = false;
        }

        delete participants;
    }   

    function random() private view returns (uint) {
        address[] memory participants = LibLottery.getParticipants();
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants.length)));
    }

}
