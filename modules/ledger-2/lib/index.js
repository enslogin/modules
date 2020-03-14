const { ethers } = require("ethers");
const { LedgerSigner } = require("@ethersproject/hardware-wallets");

const Web3 = require('web3');



global.provider = (config) => new Promise((resolve, reject) => {
  try {
    const provider = new ethers.providers.InfuraProvider(config.provider.network)
  const signer = new LedgerSigner(provider);


    resolve(signer)
  } catch (e) {
    reject(e)
  }
})


provider({ provider: { network: "homestead" }})
.then(async signer => {

  web3 = new Web3(signer);
  console.log(web3.eth.getAccounts());
  //await signer.signMessage("toto");

})
.catch(console.error)
