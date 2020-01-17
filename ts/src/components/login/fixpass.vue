<!--  -->
<template>
<div class="fixpass login">
    <div class="lt-hd center tcolor">{{$t('m.wjmma')}}</div>
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
           <input type="text" class="flex1" v-model.trim="r.verify_code">
           <el-button class="n-btn f12 tcolor btn-getcode qbk" :loading="codeBtnLoader" @click="getcodeHandle">{{codeBtnText}}</el-button>
        </div>
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
     <div class="l-row center n-sure-wrap" style="marginTop:30px">
        <el-button class="n-sure" :loading="showLoader" @click='handle'>{{$t('m.sure')}}</el-button>
    </div>
</div>
</template>

<script>
import mixin from '../../mixins/index';
export default {
  data () {
    return {
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
            password:'',
            confirm_password:'',
            verify_code:'',
            area_code:'86',
            phone:'',
            request_id: ""
        }
    };
  },
  mixins:[mixin],
  components: {},
  computed: {},
  mounted() {},
  methods: {
      handle() {
          if(!this.check()) return;
          this.showLoader = true;
          const data = {
              phone: this.r.area_code + "" + this.r.phone,
              password: this.r.password,
              verify_code: this.r.verify_code,
              request_id: this.r.request_id
          };
          request.resetPass({data})
          .then(res => {
             this.$message.info(this.$t('m.caozuosuc'));
             this.$store.commit('givenLoginInfo', res.data);
            setTimeout(() => {
                this.$router.replace('/index')
            },1000)
          })
          .finally(() => {
              this.showLoader = false;
          })
      },
      check() {
          const {area_code,request_id,password,confirm_password,phone,verify_code,is_agree} = this.r; 
          if(!password || 
          !confirm_password || !phone || !verify_code || !area_code) {
              this.$message.info(this.$t('m.qtxwz'));
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
        const {area_code,phone} = this.r; 

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
  }
}

</script>
<style lang='scss'>

</style>