<template> 
    <div class="register-tab" v-loading="inviteLoader">
            <div class="tab-wrap">
              <div class="input-wrap">
                <label>{{$t('ms.username')}}<sup>*</sup></label>
                <el-input  
                  @blur="checkName"  
                  :class="{red: isNameValid}"  
                  ref="name" 
                  auto-complete="off" 
                  v-model.trim='regi.username'  
                  :placeholder="$t('ms.username')"
                ></el-input>
                <span class="red-hint" v-if="isNameValid"><i class="el-icon-error"></i> {{$t('ms.namehasregi')}}</span>
              </div>
              <div class="input-wrap">
                <label>{{$t('ms.password')}}<sup>*</sup></label>
                <el-input  auto-complete="off" type="password" v-model='regi.password'  :placeholder="$t('ms.password')"></el-input>
              </div>
              <div class="input-wrap">
                <label>{{$t('ms.surepassword')}}<sup>*</sup></label>
                <el-input  auto-complete="off" type="password" v-model='regi.repassword'  :placeholder="$t('ms.surepassword')"></el-input>
              </div>
              <div class="input-wrap">
                <label>{{$t('ms.inviteid')}}<sup v-if="mustInvite">*</sup></label>
                <el-input  auto-complete="off" v-model.trim='regi.inviteid' :placeholder="$t('ms.inviteid')"></el-input>
              </div>
               <div class="input-wrap">
                <label>{{$t('ms.phone')}}<sup>*</sup></label>
                <el-input  @blur="checkPhone2"  :class="{red: isPhoneValid}" ref="phone" :placeholder="earashow ? $t('ms.areacode')+'+'+$t('ms.phone') : $t('ms.phone')" v-model.trim='regi.phone' >
                  <template slot="prepend">
                    <el-select  @blur="checkPhone2" v-model.trim="regi.prefix"  :placeholder="$t('ms.choose')">
                      <el-option v-for="(v,i) in areaNumber" :value="v[0]"  :label="v[1]" :key="i"></el-option>
                       <el-option key="9" :label="$t('ms.other')" value="other"></el-option>
                    </el-select>
                  </template>
                </el-input>
                <span class="red-hint" v-if="isPhoneValid"><i class="el-icon-error"></i> {{$t('ms.phonehasregi')}}</span>
              </div>
              <div class="input-wrap">
                <label>{{$t('ms.vlicode')}}<sup>*</sup></label>
                <el-input auto-complete="off" v-model.trim='regi.vlicode' :placeholder="$t('ms.vlicode')">
                  <el-button slot="append" :disabled="btnDisable" @click="getCode" :loading="showCodeLoader">{{codeBtnText}}</el-button>
                </el-input>
              </div>
              <div class="agree">
                <el-radio v-model='regi.agree' label="1">
                  <span class="agree-text">{{$t('ms.igreeto')}}<a href="#/Agreement" target="_blank" style="color:#ED6363">{{$t('ms.termservice')}}</a> {{$t('ms.igreetocont')}}</span>
                </el-radio>
              </div>
            </div>
            <div class="tab-footer btn-wrap center">
              <el-button class="btn-sure" type="primary" :disabled="btnDisable"  @click="handleRegi" :loading="showConfirmLoader">{{$t("ms.confirm")}}</el-button>
            </div>
    </div>
</template>

