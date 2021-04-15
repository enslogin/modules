global.Buffer = require('buffer').Buffer;
global.process = require('process');

const { WalletLink } = require('walletlink');
const ethers = require('ethers');

global.provider = (config) => new Promise((resolve, reject) => {
  const walletLink = new WalletLink({ appName: 'ENSLogin' });

  ethers
  .getDefaultProvider(config.provider.network)
  .getNetwork()
  .then(({ chainId }) => {
    const ethereum = walletLink.makeWeb3Provider(provider.connection.url, Number(chainId));
    ethereum.disable = ethereum.close.bind(ethereum);
    resolve(ethereum);
  })
  .catch(reject)
})
