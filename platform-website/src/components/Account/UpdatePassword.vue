<template>
    <div class="account-fixpass card">
        <div class="input-wrap">
            <label>{{$t('ms.vlicode')}}</label>
            <el-input auto-complete="off" v-model.trim='update.vlicode'  :placeholder="$t('ms.vlicode')">
                <el-button slot="append" @click="getCode" :loading="showCodeLoader">{{codeBtnText}}</el-button>
            </el-input>
        </div>
        <div class="input-wrap">
            <label>{{$t('ms.oldpass')}}</label>
            <el-input  auto-complete="off" type="password" v-model='update.oldpass' :placeholder="$t('ms.oldpass')"></el-input>
        </div>
        <div class="input-wrap">
            <label>{{$t('ms.newpassword')}}</label>
            <el-input  auto-complete="off" type="password" v-model='update.newpassword' :placeholder="$t('ms.newpassword')"></el-input>
        </div>
         <div class="input-wrap">
            <label>{{$t('ms.surenewpassword')}}</label>
            <el-input  auto-complete="off" type="password" v-model='update.repeatnewpassword'  :placeholder="$t('ms.surenewpassword')"></el-input>
        </div>
        <div class="tab-footer btn-wrap center ">
            <el-button class="btn-sure" type="primary" @click="handleBtn" :loading="showConfirmLoader">{{$t("ms.confirm")}}</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import util from "../../util/util";
import mymixin from '../mixins/index';
export default {
  data() {
    return {
      showConfirmLoader: false,
      showCodeLoader: false,
      phonevalid: false,
      codeBtnText: this.$t("ms.getvlicode"),
      codeBtnState: true,
      update: {
        vlicode: "",
        oldpass: "",
        newpassword: "",
        repeatnewpassword: "",
        requestid:''
      }
    };
  },
  computed: {
    ...mapGetters(["login"])
  },
  mixins: [mymixin],
  methods: {
    handleBtn() {
      if(!this.check()) return false;
      this.updateUser();
    },
    check() {
      if (
        !this.update.oldpass ||
        !this.update.newpassword ||
        !this.update.repeatnewpassword ||
        !this.update.vlicode ||
        !this.update.requestid
      ) {
        this.$message.info(this.$t("ms.checkempty"));
        return false;
      }
      if(this.update.newpassword != this.update.repeatnewpassword) {
        this.$message.info(this.$t("ms.checkpasswordsame"));
        return false;
      }
      let regcode = /^\d{6}$/;
      if (!regcode.test(this.update.vlicode)) {
        this.$message.warning(this.$t("ms.vlicodeformatwrong"));
        return false;
      }
      return true;
    },
    reset() {
      this.update = {
        vlicode: "",
        oldpass: "",
        newpassword: "",
        repeatnewpassword: "",
        requestid:''
      };
      this.tick && clearInterval(this.tick);
      this.codeBtnState = true;
      this.codeBtnText = this.$t("ms.getvlicode");
    },
    updateUser() {
      this.showConfirmLoader = true;
      util.updateUser({
        data: {
          phone: this.login.user.phone,
          password: this.update.newpassword,
          validcode: this.update.vlicode,
          validrequest: this.update.requestid
        }
      }, {}, this).then(res => {
        if(res.status == 200) {
          if (res.data.code == 0) {
            this.$store.commit("givenLogin", res.data);
            this.$message.info(this.$t("ms.updatepasssucc"));
            this.reset();
          } else {
            this.$message.info(res.data.msg);
          }
        }
      }).catch(err => {
        this.$message.info(this.errorInfo(err.response));
      }).finally(() => {
          this.showConfirmLoader = false;
        });
    },
    getCode() {
      if (!this.codeBtnState) return false;
      this.showCodeLoader = true;
      this.verifyMan(this.login.user.username).then(res => {
       if(res == 'close') {
         this.showCodeLoader = false;
       }
       else {
          this.toGetCode(res, {phone: this.login.user.phone}, data => {
          this.update.requestid = data.request;
        }, () => {
          this.showCodeLoader = false;
        });
       }
      }).catch(() => {
        this.showCodeLoader = false;
      })
    }
  }
};
</script>
<style lang="scss">
.account-fixpass {
  padding: 1.5rem 9rem;
  .input-wrap {
    label {
      text-transform: capitalize
    }
  }
  .tab-footer {
    margin-top: 2rem;
    .el-button {
      background-color: #2FBFFB
    }
  }
  
}
@media screen and (max-width: 704px) {
  .account-fixpass {
    padding: 1.5rem;
  }
}
</style>

