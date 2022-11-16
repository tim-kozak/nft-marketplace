import { appInjectable } from '../di/utils';
import Axios from 'axios';

@appInjectable()
export class ConfigService {
  _config;
  _client;

  async initialize() {
    this._client = this.#createClient();
    await this.#setConfig();
  }

  get version() {
    const { version } = this._config;
    return version;
  }

  get ipfs() {
    const { ipfs } = this._config;
    return ipfs;
  }

  //PRIVATE
  async #setConfig() {
    const { data } = await this._client.get('./config.json');
    this._config = data;
    debugger;
  }

  #createClient = () => {
    return Axios.create();
  };

}
