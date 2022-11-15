import s from './styles.module.scss';

export const ArtworksList = ({ title, items }) => {

    const nftView = ({ id, owner, title, description, price, metadataURI }) => {
        return <div className={s.nft} key={id}>
            <div className={s.image} style={{ backgroundImage: `url(${metadataURI})`}}></div>
            <div className={s.details}>
                <h3>{title}</h3>
                <p>{price}</p>
            </div>
        </div>;
    }

    return <div className={s.artworks_list}>
        <h2>{title}</h2>
        <div className={s.list}>
            {items.map(nft => nftView(nft)) }
        </div>
    </div>

}