import {appInject, appInjectable} from "../../core/di/utils";
import {DI_TOKENS} from "../constants/di/types";
import {appMakeObservable, appObservable} from '../../core/state-management/utils';

@appInjectable()
export class AccountViewModel {
    _walletService = appInject(DI_TOKENS.WALLET_SERVICE);
    _currentAccount = null;
    _isConnecting = false;
    _isConnected = false;

    constructor() {
        appMakeObservable(this,{
            _isConnected: appObservable,
            _isConnecting: appObservable,
            _currentAccount: appObservable,
        })

        if (this._walletService.isInstalled) {
            this.#startAccountTracking();
            this.#startChainTracking();
            this.#startConnectionTracking();

            if (this._isConnected) {
                this.#fetchAvailableAccounts();
            }
        }
    }

    get currentAccount() {
        return this._currentAccount;
    }

    get isAccountConnected() {
        return this._isConnected && !!this._currentAccount;
    }
    get isConnectionInProgress() {
        return this._isConnecting;
    }

    connectAccount = async () => {
        if (!this._walletService.isInstalled) return;
        if (this.isAccountConnected) return;

        this._isConnecting = true;

        try {
            const accounts = await this._walletService.instance.request({ method: 'eth_requestAccounts' });
            this.#accountsReceived(accounts);
        } catch (e) {
            console.error(e);
            this.#accountsReceived([]);
        }

        this._isConnecting = false;
    }

    //PRIVATE
    #startConnectionTracking = () => {
        const walletService = this._walletService;
        const wallet = walletService.instance;
        this._isConnected = walletService.isConnectionAllowed;

        wallet.on('connect', async (accounts) => {
            this._isConnected = walletService.isConnectionAllowed;
            this.#accountsReceived(accounts);
        })

        wallet.on('disconnect', (error) => {
            this._isConnected = walletService.isConnectionAllowed;
        })
    }

    #startAccountTracking = () => {
        const wallet = this._walletService.instance;
        wallet.on('chainChanged', (chainId) => {
            console.log('Chain switched to ', chainId);
            window.location.reload()
        });
    }

    #startChainTracking = () => {
        const wallet = this._walletService.instance;
        wallet.on('accountsChanged', async (accounts) => {
            this.#accountsReceived(accounts);
        });
    }

    #fetchAvailableAccounts = async () => {
        if (!this._walletService.isInstalled) return;

        try {
            const accounts = await this._walletService.instance.request({ method: 'eth_accounts' });
            this.#accountsReceived(accounts);
        } catch (e) {
            this.#accountsReceived([]);
        }
    }

    #accountsReceived = (accounts) => {
        if (accounts && accounts.length) {
            this._currentAccount = accounts[0].toLowerCase();
        } else {
            this._currentAccount = null;
        }
    }

}

