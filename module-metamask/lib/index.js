global.provider = (config) => new Promise((resolve, reject) => {
	try
	{
		window.ethereum.isMetaMask
		? resolve(window.ethereum)
		: reject();
	}
	catch (e) { reject(); }
});
