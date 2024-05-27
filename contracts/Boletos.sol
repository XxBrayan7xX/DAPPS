// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Boletos is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _boletoIds;

    struct Boleto{
        uint256 boletoId;
        string token;
        uint256 jugadorId;
        uint256 loteriaId;
    }

    mapping(uint256 => Boleto)public boletos;
    //mapping(uint256 => uint256[])public jugadorBoleto;

    function addBoleto(string memory token, uint256 jugadorId, uint256 loteriaId)public onlyOwner returns(uint256){
        _boletoIds.increment();
        uint256 newBoletoId = _boletoIds.current();
        boletos[newBoletoId] = Boleto(newBoletoId, token, jugadorId, loteriaId);
        return newBoletoId;
    }

    function getAllBoletos()public view returns(Boleto[] memory){
        Boleto[] memory boletosArray = new Boleto[](_boletoIds.current());
        for(uint256 i = 0; i < _boletoIds.current(); i++){
            boletosArray[i] = boletos[i + 1];
        }
        return boletosArray;
    }

    function getBoletoById(uint256 boletoId)public view returns(Boleto memory){
        return boletos[boletoId];
    }

 function getBoletoByJugadorId(uint256 jugadorId) public view returns (Boleto[] memory) {
    Boleto[] memory boletosArray = new Boleto[](_boletoIds.current());
    uint256 foundBoletos = 0;
    for (uint256 i = 0; i < _boletoIds.current(); i++) {
        Boleto storage boleto = boletos[i + 1];
        if (boleto.jugadorId == jugadorId) {
            boletosArray[foundBoletos] = boleto;
            foundBoletos++;
        }
    }
    Boleto[] memory trimmedArray = new Boleto[](foundBoletos);
    for (uint256 j = 0; j < foundBoletos; j++) {
        trimmedArray[j] = boletosArray[j];
    }
    return trimmedArray;
}
}