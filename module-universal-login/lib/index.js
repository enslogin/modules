const { providers }    = require('ethers')
const ULIframeProvider = require('@universal-login/provider')

global.provider = (config) => new Promise((resolve, reject) => {
  const provider = ULIframeProvider.createPicker(window.ethereum);
  // const provider = ULIframeProvider.createPicker(new providers.InfuraProvider(config.provider.network));
  provider.enable = async () => {
    console.info('[unilogin:enable] no such function');
    return provider;
  }
  provider.disable = async () => {
    console.info('[unilogin:disable] no such function');
  }
  resolve(provider);
})
