const { ethers } = require("ethers");
const ENS        = require("./abi/ENS.json");
const RESOLVER   = require("./abi/Resolver.json");

const networks = [
	"ropsten",
	// "rinkeby",
	"goerli",
];

const entries = [
	{ ipfs: 'ipfs://QmbFXCLRrGRRCBftUixcm9xCKqym131U7DfjL4K5zJJH9h', domain: 'authereum.enslogin.eth' },
	{ ipfs: 'ipfs://QmXoGNpe7ErtcZc3y5nLb3aJ5eE2hY2hrepQTpH3BmHJ5m', domain: 'ledger.enslogin.eth'    },
	{ ipfs: 'ipfs://QmZgEymu2FyBYcbiJwuhYmFWXniYjcCFSNPrbqTm3V8sBF', domain: 'metamask.enslogin.eth'  },
	{ ipfs: 'ipfs://QmQh8QXWYhZNPUA2btWtvrC9G5vTocbKJDHGUiw2rnwp1V', domain: 'portis.enslogin.eth'    },
	{ ipfs: 'ipfs://QmQNgtUkYT44VcPfWRthAG16XfKjmwsV9Wtn5kzTBQBhMD', domain: 'torus.enslogin.eth'     },
	// { ipfs: 'http://127.0.0.1/enslogin/enslogin-module-authereum', domain: 'authereum.enslogin.eth' },
	// { ipfs: 'http://127.0.0.1/enslogin/enslogin-module-ledger',    domain: 'ledger.enslogin.eth'    },
	// { ipfs: 'http://127.0.0.1/enslogin/enslogin-module-metamask',  domain: 'metamask.enslogin.eth'  },
	// { ipfs: 'http://127.0.0.1/enslogin/enslogin-module-portis',    domain: 'portis.enslogin.eth'    },
	// { ipfs: 'http://127.0.0.1/enslogin/enslogin-module-torus',     domain: 'torus.enslogin.eth'     },
	{ ipfs: 'http://127.0.0.1/enslogin/enslogin-module-unilogin',  domain: 'unilogin.enslogin.eth'  },
];

const keys = [
	'enslogin',
	'enslogin-default',
]

const updateText = (resolver, domain, node, key, value) => new Promise((resolve, reject) => {
	resolver.text(node, key).catch(resolve).then(current => {
		if (current !== value) {
			resolver.provider.ready.then(network => {
				console.log(`[${network.name}] ${domain}: ${key} => ${value}`);
				resolver.setText(node, key, value).then(resolve).catch(reject);
			});
		} else {
			console.log(`-`);
			resolve();
		}
	});
});

(async () => {
	for (network of networks)
	{
		const provider = ethers.getDefaultProvider(network);
		const wallet   = new ethers.Wallet(process.env.MNEMONIC, provider);
		const chain    = await provider.getNetwork();
		const ens      = new ethers.Contract(chain.ensAddress, ENS.abi, wallet);

		for ({ ipfs, domain } of entries)
		{
			const node = ethers.utils.namehash(domain);
			const resolver = new ethers.Contract(await ens.resolver(node), RESOLVER.abi, wallet);
			for (key of keys)
			{
				await updateText(resolver, domain, node, key, ipfs);
			}
		}
	}

})().catch(console.error)
