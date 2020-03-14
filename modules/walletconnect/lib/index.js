const WalletConnectProvider = require('@walletconnect/web3-provider')

global.provider = (config) => new Promise((resolve, reject) => {
  const provider = new WalletConnectProvider({
    infuraId: this.state.config._infura ? this.state.config._infura.key : '27e484dcd9e3efcfd25a83a78777cdf1'
  });
  provider.disable = async () => {
    provider.close();
  }
  resolve(provider);
})
