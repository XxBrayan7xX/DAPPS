// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Loterias is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _loteriaId;

    struct Loteria{
        uint256 loteriaId;
        string loteriaName;
        uint256 creadorId;
        string creadorName;
    }

    mapping(uint256 => Loteria) public loterias;

    function addLoteria(string memory loteriaName, uint256 creadorId, string memory creadorName)public onlyOwner returns(uint256){
        _loteriaId.increment();
        uint256 newLoteriaId = _loteriaId.current();
        loterias[newLoteriaId] = Loteria(newLoteriaId, loteriaName, creadorId, creadorName);
        return newLoteriaId;
    }

    function getAllLoterias() public view returns(Loteria[] memory){
        Loteria[] memory loteriaArray = new Loteria[](_loteriaId.current());
        for(uint256 i = 0; i < _loteriaId.current(); i++){
            loteriaArray[i] = loterias[i + 1];
        }
        return loteriaArray;
    }

    function getLoteriaById(uint256 loteriaId)public view returns(Loteria memory){
        return loterias[loteriaId];
    }
}

