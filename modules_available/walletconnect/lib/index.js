global.Buffer  = require('buffer').Buffer;
global.process = require('process');

const WalletConnectProvider = require('@walletconnect/web3-provider').default;
const ethers                = require('ethers');
const DEFAULT_INFURA_ID     = 'c0f81e74d29e4ff6ab4e219758fd20b1';

function getHost(config) {
  if (config.provider)
  switch (config.provider.network)
  {
    case 'mainnet':
    case 'ropsten':
    case 'rinkeby':
    case 'goerli':
    case 'kovan':
      return `https://${config.provider.network}.infura.io/v3/${config._infura ? config._infura.key : DEFAULT_INFURA_ID}`;
    default:
      return config.provider.network;
  }
  return 'https://mainnet.infura.io/v3/${DEFAULT_INFURA_ID}'
}

global.provider = (config) => new Promise((resolve, reject) => {
  ethers
  .getDefaultProvider(config.provider.network)
  .getNetwork()
  .then(({ chainId }) => {
    const provider = new WalletConnectProvider({ rpc: { [chainId]: getHost(config) }});
    provider.disable = provider.close;
    resolve(provider);
  })
  .catch(reject)
})
