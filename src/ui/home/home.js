import React from 'react';
import { appObserver } from '../../core/state-management/utils';

import './home.css';

import { HomeViewModel } from "./home.vm";

import { Menu } from "./components/menu";
import { Hero } from "./components/hero";
import { ArtworksList } from "./components/artworks-list";
import { CreationDialog } from "./components/dialog-creation";
import {Loading} from "../../shared/components/modal-loading";

const Home = appObserver(() => {
    const $vm = React.useMemo(() => new HomeViewModel(), []);

    return (
        <>
            <header className="App-header">
                <div className="App-sizer">
                    <Menu />
                </div>
                <div className="App-sizer">
                    <Hero
                        onConnect={$vm.handleConnectWallet}
                        onCreate={$vm.handleOpenCreateModal}
                        account={$vm.currentAccount}
                        isConnecting={$vm.isConnectingAccount}
                        isAvailable={$vm.isWalletAvailable}
                    />
                </div>
            </header>

            <section className="App-section">
                <div className="App-sizer">
                    <ArtworksList title='Latest NFTs' items={$vm.NFTs} />
                    <ArtworksList title='Latest Transactions' items={$vm.transactions} />
                </div>
            </section>

            <CreationDialog isOpen={$vm.isCreateModalShown} onClose={$vm.handleCloseCreateModal} onSubmit={$vm.handleCreateNFT} />

            { $vm.isLoading ? <Loading modal /> : null }
        </>
    );
});

export default Home;
