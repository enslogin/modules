// import { Buffer } from 'buffer';
// import process from 'process';
// import Authereum from 'authereum';

global.Buffer = require('buffer').Buffer;
global.process = require('process');
const Authereum = require('authereum').default;


global.provider = (config) => new Promise((resolve, reject) => {
  // console.log("====== testing module ======")
  // console.log(new Buffer(0))
  // reject(undefined)
  try {
    const authereum = new Authereum(config.provider.network)
    resolve(authereum.getProvider())
  } catch (err) {
    reject(err)
  }
})
