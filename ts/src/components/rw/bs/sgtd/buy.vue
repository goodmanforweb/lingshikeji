<template>
    <transition name='fade'>
        <div class="bs-sgxm-box center" v-show="show">
            <div class="tcolor f20 ">{{$t('m.sgsl',{coin: uint[0]})}}</div>
            <input type="number" class="bs-buy-input" v-model="amount">
            <div class="tcolor">
                <span>{{$t('m.heji')}}</span>
                <span class="f22">{{value + ' ' + uint[1]}}</span>
                <div class="f12 pt16">{{$t('m.dqzdsgedu')}}: {{maxBuy + " " + uint[0]}}</div>
            </div>
            <div class="btn-wrap" :class="{m16: isMobile}">
                <el-button class="bt-buy-btn bs-btn" :loading="loader" @click="buy">{{$t('m.sure')}}</el-button>
            </div>
        </div>
    </transition>
</template>
<script>
import verifyman from '../../../../mixins/index';
import Big from 'bignumber.js'
import {mapGetters} from 'vuex'
import Hub from '../../../../Hub.js'
export default {
    props: ['show','info','uint'],
    data() {
        return {
            loader: false,
            amount: 0
        }
    },
    computed: {
        ...mapGetters(['getBalance','signHYDetail','isMobile']),
        balance() {
            // return this.getBalance(this.uint[1].toLowerCase())
            return this.signHYDetail.chubeitotal || 0;
        },
        value() {
            if(!this.amount || !this.info.rate) return 0;
            return Big(this.amount).times(this.info.rate).toFixed(4, 1)
        },
        rest() {
            if(util.isEmpty(this.info)) return 0;
            return Number(Big(this.info.total).minus(this.info.finished).toFixed(4, 1));
        },
        maxBuy() {
            if(!this.info.rate || !this.balance) return 0;
            const  t = Big(this.balance).div(this.info.rate).toFixed(2, 1);
            return Math.min(this.rest, Number(t));
        }
    },
    mixins:[verifyman],
    methods: {
        check() {
            if(!this.info.id) return false;
            if(this.amount <= 0) return false;
            if(this.value > this.balance) {
                this.$message.info(this.$t('m.yuebuzu'));
                return false
            }
            if(Number(this.amount) > this.rest) {
                this.$message.info(this.$t('m.bunengcguo'));
                return false;
            }
            return true;
        },
        buy() {
            if(!this.check() || this.loader) return;
            this.verifyMan().then(res => {
                if(res.state == 'succ') {
                    this.loader = true;
                    request.buyToken({
                        token_id: this.info.id,
                        value: Number(this.amount),
                        challenge: res.data.geetest_challenge,
                        validate:res.data.geetest_validate,
                        seccode:res.data.geetest_seccode,
                        flag: this.flag,
                    })
                    .then(res => {
                        this.$message.info(this.$t('m.sgsuc'));
                        this.$emit('buysuc', true);
                        Hub.$emit('sgsuc', true)
                    })
                    .finally(() => {
                        this.loader = false;
                    })
                }
            })
            
        }
      
      
    },
    watch: {
        amount: function(n) {
            if(Number(n) > Number(this.info.total)) {
                this.$message.info(this.$t('m.bunengcguo'));
                this.amount = Number(this.info.total);
            }
             if(this.value > this.balance) {
                this.$message.info(this.$t('m.yuebuzu'));
                this.amount = Math.floor(Big(this.balance).div(this.info.rate).toNumber())
            }
        }
    }
}
</script>
<style lang="scss">

.bs-sgxm-box {
    // overflow: hidden;
    transition: all .2s ease-in-out;
    padding: 16px;
    box-sizing: border-box;
    background-color: #DAE9F0;
    border-radius: 4px;
    box-shadow: 0px 8px 25px 0px rgba(25, 101, 147, 0.5);

}
</style>

