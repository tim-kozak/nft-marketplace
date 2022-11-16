import { appInject, appInjectable } from "../../core/di/utils";
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer';

import { DI_TOKENS } from "../constants/di/types";

@appInjectable()
export class IPFSService {

    _configService = appInject(DI_TOKENS.CONFIG_SERVICE);
    _client;

    constructor() {
        const { host, port, pid, token} = this._configService.ipfs;
        debugger;
        const auth = `Basic ${Buffer.from(pid+':'+token).toString('base64')}`;

        this._client = create({
            host,
            port,
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