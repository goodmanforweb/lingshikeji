<!--  -->
<template>
<Page :title="$t('m.fixpass')" borderLine padding routerBack="/resetpassindex" 
class="flex v" style="width: 100%;" pcPanelClassName='toolpanel' :pcPanelFullScreen="true" :pcIsSlot='true'>
    <div class="resetpass poster re  flex1 " style="height:100%" :class="{'flex hc vc': !isMobile}">
        <div class="login shadow">
            <div class="tit center tcolor qbk" v-if="!isMobile">{{$t('m.fixpass')}}</div>
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
    </div>
</Page>
</template>

<script>
import mixin from '../../mixins/index';
import {mapGetters} from 'vuex';
export default {
  data () {
    return {
        showLoader: false,
        r: {
            password:'',
            confirm_password:'',
            verify_code:'',
            phone:'',
            request_id: ""
        }
    };
  },
  mixins:[mixin],
  components: {},
  computed: {
      ...mapGetters(['userInfo']),
      isMobile() {
          return this.$store.getters.isMobile
      }
  },
  mounted() {
      
  },
  methods: {
      handle() {
          if(!this.check()) return;
          this.showLoader = true;
          const data = {
              phone: this.r.phone,
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
          const {request_id,password,confirm_password,verify_code} = this.r; 
          if(!password || 
          !confirm_password || !verify_code) {
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
          if(!/^\d{6}$/.test(verify_code)) {
              this.$message.info(this.$t('m.yzmgsbzq'));
              return false;
          }
          return true;
      },
      getcodeHandle() {
          if(this.codeBtnActive || !this.r.phone) return false;
          this.verifyMan().then(res => {
              if(res.state == 'succ') {
                  this.toGetCode(res.data, 
                   {    area_code: '',
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
  },
  watch: {
      userInfo: {
          deep: true,
          immediate: true,
          handler:function(n) {
              if(!util.isEmpty(n)) {
                  this.r.phone = n.phone
              }
          }
      }
  }
}

</script>
<style lang='scss'>
.pc {
    .resetpass .login {
        width: 420px;
    }
}

.resetpass .login {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
    padding: 0 30px 16px;
    .tit {
        margin: 0 -30px;
        height: 60px;
        line-height: 60px;
    }
}
</style>