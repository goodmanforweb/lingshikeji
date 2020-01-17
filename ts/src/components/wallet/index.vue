<template>
<Page :title="$t('m.wallet')" borderLine padding routerBack="/index">
    <div class="wallet">
        <div class="flex sb" :class="{v: isMobile}">
          
            <div class="coin-lists" v-loading="!isMobile && loader" >
                <div :class="`coin-list ${isMobile ? ' block m16' : ' flex'}`" v-for="(list, index) in lists" :key="index">
                    <div class="coin-name flex vc" :class="{borderLine: isMobile}">
                        <span class="coin-icon">
                            <img :src="list.icon" alt="">
                        </span>
                        <div class="tcolor">
                            <span class="fw">{{list.name | toUpperCase}}</span>
                            <div>
                                <span class="f40 fw towrap">{{list.value[0]}}</span>
                                <i class="f12" v-if="list.value[1]">.{{list.value[1]}}</i>
                            </div>
                        </div>
                    </div>

                    <div class="coin-handle flex" :class="{sb: isMobile}" v-loading='list.walletLoader'>
                        <div class="cp flex v vc hc ch" :class="{block: !isMobile}" v-for="(hand, idx) in list.handle" :key="idx" @click='handlePanel(hand, list)'>
                            <span :class="`b-icon icon-${hand.icon}`"></span>
                            <span class="tcolor fw">{{$t(`m.${hand.text}`)}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <RightPanel routerBack="/wallet" :show.sync="panelShow"  :fullScreen="fullScreen" :class="{depositPanel: cname=='deposit', widthdrawPanel: cname=='withdraw', recordPanel: cname=='record'}">
                <!-- <component  :panelData="panelData" :is="panel" @update:show="val => panelShow = val"></component> -->
                <router-view></router-view>
            </RightPanel>
        </div>
    </div>
</Page>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import api from '../../../apiconfig';
const blockchainConfig = api.blockchain;
const codeConfig = {
    withdraw: {
        code: 1,
        cube: () => ({
            text: 'tx',
            name:'withdraw',
            icon: 'withdraw'
        })
    },
    deposit: {
        code: 2,
        cube: () => ({
            text:'cz',
            name: 'deposit',
            icon:'deposit'
        })
    },
    buy: {
        code: 4,
        mustname:'cjs',
        cube: () => ({
            text:'buy',
            name:'buy',
            icon:'buy'
        })
    }
}
export default {
    computed: {
        ...mapGetters(['isMobile','manAssetsLists'])
    },
    data() {
        return {
            disable: true,
            loader: false,
            panelData: {},
            fullScreen: false,
            panelShow: false,
            cname:'',
            lists: []
        }
    },
    created() {
        this.disable = !this.isMobile;
        this.size = 3;
        this.pager = 0;
        this.count = 1;

        this.panelShow = this.$route.matched.length > 1;
        this.fullScreen = this.$route.name == 'precord';
    },
    methods: {
        ...mapActions(['getManAssetsLists']),
        jumpHandle() {
            if(util.isEmpty(this.lists)) return;
            const {coin, type} = this.$route.query;
            if(coin && type) {
                const t = this.lists.find(el => el.name === coin)
                if(t) {
                   setTimeout(() => {
                        this.handlePanel({name: type}, t)
                   }, 800)
                }
            }
        },
        createWallet(item) {
            let d = {};
            item.walletLoader = true;

            let blockchain = (item.asset.blockchain+'').toUpperCase();
            blockchain = blockchainConfig[blockchain];
            return request.createWallet({data: {asset:item.asset.asset, blockchain}})
            .then(res => {
                this.lists.forEach(el => {
                    if(el.asset.asset == res.data.asset) {
                        res.data.value = util.fromHex(res.data.value, res.data.decimals || 0, 4);
                        el.account = res.data;
                        this.$store.commit('givenManAssetsLists', this.lists);
                        if(el.asset.symbol == 'cjs') {
                            this.$store.commit('givenUserAccount', Object.assign(el.asset, el.account));
                        }
                        if(el.asset.symbol == 'cjoy') {
                            this.$store.commit('givenCjoyAccount', Object.assign(el.asset, el.account));
                        }
                    }
                });
            })
            .finally(() => {
                item.walletLoader  = false;
            })
        },
         handlePanel(hand, item) {
            let type = null;
            if(hand.name === 'buy' && (item.name === 'cjs')) {
                return this.$router.push('cjs')
            }
            // if(util.isEmpty(item.account)) {
            //     this.createWallet(item).then(() => {
            //         this.handleP(hand, item);
            //     })
            // } 
            // else {
            //     this.handleP(hand, item);
            // }
            this.handleP(hand, item);
        },
        handleP(hand, item) {
            if(this.isMobile) {
                return this.$router.push({path: `/${item.name.toLowerCase()}/${hand.name}`, query: {asset: item.asset.asset, block: item.asset.blockchain}});
            }
            else {
                this.fullScreen = hand.name == 'record';
                this.panelShow = true;
                this.cname = hand.name;
                return this.$router.push({path: `/wallet/${item.name.toLowerCase()}/${hand.name}`, query: {asset: item.asset.asset,block: item.asset.blockchain}});
            }
        },
        decideHand(el) {
            const status = el.asset.status, name = el.asset.symbol;
            let store = [
                {
                    text: 'jyjl',
                    name:'record',
                    icon: 'record'
                }];
            for(let i in codeConfig) {
                if((status&(codeConfig[i].code)) == (codeConfig[i].code)) {
                    if(codeConfig[i].mustname) {
                        if(codeConfig[i].mustname == name) {
                            store.unshift(codeConfig[i].cube())
                        }
                    }
                    else {
                        store.unshift(codeConfig[i].cube())
                    }
                }
            }
            return store
        },
        WalletListsHandler(res) {
            if(util.isEmpty(res)) return 
            this.lists = res.map(el => {
                let value = 0;
                if(!util.isEmpty(el.account)) {
                    value = el.account.value || 0;
                }
                value = util.fix(value, 4) + '';
                value = value.split('.');
                return {
                    ...el,
                    name: el.asset.symbol,
                    icon: el.asset.img || require('../../assets/images/coin.png'),
                    value: value,
                    handle: this.decideHand(el),
                    walletLoader: false
                }
            });
        }
    },
    watch: {
        $route: function(n) {
            if(n.name == 'wallet') {
                this.panelShow = false
            }
        },
        manAssetsLists: {
            deep: true,
            immediate: true,
            handler: function(n) {
                this.loader = true;
                if(!util.isEmpty(n)) {
                    this.loader = false;
                    this.WalletListsHandler(n);
                }
            }
        },
        lists: {
            deep: true,
            immediate: true,
            handler: function(n) {
                this.jumpHandle();
            }
        }

    }

}
</script>
<style lang="scss">

.coin-name {
    .coin-icon {
        width:50px;
        min-width: 50px;
        margin-right: 20px;
    }
}
.pc {
    .coin-name {
        min-width: 250px;
        max-width: 300px;
        width: 300px
    }
}
.coin-handle {
    .block {
         width: 120px;
        height: 120px;
    }
    .block,.ch {
        .b-icon {
            background-repeat: no-repeat;
            background-position: center;
        }
        .icon-deposit {
            background-image: url(../../assets/images/deposit.png)
        }
        .icon-withdraw {
            background-image: url(../../assets/images/withdraw.png)
        }
        .icon-record {
            background-image: url(../../assets/images/record.png)
        }
         .icon-buy {
            background-image: url(../../assets/images/buy.png)
        }
    }
    .block {
        margin: 0 16px;
    }
    .block:first-of-type {
        margin-left: 0
    }
    .block:last-of-type {
        margin-right: 0
    }
}
.pc {
    .coin-list {
        margin: 16px 0;
    }
    .coin-name {
        border-bottom: 1px solid #AFBBC2;
        margin-right: 32px;
        padding-right: 60px;
    }
    .coin-handle {
        .block {
            .b-icon {
                height: 40px;
                width: 30px;
                background-size: 30px;
                margin-bottom: 8px;
            }
        }
    }
    .wallet-aside {
        margin: 16px 0 16px 16px;
        width: 120px;
    }
}
.mobile {
    .coin-name {
        margin-bottom: 16px;
        padding-bottom: 16px;
    }
    .coin-handle {
        .ch {
            .b-icon {
                height: 30px;
                width: 26px;
                background-size: 20px;
            }
        }
    }

}
</style>

