const NFTContract = artifacts.require('NFTContract')

module.exports = async (deployer) => {
    const accounts = await web3.eth.getAccounts()
    //10% of fee
    await deployer.deploy(NFTContract, 'Custom Test NFTs', 'CTN', 10, accounts[1])
}



