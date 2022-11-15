import s from './styles.module.scss';
export const Menu = () => {

    return <div className={s.menu}>
        <h1 className={s.logo}>NFT Marketpalce</h1>
        <ul className={s.nav}>
            <li><a href="/m">Market</a></li>
            <li><a href="/a">Artists</a></li>
            <li><a href="/c">Community</a></li>
        </ul>
    </div>;
}