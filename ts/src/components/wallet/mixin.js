import api from '../../../apiconfig';
import {mapGetters} from 'vuex';
const blockchainConfig = api.blockchain;

export default {
    data() {
        return {
            loader: false,
            coinimg: require('../../assets/images/coin.png')
        }
    },
    computed: {
        ...mapGetters(['manAssetsLists'])
    },
    methods: {
        getUserWallet() {
            if(!this.$route.query.asset || !this.$route.query.block) return Promise.reject();
            let data = {
                asset: this.$route.query.asset,
                blockchain: blockchainConfig[(this.$route.query.block).toUpperCase()]
            }
            this.loader = true;
            return request.createWallet({data})
            .then(res => {
                let value = res.data.value;
                value = value ? util.fromHex(value, res.data.decimals || 18, 4) : '0.0000';
                value = value + '';
                value = value.split('.');
                return {
                    value: value,
                    address: res.data.adress,
                    coin: res.data.blockchain,
                    decimals: res.data.decimals
                }
            })
            .finally(() => {
                this.loader = false;
            })
        },
    },
    watch: {
        manAssetsLists: {
            deep: true,
            immediate: true,
            handler: function(n) {
                if(!util.isEmpty(n) && this.$route.query.asset ) {
                    let t = n.find(el => el.asset.asset == this.$route.query.asset)
                    if(t && t.asset.img) {
                        this.coinimg = t.asset.img;
                    }
                }
            }
        }
    }
}