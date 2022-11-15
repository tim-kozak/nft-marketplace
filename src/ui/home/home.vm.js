import {appMakeObservable, appObservable} from '../../core/state-management/utils';
import {appInject} from "../../core/di/utils";
import {DI_TOKENS} from "../../shared/constants/di/types";

export class HomeViewModel {
    _accountVM = appInject(DI_TOKENS.ACCOUNT_VM);
    _walletService = appInject(DI_TOKENS.WALLET_SERVICE);
    _contractService = appInject(DI_TOKENS.CONTRACT_SERVICE);
    _showCreateModal = false;

    _isLoading = false;

    _nfts = [];
    _transactions = [];

    constructor() {
        appMakeObservable(this, {
            _showCreateModal: appObservable,
            _nfts: appObservable,
            _isLoading: appObservable,
        })
        this.#fetchData();
    }

    get isCreateModalShown() {
        return this._showCreateModal;
    }

    get isWalletAvailable() {
        return this._walletService.isInstalled;
    }

    get isConnectingAccount() {
        return this._accountVM.isConnectionInProgress;
    }

    get isAccountConnected() {
        return this._accountVM.isAccountConnected;
    }

    get currentAccount() {
        return this._accountVM.currentAccount;
    }

    get NFTs() {
        return this._nfts;
    }

    get transactions() {
        return this._nfts;
    }

    get isLoading() {
        return this._isLoading;
    }

    //handlers
    handleConnectWallet = async () => {
        await this._accountVM.connectAccount();
    }

    handleOpenCreateModal = () => {
        if (!this._accountVM.isAccountConnected) return alert("Please connect account first");
        this._showCreateModal = true;
    }

    handleCloseCreateModal = () => {
        this._showCreateModal = false;
    }

    handleCreateNFT = async (imageFile, title, price, description) => {
        try {
            this._isLoading = true
            const account = this._accountVM.currentAccount;
            await this._contractService.mintNFT(imageFile, title, price, description,account);
            await this.#fetchData();
            this._showCreateModal = false;
        } catch (e) {

        }
        this._isLoading = false;
    }

    //private
    #fetchData = async () => {
        this._nfts = await this._contractService.fetchAllNFTs();
        this._transactions = await this._contractService.fetchAllTransactions();
    }
}