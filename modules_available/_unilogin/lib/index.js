const UniLogin = require('@unilogin/provider')

global.provider = (config) => new Promise((resolve, reject) => {
  resolve(UniLogin.create(config.provider.network));
})
