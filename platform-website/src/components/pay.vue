<template>
    <div class="pay">
        <div class="pay-nav">
            <router-link to="/index">
              <img class="logot" src="../assets/images/lemonlogo.png" alt="">
              <img class="logop" src="../assets/images/logotextb.png" alt="">
            </router-link>
            <span class="mycheckdesck">{{$t("ms.mycheckdesck")}}</span>
        </div>
        <div class="pay-bd">
            <div class="card" v-loading="layLoader">
                <p>{{$t('ms.instancetransfer')}}</p>
                <div class="order-info flex">
                    <div class="order-info-desc">
                        <p v-if="!!order.orderId"><strong>{{$t("ms.order")}}: </strong>{{order.orderId}}</p>
                        
                        <p v-if="!!order.name"><strong>{{$t("ms.receiver")}}: </strong>{{order.name}}</p>
                        
                        <p v-if="!!order.gameName"><strong>{{$t("ms.gamename")}}: </strong>{{order.gameName}}</p>
                        <div v-if="!!order.body">
                          {{$t('ms.gamedesc')}}: {{order.body}}
                        </div>
                        </div>
                        <div class="mny">
                            {{order.fee | currency}}
                        </div>
                   
                </div>
                <div class="input-box ">
                    <div v-if="!ispay">
                        <p>{{$t('ms.inputpassword')}}</p>
                        <el-input v-model.trim="input" :placeholder="$t('ms.inputpassword')" type="password"></el-input>
                        <el-button type="primary" :loading="loader" @click="doPay" >{{$t('ms.surepay')}}</el-button>
                   </div>
                   <div  v-if="ispay" class="center payresult" :class="{paysuc: ispaysuc, payfail: !ispaysuc}">
                      <p><i :class="`el-icon-circle-${ispaysuc ? 'check' : 'close'}`"></i> <span >{{ispaysuc ? $t("ms.paysuc") : $t('ms.payfail')}}</span>
</p>
                       <p v-if="!!afterpay.transactionId" class="tranid">{{$t('ms.tranc')}}: {{afterpay.transactionId}}</p>

                       <el-button v-if="!ispaysuc" type="primary" @click="repay">{{$t('ms.repay')}}</el-button>
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import util from "util";

export default {
  data() {
    return {
      layLoader: false,
      loader: false,
      input: "",
      order: {
        orderId:'',
        name:'',
        gameName:'',
        body:"",
        fee:''
      },
      ispaysuc: false,
      ispay: false,
      afterpay: {
        resultCode: "",
        transactionId: ""
      }
    };
  },
  created() {
    this.id = this.$route.query.pay_id;
    this.getOrderInfo();
  },
  methods: {
    repay() {
      this.input = '';
      this.ispay = false;
    },
    check() {
      if (!this.id) {
        return false;
      }
      return true;
    },
    getOrderInfo() {
      if (!this.check()) return false;
      this.layLoader = true;
      util
        .getOrderInfo({ params: { pay_id: this.id } }, {}, this)
        .then(res => {
          if (res.data.code == 0) {
            res.data.fee = util.fromHex(res.data.fee, 18);
            this.order = res.data;
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.layLoader = false;
        });
    },
    checke() {
      // if (!/^\d+$/.test(this.input)) {
      //   this.$message.info(this.$t('ms.passerror'));
      //   return false;
      // }
      if (this.input == '') {
        this.$message.info(this.$t('ms.checkempty'));
        return false;
      }
      return true;
    },
    doPay() {
      if (!this.check() || !this.checke()) return false;
      this.loader = true;
      util
        .doPay({ data: { pay_id: this.id, pay_code: this.input } }, {}, this)
        .then(res => {
          if (res.data.code == 0) {
            this.afterpay = res.data;
            if (this.afterpay.resultCode == "SUCCESS") {
              this.$message.info(this.$t("ms.paysuc"));
              this.input = "";
              this.ispaysuc = true;
              const url = this.$route.query.redirect_uri;
              const hashuri = this.$route.query.hashuri;
              let urldata = Object.assign({}, res.data);
              delete urldata.code;
              let params = [];
              for (let i in urldata) {
                params.push(`${i}=${urldata[i]}`);
              }
              url && (window.location.href = url + (hashuri ? `#${hashuri}` : '') +"?" + params.join("&"));
            }
          }
        })
        .catch(err => {
          this.ispaysuc = false;
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.ispay = true;
          this.loader = false;
        });
    }
  }
};
</script>
<style lang="scss">
.pay {
  min-height: 100%;
  background-color: #f7f7f7;
  .pay-nav {
    background-color: #fff;
    padding: 8px 2rem;
    img {
      vertical-align: middle;
    }
    .logop {
      width: 175px;
    }
    .mycheckdesck {
      font-size: 1.4rem;
      color: #808080;
      display: inline-block;
      border-left: 1px solid #808080;
      padding-left: 1rem;
      margin-left: 1rem;
    }
  }
  .pay-bd {
    padding: 2rem;
    .card {
      max-width: 980px;
      margin: 0 auto;
      .order-info {
        justify-content: space-between;
      }
      .mny {
        font-size: 2rem;
        color: #ff6839;
      }
    }
  }
  
  .order-info {
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 2rem;

    p {
      white-space: nowrap;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .order-info-desc {
    max-width: 75%;
  }
  .input-box {
    padding-top: 2rem;
    width: 30%;
    margin: 0 auto;
    .el-button {
      width: 100%;
      margin: 2rem 0;
      background-color: #2fbffb;
      border-color: #2fbffb;
    }
  }
  .payresult {
    margin: 2rem 0;
    p:first-child {
      font-size: 3rem;
      i {
        vertical-align: middle
      }
      span {
        font-size: 2rem;
        vertical-align: middle
      }
    }
  }
  .paysuc {
    p:first-child {
      color: #2fbffb;
    }
  }
  .payfail {
    p:first-child {
      color: red;
    }
  }
}
@media screen and (max-width: 700px) {
  .pay {
    min-height: 100vh;
    .pay-nav {
      .logot {
        width: 30px;
      }
      .logop {
        width: 100px;
      }
      .mycheckdesck {
        font-size: 12px;
      }
    }
    .pay-bd {
      padding: 1rem 0;
      .card {
        padding: 1rem;
      }
      .input-box {
        width: auto;
      }
      .paysuc {
        font-size: 2rem;
      }
      .order-info {
        flex-direction: column;
      }
    }
    .tranid {
      font-size: 12px;
    }
  }
}
</style>


