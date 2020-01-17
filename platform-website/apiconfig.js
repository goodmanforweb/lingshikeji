export default {
    production: {
        url: 'api.cjoy.games:4430',
        assetid: '0x0717669dc3454013868ccf8c6fbc0eaec63a4ba5',
        blockHeight: 6774387
    },
    development: {
        url: 'testnetapi.cjoy.games',
        // url: '172.16.20.153:1948',
        assetid: '0xb141a04177e66f171302d979ea79d04540e90b79',
        blockHeight: 4506794
    },

}[process.env.sign];