import {appInjectable} from "../../core/di/utils";
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer';
@appInjectable()
export class IPFSService {

    _client;

    constructor() {
        const auth = `Basic ${Buffer.from(INFURA_PID+':'+INFURA_API).toString('base64')}`;

        this._client = create({
            host: INFURA_HOST,
            port: INFURA_PORT,
            protocol: 'https',
            headers: { authorization: auth },
        });
    }

    #toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    saveToIPFS = async (file) => {
        const base64 = await this.#toBase64(file);
        const res = await this._client.add(Buffer.from(base64, 'base64'));
        debugger;
        return `https://ipfs.io/ipfs/${res.cid}`;
    }

}