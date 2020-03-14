const UniLogin = require('@unilogin/provider')

global.provider = (config) => new Promise((resolve, reject) => {
  const provider = UniLogin.create(config.provider.network);
  provider.enable = async () => {
    console.info('[unilogin:enable] no such function');
    return provider;
  }
  provider.disable = async () => {
    console.info('[unilogin:disable] no such function');
  }
  resolve(provider);
})
