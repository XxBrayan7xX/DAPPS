require('dotenv').config({ path: require('find-config')('.env') });
const { ethers, BigNumber } = require('ethers');
const contract = require('../artifacts/contracts/Boletos.sol/Boletos.json');

const {
    API_URL,
    PRIVATE_KEY,
    PUBLIC_KEY,
    BOLETOS_CONTRACT
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
        to: BOLETOS_CONTRACT,
        nonce,
        chainId,
        gasPrice,
        data: etherInterface.encodeFunctionData(method, params),
    };
    return transaction;
}

async function addBoleto(token, jugadorId, loteriaId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const transaction = await createTransaction("addBoleto", [token, jugadorId, loteriaId]);
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

async function getAllBoletos() {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const boletosContract = new ethers.Contract(BOLETOS_CONTRACT, contract.abi, provider);
    const result = await boletosContract.getAllBoletos();
    return result;
}

async function getBoletoById(boletoId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const boletosContract = new ethers.Contract(BOLETOS_CONTRACT, contract.abi, provider);
    const result = await boletosContract.getUserById(boletoId);
    return result;
}

async function getBoletoByJugadorId(jugadorId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const boletosContract = new ethers.Contract(BOLETOS_CONTRACT, contract.abi, provider);
    const result = await boletosContract.getBoletoByJugadorId(jugadorId);
    return result;
}

module.exports = {
    addBoleto,
    getAllBoletos,
    getBoletoById,
    getBoletoByJugadorId
};