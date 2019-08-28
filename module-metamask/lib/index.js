global.provider = (config) => new Promise((resolve, reject) => {
  try {
    window.ethereum.isMetaMask
      ? resolve(window.ethereum)
      : reject(new Error('Provider not found'))
  } catch (err) { reject(err) }
})
