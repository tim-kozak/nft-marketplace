# NFT marketplace test project

This project was created to work with ERC-721 based smart contract using MetaMask APIs.

![preview](preview.gif)

## Highlights:

### Based on
    - Create React App + React App Rewired
    - Material UI 
    - Css modules (SCSS)
### Architecture
    - MVVM
    - MobX (State management)
    - Inversify (Dependency injection)
### Blockchain
    - Truffle
    - IPFS (Infura)
    - Metamask API
    - Web3
    - Ganache CLI

## Setup

1. Make sure you have [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) 
2. You need to update `/public/config.json` file with Infura API keys 
3. Run `npm install`
4. Run `ganache-cli -d`
5. Run `truffle migrate –network development`
6. Run `npm start`

It will run the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.