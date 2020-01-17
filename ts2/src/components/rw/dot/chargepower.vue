<!--  -->
<template>
<Page :title="$t('m.nlczhi')" borderLine padding >

<div class="chargepower panel-width">
    <div class="f24 tcolor fw mb16" v-if="!isMobile">{{$t('m.nlczhi')}}</div>

    <div class="flex pd16 mb16 borderLine">
        <div>
            <span class="f12 tqc">{{$t('m.dqnlzhi')}}</span>
            <div class="tcolor fw f40">5000</div>
        </div>
        <div class="flex1"></div>
        <div>
            <span class="f12 tqc">{{$t('m.dqktx')}}</span>
            <div class="tcolor fw f40">5900 <i class="f12">CJOY</i> </div>
            <div class="f12 tqc">
                {{$t('m.sjktx')}} 60000CJOY 
                <br>
                {{$t('m.yxhnl')}} 80000
            </div>
        </div>
    </div>

    <div class="gcolor f14 center mb16">{{$t('m.cznlsl')}}</div>
    <div class="flex vc block center tcolor block-input">
        <input class="flex1 center f18 fw tcolor" type="text">
        <span class="f12">max</span>
    </div>
    <div class="slider-box pd16 mb16 borderLine">
        <p class="right tcolor f14">60000 CJOY</p>
        <el-slider v-model="slider"></el-slider>
        <div class="flex sb f12 gcolor">
            <div>
                5000
                <br>
                 {{$t('m.kcc')}}
                <br>
                4900 CJOY
            </div>
            <div>
                80000
                <br>
                 {{$t('m.kcc')}}
                <br>
                60000 CJOY
            </div>
        </div>
    </div>
    <div class="right tcolor">
        <span class="f14">{{$t('m.hj')}}</span>
        <div class="f18 fw">1000CJS</div>
    </div>

    <div class="cp-btns center m20">
        <div class="n-btn btn-tcolor db mb6">{{$t('m.sure')}}</div>
        <span class="tcolor f12">{{$t('m.dqky')}}：1000000CJS</span>
    </div>
    <router-link v-if="isMobile" class="tcolor f12 center db" to="/czjl">{{$t('m.checkczjl')}}</router-link>
    <div v-else class="cp-records">
        <div class="tcolor f14">{{$t('m.czjl')}}</div>
        <CZJL />
    </div>

</div>
</Page>
</template>

<script>
import CZJL from './czrecord'
export default {
  data () {
    return {
        slider: 20,
        
    };
  },
  components: {
      CZJL
  },
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
    .panel-width {
        width: 420px;
    }
}
.el-table {
    thead {
        color: #8E9FA9
    }
    tbody {
        color: #086599
    }
}
.cp-records {
    border-radius: 4px;
    padding: 4px;
    background: rgba(8, 100, 153, 0.111)
}
.CJOY{
    border-radius: 4px;
    input {
        border:none;
        outline:none;
        background: transparent
    }
}
</style>