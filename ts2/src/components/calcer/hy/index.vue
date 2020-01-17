<!--  -->
<template>
<div class="hy-calcer" :class="{flex: !isMobile}" >
    <div class="hy-alloc shadow  flex v" :class="{mr16: !isMobile, mb16: isMobile}">
        <div @click="showDown = !showDown" class="dc-tt qbk f20 tcolor center" :class="{'flex sb': isMobile}">
            <span>{{$t('m.fhjchi')}}</span>
            <span v-if="isMobile" ><i class="el-icon-arrow-down"></i></span>
        </div>
        <transition name="fade">
            <div class="flex1 flex hc v" v-show="isMobile ? showDown : true">
                <p class="tcolor center fw">{{$t('m.dqjclj')}}</p>
                <div class="center clearfix tcolor prevei limitW mb16">
                    <span>10000</span>
                    <span class="fr">CJS</span>
                </div>

                <p class="tcolor center fw">{{$t('m.keyprice')}}</p>
                <div class="center clearfix tcolor prevei limitW mb16">
                    <span>10000</span>
                    <span class="fr">CJS</span>
                </div>

                <p class="tcolor center fw">{{$t('m.jchibili')}}</p>
                <div class="center tcolor prevei limitW mb16">
                10%
                </div>
            </div>
        </transition>
        
    </div>
    <div class="hy-detail">
        <div class="block hy-calcer mb16">
            <div class="tcolor f20">{{$t('m.hycalcer')}}</div>
            <p class="tcolor center fw">{{$t('m.keynum')}}</p>
            <div class="center tcolor prevei limitW mb6">
            300
            </div>
            <div class="right tcolor f12 limitW mb16">≈109.00CJS</div>
            <div class="center limitW">
                <div class="n-btn  btn-tcolor f14" style="display:block">{{$t('m.jssy')}}</div>
            </div>


        </div>
        <div class="block hy-profit">
            <div class="tcolor f20">{{$t('m.syxq')}}</div>
            <p class="tcolor center fw">{{$t('m.dqkhd')}}</p>
            <div class="center clearfix tcolor prevei limitW mb6">
                <span class="fw f24">100000</span>
                <span class="fr">CJOY</span>
            </div>
            <div class="flex sb limitW mb6">
                <span class="gcolor">{{$t('m.cbi')}}</span>
                <span class="tcolor fw">2%</span>
            </div>
            <div class="flex sb limitW mb6">
                <span class="gcolor">KEY</span>
                <span class="tcolor fw">300</span>
            </div>
            <div class="right tcolor f12 limitW">≈109.00CJS</div>
            <div class='limitW'>
                <el-slider v-model="slider"></el-slider>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
        slider:20,
        showDown: false
    };
  },
  created() {
      
  },
  components: {},
  computed: {
      isMobile () {
          return this.$store.getters.isMobile
      }
  },
  mounted() {},
  methods: {}
}

</script>
<style lang='scss'>
.pc {
    .hy-alloc {
        flex: 1
    }
    .hy-detail {
        flex: 1.2
    }
}
.mobile {
    .dc-tt {
        padding: 0 16px;
        font-size: 16px;
    }
}
</style>