<template>
    <div class="ex">
        <div class="ex-tt ft18">{{$t('ms.exchange')}}</div>
        <div class="ex-sw flex">
            <div class="es-from es center">
                <span class="f14">{{$t('ms.from')}}</span>
                <div class="f24 kt">{{text.sellerText}}</div>
            </div>
            <div class="es-btn center" @click="swtch" :class="{active: swithBtnIcon}"></div>
            <div class="es-to es center">
                <span class="f14">{{$t('ms.to')}}</span>
                <div  class="f24 kt">{{text.buyerText}}</div>
            </div>
        </div>
        <div class="ex-slider">
            <div class="es-range flex jsb f14 kt">
                <input class="kt f14" type="text" v-model="seller">
                <span>{{seller}}</span>
            </div>
            <div class="es-max f14" v-show="text.sellerText != 'CJT'">{{$t('ms.max')}}:  <span class="kt">{{Math.floor(wallet) | currency}} JLT</span> </div>
        </div>
        <div class="ex-btns center">
            <!-- <div class="btn-round">{{$t('ms.done')}}</div> -->
            <el-button class="btn-round" :loading="exchangeLoader" @click="doExchange">
                {{$t('ms.done')}}
            </el-button>
            <div class="ex-btn-history">
                <router-link :to="{name: 'record'}" class="f14">{{$t('ms.history')}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
let regdecimal = /^\d+(\.\d+)$/,
  regnumber = /^\d+$/;
  import util from 'util';
  import Hub from 'hub';
  import {mapGetters, mapActions} from "vuex";

export default {
    data() {
        return {
            seller: 1,
            text: {
                sellerText: "CJT",
                buyerText: "JLT"
            },
            swithBtnIcon: false,
            exchangeLoader: false

        }
    },
    computed:{
        ...mapGetters(['wallet'])
    },
    methods: {
        ...mapActions(['getWallet']),
        swtch() {
            let { sellerText, buyerText } = this.text;
            [buyerText, sellerText] = [sellerText, buyerText];
            this.text = {
                buyerText,
                sellerText
            };
            this.swithBtnIcon = true;
            setTimeout(() => {
                this.swithBtnIcon = false;
            }, 1500);
        },
        check(n) {
            if (n == "") return true;
            if (regdecimal.test(n) || !regnumber.test(n)) {
                this.$message.info(this.$t("ms.canonlybeinteger"));
                return false;
            }
            if (this.text.sellerText == 'JLT' && (this.wallet < n)) {
                this.$message.info(this.$t("ms.nocanoverrest"));
                return false;
            }

            return true;
        },
        doExchange() {
            this.text.sellerText == 'CJT' ? this.exchange() : this.whithdraw();
        },
        exchange() {
            if(!this.check(this.seller)) return false;
            this.exchangeLoader = true;
            util.exchange({data: {
                total_fee: Number(this.seller),
                bank_type: 'CJT',
                body:'exchange'
            }}, this)
            .then(res => {
                if(res.data.code == 0) {
                    if(res.data.payID) {
                                                // let tt = `http://localhost:8081/#/pay?pay_id=${res.data.payID}&redirect_uri=${encodeURI(window.location.origin)}&hashuri=${encodeURI(window.location.hash.replace('#',''))}`
                        // window.open(tt);
                        Hub.$emit('exchangeDone', {type:'deposit'});
                        window.location.href = `https://testnet.cjoy.games/#/pay?pay_id=${res.data.payID}&redirect_uri=${encodeURI(window.location.origin)}&hashuri=${encodeURI(window.location.hash.replace('#',''))}`
                    }
                    else {
                        this.$message.info(this.$t("ms.cannotgetpayid"));
                    }
                    // this.$message.info(this.$t("ms.exchangesucc"));
                    // Hub.$emit('exchangeDone', {});
                }
            })
            .catch(err => {
              this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {this.exchangeLoader = false})
        },
        whithdraw() {
            if(!this.check(this.seller)) return false;
            this.exchangeLoader = true;
            util.whithdraw({data: {
                total_fee: Number(this.seller),
            }}, this)
            .then(res => {
                if(res.data.code == 0) {
                    this.$message.info(this.$t("ms.exchangesucc"));
                    this.getWallet({ctx: this});
                    Hub.$emit('exchangeDone', {type:'withdraw'});
                }
            })
            .catch(err => {
              this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {this.exchangeLoader = false})
        }
    },
    watch: {
        seller: function(n, o) {
            this.check(n);
        },
    }
}
</script>

<style lang="scss">
.ex {
    background-color: #fff; 
    .ex-sw {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px dashed #D8D8D8;
        justify-content: space-around;
        align-items: center;
    }
    .es-btn {
        cursor: pointer;
        width: 50px;
        height: 20px;
        background: url(../../../assets/images/ex.png) center no-repeat;
        background-size: contain;
    }
    .es-btn.active {
        animation: rot 0.6s linear 1;
    }
    .es {
        span {
            color: #C5C5C5
        }
        div {
            color: var(--goldcolor)
        }
    }
    .ex-btns {
        margin-top: 21px;
        .btn-round {
            border: 1px solid #979797;
            color:var(--goldcolor);
            background-color: transparent;
        }
        a {
            color:#737373
        }
    }
    .es-range, .es-max {
        color: #C5C5C5;
        padding-bottom: 6px;
        margin-bottom: 6px;
    }
    .es-range {
        margin-top: 10px;
        border-bottom: 1px solid #D8D8D8;
        input {
            border:none;
            outline: none;
            max-width: 48%;
        }
        span {
            max-width: 48%;
            overflow: hidden;
        }
    }
    .ex-btn-history {
        line-height: 30px;
    }

}
.ex-tt {
    color:var(--goldcolor)
}




@keyframes rot {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(-180deg);
  }
}

</style>


