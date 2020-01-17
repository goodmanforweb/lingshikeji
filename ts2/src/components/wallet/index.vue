<template>
<Page :title="$t('m.wallet')" borderLine padding>
    <div class="wallet">
        <div class="flex sb" :class="{v: isMobile}">
            <Scroll :fetch='fetch' trigger :disable="!isMobile">
                <div class="coin-lists">
                    <div :class="`coin-list ${isMobile ? ' block m16' : ' flex'}`" v-for="(list, index) in lists" :key="index">
                        <div class="coin-name flex vc" :class="{borderLine: isMobile}">
                            <span class="coin-icon">
                                <img :src="list.icon" alt="">
                            </span>
                            <div class="tcolor">
                                <span class="fw">{{list.name}}</span>
                                <div>
                                    <span class="f40 fw">{{list.value[0]}}</span>
                                    <i class="f12" v-if="list.value[1]">.{{list.value[1]}}</i>
                                </div>
                            </div>
                        </div>

                        <div class="coin-handle flex" :class="{sb: isMobile}">
                            <div class="cp flex v vc hc ch" :class="{block: !isMobile}" v-for="(hand, idx) in list.handle" :key="idx" @click='handlePanel(hand)'>
                                <span :class="`b-icon icon-${hand.icon}`"></span>
                                <span class="tcolor fw">{{$t(`m.${hand.text}`)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Scroll>
            <div class="wallet-aside flex v fe" v-if="!isMobile" style="width: 120px;margin:16px auto;">
                <div class="kj-pager flex sb">
                    <span class="kj-la"></span>
                    <span class="kj-ra"></span>
                </div>
            </div>
            <RightPanel :show.sync="panelShow"  :fullScreen="fullScreen" :class="{depositPanel: cname=='deposit', widthdrawPanel: cname=='withdraw', recordPanel: cname=='record'}">
                <component  :is="panel" @update:show="val => panelShow = val"></component>
            </RightPanel>
        </div>
    </div>
</Page>
</template>
<script>
import RightPanel from '../widgets/panel/rightpanel';
import Deposit from './deposit';
import Record from './precord';
import Withdraw from './withdraw';
import {mapGetters} from 'vuex';
export default {
    components: {
        RightPanel
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    data() {
        return {
            fullScreen: false,
            panelShow: false,
            panel: Deposit,
            cname: 'deposit',
            lists: [
                {
                    name: 'CJOY',
                    icon: require('../../assets/images/coin.png'),
                    value: '9089.98'.split('.'),
                    handle: [
                        {
                            text:'cz',
                            name: 'deposit',
                            icon:'deposit'
                        },
                        {
                            text: 'tx',
                            name:'withdraw',
                            icon: 'withdraw'
                        },
                        {
                            text: 'jyjl',
                            name:'record',
                            icon: 'record'
                        }
                    ]
                },
                {
                    name: 'CJS',
                    icon: require('../../assets/images/coin.png'),
                    value: '9089.98'.split('.'),
                    handle: [
                        {
                            text:'buy',
                            name:'buy',
                            icon:'buy'
                        },
                        {
                            text: 'tx',
                            name:'withdraw',
                            icon: 'withdraw'
                        },
                        {
                            text: 'jyjl',
                            name:'record',
                            icon: 'record'
                        }
                    ]
                },
                {
                    name: 'DAI',
                    icon: require('../../assets/images/trian.png'),
                    value: '9089.98'.split('.'),
                    handle: [
                        {
                            text:'cz',
                            name: 'deposit',
                            icon:'deposit'
                        },
                        {
                            text: 'tx',
                            name: 'withdraw',
                            icon: 'withdraw'
                        },
                        {
                            text: 'jyjl',
                            name: 'record',
                            icon: 'record'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        handlePanel(hand) {
            let type = null;

            if(this.isMobile) {
                return this.$router.push(hand.name);
            }
            type = {
                deposit: Deposit,
                record: Record,
                withdraw: Withdraw,
                buy: () => ''
            }[hand.name];
            this.fullScreen = hand.name == 'record';
            this.cname = hand.name;
            this.panel = type;
            this.panelShow = true;
        },
        fetch() {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    this.lists.push({
                        name: 'DAI',
                        icon: require('../../assets/images/trian.png'),
                        value: '9089.98'.split('.'),
                        handle: [
                            {
                                text:'充值',
                                name: 'deposit',
                                icon:'deposit'
                            },
                            {
                                text: '提现',
                                name: 'withdraw',
                                icon: 'withdraw'
                            },
                            {
                                text: '交易记录',
                                name: 'record',
                                icon: 'record'
                            }
                        ]
                    });
                    resolve();
                    }
                , 5000)
            })
            // return Promise.resolve();
        }
    }
}
</script>
<style lang="scss">

.coin-name {
    .coin-icon {
        width:50px;
        margin-right: 20px;
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
    .block:nth-of-type(2) {
        margin: 0 16px;
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

