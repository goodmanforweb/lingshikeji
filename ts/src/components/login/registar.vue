<!--  -->
<template>
<div class="registar login" >
    <div class="l-row input">
        <label for="" class="gcolor f12">{{$t('m.username')}}</label>
        <div>
            <input type="text" @blur="checkUsername" v-model.trim="r.username">
        </div>
        <transition name="fade">
        <span class="redcolor f12" v-if='showIsRegis'>{{$t('m.yhmyjzc')}}</span>
        </transition>
    </div>
    <div class="l-row input">
        <label for="" class="gcolor f12">{{$t('m.mima')}}</label>
        <div>
            <input type="password" v-model.trim="r.password">
        </div>
    </div>
    <div class="l-row input">
        <label for="" class="gcolor f12">{{$t('m.qrmima')}}</label>
        <div>
            <input type="password" v-model.trim="r.confirm_password">
        </div>
    </div>
    <div class="l-row input">
        <label for="" class="gcolor f12">{{$t('m.yqma')}}</label>
        <div>
            <input type="text" v-model.trim="r.invitecode">
        </div>
    </div>
    <div class="l-row input">
        <label for="" class="gcolor f12">{{$t('m.phone')}}</label>
        <div class="flex">
            <el-select  class="f12" style="width:100px"  v-model.trim="r.area_code"  :placeholder="$t('m.choose')">
                <el-option v-for="(v,i) in areaNumber" :value="v[0]"  :label="v[1]" :key="i"></el-option>
                <el-option key="9" :label="$t('m.other')" value="other"></el-option>
            </el-select>
            <input type="text" class="flex1" v-model.trim="r.phone">
        </div>
    </div>
    <div class="l-row input">
        <label for="" class="gcolor f12">{{$t('m.yzma')}}</label>
        <div class="flex">
           <input type="text" class="flex1" v-model.trim="r.verify_code" @keyup.enter="regisHandle">
           <el-button class="n-btn f12 tcolor btn-getcode qbk" :loading="codeBtnLoader" @click="getcodeHandle">{{codeBtnText}}</el-button>
        </div>
    </div>
    <div class="l-row  f12 checkbox" >
            <el-checkbox v-model="r.is_agree"></el-checkbox><i class="f12 tcolor cp" @click="toAgreement">{{$t('m.agreexieyi')}}</i>
        </div>
        <div class="l-row center n-sure-wrap">
            <el-button class="n-sure" :loading="showLoader" @click="regisHandle">{{$t('m.sure')}}</el-button>
        </div>
</div>
</template>

<script>
import mixin from '../../mixins/index';
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
        showIsRegis: false,
        showLoader: false,
        areaNumber: [
        ["86", this.$t("m.cn")],//中国
        ["81", this.$t("m.jp")],//日本
        ["82", this.$t("m.kr")],//韩国
        ["66", this.$t("m.tl")],//泰国
        ["1", this.$t("m.us")],//美国
        ["44", this.$t("m.uk")],//英国
        ["65", this.$t("m.xjp")]//新加坡
      ],
      r: {
        username: "",
        password: "",
        confirm_password: "",
        invitecode: this.$route.query.inviteid || "",
        area_code: "86",
        phone: "",
        verify_code: "",
        is_agree: false,
        request_id: ""
      }
    };
  },
  mixins:[mixin],
  components: {},
  created() {

  },
  computed: {
      ...mapGetters(['registarData'])
  },
  mounted() {
      this.r = Object.assign(this.r, this.registarData)
  },
  methods: {
      toAgreement() {
          this.$store.commit('givenRegistarData', this.r);
          this.$router.push('/lg/agreement')
      },
      checkRegis() {
          const {username, area_code,request_id,password,confirm_password,phone,verify_code,is_agree} = this.r; 
          if(!username || !password || 
          !confirm_password || !phone || !verify_code || !area_code) {
              this.$message.info(this.$t('m.qtxwz'));
              return false;
          }
          if(!is_agree) {
              this.$message.info(this.$t('m.pagreexieyi'))
              return false;
          }
          if(password != confirm_password) {
              this.$message.info(this.$t('m.lcmmbyy'));
              return false;
          }
          if(!request_id) {
              this.$message.info(this.$t('m.qxhqyzm'));
              return false;
          }
          if(!/^\d{4,16}$/.test(phone)) {
              this.$message.info(this.$t('m.dhmmgsbzq'));
              return false;
          }
          if(!/^\d{6}$/.test(verify_code)) {
              this.$message.info(this.$t('m.yzmgsbzq'));
              return false;
          }
          return true;
      },
      checkPhone() {
        const {username, area_code,request_id,password,confirm_password,phone,verify_code,is_agree} = this.r; 

          if(!area_code) {
              this.$message.info(this.$t('m.qxzqh'));
              return false;
          }
          if(!phone) {
              this.$message.info(this.$t('m.qtxwz'));
              return false;
          }
              
          if(!/^\d{4,16}$/.test(phone)) {
              this.$message.info(this.$t('m.dhmmgsbzq'));
              return false;
          }
          return true;
      },
      checkUsername() {
          if(this.r.username) {
              request.checkIsRegis({data: {name: this.r.username}}).then(res => {
                  
                  this.showIsRegis = Object.keys(res.data).length > 0;
              })
          }
      },
      getcodeHandle() {
          if(!this.checkPhone() || this.codeBtnActive) return false;
          this.verifyMan().then(res => {
              if(res.state == 'succ') {
                  this.toGetCode(res.data, 
                   {
                        area_code: this.r.area_code,
                        phone: this.r.phone
                   }, (data) => {
                       this.r.request_id = data.request_id;
                   }, () => {
                    //    this.codeBtnActive = false;
                    //    this.codeBtnText = this.$t("m.getcode");
                   });
              }
          })
      },
      regisHandle() {
          if(!this.checkRegis() || this.showLoader || this.showIsRegis) return false;
          this.showLoader = true;
          let data = {
              ...this.r
          };
          data.phone = data.area_code + data.phone;
          delete data.area_code;
          if(!data.invitecode) {
              delete data.invitecode
          }

          request.toRegis({data})
          .then(res => {
              this.$message.info(this.$t('m.regissucc'));
              this.$store.commit('givenLoginInfo', res.data);
              setTimeout(() => {
                    let redirect = this.$route.query.redirect;
                    const hashuri = this.$route.query.hashuri;
                    if(redirect) {
                    //如果是外部链接， 就直接跳转
                    if(redirect.indexOf('https') > -1 || redirect.indexOf('http') > -1) {
                        return window.location.href = redirect + (hashuri ? '#/' + hashuri : '');
                    }
                    let jump = {
                        name: redirect
                    };
                    let obj = JSON.parse(sessionStorage.getItem('tsquery') || '{}');
                    sessionStorage.removeItem('tsquery');
                    if(Object.keys(obj).length > 0) {
                        jump.query = obj;
                    }

                    this.$router.push(jump);
                    }
                    else {
                        this.$router.push({ path: "/index" });
                    }
                }, 2000)
          })
          .catch(err => {
            //   this.r.request_id = '';
          })
          .finally(() => {
              this.showLoader = false;
          })
      }
  }
}

</script>
<style lang='scss'>
.checkbox>label {
    margin-right: 16px;
}
.registar .l-row.input {
    margin: 10px 0;
    >div {
        input {
            height: 30px;
        }
    }
}
</style>