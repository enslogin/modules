global.provider = (config) => new Promise((resolve, reject) => {
  if (window.ethereum.autoRefreshOnNetworkChange)
  {
    window.ethereum.autoRefreshOnNetworkChange = false;
  }
  resolve(window.ethereum);
})
