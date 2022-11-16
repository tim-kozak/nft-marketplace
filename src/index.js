import React from 'react';
import ReactDOM from 'react-dom/client';

import { DI_TOKENS } from "./shared/constants/di/types";
import './core/di/dependencies';
import { appInject } from "./core/di/utils";

import { initializeStateManagement } from "./core/state-management/setup";

import App from './ui/app';

const config = appInject(DI_TOKENS.CONFIG_SERVICE);
const root = ReactDOM.createRoot(document.getElementById('root'));

async function initializeApp() {

    initializeStateManagement();
    await config.initialize();

    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

initializeApp();
