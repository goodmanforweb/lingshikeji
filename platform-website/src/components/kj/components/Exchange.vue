<template>
     <Kjbox class="rapid-exchange ">
                <span class="highlight pd pot" v-if="!good">{{$t("ms.ksdh")}}</span>
               <div class="a-hd">
                    <p class="balance center"><img  src="../assets/images/wallet.png" alt=""><i>{{Math.floor(wallet) | currency}} {{walletUnit}}</i> </p>
                <div class="exchange flex">
                    <div class="ex-seller">
                        <div class="ex-item">{{extext.CJT}}</div>
                        <input type="text" class="ex-input" v-model="amount">
                    </div>
                    <div class="ex-center">
                        <div class="ex-center-icon" :class="{active: rot}" @click="swith"></div>
                    </div>
                    <div class="ex-seller">
                        <div class="ex-item">{{extext.SUC}}</div>
                        <input type="text" class="ex-input" disabled :value="amount"/>
                    </div>
                </div>
               </div>
                <el-button  class="a-btn" type="primary" round @click="exchange" :loading="btnLoader">{{$t("ms.dh")}} </el-button>
                <p class="center ex-hint" v-if="!good"><router-link to="/kj/exchange">{{$t("ms.xxjlck")}}</router-link> </p>
          </Kjbox>
</template>
<script>
let regdecimal = /^\d+(\.\d+)$/,
  regnumber = /^\d+$/;
import util from "util";
import { mapGetters, mapActions } from "vuex";
import apiconfig from "apiconfig";
import Big from "bignumber.js";
export default {
  props: ["good"],
  data() {
    return {
      rot: false,
      extext: { CJT: "CJT", SUC: "SUC" },
      amount: 100,
      btnLoader: false,
      cjtid: apiconfig.assetid,
      wallet: "",
      walletUnit: "CJT"
    };
  },
  computed: {
    ...mapGetters(["asset", "pool"])
  },
  created() {
    if (!this.asset[this.cjtid]) {
      this.getAsset({ ctx: this, asset: this.cjtid });
    }
    this.setWallet();
  },
  methods: {
    ...mapActions(["getAsset", "getPool"]),
    setWallet() {
      if (this.asset[this.cjtid]) {
        this.wallet =
          this.extext.CJT == "CJT"
            ? this.asset[this.cjtid].value
            : this.pool.Balance;
        this.walletUnit = this.extext.CJT;
      }
    },
    check(n) {
      if (n == "") return true;
      if (regdecimal.test(n) || !regnumber.test(n)) {
        this.$message.info(this.$t("ms.canonlybeinteger"));
        return false;
      }
      if (Big(n).isGreaterThan(this.wallet)) {
        this.$message.info(this.$t("ms.nocanoverrest"));
        return false;
      }
      return true;
    },
    swith() {
      this.rot = true;
      setTimeout(() => {
        this.rot = false;
      }, 1000);

      let { CJT, SUC } = this.extext;
      [SUC, CJT] = [CJT, SUC];
      this.extext = {
        SUC,
        CJT
      };
      this.setWallet();
    },
    exchange() {
      if (!this.check(this.amount)) return false;
      this.extext.CJT == "CJT" ? this.buy() : this.sell();
    },
    resetVuex() {
      if (this.extext.CJT == "CJT") {
        this.$store.commit("calcAsset", {
          asset: this.cjtid,
          value: -Number(this.amount)
        });
        this.$store.commit("calcPool", { value: Number(this.amount) });
      } else {
        this.$store.commit("calcAsset", {
          asset: this.cjtid,
          value: Number(this.amount)
        });
        this.$store.commit("calcPool", { value: -Number(this.amount) });
      }
    },
    resetBalance() {
      this.resetVuex();
      this.getAsset({ ctx: this, asset: this.cjtid });
      this.getPool({ ctx: this });
    },
    buy() {
      this.btnLoader = true;
      util
        .buy(
          {
            data: {
              value: Big(this.amount)
                .times(1e4)
                .toNumber()
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.data.code == 0) {
            const dataArr = res.data.pool;
            this.$message.info(this.$t("ms.exchangesucc"));
            this.$emit("exchangeSuc");
            this.resetBalance();
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.btnLoader = false;
        });
    },
    sell() {
      this.btnLoader = true;
      util
        .sell(
          {
            data: {
              value: Big(this.amount)
                .times(1e4)
                .toNumber()
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.data.code == 0) {
            const dataArr = res.data.pool;
            this.$message.info(this.$t("ms.exchangesucc"));
            this.$emit("exchangeSuc");
            this.resetBalance();
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.btnLoader = false;
        });
    }
  },
  watch: {
    amount(n) {
      this.check(n);
    },
    asset: {
      deep: true,
      handler: function() {
        this.setWallet();
      }
    }
  }
};
</script>
<style lang="scss" >
.rapid-exchange {
  flex: 2;
}
.rapid-exchange {
  button.a-btn {
    display: block;
    width: 50%;
    height: 50px;
    margin: 0 auto;
    font-size: 1.5rem;
    border-radius: 50px;
  }
  .ex-hint {
    font-size: 1.2rem;
    a:hover {
      text-decoration: underline;
    }
  }
}
.balance {
  margin: 2rem 0;
  cursor: pointer;
  img {
    width: 25px;
    vertical-align: middle;
    padding-right: 10px;
  }
  i {
    vertical-align: middle;
    font-size: 1.6rem;
  }
}
.exchange {
  width: 80%;
  margin: 0 auto;
}
.a-hd {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.ex-seller {
  flex: 2;
  font-size: 1.5rem;
}
.ex-center {
  flex: 1;
  position: relative;
  .ex-center-icon {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 35px;
    height: 35px;
    background: url(../assets/images/exchange.png) no-repeat center center;
    background-size: contain;
    cursor: pointer;
  }
  .ex-center-icon.active {
    transition: all 0.3s linear;
    animation: rott 0.3s linear 1;
  }
}
.ex-item {
  line-height: 3.125rem;
  width: 100%;
  text-align: center;
  color: #000;
  background-color: #fff;
  border-radius: 30px;
  margin-bottom: 1.5rem;
}
.ex-input {
  border: 1px solid #fff;
  border-radius: 30px;
  line-height: 3.125rem;
  height: 3.125rem;
  width: 100%;
  padding: 0 20px;
  outline: none;
  box-sizing: border-box;
  font-size: inherit;
  color: #cdcdcd;
}
@keyframes rott {
  0% {
    transform: rotateZ(0);
  }
  50% {
    transform: rotateZ(-90deg);
  }
  100% {
    transform: rotateZ(-180deg);
  }
}
</style>


