global.Buffer = require('buffer').Buffer;
global.process = require('process');

const Authereum = require('authereum').default;

global.provider = (config) => new Promise((resolve, reject) => {
  try {
    const authereum = new Authereum(config.provider.network)
    resolve(authereum.getProvider())
  } catch (err) {
    reject(err)
  }
})
