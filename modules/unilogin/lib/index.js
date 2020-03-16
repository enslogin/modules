const UniLogin = require('@unilogin/provider')
const { providers } = require('ethers')

global.provider = (config) => new Promise((resolve, reject) => {
  const provider = UniLogin.create(config.provider.network);

  provider.enable = () => new Promise((resolve, reject) => {
    provider.send(
      { method: 'eth_requestAccounts' },
      (err, res) => {
        if(err)
        {
          reject(err);
        }
        else
        {
          resolve(provider);
        }
      }
    )
  })

  provider.disable = () => new Promise((resolve, reject) => {
    console.info('[unilogin:disable] no such function');
    resolve();
  })

  resolve(provider);
})
