import {Button} from "@mui/material";
import {ButtonMetamask} from "../../../../shared/components/button-metamask";

import s from './styles.module.scss';
import {cn} from "../../../../core/utils/classNames";
import {truncate} from "../../../../core/utils/string";

const PLAIN_ADDRESS = "0x0000000000000000000000000000000000000000";
export const Hero = ({ isConnecting, isAvailable, account, onConnect, onCreate }) => {

    const address = truncate(account ?? PLAIN_ADDRESS, '......', 8, 8)

    const accountView = () => {
        return <div className={s.account_details}>
            <div className={cn(s.account_image, { [s.avatar]: !!account })}></div>
            <div className={s.account_description}>
                <div className={s.account_address}>
                    { address }
                </div>
                <div className={s.account_name}>
                    { account ? "Account connected" : "No account connected" }
                </div>
            </div>
        </div>;
    }

    const connectionView = () => {
        if (account) return null;

        return <div className={s.connection}>
            <ButtonMetamask isLoading={isConnecting} onClick={onConnect} />
        </div>;
    }

    const noMetamaskView = () => {
        return <div className={s.connection}>
            <div>
                <ButtonMetamask disabled />
                <p className={s.no_wallet}>please install <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank" rel="noopener noreferrer">MetaMask</a></p>
            </div>
        </div>
    }

    return <div className={s.hero}>
        <div className={s.info}>
            <p className={s.slogan}>
                Buy and Sell<br />
                Digital Arts,<br />
                <span>NFTs</span> Collections
            </p>
            <p className={s.subtitle}>Mint and collect the hottest NFTs around.</p>

            <Button variant="contained" className={s.create} onClick={onCreate}>Create new NFT</Button>
            <ul className={s.stats}>
                <li>Users <span>345</span></li>
                <li>Artists <span>221</span></li>
                <li>NFTs <span>1527</span></li>
            </ul>
        </div>

        <div className={cn(s.account, { [s.bg]: !!account })}>
            {accountView()}
            {isAvailable ? connectionView() : noMetamaskView()}
        </div>
    </div>

}