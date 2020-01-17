<template>
    <div class="rl">
        <div class="rl-nav">
          <router-link to="/index">
            <img  class="logocircle" src="../../assets/images/lemonlogo.png" alt="">
            <img class="logop" src="../../assets/images/logotextb.png" alt="">
          </router-link>
        </div>
        <div class="rl-bd">
            <div class="card">
                <h3 class="center">{{$t("ms.rightlogin")}}</h3>
                <p class="c-line"><i class="gcolor">{{$t('ms.logo')}}</i> {{$t('ms.getsorights')}}</p>
                <div>
                    <el-radio v-model="radio" label="1">{{$t('ms.allcheck')}}</el-radio>
                    <br>
                    <br>
                    
                    <el-radio v-model="radio" label="2">{{$t('ms.getyoursorights')}}</el-radio>
                </div>
                <p class="c-line">
                    {{$t('ms.rightshowyouagree')}} <a class="gcolor" target="_blank" href="#/agreement">{{$t('ms.loginagreements')}}</a> 
                </p>
                 <el-button :loader="loader" @click="doOath" type="primary">{{$t('ms.agreerights')}}</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import util from "util";
export default {
  data() {
    return {
      radio: "1",
      loader: false
    };
  },
  created() {
    this.id = util.getQueryString("request_id");
    this.reurl = util.getQueryString("redirect_uri");
    this.hashuri = util.getQueryString("hashuri");
  },
  methods: {
    check() {
      if (!this.id) {
        return false;
      }
      return true;
    },
    doOath() {
      if (!this.check()) return false;
      this.loader = true;
      util
        .doOath({ data: { request_id: this.id } }, {}, this)
        .then(res => {
          if (res.data.code == 0) {
            let data = Object.assign({}, res.data);
            delete data.code;
            let params = [];
            for (let i in data) {
              params.push(`${i}=${data[i]}`);
            }
            if (!this.reurl) return false;
            window.location.href = this.reurl + (this.hashuri ? `#${this.hashuri}` : '') + "?" + params.join("&");
          }
        })
        .catch(err => {
          if (err.response.status == 404) {
            this.$message.info(this.$t("ms.error"));
          }
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style lang="scss">
.rl {
  min-height: 100%;
  background-color: #f7f7f7;
  .gcolor {
    color: #2fbffb;
  }
  .rl-nav {
    background-color: #fff;
    padding: 8px 2rem;
    img {
      vertical-align: middle;
    }
    .logop {
      width: 175px;
      margin-left: 4px
    }
  }
  .rl-bd {
    padding: 2rem;
    h3 {
      font-size: 2rem;
    }
    .card {
      padding: 2rem 6rem;
      max-width: 800px;
      margin: 0 auto;
      box-sizing: border-box;
      .el-button {
        width: 80%;
        margin: 2rem auto;
        display: block;
        background-color: #2fbffb;
        border-color: #2fbffb;
      }
    }
    .c-line {
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      line-height: 4rem;
    }
  }
}
@media screen and (max-width: 700px) {
  .rl {
    min-height: 100vh;
    .rl-bd {
      padding: 1rem 0;
      .card {
        padding: 1rem;
      }
    }
    .rl-nav .logop {
      width: 123px;
    }
    .rl-nav .logocircle {
      width: 40px; 

    }
  }
}
</style>

