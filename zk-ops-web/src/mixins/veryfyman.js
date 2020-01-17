const btn_ticker_time = 60*2;
let mixin = {
  data() {
    return {
      codeBtnActive: false,
      codeBtnText: '获取验证码',
      codeBtnLoader: false,
      jylock: false,
    }
  },
  methods: {
    resetBtnTicker() {
      this.tick && clearInterval(this.tick);
      this.codeBtnActive = false;
      this.codeBtnText = '获取验证码';
    },
    showBtnTicker() {
      let seconds = btn_ticker_time;
      this.codeBtnActive = true;
      seconds == btn_ticker_time && (this.codeBtnText = `${btn_ticker_time}s重新获取`);
      this.tick = setInterval(() => {
        if (seconds-- == 1) {
          this.resetBtnTicker();
        } else {
    
          this.codeBtnText = `${seconds}s重新获取`;
        }
      }, 1000);
    },
    toGetCode(result, otherdata, cb, cb2) {
      this.codeBtnLoader = true;
      request
        .getCode(
          {
            challenge: result.geetest_challenge,
            validate: result.geetest_validate,
            seccode: result.geetest_seccode,
            flag: this.flag,
            ...otherdata
          },
          {},
          this
        )
        .then(res => {
          if (res.status == 200) {
            this.showBtnTicker();
            cb && cb(res.data);
          }
        })
        .catch(() => {
          this.$message.info('获取验证功码失败');
          this.resetBtnTicker();
        })
        .finally(() => {
          this.codeBtnLoader = false;
          cb2 && cb2();
        });
    },
    verifyMan() {
      if(this.jylock)return Promise.resolve();
      this.jylock = true;
      this.codeBtnLoader = true;
      let self = this;
      return new Promise((resolve, reject) => {
        request
          .verifyMan()
          .then(res => {
            if (res.status == 200) {
              let geetest = res.data.challenge;
              self.flag = res.data.flag;
              if (!geetest.success) {
                //不进行验证
                self.jylock = false;
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
                    lang: this.$store.getters.lang
                  },
                  function(captchaObj) {
                    captchaObj
                      .onReady(function() {
                        //验证码ready之后才能调用verify方法显示验证码
                        captchaObj.verify();
                      })
                      .onSuccess(function() {
                        self.jylock = false;
                        self.result = captchaObj.getValidate();
                        resolve({data: self.result, state: 'succ'});
                      })
                      .onError(function() {
                        self.jylock = false;
                        reject();
                      })
                      .onClose(function() {
                        self.jylock = false;
                        resolve({state: 'close'})
                      })
                  }
                );
              }
            }
          })
          .catch(err => {
            self.jylock = false;
            this.$message.info('极验出错:(');
            reject();
          })
          .finally(() => {
            self.jylock = false;
            this.codeBtnLoader = false;
          })
      });
    }
  }
};

export default mixin;
