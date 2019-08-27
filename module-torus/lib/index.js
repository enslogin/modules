const Torus = require("@toruslabs/torus-embed");

window.provider = (config) => new Promise((resolve, reject) => {
	const torus = new Torus.default();
	torus.init()
	.then(() => {
		torus.setProvider(config.provider.network);
		torus.provider.disable = () => {
			torus.logout();
			torus.hideTorusButton();
		};
		resolve(torus.provider);
	})
	.catch(reject);
});
