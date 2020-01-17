<template>
    <div class="exchange-panel" :class="{active: rightPanel, xscreen: isBigScreen}"  ref="exchangePanel">
        <div class="ex-hd">
            <i class="el-icon-arrow-left" v-if="isBigScreen" @click="closeRightPanel"></i>
            {{$t("ms.exchangecenter")}}
        </div>
        <div class="ex-bd">
            <p class="ex-rest">
             <img src="../assets/images/exwallet.png">
            {{balancerest | currency}} {{balancerestuint}}
            </p>
            <p class="ex-info"><i class="el-icon-info"></i> {{$t("ms.exchangeinfo")}}</p>
            <div class="ex-blocks flex">
                <div class="input-bk flex1">
                    <div class="coin">{{text.sellerText}}</div>
                    <br>
                    <el-input type="text" v-model="seller" ></el-input>
                </div>
                <div class="switch-btn flex"  >
                  <el-button class="switch-btn-icon"  @click="switchExchange" :class="{active: swithBtnIcon}" :loading="switchloader" ></el-button>
                </div>
                <div class="input-bk flex1">
                    <div class="coin">{{text.buyerText}}</div>
                    <br>
                    <el-input type="text" :value="buyer" :disabled="true"></el-input>
                </div>
            </div>
            <el-button type="warning" @click="exchange" :loading="exchangeLoader">{{$t("ms.exchange")}}</el-button>
        </div>
        <div class="ex-hd exchangerecord">{{$t("ms.exchangerecord")}}</div>
        <div class="ex-bd echangeTable flex1" ref="echangeTable">
            <el-table
                :data="exchangeHistory"
                style="width: 100%"
                :height="exchangeTableHeight"
                v-loading="exchangeHistoryLoader"
                v-loadmore="loadMore"
                >
                <el-table-column
                    prop="time"
                    class-name="his-motime"
                    :width="isMobile ? 90 : 'auto'"
                    :label="$t('ms.time')">
                </el-table-column>
                <el-table-column
                    prop="exchangepare"
                    :label="$t('ms.exchangepare')">
                </el-table-column>
                <el-table-column
                    prop="value"
                    :label="$t('ms.amount')">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Big from "bignumber.js";

let regdecimal = /^\d+(\.\d+)$/,
  regnumber = /^\d+$/;

