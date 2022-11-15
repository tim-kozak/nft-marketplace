import Web3 from 'web3'

import abi from '../abi/NFTContract.json';
import {appInject, appInjectable} from "../../core/di/utils";

import {DI_TOKENS} from "../constants/di/types";

const MINT_PRICE = '0.01';
const ETHER = 'ether';

@appInjectable()
export class ContractService {
    _walletService = appInject(DI_TOKENS.WALLET_SERVICE);
    _ipfsService = appInject(DI_TOKENS.IPFS_SERVICE);
    _contract;

    #fetchEthereumContract = async () => {
        if (this._contract) return this._contract;

        const web3Instance = this._walletService.web3;
        const networkId = await web3Instance.eth.net.getId();
        const networkData = abi.networks[networkId];

        if (networkData) {
            this._contract = new web3Instance.eth.Contract(abi.abi, networkData.address)
            return this._contract;
        }

        return null;
    }

    mintNFT = async (file, title, price, description, account) => {
        try {
            debugger;
            const ipfsURL = await this._ipfsService.saveToIPFS(file);

            const web3Instance = this._walletService.web3;
            const weiPrice = await web3Instance.utils.toWei(price.toString(), ETHER);
            const mintPrice = await web3Instance.utils.toWei(MINT_PRICE, ETHER);

            const contract = await this.#fetchEthereumContract()
            return await contract.methods.payToMint(title, description, ipfsURL, weiPrice).send({ from: account, value: mintPrice });
        } catch (error) {
            console.error(error);
        }

        return null;
    }

    fetchAllNFTs = async () => {
        try {
            const contract = await this.#fetchEthereumContract()
            const web3Instance = this._walletService.web3;
            const nfts = await contract.methods.getAllNFTs().call()

            return nfts.map(({ id, owner, cost, title, description, metadataURI, timestamp}) => ({
                    id: Number(id),
                    owner: owner.toLowerCase(),
                    cost: web3Instance.utils.fromWei(cost),
                    title,
                    description,
                    metadataURI,
                    timestamp,
                })).reverse();
        } catch (error) {
            console.error(error);
        }

        return null;
    }

    fetchAllTransactions = async () => {
        try {
            const contract = await this.#fetchEthereumContract()
            const transactions = await contract.methods.getAllTransactions().call()

            return transactions.map((nft) => ({
                id: Number(nft.id),
                owner: nft.owner.toLowerCase(),
                cost: window.web3.utils.fromWei(nft.cost),
                title: nft.title,
                description: nft.description,
                metadataURI: nft.metadataURI,
                timestamp: nft.timestamp,
            })).reverse();
        } catch (error) {
            console.error(error);
        }

        return null;
    }
}