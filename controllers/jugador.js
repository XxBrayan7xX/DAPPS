require('dotenv').config({ path: require('find-config')('.env') });
const { ethers, BigNumber } = require('ethers');
const contract = require('../artifacts/contracts/Jugador.sol/Jugador.json');

const {
    API_URL,
    PRIVATE_KEY,
    PUBLIC_KEY,
    JUGADOR_CONTRACT
} = process.env;

async function createTransaction(method, params) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const etherInterface = new ethers.utils.Interface(contract.abi);
    const nonce = await provider.getTransactionCount(PUBLIC_KEY, 'latest');
    const gasPrice = await provider.getGasPrice();
    const network = await provider.getNetwork();
    const { chainId } = network;
    const transaction = {
        from: PUBLIC_KEY,
        to: JUGADOR_CONTRACT,
        nonce,
        chainId,
        gasPrice,
        data: etherInterface.encodeFunctionData(method, params),
    };
    return transaction;
}

async function addJugador(jugadorName, edad) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const transaction = await createTransaction("addJugador", [jugadorName, edad]);
    const estimateGas = await provider.estimateGas(transaction);
    transaction["gasLimit"] = estimateGas;
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const signedTx = await wallet.signTransaction(transaction);
    const transactionReceipt = await provider.sendTransaction(signedTx);
    await transactionReceipt.wait();
    const hash = transactionReceipt.hash;
    const receipt = await provider.getTransactionReceipt(hash);
    return receipt;
}

async function getJugadores() {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const jugadorContract = new ethers.Contract(JUGADOR_CONTRACT, contract.abi, provider);
    const result = await jugadorContract.getJugadores();
    return result;
}

async function getJugadorById(jugadorId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const jugadorContract = new ethers.Contract(JUGADOR_CONTRACT, contract.abi, provider);
    const result = await jugadorContract.getJugadorById(jugadorId);
    return result;
}

async function buyBoleto(jugadorId, amount){
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const jugadorContract = new ethers.Contract(JUGADOR_CONTRACT, contract.abi, provider);
    const result = await jugadorContract.buyBoleto(jugadorId, amount);
    return result;
}

module.exports = {
    addJugador,
    getJugadores,
    getJugadorById,
    buyBoleto
};