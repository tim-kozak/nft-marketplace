import {appInjectable} from "../../core/di/utils";
import Web3 from "web3";

@appInjectable()
export class WalletService {

    constructor() {}

    get instance () {
        const _ethereum = window.ethereum;

        if (_ethereum === undefined) return null;

        try {
            return _ethereum;
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    get web3 () {
        const web3Instance = new Web3(this.instance);
        return web3Instance;
    }

    get isInstalled() {
        return !!this.instance;
    }

    get isConnectionAllowed() {
        return this.isInstalled && this.instance.isConnected();
    }

}