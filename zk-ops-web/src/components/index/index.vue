<!--  -->
<template>
  <div class="index flex hc vc">
    <div class="index-wrap flex sb">
      <div class="ix-left">
        <img src="../../assets/images/ptextlogo.png" alt>
      </div>
      <div class="ix-right">
        <div class="login shadow re">
          <div class="borderLine m16">
            <div class="l-logo">
              <img src="../../assets/images/plogo.png" alt>
            </div>
            <div class="l-logo-text tcolor center m16">
              <div class="t22 m16">后台管理系统</div>
              <span class="f14">登录</span>
            </div>
          </div>

          <div id="login">
            <div class="l-row input">
              <label for class="gcolor f12">手机号码</label>
              <div class="borderLine">
                <input type="text" v-model.trim="l.phone">
              </div>
            </div>
            <div class="l-row input m16">
              <label for class="gcolor f12">验证码</label>
              <div class="flex vc borderLine">
                <input type="text" class="flex1" v-model.trim="l.code">
                <!-- <div class="f14 tcolor">
                                获取
                </div>-->
                <el-button
                  class="n-btn f14 tcolor btn-getcode qbk"
                  :loading="codeBtnLoader"
                  @click="loginHandle"
                >{{codeBtnText}}</el-button>
              </div>
            </div>

            <div class="l-row center n-sure-wrap">
              <el-button class="n-sure" :loading="showLoader" @click="toLogin" @keyup.enter="toLogin">确认</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// veryfyMan
import veryfyMant from "../../mixins/veryfyman.js";
export default {
  data() {
    return {
      showLoader: false,
      l: {
        phone: "",
        code: "",
        request_id: ""
      }
    };
  },
  mixins: [veryfyMant],
  methods: {
    checkLogin() {
      let t = this.checkphone();
      if (!t) return t;
      if (!this.l.request_id) {
        this.$message.info("请获取验证码");
        return false;
      }
      if (!this.l.code) {
        this.$message.info("请填写验证码");
        return false;
      }
      return true;
    },
    checkphone() {
      if (!this.l.phone) {
        this.$message.info("请填写电话号码");
        return false;
      }
      if (!/^\d{11}$/.test(this.l.phone)) {
        this.$message.info("电话号码格式不正确");
        return false;
      }
      return true;
    },
    loginHandle() {
      if (!this.checkphone() || this.hasLogin) return;
      this.verifyMan()
        .then(res => {
          if (res.state == "succ") {
            this.toGetCode(
              res.data,
              {
                area_code: "86",
                phone: this.l.phone
              },
              data => {
                this.l.request_id = data.request_id;
              },
              () => {
                // this.showLoader = false;
              }
            );
          } else if (res.state == "close") {
            // this.showLoader = false;
          }
        })
        .catch(() => {
          // this.showLoader = false;
        });
    },
    toLogin() {
      if (!this.checkLogin() || this.codeBtnLoader) return false;
      const l = this.l;
      this.showLoader = true;
      request
        .toLogin({
          phone: l.phone,
          verification_code: l.code,
          request_id: l.request_id
        })
        .then(res => {
          this.$message.info("登录成功");
          this.$store.commit("givenLoginInfo", res.data);
          this.hasLogin = true;
          setTimeout(() => {
            let redirect = this.$route.query.redirect;
            const hashuri = this.$route.query.hashuri;
            if (redirect) {
              //如果是外部链接， 就直接跳转
              if (
                redirect.indexOf("https") > -1 ||
                redirect.indexOf("http") > -1
              ) {
                return (window.location.href =
                  redirect + (hashuri ? "#/" + hashuri : ""));
              }
              let jump = {
                name: redirect
              };
              let obj = JSON.parse(sessionStorage.getItem("tsquery") || "{}");
              sessionStorage.removeItem("tsquery");
              if (Object.keys(obj).length > 0) {
                jump.query = obj;
              }

              this.$router.push(jump);
            } else {
              this.$router.push({ path: "/wallet" });
            }
          }, 2000);
        })
        .finally(() => {
          this.showLoader = false;
        });
    }
  }
};
</script>
<style lang='scss'>
.index {
  width: 100vw;
  height: 100vh;
  background: url(../../assets/images/f1.jpg) no-repeat center/cover;
}
button.btn-getcode {
  appearance: none;
  border: none;
  padding: 0;
  color: #086599;
  background-color: transparent;
}
.pc {
  .index-wrap {
    width: 1000px;
  }
  .ix-left {
    width: 380px;
  }
  .index .login {
    width: 418px;
  }
}
.mobile {
  .index-wrap {
    flex-direction: column;
    padding: 16px;
  }
  .ix-left {
    order: 2;
    width: 50%;
    margin: 0 auto;
  }
  .ix-right {
    order: 1;
    margin: 16px 0;
  }
}
.index .login {
  border-radius: 10px;
  background: #fff;
  padding: 30px 30px 20px;
  box-sizing: border-box;
}
.index .l-logo {
  width: 40px;
  position: absolute;
  left: 0;
  right: 0;
  top: -24px;
  margin: auto;
}
.l-logo-text {
}
#login .input input {
  border: none;
  width: 100%;
  outline: none;
  height: 35px;
  color: #086599;
}
#login .n-sure {
  border-color: #086599;
  background: #086599;
  color: #fff;
  width: 100%;
}
#login .n-sure-wrap {
  margin-top: 60px;
}
</style>




