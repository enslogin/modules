import WalletLink from 'walletlink'
import ethers from 'ethers'

global.provider = (config) => new Promise((resolve, reject) => {
	const walletLink = new WalletLink({ appName: 'ENSLogin' })
	const p          = ethers.getDefaultProvider(config.provider.network)
	const provider   = (p instanceof ethers.providers.FallbackProvider) ? p.providerConfigs.find(Boolean).provider : p

	provider
	.send('eth_chainId')
	.then(chainid => {
		resolve(walletLink.makeWeb3Provider(provider.connection.url, Number(chainid)))
	})
	.catch(reject)
})
