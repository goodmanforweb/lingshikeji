<template>
  <div class="withdraw-wrap">
    <div class="input-wrap amount-input">
        <label>{{$t('ms.amount')}}</label>
        <el-input  auto-complete="off" @blur="checkTranValue" v-model.trim='widthdraw.value'  :placeholder="$t('ms.amount')">
          <i class="input-right-label" slot="append">{{coin}}</i>
        </el-input>
        <span class="input-hint"><i class="el-icon-warning"></i>{{$t('ms.available')}}: {{currentasset.value | currency}}</span>
    </div>
    <div class="input-wrap">
        <label>{{$t('ms.address')}}</label>
        <el-input  auto-complete="off" v-model.trim='widthdraw.address'  :placeholder="$t('ms.address')"></el-input>
    </div>
    <div class="input-wrap">
        <label>{{$t('ms.password')}}</label>
        <el-input  auto-complete="off" type="password" v-model='widthdraw.password'  :placeholder="$t('ms.password')"></el-input>
    </div>
    <div class="input-wrap">
        <label>{{$t('ms.vlicode')}}</label>
        <el-input auto-complete="off" v-model.trim='widthdraw.validcode' :placeholder="$t('ms.vlicode')">
            <el-button slot="append" @click="getCode" :loading="showCodeLoader">{{codeBtnText}}</el-button>
        </el-input>
    </div>
    <div class="btn-wrap center">
        <el-button class="btn-sure" type="primary" @click="submit" :loader="loaderShow">{{$t("ms.submit")}}</el-button>
    </div>
  <div class="withd-hint">{{$t("ms.widthdhint", {minideposit: this.minideposit, assetname: this.coin})}} <br/> {{$t("ms.widthdhint2", {assetname: this.coin, tax: this.tax})}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import util from "../../util/util";
import mymixin from "../mixins/index";

export default {
  name: "Withdraw",
  data() {
    return {
      currentasset: {},
      loaderShow: false,
      showCodeLoader: false,
      phonevalid: false,
      codeBtnText: this.$t("ms.getvlicode"),
      codeBtnState: true,
      activeAsset: {},
      coin: "",
      tax: "",
      minideposit: 1000,
      widthdraw: {
        value: "",
        address: "",
        password: "",
        validcode: "",
        requestid: ""
      }
    };
  },
  created() {
    this.coin = this.$route.params.id.toUpperCase();
    this.init();
  },
  mounted() {},
  computed: {
    ...mapGetters(["asset", "login", "assetList"])
  },
  mixins: [mymixin],
  methods: {
    ...mapActions(["getAsset"]),
    checkTranValue() {
      let tran = this.widthdraw;
      if (Number(tran.value) <= 0) {
        this.$message.info(this.$t("ms.checkpositive"));
        return false;
      }
      if (Number(this.currentasset.value) < (this.minideposit || 1000)) {
        this.$message.info(
          this.$t("ms.unsufwithdraw", { rest: this.minideposit + this.coin })
        );
        return false;
      }
      if (Number(this.currentasset.value) < Number(tran.value)) {
        this.$message.info(this.$t("ms.checkover"));
        return false;
      }
      if (this.minideposit > Number(tran.value)) {
        this.$message.info(
          this.$t("ms.widthdhint", {
            minideposit: this.minideposit,
            assetname: this.coin
          })
        );
        return false;
      }
      return true;
    },
    getCode(data) {
      if (!this.codeBtnState) return false;
      this.showCodeLoader = true;
      this.verifyMan(this.login.user.username).then(res => {
         if(res == 'close') {
          this.showCodeLoader = false;
        }
        else {
          this.toGetCode(
            res,
            { phone: this.login.user.phone },
            data => {
              this.widthdraw.requestid = data.request;
            },
            () => {
              this.showCodeLoader = false;
            }
          );
        }
      }).catch(() => {
        this.showCodeLoader = false;
      }) 
    },
    updateLocalBalance(value) {
      this.$store.commit("givenBalanceValue", -Number(value));
    },
    reset() {
      this.widthdraw = {
        value: "",
        address: "",
        validcode: "",
        password: "",
        requestid: ""
      };
      this.tick && clearInterval(this.tick);
      this.codeBtnState = true;
      this.codeBtnText = this.$t("ms.getvlicode");
    },
    submit() {
      if (!this.check()) return false;
      this.loaderShow = true;
      util
        .widthDraw(
          {
            data: {
              asset: this.currentasset.asset,
              address: this.widthdraw.address,
              value: util.toHex(
                this.widthdraw.value,
                this.activeAsset.decimals
              ),
              password: this.widthdraw.password,
              validcode: this.widthdraw.validcode,
              phone: this.login.user.phone,
              validrequest: this.widthdraw.requestid
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.data.code == 0) {
            this.updateLocalBalance(this.widthdraw.value);
            this.reset();
            //刷新账户余额
            this.getAsset({ ctx: this, asset: this.currentasset.asset });
            setTimeout(() => {
              this.$router.push({
                name: "walletrecord",
                query: { type: "withdraw" }
              });
            }, 1000);
            this.$message.info(this.$t("ms.withdrawsuc"));
          }
        })
        .catch(err => {
          this.reset();
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.loaderShow = false;
        });
    },
    check() {
      let tran = this.widthdraw;
      if (!tran.value || !tran.address || !tran.validcode || !tran.password) {
        this.$message.info(this.$t("ms.checkempty"));
        return false;
      }
      if (!tran.requestid) {
        this.$message.warning(this.$t("ms.pleasegetvlicode"));
        return false;
      }
      if (!/^\d+$/.test(tran.value)) {
        this.$message(this.$t("ms.checknumber"));
        return false;
      }
      if (!this.checkTranValue()) {
        return false;
      }
      let regcode = /^\d{6}$/;
      if (!regcode.test(tran.validcode)) {
        this.$message.warning(this.$t("ms.vlicodeformatwrong"));
        return false;
      }
      return true;
    },
    init() {
      this.findActiveAsset();
      this.findActiveAssetSpec();
    },
    findActiveAsset() {
      this.activeAsset = this.assetList.find(el => el.symbol == this.coin);
      if (this.activeAsset) {
        this.tax = util.fromHex(
          this.activeAsset.taxes,
          this.activeAsset.decimals
        );
        this.minideposit = util.fromHex(
          this.activeAsset.minideposit,
          this.activeAsset.decimals
        );
      }
    },
    findActiveAssetSpec() {
      if (this.activeAsset) {
        this.currentasset = this.asset[this.activeAsset.asset]
          ? this.asset[this.activeAsset.asset]
          : {};
      } else {
        this.activeAsset = {};
      }
    }
  },
  watch: {
    "widthdraw.value": function(n) {
      if (!n) return false;

      if (!/^\d+$/.test(n)) {
        this.$message(this.$t("ms.checknumber"));
      }
    },
    assetList: {
      deep: true,
      handler: function() {
        this.findActiveAsset();
      }
    },
    asset: {
      deep: true,
      handler: function() {
        this.findActiveAssetSpec();
      }
    }
  }
};
</script>

<style lang="scss">
.btn-wrap {
  button {
    background-color: #2fbffb;
  }
}
.withdraw-wrap {
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  .btn-wrap {
    padding-top: 22px;
  }
}
.input-wrap {
  display: flex;

  flex-direction: column;

  padding-top: 0.7rem;
}
.amount-input {
  .el-input .el-input-group__append {
    width: 20px !important;
    background-color: transparent;
    padding: 0 20px;
    border-color: #dcdfe6;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .el-input__inner {
    border-right: 0;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .el-input__inner:focus + .el-input-group__append {
    border-color: rgb(88, 168, 251);
  }
}
.input-wrap .input-hint {
  color: rgba(237, 99, 99, 1);
  .el-icon-warning {
    padding-right: 10px;
  }
}

.input-wrap .input-tit,
.input-wrap .input-hint {
  line-height: 2rem;
}

.withd-hint {
  color: #808080;
  font-size: 0.8rem;
  margin: 2.5rem 0 0 -2rem;
  padding-top: 1rem;
  border-top: 1px solid #e6e6e6;
}

@media screen and (max-width: 700px) {
}
</style>
