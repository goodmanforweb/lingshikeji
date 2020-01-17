<template> 
    <div class="login-tab">
      <div class="tab-wrap" >
        <div class="input-wrap">
          <label>{{$t('ms.username')}}</label>
          <el-input  auto-complete="off" v-model.trim='log.username' @input="input($event, 'username')" :placeholder="$t('ms.username')"></el-input>
        </div>
        <div class="input-wrap">
          <label>{{$t('ms.password')}}</label>
          <el-input  auto-complete="off" type="password" v-model='log.password' @input="input($event, 'password')" :placeholder="$t('ms.password')"></el-input>
        </div>
      </div>
      <!-- <div id="test" style="width:200px;height:80px;"></div> -->
      <div class="tab-footer center">
        <el-button class="btn-sure" type="primary" @click="confirm" :loading="showConfirmLoader">{{$t("ms.confirm")}}</el-button>
        <p><router-link to="/Forgetpassword">{{$t("ms.forgetpassword")}}</router-link></p>
      </div>
    </div>
</template>
<script>
import util from "../../util/util";
import { mapActions } from "vuex";
import mymixin from '../mixins/index';
export default {
  name: "Login",
  data() {
    return {
      showConfirmLoader: false,
      log: {
        username: "",
        password: ""
        // prefix: "",
        // phone: "",
        // code: "",
        // requestid: ""
      }
    };
  },
  created() {
    
  },
  mixins: [mymixin],
  methods: {
    input(type, v) {},
    ...mapActions(["getUserInfo", "getBalance"]),
    confirm() {
      if (this.showConfirmLoader || this.loginSucc) return false;
      if (this.check()) {
        this.showConfirmLoader = true;
        this.verifyMan(this.log.username).then(res => {
          if(res == 'close') {
            this.showConfirmLoader = false;
          }
          else {
            this.toLogin(res);
          }
        }).catch(() => {
          this.showConfirmLoader = false;
        })
      }
    },
    toLogin(result) {
      this.showConfirmLoader = true;
      util.login(
            {
              data: {
                challenge: result.geetest_challenge,
                status: this.status,
                validate: result.geetest_validate,
                seccode: result.geetest_seccode,
                flag: this.flag,
                username: this.log.username,
                password: this.log.password
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
              this.$message.info(this.$t("ms.loginsucc"));
              this.loginSucc = true;
              setTimeout(() => {
                let redirect = this.$route.query.redirect;
                const hashuri = this.$route.query.hashuri;
                if(redirect) {
                  //如果是外部链接， 就直接跳转
                  if(redirect.indexOf('https') > -1 || redirect.indexOf('http') > -1) {
                    window.location.href = redirect + (hashuri ? '#/' + hashuri : '');
                    return;
                  }
                  let jump = {
                    name: redirect
                  };
                  let obj = JSON.parse(sessionStorage.getItem('cjoyquery') || '{}');
                  sessionStorage.removeItem('cjoyquery');
                  if(Object.keys(obj).length > 0) {
                    jump.query = obj;
                  }

                  this.$router.push(jump);
                }
                else {
                  this.$router.push({ path: "/index" });
                }
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
    },
    check() {
      if (!this.log.username || !this.log.password) {
        this.$message.info(this.$t("ms.checkempty"));
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss">
.input-wrap {
  label {
    margin-bottom: 6px;
  }
}
.tab-wrap {
  padding: 20px 0;
}
.btn-wrap {
  padding-top: 30px;
  margin-top: 10px;
  color: #3087f3;
  font-size: 12px;
}
.tab-footer {
  border-top: 1px solid #e6e6e6;
}
.btn-sure {
  width: 200px;
}
.login-container {
  .el-button {
    background-color: #2fbffb;
    border-color: #2fbffb;
  }
  .tab-footer {
    padding-top: 20px;
    a {
      font-size: 12px;
      color: #2fbffb;
    }
  }
}
</style>