<script>
import util from "../../util/util";
import { mapActions } from "vuex";
import mymixin from "../mixins/index";
export default {
  name: "Register",
  data() {
    return {
      areaNumber: [
        ["0086", this.$t("ms.cn")],//中国
        ["0081", this.$t("ms.jp")],//日本
        ["0082", this.$t("ms.kr")],//韩国
        ["0066", this.$t("ms.tl")],//泰国
        ["001", this.$t("ms.us")],//美国
        ["0044", this.$t("ms.uk")],//英国
        ["0065", this.$t("ms.xjp")]//新加坡
      ],
      earashow: false,
      inviteLoader: false,
      showConfirmLoader: false,
      showCodeLoader: false,
      phonevalid: false,
      codeBtnText: this.$t("ms.getvlicode"),
      codeBtnState: true,
      mustInvite: false,
      isNameValid: false,
      isPhoneValid: false,
      btnDisable: false,
      regi: {
        username: "",
        password: "",
        repassword: "",
        inviteid: this.$route.query.inviteid || "",
        prefix: "0086",
        phone: "",
        vlicode: "",
        agree: "",
        requestid: ""
      }
    };
  },
  created() {
    this.checkHasInvite();
  },
  mixins: [mymixin],
  methods: {
    ...mapActions(["getUserInfo", "getBalance"]),
    reset() {
      this.regi = {
        username: "",
        password: "",
        repassword: "",
        inviteid: "",
        prefix:  this.regi.prefix,
        phone: "",
        vlicode: "",
        agree: "",
        requestid: ""
      };
      this.tick && clearInterval(this.tick);
      this.codeBtnState = true;
      this.codeBtnText = this.$t("ms.getvlicode");
    },
    checkName() {
      if (!this.regi.username) return false;
      util
        .checkName(
          {
            params: {
              name: this.regi.username
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.status == 200) {
            this.isNameValid = !!res.data.status;
            this.btnDisable = this.isNameValid;
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {});
    },
    checkPhone2() {
      if (!this.regi.prefix || !this.regi.phone) return false;
      // if (!/^(\d+|other)$/.test(this.regi.prefix)) {
      //   return false;
      // }
      if (!/^\d{3,20}$/.test(this.regi.phone)) {
        return false;
      }
      const prefix = this.regi.prefix == 'other' ? '' : this.regi.prefix;
      util
        .checkPhone(
          {
            params: {
              phone: prefix + this.regi.phone
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.status == 200) {
            this.isPhoneValid = !!res.data.status;
            this.btnDisable = this.isNameValid;
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {});
    },
    errorreset() {
      this.regi.vlicode = "";
      this.regi.requestid = "";
      this.tick && clearInterval(this.tick);
      this.codeBtnState = true;
      this.codeBtnText = this.$t("ms.getvlicode");
    },
    handleRegi() {
      if (this.showConfirmLoader) return false;
      if (!this.check()) return false;
      this.showConfirmLoader = true;
      const prefix = this.regi.prefix == 'other' ? '' : this.regi.prefix;
      util
        .register(
          {
            data: {
              username: this.regi.username,
              phone: prefix + this.regi.phone,
              password: this.regi.password,
              validcode: this.regi.vlicode,
              validrequest: this.regi.requestid,
              invitecode: this.regi.inviteid
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.status == 200) {
            this.$store.commit("givenLogin", res.data);
            // //获取账户信息
            // this.getBalance(this);
            this.$message.info(this.$t("ms.regsucc"));
            this.reset();
            setTimeout(() => {
              this.$router.push({ path: "/Index" });
            }, 2000);
          }
        })
        .catch(err => {
          this.errorreset();
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.showConfirmLoader = false;
        });
    },
    getCode() {
      if (this.isNameValid) {
        this.$message.warning(this.$t("ms.namehasregi"));
        return false;
      }
      if (this.isPhoneValid) {
        this.$message.warning(this.$t("ms.phonehasregi"));
        return false;
      }

      if (!this.checkPhone() || !this.codeBtnState) return false;
      this.showCodeLoader = true;

      this.verifyMan(this.regi.username)
        .then(res => {
          if (res == "close") {
            this.showCodeLoader = false;
          } else {
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
          }
        })
        .catch(() => {
          this.showCodeLoader = false;
        });
    },
    checkPhone() {
      if (!this.regi.prefix || !this.regi.phone || !this.regi.username) {
        this.$message.info(this.$t("ms.checkempty"));
        return false;
      }
      // if (!/^(\d+|other)$/.test(this.regi.prefix)) {
      //   this.$message.info(this.$t("ms.formaterr"));
      //   return false;
      // }
      if (!/^\d{3,20}$/.test(this.regi.phone)) {
        this.$message.info(this.$t("ms.telformatwrong"));
        return false;
      }
      return true;
    },
    check() {
      if (
        !this.regi.username ||
        !this.regi.password ||
        !this.regi.repassword ||
        !this.regi.phone ||
        !this.regi.prefix ||
        !this.regi.vlicode
      ) {
        this.$message.info(this.$t("ms.checkempty"));
        return false;
      }
      if (this.mustInvite) {
        if (!this.regi.inviteid) {
          this.$message.info(this.$t("ms.inputinvitecode"));
          return false;
        }
      }

      if (!this.regi.requestid) {
        this.$message.warning(this.$t("ms.pleasegetvlicode"));
        return false;
      }
      if (this.regi.agree != 1) {
        this.$message.info(this.$t("ms.checkempty"));
        return false;
      }
      if (this.regi.repassword != this.regi.password) {
        this.$message.info(this.$t("ms.checkpasswordsame"));
        return false;
      }
      let reg = /^\d{3,20}$/,
        regcode = /^\d{6}$/;
      if (!reg.test(this.regi.phone)) {
        this.$message.warning(this.$t("ms.telformatwrong"));
        return false;
      }
      if (!regcode.test(this.regi.vlicode)) {
        this.$message.warning(this.$t("ms.vlicodeformatwrong"));
        return false;
      }

      if (this.isNameValid) {
        this.$message.warning(this.$t("ms.namehasregi"));
        return false;
      }
      if (this.isPhoneValid) {
        this.$message.warning(this.$t("ms.phonehasregi"));
        return false;
      }

      return true;
    },
    checkHasInvite() {
      this.inviteLoader = true;
      util
        .checkHasInvite({}, {}, this)
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            this.mustInvite = res.data.status;
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.inviteLoader = false;
        });
    }
  },
  watch: {
    $route: function() {
      this.regi.inviteid = this.$route.query.inviteid;
    },
    'regi.prefix': function(n, o) {
        this.earashow = n == 'other';
        if(o == 'other' || n == 'other') {
          this.regi.phone = '';
        }
    }
  }
};
</script>
<style lang="scss">
.red input {
  color: red;
}
.red-hint {
  color: red;
  line-height: 2rem;
  font-size: 12px;
  padding-left: 2px;
}
.agree {
  margin: 20px 0 0;
}
.input-wrap {
  .el-input .el-button {
    background-color: #eaf8ff;
  }
}
</style>