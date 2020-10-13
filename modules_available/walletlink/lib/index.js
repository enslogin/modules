global.Buffer = require('buffer').Buffer;
global.process = require('process');

const { WalletLink } = require('walletlink');
const ethers = require('ethers');

global.provider = (config) => new Promise((resolve, reject) => {
	const walletLink = new WalletLink({ appName: 'ENSLogin' });
	const p          = ethers.getDefaultProvider(config.provider.network);
	const provider   = (p instanceof ethers.providers.FallbackProvider) ? p.providerConfigs.find(Boolean).provider : p;

	provider
	.send('eth_chainId')
	.then(chainid => {
		const ethereum = walletLink.makeWeb3Provider(provider.connection.url, Number(chainid));
		ethereum.disable = ethereum.close.bind(ethereum);
		resolve(ethereum);
	})
	.catch(reject)
})
