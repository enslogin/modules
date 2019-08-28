const { AuthereumProvider } = require("authereum")

global.provider = (config) => new Promise((resolve, reject) => {
  try {
    const provider = new AuthereumProvider(config.provider.network)
    resolve(provider)
  } catch(err) {
    reject(err)
  }
})
