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
        const auth = `Basic ${Buffer.from(pid+':'+token).toString('base64')}`;

        this._client = create({
            host,
            port,
            protocol: 'https',
            headers: { authorization: auth },
        });
    }

    saveToIPFS = async (file) => {
        const res = await this._client.add(file);
        return `https://ipfs.io/ipfs/${res.path}`;
    }

}