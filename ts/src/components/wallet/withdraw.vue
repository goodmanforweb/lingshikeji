<template>
<Page :title="$t('m.cjoytx', {unit: unit.toUpperCase() })" borderLine padding routerBack="/wallet">
    <div class="widthdraw" :class="{'wallet-sub': isMobile}" >
        <div class="tcolor f24 fw de-tt" v-if="!isMobile">{{unit}}{{$t('m.tx')}}</div>

        <div :class="`${isMobile ? 're block' :''}`">
            <div :class="`${isMobile ? 'coin-name flex vc' : 'm20'}`">
                <span class="coin-icon" v-if="isMobile">
                    <img  :src="coinimg" alt="">
                </span>
                <div class="tcolor towrap">
                    <span class="f14">{{$t('m.kyye')}}</span>
                    <div><span class="f40 fw">{{value[0]}}</span><span class="f12" v-if="value[1]">.{{value[1]}}</span></div>
                </div>
            </div>

            <div :class="{block: !isMobile}" :style="`${isMobile&& 'padding:16px;'}`">
                <div class="form-row">
                    <label for="" class="tcolor">{{$t('m.txsl')}}</label>
                    <div class="plat-input">
                        <input type="text" v-model="r.value" :placeholder="$t('m.txhint3', {unit})">
                    </div>
                </div>
                <div class="form-row">
                    <label for="" class="tcolor">{{$t('m.txdizhi')}}</label>
                    <div class="plat-input" >
                        <input type="text" v-model="r.to" :placeholder="$t('m.txhint4')">
                    </div>
                </div>
                <div class="form-row">
                    <label for="" class="tcolor">{{$t('m.mima')}}</label>
                    <div class="plat-input">
                        <input type="password" v-model="r.password" :placeholder="$t('m.txhint5')">
                    </div>
                </div>
                <div class="form-row">
                    <label for="" class="tcolor">{{$t('m.yzma')}}</label>
                    <div class="plat-input flex vc">
                        <input type="text" class="flex1" v-model="r.verify_code" :placeholder="$t('m.txhint6')">
                        <el-button class="n-btn f12 tcolor btn-getcode qbk" :loading="codeBtnLoader" @click="getcodeHandle">{{codeBtnText}}</el-button>
                    </div>
                </div>
                <div class="center">
                    <el-button @click="submit" :loading="showLoader" class="tcolor n-btn btn-confirm">{{$t('m.sure')}}</el-button>
                </div>
            </div>

        </div>

        <div class="wi-hint f12 gcolor" style="marginTop: 30px;" v-html="$t('m.txhint',{unit, rate:t.charge_rate || 0})">
        </div>
    </div>
</Page>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import mixin from '../../mixins/index'
import api from '../../../apiconfig';
const blockchainConfig = api.blockchain;
import walletMixin from './mixin'
export default {
    data() {
        return {
            showLoader: false,
            btnLoader: false,
            value:[0],
            coin:'',
            rate:0,
            r: {
                asset:'',
                value:'',
                to:'',
                password:'',
                verify_code:'',
                blockchain:'',
                request_id:''
           }
        }
    },
    mixins: [mixin, walletMixin],
    computed: {
        ...mapGetters(['isMobile','manAssetsLists','userInfo']),
        unit() {
            return this.$route.params.name.toUpperCase();
        },
        t() {
            const r = this.$route.params.name;
            if(!r || util.isEmpty(this.manAssetsLists)) return {charge_rate:0}
            const coin = this.manAssetsLists.find(el => el.asset.symbol == r);
            if(!coin) return {charge_rate:0};
            return {charge_rate: coin.asset.charge_rate}
        }
    },
    created() {
        this.init();
    },
    methods: {
        ...mapActions(['getManAssetsLists']),
        init() {
            this.getUserWallet().then(res => {
                this.value = res.value;
                this.coin = res.coin;
                this.r.asset = this.$route.query.asset;
                this.r.blockchain = blockchainConfig[this.$route.query.block];
                this.decimals = res.decimals;
                this.rate = res.rate;
            });
        },
        freshBalance() {
            this.getManAssetsLists();
        },
        resetForm() {
            this.r = Object.assign(this.r, {
               value:'',
               to:'',
               password:'',
               verify_code:'',
               request_id:''
           })
        },
        submit() {
            if(!this.checkForm()) return;
            this.showLoader = true;
            //value  to 16
            const data = {
                ...this.r,
                value: util.toHex(this.r.value, this.decimals)
            }
            request.toWidthdraw({data})
            .then(res => {
                this.$message.info(this.$t('m.txsuc'));
                this.freshBalance();
                this.resetForm();
                this.resetBtnTicker();
            })
            .catch(err => {
                // this.r.verify_code = '';
                // this.r.request_id  = '';

                // this.resetBtnTicker();
            })
            .finally(() => {
                this.showLoader = false;
            })
        },
        checkForm() {
            const t = ['value', 'to', 'password', 'verify_code'];
            if(t.some(t => !this.r[t])) {
                this.$message.info(this.$t('m.qtxwz'));
                return false;
            }
            if(this.r.value < 1000) {
                this.$message.info(this.$t('m.tx1000'))
                return false;
            }
            if(!this.r.request_id) {
                this.$message.info(this.$t('m.qxhqyzm'));
                return false;
            }

            if(!/^\d{6}$/.test(this.r.verify_code)) {
              this.$message.info(this.$t('m.yzmgsbzq'));
              return false;
          }
            return true;
        },
        getcodeHandle() {
          if(this.codeBtnActive) return false;
          this.verifyMan().then(res => {
              if(res.state == 'succ') {
                  this.toGetCode(res.data, 
                   {    area_code:'',
                        phone: this.userInfo.phone
                   }, (data) => {
                       this.r.request_id = data.request_id;
                   });
              }
          })
      },
    },
    watch: {
        //  manAssetsLists: {
        //     immediate: true,
        //     deep:true,
        //     handler: function() {
        //         this.init();
        //     }
        // }
    }
}
</script>

<style lang="scss">
.pc {
    .widthdraw {
        width: 350px
    }
}
.form-row {
    label {
        font-size: 14px;
    }
    margin-bottom: 16px;
}
.plat-input {
    border-bottom: 1px solid rgba(175, 187, 194, 0.493);
    input {
        margin-top: 10px;
        padding: 4px 2px;
        font-size: 12px;
        border:none;
        outline: none;
        width: 100%;
        color: #086599;
        box-sizing: border-box;
    }
}
 .ts .btn-confirm {
    padding: 0;
    width:79px;
    text-align: center;
    height:30px;
    line-height: 30px;
    color: #086599;
    border-radius:4px;
    border:1px solid rgba(8,101,153,1);

}
.ts .btn-get {
    cursor: pointer;
}
</style>

