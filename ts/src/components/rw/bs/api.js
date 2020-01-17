const api = {
    getYBJLists: ['/v1/contract/presell', 'get', 1],
    getLIXILists: ['/v1/contract/earnings', 'get', 1],
    getSGLists: ['/v1/contract/subscribe','get', 1],
    buySGlists: ['/v1/contract/token','get', 1],
    buyToken: ['/v1/contract/subscribe','post', 1],
    getcjctokey: ['/v1/contract/dtbcprice','get',1]

}

export default api;