export default {
  data() {
    return {
      exchangeHistory: [],
      seller: "",
      text: {
        sellerText: "CJT",
        buyerText: "UPC"
      },
      echangeRate: 10,
      exchangeLoader: false,
      exchangeHistoryLoader: false,
      switchloader: false,
      exchangeTableHeight: 200,
      balancerest: "",
      balancerestuint: "CJT",
      swithBtnIcon: false,
      panelHeight: "auto",
      isMobile: window.innerWidth > 700,
      isBigScreen: window.innerWidth < 1500
    };
  },
  props: {
    firstMessageHasCome: Boolean
  },
  computed: {
    ...mapGetters(["rightPanel", "balance"]),
    buyer: {
      set: function() {},
      //cjt=>upc 1:10
      get: function() { 
        return Big(this.seller || 0).times(this.echangeRate).toNumber();
      }
    }
  },
  created() {
    this.pager = 0;
    this.count = null;
    this.size = 5;
    window.addEventListener("resize", this.ajust, false);
    this.balancerest = this.balance.balance;
    this.balancerestuint = "CJT";
    // this.switchExchange();
  },
  mounted() {
    this.setPanelSize();
    this.setTableHeight();
    this.size = Math.ceil(
      this.$refs.echangeTable.clientHeight / (this.isMobile ? 50 : 25)
    );
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.ajust, false);
  },
  methods: {
    ajust() {
      this.ajustPanel();
      this.setTableHeight();
    },
    ajustPanel() {
      this.isBigScreen = window.innerWidth < 1500;
    },
    setPanelSize() {
      if (!this.isMobile) return false;
      this.$refs.exchangePanel.style.width =
        document.querySelector(".game-right").clientWidth + "px";
    },
    setTableHeight() {
      this.$nextTick(() => {
        this.exchangeTableHeight = this.$refs.echangeTable.clientHeight;
      });
      console.log(this.exchangeTableHeight, 45);
    },
    closeRightPanel() {
      this.$store.commit("givenRightPanel", false);
    },
    check(n) {
      if (n == "") return true;
      if (regdecimal.test(n) || !regnumber.test(n)) {
        this.$message.info(this.$t("ms.canonlybeinteger"));
        return false;
      }
      if (Big(n).isGreaterThan(this.balancerest)) {
        this.$message.info(this.$t("ms.nocanoverrest"));
        return false;
      }
      return true;
    },
    freshWalletRest() {
      this.balancerest =
        this.text.sellerText == "CJT"
          ? this.balance.balanceofcjt
          : this.balance.balance;
      this.balancerestuint = this.text.sellerText;
    },
    exchange() {
      const type = {
        CJT: "buy",
        UPC: "sell"
      }[this.text.sellerText];
      this.exchangeLoader = true;
      this.$parent.wssend(
        type,
        {
          value: Big(Math.round(this.seller))
            .times(100)
            .valueOf()
        },
        data => {
          this.exchangeLoader = false;
          this.buyer = 0;
          this.$message.info(this.$t("ms.exchangesucc"));
          let { balance, balanceofcjt } = data;
          balance = Big(balance)
            .div(100)
            .valueOf();
          balanceofcjt = Big(balanceofcjt)
            .div(100)
            .valueOf();
          this.$parent.givenBalanceToStore({ balance, balanceofcjt });
          //刷新历史记录
          this.pager = 0;
          this.exchangeHistory = [];
          this.loadMore();
        },
        () => {
          this.exchangeLoader = false;
          this.buyer = 0;
          this.$message.info(this.$t("ms.exchangefail"));
        }
      );
    },
    switchExchange() {
      let { sellerText, buyerText } = this.text;
      [buyerText, sellerText] = [sellerText, buyerText];
      this.text = {
        buyerText,
        sellerText
      };
      this.echangeRate = sellerText == 'CJT' ? 10 : 0.1;
      this.swithBtnIcon = true;
      setTimeout(() => {
        this.swithBtnIcon = false;
      }, 1500);
      this.switchloader = true;
      this.$parent.wssend("balance", {}, data => {
        let { balance, balanceofcjt } = data;
        this.switchloader = false;
        balance = Big(balance)
          .div(100)
          .valueOf();
        balanceofcjt = Big(balanceofcjt)
          .div(100)
          .valueOf();
        this.$parent.givenBalanceToStore({ balance, balanceofcjt });
      });
    },
    loadMore() {
      if (this.exchangeHistoryLoader) return;
      if (this.count) {
        if (this.pager * this.size >= this.count) {
          return false;
        }
      }
      this.pager++;
      this.getExchangeHistory();
    },
    getExchangeHistory() {
      let filters = this.$options.filters;
      this.exchangeHistoryLoader = true;
      this.$parent.wssend(
        "exchangeHistory",
        { pager: this.pager, size: this.size },
        data => {
          this.exchangeHistoryLoader = false;
          let result =
            data.count > 0 &&
            data.orders.map(el => ({
              time: filters.format(el.createtime),
              value: filters.currency(
                Big(el.value)
                  .div(100)
                  .valueOf()
              ),
              exchangepare: { true: "CJT/UPC", false: "UPC/CJT" }[el.buy]
            }));

          this.exchangeHistory = this.exchangeHistory.concat(result);
          this.count = data.count;
        }
      );
    }
  },
  watch: {
    seller: function(n, o) {
      this.check(n);
    },
    rightPanel: function(n) {
      if (n) {
        this.loadMore();
        this.setTableHeight();
        this.switchExchange();
      }
    },
    firstMessageHasCome: function(n) {
      if (n) {
        this.loadMore();
        this.switchExchange();
      }
    },
    balance: {
      deep: true,
      handler: function() {
        this.freshWalletRest();
      }
    }
  }
};
</script>
<style lang="scss">
.exchange-panel {
  will-change: transform;
  display: flex;
  flex-direction: column;
  .echangeTable {
    overflow: hidden;
    .el-table {
      // height: 100%;
    }
  }
  .ex-rest img {
    width: 20px;
    vertical-align: middle;
  }
  .switch-btn {
    align-items: center;
    justify-content: center;
    .switch-btn-icon {
      display: block;
      background: url(../assets/images/exchangeicon.png) no-repeat center center;
      background-size: 60% auto;
      width: 40px;
      height: 40px;
      cursor: pointer;
      position: relative;
      padding: 0;
    }
    .switch-btn-icon.active {
      animation: rot 0.6s linear 1;
    }
  }
  .el-table th,
  .el-table tr,
  .el-table {
    background-color: transparent;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none;
  }
  .el-table::before {
    height: 0;
  }
  transition: all 0.3s linear;
  background-color: #20272c;
  border-radius: 4px;
  overflow: hidden;
  margin-left: 1rem;
  // max-width: 350px;
  width: 345px;
  .ex-hd {
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #30383f;
    position: relative;
    i {
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10px;
      margin: auto;
      width: 20px;
      height: 20px;
      display: block;
      color: #606569;
      font-size: 20px;
    }
  }
  .ex-hd.exchangerecord {
    line-height: 3rem;
  }
  .ex-hd:first-child {
    color: #f5bc04;
  }
  .ex-bd {
    padding: 0 10px;
    .cell {
      font-size: 12px;
    }
  }
  .ex-rest {
    color: #fff;
    font-size: 14px;
  }
  .ex-info {
    i {
      color: #f5bc04;
    }
    font-size: 12px;
    color: #666;
  }

  .ex-blocks {
    position: relative;
    padding-top: 30px;
  }
  .ex-blocks:before {
    content: "";
    display: block;
    height: 1px;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.6);
    top: 0;
    left: -10px;
    right: -10px;
    transform: scaleY(0.5);
  }
  .switch-btn {
    width: 60px;
  }
  .coin {
    border-radius: 6px;
    opacity: 0.5;
    border: 1px solid rgba(255, 255, 255, 1);
    text-align: center;
    color: #fff;
    line-height: 40px;
    height: 40px;
  }
  .el-input__inner {
    background-color: transparent;
  }
  button {
    background-color: #f5bc04;
    display: block;
    margin: 2.5rem auto;
    width: 80%;
    color: #11152e;
  }
}
.exchange-panel.xscreen {
  position: absolute;
  top: -4rem;
  right: 0;
  transform: translateX(100%);
  bottom: 0;
  z-index: 2000;
  border-radius: 0;
  margin-left: 0;
}
.exchange-panel.active {
  transform: translateX(0);
}

@media screen and (max-width: 700px) {
  .exchange-panel {
    max-width: 100%;
    width: 100%;
    overflow-y: auto;
    .his-motime {
      .cell {
        white-space: nowrap;
      }
    }
  }
}
</style>


