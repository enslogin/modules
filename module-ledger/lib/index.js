const { providers }           = require("ethers");
const regeneratorRuntime      = require("regenerator-runtime");
const createLedgerSubprovider = require("@ledgerhq/web3-subprovider").default;
const TransportU2F            = require("@ledgerhq/hw-transport-u2f").default;
const ProviderEngine          = require("web3-provider-engine");
const RpcSubprovider          = require("web3-provider-engine/subproviders/rpc");

global.provider = (config) => new Promise((resolve, reject) => {
	try
	{
		const engine        = new ProviderEngine();
		const getTransport  = () => TransportU2F.create();
		const ledger        = createLedgerSubprovider(getTransport, { accountsLength: 1 });
		const basicProvider = new providers.InfuraProvider(config.provider.network);
		const rpcProvider   = new RpcSubprovider({ rpcUrl: basicProvider.connection.url });
		engine.addProvider(ledger);
		engine.addProvider(rpcProvider);
		engine.start();
		resolve(engine);
	}
	catch (e)
	{
		reject(e);
	}
});
