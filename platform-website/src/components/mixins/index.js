import util from "../../util/util";
const btn_ticker_time = 60*2;
let mixin = {
  methods: {
    // getCode() {
    //     if (!this.codeBtnState) return false;
    //     this.showCodeLoader = true;
    //     this.verifyMan().then(res => {
    //       this.toGetCode(res);
    //     });
    // },
    showBtnTicker() {
      let seconds = btn_ticker_time;
      this.codeBtnState = false;
      seconds == btn_ticker_time && (this.codeBtnText = this.$t("ms.resend", { time: btn_ticker_time }));
      this.tick = setInterval(() => {
        if (seconds-- == 1) {
          clearInterval(this.tick);
          this.codeBtnState = true;
          this.codeBtnText = this.$t("ms.getvlicode");
        } else {
          this.codeBtnText = this.$t("ms.resend", { time: seconds });
        }
      }, 1000);
    },
    toGetCode(result, otherdata, cb, cb2) {
      util
        .getCode(
          {
            data: {
              challenge: result.geetest_challenge,
              validate: result.geetest_validate,
              seccode: result.geetest_seccode,
              flag: this.flag,
              ...otherdata
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 0) {
              this.showBtnTicker();
              cb && cb(res.data);
              // this.update.requestid = res.data.request;
            } else {
              this.$message.info(res.data.msg);
            }
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          cb2 && cb2();
        });
    },
    verifyMan(username) {
      let self = this;
      return new Promise((resolve, reject) => {
        util
          .verifyMan({ data: { phone: username } }, {}, this)
          .then(res => {
            if (res.status == 200) {
              let geetest = res.data.geetest;
              self.flag = res.data.flag;
              if (!geetest.success) {
                //不进行验证
                resolve({});
              } else {
                initGeetest(
                  {
                    // 以下配置参数来自服务端 SDK
                    gt: geetest.gt,
                    challenge: geetest.challenge,
                    offline: !geetest.success,
                    new_captcha: true,

                    product: "bind",
                    // width: "300px",
                    lang: this.$store.getters.lang
                  },
                  function(captchaObj) {
                    captchaObj
                      .onReady(function() {
                        //验证码ready之后才能调用verify方法显示验证码
                        captchaObj.verify();
                      })
                      .onSuccess(function() {
                        self.result = captchaObj.getValidate();
                        resolve(self.result);
                      })
                      .onError(function() {
                        reject();
                      })
                      .onClose(function() {
                        resolve('close')
                      })
                  }
                );
              }
            }
          })
          .catch(err => {
            reject();
            this.$message.info(this.errorInfo(err.response));
          });
      });
    }
  }
};

export default mixin;
