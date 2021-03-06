export default {
    getPool: ["/cjpool", "get", 1],
    buyPool: ["/cjpool", "post", 1],
    getAccList: ['/cjpool-accelerates', 'get', 1],
    getTransfer: ['/cjpool-transfers', 'get', 1],
    buy: ['/cjpool-buy', 'post', 1],
    sell: ['/cjpool-sell', 'post', 1],
    getMachine: ['/cjpool-machines', 'get', 1],
    getSku: ['/cjpool-skus', 'get', 1],
    
    buyEnergy: ['/cjpool-buy-energy', 'post', 1],
    mine: ['/cjpool-mint', 'post', 1],
    getRatio: ['/cjpool-energy-ratio', 'get', 1]
    
}