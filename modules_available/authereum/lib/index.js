import Authereum from 'authereum'

global.provider = (config) => new Promise((resolve, reject) => {
  try {
    const authereum = new Authereum(config.provider.network)
    resolve(authereum.getProvider())
  } catch (err) {
    reject(err)
  }
})
