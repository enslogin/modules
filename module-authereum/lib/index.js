const { AuthereumProvider } = require('authereum')

global.provider = (config) => new Promise((resolve, reject) => {
  try {
    const provider = new AuthereumProvider(config.provider.network)
    provider.enable = () => provider.authereum.authenticate()
    resolve(provider)
  } catch (err) {
    reject(err)
  }
})
