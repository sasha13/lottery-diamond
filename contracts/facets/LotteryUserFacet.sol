// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";
import "../libraries/LibLottery.sol";

contract LotteryUserFacet {

    /* 
        Events 
    */
    event EnoughParticipantsEntered();
    event UserJoinedEvent(address indexed user);


    function getNumber() external pure returns (int) {
        return 44;
    }

    function listParticipants() external view returns(address[] memory) {
        LibLottery.AdminAndParticipantsData storage data = LibLottery.adminAndParticipantsData();
        return data.participants;
    }

    /* 
        Triggered from frontend - e.g. user would need to click 
        on a button saying 'click to participate'.
        Description would say something like
        'Minimum of 0.5 ETH required to participate' 
    */
    function sendEntryRequest() external payable {
        LibLottery.AdminAndParticipantsData storage data = LibLottery.adminAndParticipantsData();
        
        require(msg.sender != data.admin, "Admin is not allowed to perform this action.");
        require(msg.value >= 0.5 ether, "You need to send 0.5 ETH to participate.");
        require(!data.userParticipates[msg.sender], "You can only participate in the lottery once.");
        
        data.participants.push(msg.sender);
        data.userParticipates[msg.sender] = true;

        emit UserJoinedEvent(msg.sender);
        
        /* 
            Notify admin that enough participants have 
            entered the lottery so she is able to
            pick the winner (listen on frontend)
        */
        if (data.participants.length == 3) {
            emit EnoughParticipantsEntered();
        }
    }

}


// erc1967
// library (internal, external) vs contract 
// internal library - cannot have external or public func
// state will be defined inside internal lib as a struct

// lottery treba da podelis u admin i user
// najbitnija strvar je da se ishendla storage a to ces postici:
// create new lib,  define new struct
// method to fetch the storage layout - pogledaj LibDiamond.sol

// deploy skripta - na osnovu postojece
// postojeca ce da deploy-a diamond strukturu a tvoja treba samo tvoj kod - Lottery





// implementiraj remove i update.. isto sve ide preko skripte
// onda update sa drugacijim func selector-om (dodaj neki argument (string) u sendEntryRequest f-ju samo da dobijes novi selector)
// nece ti dati.. treba da provalis zasto


// use loupe as much as u can for debugging


// read about
// lock the smart contract

// ups & transparent proxy