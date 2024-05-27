require('dotenv').config({ path: require('find-config')('.env') });
const { ethers, BigNumber } = require('ethers');
const contract = require('../artifacts/contracts/Loteria.sol/Loteria.json');

const {
    API_URL,
    PRIVATE_KEY,
    PUBLIC_KEY,
    LOTERIA_CONTRACT
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
        to: LOTERIA_CONTRACT,
        nonce,
        chainId,
        gasPrice,
        data: etherInterface.encodeFunctionData(method, params),
    };
    return transaction;
}

async function addLoteria(loteriaName, creadorId, creadorName) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const transaction = await createTransaction("addLoteria", [loteriaName, creadorId, creadorName]);
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

async function getAllLoterias() {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const loteriaContract = new ethers.Contract(LOTERIA_CONTRACT, contract.abi, provider);
    const result = await loteriaContract.getAllLoterias();
    return result;
}

async function getLoteriaById(loteriaId) {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const loteriaContract = new ethers.Contract(LOTERIA_CONTRACT, contract.abi, provider);
    const result = await loteriaContract.getLoteriaById(loteriaId);
    return result;
}

module.exports = {
    addLoteria,
    getAllLoterias,
    getLoteriaById
};