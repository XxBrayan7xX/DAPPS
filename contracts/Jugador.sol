// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Jugadores is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _jugadorIds;

    struct Jugador{
        uint256 jugadorId;
        string jugadorName;
        uint256 edad;
        uint256 amountBoletos;
    }
    mapping(uint256 => Jugador)public jugadores;

    function addJugador(string memory jugadorName, uint256 edad)public onlyOwner returns(uint256){
        _jugadorIds.increment();
        uint256 newJugadorId = _jugadorIds.current();
        jugadores[newJugadorId] = Jugador(newJugadorId, jugadorName,edad , 0);
        return newJugadorId;
    }

    function getJugadores() public view returns(Jugador[] memory){
        Jugador[] memory jugadoresArray = new Jugador[](_jugadorIds.current());
        for(uint256 i; i < _jugadorIds.current(); i++){
            jugadoresArray[i] = jugadores[i + 1];
        }
        return jugadoresArray;
    }

    function getJugadorById(uint256 jugadorId)public view returns(Jugador memory){
        return jugadores[jugadorId];
    }

    function buyBoleto(uint256 jugadorId, uint256 amount)public onlyOwner{
        jugadores[jugadorId].amountBoletos += amount;
    }
}