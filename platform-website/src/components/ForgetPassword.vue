<template> 
<div id="login-wrap" class="flex forgetpassword">
    <div class="login-container">
      <div class="login-tit center">{{$t("ms.forgetpassword")}}</div>
      <div class="login-bd">
        <div class="login-pic center"><img src="../assets/images/lemonlogo.png" alt=""></div>
        <div class="login-name center"><img src="../assets/images/logotextb.png" alt=""></div>
        <div class="register-tab">
            <div class="tab-wrap">
              <div class="input-wrap">
                <label>{{$t('ms.phone')}}</label>
                <el-input  :placeholder="$t('ms.phone')" v-model.trim='regi.phone' @input="input($event, 'phone')" >
                  <template slot="prepend">
                    <el-select   v-model="regi.prefix"  placeholder="请选择">
                      <el-option v-for="(v,i) in areaNumber" :value="v[0]"  :label="v[1]" :key="i"></el-option>
                    </el-select>
                  </template>
                </el-input>
              </div>
              <div class="input-wrap">
                <label>{{$t('ms.vlicode')}}</label>
                <el-input auto-complete="off" v-model.trim='regi.vlicode' @input="input($event, 'vlicode')" :placeholder="$t('ms.vlicode')">
                  <el-button slot="append" @click="getCode" :loading="showCodeLoader">{{codeBtnText}}</el-button>
                </el-input>
              </div>
              <div class="input-wrap">
                <label>{{$t('ms.password')}}</label>
                <el-input  auto-complete="off" type="password" v-model='regi.password' @input="input($event, 'password')" :placeholder="$t('ms.password')"></el-input>
              </div>
              <div class="input-wrap">
                <label>{{$t('ms.surepassword')}}</label>
                <el-input  auto-complete="off" type="password" v-model='regi.repassword' @input="input($event, 'repassword')" :placeholder="$t('ms.surepassword')"></el-input>
              </div>
            </div>
            <div class="tab-footer center">
              <el-button class="btn-sure" type="primary" @click="handleRegi" :loading="showConfirmLoader">{{$t("ms.confirm")}}</el-button>
            </div>
          </div>
      </div>
    </div>
  </div>
    
</template>

<script>
import util from "../util/util";
import { mapActions } from "vuex";
import mymixin from "./mixins/index";
export default {
  name: "forgetpassword",
  data() {
    return {
      areaNumber: [['0086', this.$t("ms.cn")],['0081', this.$t("ms.jp")],['0082',this.$t('ms.kr')],['0066', this.$t('ms.tl')],['001',this.$t('ms.us')],['0044',this.$t('ms.uk')]],
      showConfirmLoader: false,
      showCodeLoader: false,
      phonevalid: false,
      codeBtnText: this.$t("ms.getvlicode"),
      codeBtnState: true,
      regi: {
        password: "",
        repassword: "",
        phone: "",
        vlicode: "",
        requestid: "",
        prefix: "0086"
      }
    };
  },
  mixins: [mymixin],
  methods: {
    input(type, v) {},
    ...mapActions(["getUserInfo", "getBalance"]),
    getCode() {
      if (!this.checkPhone() || !this.codeBtnState) return false;
      this.showCodeLoader = true;
      this.verifyMan(this.regi.prefix + this.regi.phone).then(res => {
        this.toGetCode(
          res,
          { phone: this.regi.prefix + this.regi.phone },
          data => {
            this.regi.requestid = data.request;
          },
          () => {
            this.showCodeLoader = false;
          }
        );
      });
    },
    checkPhone() {
      if (!this.regi.prefix || !this.regi.phone) {
        this.$message.info(this.$t("ms.checkempty"));
        return false;
      }
      if (!/^\d+$/.test(this.regi.prefix)) {
        this.$message.info(this.$t("ms.formaterr"));
        return false;
      }
      if (!/^\d{10,13}$/.test(this.regi.phone)) {
        this.$message.info(this.$t("ms.telformatwrong"));
        return false;
      }
      return true;
    },
    reset() {
      this.regi = {
        password: "",
        repassword: "",
        phone: "",
        vlicode: "",
        requestid: "",
        prefix: "0086"
      };
      this.tick && clearInterval(this.tick);
      this.codeBtnState = true;
      this.codeBtnText = this.$t("ms.getvlicode");
    },
    handleRegi() {
      if (this.showConfirmLoader) return false;
      if (this.check()) {
        this.showConfirmLoader = true;
        util
          .updateUser(
            {
              data: {
                phone: this.regi.prefix + this.regi.phone,
                password: this.regi.repassword,
                validcode: this.regi.vlicode,
                validrequest: this.regi.requestid
              }
            },
            {},
            this
          )
          .then(res => {
            if (res.status == 200) {
              this.$store.commit("givenLogin", res.data);
              this.$message.info(this.$t("ms.updatepasssucc"));
              this.reset();
              setTimeout(() => {
                this.$router.push({ name: "index" });
              }, 2000);
            } else {
              this.$message.info(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.info(this.errorInfo(err.response));
          })
          .finally(() => {
            this.showConfirmLoader = false;
          });
      }
    },
    check() {
      if (!this.regi.prefix && !this.regi.requestid) {
        this.$message.warning(this.$t("ms.pleasegetvlicode"));
        return false;
      }
      if (
        !this.regi.password ||
        !this.regi.repassword ||
        !this.regi.phone ||
        !this.regi.prefix ||
        !this.regi.vlicode ||
        !this.regi.requestid
      ) {
        this.$message.info(this.$t("ms.checkempty"));
        return false;
      }
      if (this.regi.repassword != this.regi.password) {
        this.$message.info(this.$t("ms.checkpasswordsame"));
        return false;
      }
      let reg = /^\d{10,13}$/,
        regcode = /^\d{6}$/;
      if (!reg.test(this.regi.phone)) {
        this.$message.warning(this.$t("ms.telformatwrong"));
        return false;
      }
      if (!regcode.test(this.regi.vlicode)) {
        this.$message.warning(this.$t("ms.vlicodeformatwrong"));
        return false;
      }

      return true;
    }
  }
};
</script>
<style lang="scss">
.forgetpassword {
  .register-tab {
    border-top: 1px solid #e6e6e6;
  }
}
</style>