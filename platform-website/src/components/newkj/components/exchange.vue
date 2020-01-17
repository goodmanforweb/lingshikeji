<template>
    <div class="kj-exchange">
        <div class="ke-center">
            <div class="km-box-tt center">
                <span>{{$t('ms.dhzx')}}</span>
            </div>
            <div class="ke-bd">
                <div class="ke-input-wrap flex sb">
                    <div class="ke-sellers center">
                        <div class="ke-coin">
                            <img :src="ex[extext.CJT]" alt="">
                        </div>
                        <input class="ke-seller ke-input center" type="text" v-model="amount" :placeholder="$t('ms.srdhz')">
                    </div>
                    <div class="ke-btn flex">
                        <span class="scale audiobtn" :class="{active: rot}" @click="swith"></span>
                    </div>
                    <div class="ke-buyers center">
                        <div class="ke-coin"><img :src="ex[extext.SUC]" alt=""></div>
                        <span class="ke-buyer ke-input center">{{amount}}</span>
                    </div>
                </div>
                <p class="f20 yecolor"><span>{{$t('ms.yue')}}</span>: {{Math.floor(wallet)}} {{walletUnit}}</p>
                <div class="center">
                    <el-button class="kjbtn kjbtn-buy ks-btn center f30 audiobtn" @click="exchange" :loading="btnLoader">
                       {{$t("ms.dh")}}
                    </el-button>
                </div>
                <!-- <div class="kjbtn ks-btn center f30">确认</div> -->
            </div>
        </div>
        <div class="ke-record">
            <div class="kr-tt center">
                <span class="f34 kr-tt-stroke">
                    {{$t('ms.dhjl')}}
                </span>
            </div>
            <div class="kr-table">
                <el-table
                    :data="tableData"
                    :max-height="height"
                    style="width: 100%">
                    <el-table-column
                        prop="time"
                        min-width="140px"
                        :label="$t('ms.dhtime')">
                    </el-table-column>
                    <el-table-column
                        prop="pare"
                        min-width="100px"
                        :label="$t('ms.dhdui')"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        min-width="100px"
                        :label="$t('ms.dhsl')">
                    </el-table-column>
                    </el-table>
            </div>
            <div class="kr-pager flex" v-if="!isMobile">
                <div class="ke-pager-btn ke-btn" @click="prevPage">
                    <span class="scale left-back"></span>
                </div>
                <span class="ke-pager-number hcolor">{{pager + '/' + totalPage}}</span>
                <div class="ke-pager-btn ke-btn" @click="nextPage">
                    <span class="scale right-back"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let regdecimal = /^\d+(\.\d+)$/,
  regnumber = /^\d+$/;
import util from "util";
import { mapGetters, mapActions } from "vuex";
import apiconfig from "apiconfig";
import Big from "bignumber.js";

export default {
    data() {
        return {
            height: 650,
            ex: {
                CJT: require('../assets/images/cjt.png'),
                SUC: require('../assets/images/suc.png')
            },
            rot: false,
            extext: { CJT: "CJT", SUC: "SUC" },
            amount: '',
            btnLoader: false,
            cjtid: apiconfig.assetid,
            wallet: "",
            walletUnit: "CJT",
            count:0,
            totalPage:0,
            pager:0,
            tableData: [
                {
                    time: '2018-12-12',
                    pare: 'CJT/SUC',
                    amount:10000
                },
                {
                    time: '2018-12-12',
                    pare: 'CJT/SUC',
                    amount:10000
                },
                {
                    time: '2018-12-12',
                    pare: 'CJT/SUC',
                    amount:10000
                }
            ],
            loader: false
        };
  },
  created() {
    this.height = this.isMobile ? 'auto' : 650;
    this.initLoadRecord();
    
  },
  mounted() {
    if(this.isMobile) {
      this.scrollDom = document.querySelector('.kj-exchange');
      this.scrollDom.addEventListener('scroll', this.loadmore,false);
    }
  },
  computed: {
    ...mapGetters(["asset", "pool",'login','isMobile'])
  },
  beforeDestroy() {
      this.isMobile && this.scrollDom.removeEventListener('scroll', this.loadmore,false);
  },
  methods: {
      prevPage() {
          let pager = this.pager;
          if(--pager <= 0)return;
          this.pager = pager;
          this.getTransfer();
      },
      nextPage() {
          let pager = this.pager;
          if(++pager > this.totalPage)return;
          this.pager = pager;
          this.getTransfer();

      },
      setPagerShow() {
          this.totalPage = Math.ceil(this.count/this.size)
      },
    setWallet() {
        if (!this.asset[this.cjtid])return;
            this.wallet =
            this.extext.CJT == "CJT"
                ? this.asset[this.cjtid].value
                : this.pool.Balance;
            this.walletUnit = this.extext.CJT;
    },
    check(n) {
      if (n == "") return false;
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
      if(!this.check(this.amount)) return;
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
            this.initLoadRecord();
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
            this.initLoadRecord();
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
    loadmore() {
      if (this.loader) return;
      if (this.count) {
        if (this.pager * this.size >= this.count) {
          return false;
        }
      }
      this.pager++;
      this.getTransfer(true);
    },
    getTransfer(type) {
      if (this.loader) return;
      this.loader = true;
      util
        .getTransfer(
          {
            params: {
              uid: this.login.user.id,
              size: this.size,
              offset: (this.pager - 1) * this.size,
              orderby: "create_time", //选填
              order: "DESC"
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.data.code == 0) {
            const dataArr = res.data.list;
            const filters = this.$root.$options.filters;
            this.count = res.data.count;
            let tableData = Array.isArray(dataArr) && dataArr.map(el => {
                  return {
                    time: filters.format(el.CreateTime),
                    pare: { TRANS_IN: "CJT/SUC", TRANS_OUT: "SUC/CJT" }[
                      el.Type
                    ],
                    amount: util.dropDec(el.Value, 1e4)
                  };
                });
            this.tableData = type ? this.tableData.concat(tableData) : tableData;
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.loader = false;
        });
    },
    initLoadRecord() {
      this.pager = 1;
      this.count = null;
      this.size = 12;
      this.tableData = [];
      this.getTransfer();
    }


  },
  watch: {
      amount(n) {
        this.check(n);
     },  
      asset: {
          immediate: true,
          deep: true,
          handler: function() {
              this.setWallet();
          }
      },
      count: function(n, o) {
          if(n != 0) {
              this.setPagerShow();
          }
      }
  }
}
</script>

<style lang="scss">
 
</style>

