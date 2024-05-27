//const { ethers } = require("hardhat");

// async function main() {
//     const JUGADORES = await ethers.getContractFactory('Jugadores');
//     const jugadores = await JUGADORES.deploy();
//     await jugadores.deployed();
//     console.log("Jugadores Contract deployed to:", jugadores.address);

//     const LOTERIAS = await ethers.getContractFactory('Loterias');
//     const loterias = await LOTERIAS.deploy();
//     await loterias.deployed();
//     console.log("Loterias Contract deployed to:", loterias.address);

//     const BOLETOS = await ethers.getContractFactory('Boletos');
//     const boletos = await BOLETOS.deploy();
//     await boletos.deployed();
//     console.log("Boletos Contract deployed to:", boletos.address);
// }
// main().catch((error) => {
//     console.error(error);
//     process.exit(1);
// });

// async function main(){
//     const Jugadores = await ethers.getContractFactory('Jugadores');
//     const jugadores = await Jugadores.deploy();
//     const txHash = jugadores.deployTransaction.hash;
//     const txRecipt = await ethers.provider.waitForTransaction(txHash);
//     console.log("Contract deployed to Jugadores:", txRecipt.contractAddress)

// //     const Loterias = await ethers.getContractFactory('Loterias');
// //     const loterias = await Loterias.deploy();
// //     const txHash2 = loterias.deployTransaction.hash;
// //     const txRecipt2 = await ethers.provider.waitForTransaction(txHash2);
// //     console.log("Contract deployed to Loterias:", txRecipt2.contractAddress)

// //     const Boletos = await ethers.getContractFactory('Boletos');
// //     const boletos = await Boletos.deploy();
// //     const txHash = boletos.deployTransaction.hash;
// //     const txRecipt = await ethers.provider.waitForTransaction(txHash);
// //     console.log("Contract deployed to Boletos:", txRecipt.contractAddress)
// // 
// }
// main()
// .then(()=>{ProcessingInstruction.exit(0)})


 
const fs = require("fs");
const {ethers} = require('hardhat')
async function main(){
 
    const Users = await ethers.getContractFactory('Jugadores');
    const users = await Users.deploy();
    const txHash = users.deployTransaction.hash;
    const txReceipt=await ethers.provider.waitForTransaction(txHash);
    console.log("Contract deployed to Address:", txReceipt.contractAddress);
}
 
main()
.then(() => {process.exit(0)})
.catch((error)=>{
    console.log(error), process.exit(1)
})



