import { Container } from 'inversify';

import { WalletService } from "../../shared/services/wallet-service";
import { ContractService } from "../../shared/services/contract-service";
import { AccountViewModel } from "../../shared/view-models/account.vm";
import { IPFSService } from "../../shared/services/ipfs-service";
import { ConfigService } from "../services/config-service";

import { DI_TOKENS } from '../../shared/constants/di/types';

const diContainer = new Container();

const entitiesConfig = [
  { diToken: DI_TOKENS.WALLET_SERVICE, entity: WalletService },
  { diToken: DI_TOKENS.CONTRACT_SERVICE, entity: ContractService },
  { diToken: DI_TOKENS.ACCOUNT_VM, entity: AccountViewModel },
  { diToken: DI_TOKENS.IPFS_SERVICE, entity: IPFSService },
  { diToken: DI_TOKENS.CONFIG_SERVICE, entity: ConfigService },
];

entitiesConfig.forEach(({ diToken, entity }) => {
  diContainer.bind(diToken).to(entity).inSingletonScope();
});

export { diContainer };
