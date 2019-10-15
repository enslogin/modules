global.provider = (config) => new Promise((resolve, reject) => {
  resolve(window.ethereum)
})
