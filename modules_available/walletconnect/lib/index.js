global.Buffer = require('buffer').Buffer;
global.process = require('process');

const WalletConnectProvider = require('@walletconnect/web3-provider').default;

global.provider = (config) => new Promise((resolve, reject) => {
  const provider = new WalletConnectProvider({
    infuraId: config._infura ? config._infura.key : '27e484dcd9e3efcfd25a83a78777cdf1'
  });
  provider.disable = provider.close;
  resolve(provider);
})
