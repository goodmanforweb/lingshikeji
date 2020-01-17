<!--  -->
<template>
<Page :title="$t('m.nlczhi')" borderLine padding routerBack="ddash">

<div class="chargepower panel-width">
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.nlczhi')}}</div>

    <div class="pd16 mb16 borderLine">
        <div class="towrap">
            <span class="f12 tqc">{{$t('m.dqnlzhi')}}</span>
            <div class="tcolor fw f30">{{d.gas | fix(8)}}</div>
        </div>
        <br>
        <div class="towrap">
            <span class="f12 tqc">{{$t('m.dqktx')}}</span>
            <div class="tcolor fw f30">{{d.earnings | fix8}} <i class="f12">USD</i> </div>
            <div class="f12 tqc">
                {{$t('m.sjktx')}} {{sumgas | fix8}}USD 
                <br>
                {{$t('m.yxhnl')}} {{sumgas| fix8}}
            </div>
        </div>
    </div>

    <div class="gcolor f14 center mb16">{{$t('m.depositcjs') + $t('m.amount')}}</div>
    <div class="flex vc block center tcolor block-input">
        <input v-model.trim="inputValue" class="flex1 center f18 fw tcolor" type="number">
        <span class="f12 cp" @click="showMaxHandler">max</span>
    </div>
    <div class="slider-box pd16 mb16 borderLine">
        <el-slider v-model="sliderValue" :min=1 :max="maxcjs" :step=1></el-slider>
        <div class="flex sb f12 gcolor">
            <div>
                1CJS
            </div>
            <div>
                {{maxcjs}}CJS
            </div>
        </div>
    </div>
    <div class="right tcolor">
        <span class="f14">{{$t('m.kcc')}}</span>
        <div class="f18 fw">{{canoutput | fix(8)}}USD</div>
    </div>

    <div class="cp-btns center m20">
        <el-button :loading="loader" style="width: 100%;marginBottom: 16px" @click="verifycheck" class="db el-btn-tcolor">{{$t('m.sure')}}</el-button>
        <span class="tcolor f12">{{$t('m.dqky')}}：{{useraccount.value | currency(8)}}CJS</span>
    </div>
    <router-link v-if="isMobile" class="tcolor f12 center db" to="czjl">{{$t('m.checkczjl')}}</router-link>
    <div v-else class="cp-records">
        <div class="tcolor f14">{{$t('m.czjl')}}</div>
        <CZJL ref="record"/>
    </div>

</div>
</Page>
</template>

<script>
import CZJL from './czrecord'
import {mapGetters, mapActions} from 'vuex'
import Big from 'bignumber.js'
import verifyman from '../../../mixins/index';
export default {
  data () {
    return {
        sliderValue: 0,
        inputValue: 0,
        loader: false,
        powerprice:0
    };
  },
  mixins: [verifyman],
  components: {
      CZJL
  },
  computed: {
      ...mapGetters(['useraccount', 'signHYDetail']),
      isMobile () {
          return this.$store.getters.isMobile
      },
      id() {
          return this.$route.params.id
      },
      d() {
          return this.signHYDetail;
      },
      sumgas() {
          return Math.min(this.d.gas || 0, this.d.earnings || 0)
      },
      maxcjs() {
          return Math.floor(this.useraccount.value)
      },
      canoutput() {
          return Big(this.inputValue || 0).times(this.powerprice || 0).toFixed(8)
        //   if(!this.d.earnings) return 0;
        //   if(Big(this.d.gas).gte(this.d.earnings)) {
        //       return this.d.earnings;
        //   }
        //   else {
        //     if(!this.inputValue || !this.powerprice) return 0;
        //     const needpower = Big(this.d.earnings).minus(this.d.gas);
        //     const maxInputCJS = needpower.div(this.powerprice).toNumber();
        //     if(Big(maxInputCJS).gte(this.inputValue)) {
        //         return Big(this.inputValue).times(this.powerprice).plus(this.d.gas).toFixed(2)
        //     }
        //     else {
        //         return this.d.earnings;
        //     }
        //   }
        //   return 0;
          
      }
  },
  created() {
      this.createTicker();
      this.getPowerPrice();
  },
  beforeDestroy() {
      this.clearTicker();
  },
  methods: {
      ...mapActions(['getManAssetsLists']),
       clearTicker() {
          this.ticker && clearTicker(this.ticker);
      },
      createTicker() {
          this.clearTicker();
          setInterval(() => {
               this.getPowerPrice();
          }, 30*1000)
      },
      check() {
          if(this.inputValue <= 0 || !this.powerprice) {
              return false
          }
          if(Big(this.inputValue).gt(this.useraccount.value)) {
              this.$message.info(this.$t('m.yuebuzu'));
              return false;
          }
          
          return true;
      },
      verifycheck() {
        if(!this.check() || this.loader) return ;
        this.verifyMan().then(res => {
            if(res.state == 'succ') {
                this.depositHandle(res.data);
            }
        })
      },
      depositHandle(jtdata) {
          this.loader = true;
          request.fwsDeposit({
              data: {
                  challenge: jtdata.geetest_challenge,
                  validate:jtdata.geetest_validate,
                  seccode:jtdata.geetest_seccode,
                  flag: this.flag,
                  project: this.id,
                  value: this.inputValue
              }
          })
          .then(res => {
              this.$message.info(this.$t('m.depositsuc'))
              this.$refs.record.fresh();
              this.getManAssetsLists();
          })
          .catch(err => {
              this.$message.info(this.$t('m.depositfail'))
          })
          .finally(() => {
              this.loader = false;
          })
      },
      showMaxHandler() {
          this.inputValue  = this.maxcjs;
      },
      getPowerPrice() {
          request.getCJSStatics({})
          .then(res => {
              this.powerprice = res.data.price;
          })
      }
  },
  watch: {
      inputValue: function(n) {
          if(n == 0 || n == '') {
              return
          }
          if(n <= this.maxcjs) {
              this.sliderValue = n;
          }
          else {
              this.inputValue = Number(this.maxcjs);
          }
      },
      sliderValue: function(n) {
          this.inputValue = Number(n)
      }
  }

}

</script>
<style lang='scss'>
.pc {
    .panel-width {
        width: 420px;
    }
}

.cp-records {
    border-radius: 4px;
    padding: 4px;
    background: rgba(8, 100, 153, 0.111)
}

</style>