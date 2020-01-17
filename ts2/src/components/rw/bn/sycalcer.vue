<!--  -->
<template>
<Page :title="$t('m.syjsq')" borderLine padding >

<div class="sycalcer" >
    <div class="f24 tcolor fw" v-if="!isMobile">{{$t('m.syjsq')}}</div>
    <p class="tcolor f14"> {{$t('m.dqsysp')}}<i class="f18 fw">5%</i></p>

 
    <div class="tcolor f20 fw " :class="{center: !isMobile}">
         {{$t('m.dqyjls')}}
        
        <el-tooltip  placement="left-start" effect="light" >
            <div slot="content" class="f12 gcolor" style="width:100px">
                {{$t('m.jsqhint1')}} 
                </div>
            <i class="el-icon-question ask-icon"></i>
        </el-tooltip>
  </div>
    <div class="sycal-bd">
        <div class="block flex tcolor block-input vc mb16">
            <input type="text" class="fw center tcolor flex1 f30">
            <span>CJS</span>
        </div>
        <div class="block tcolor f14">
            <div class="flex sb mb6">
                <span>{{$t('m.yccsy')}}（CJOY） </span>
                <span>50000.00</span>
            </div>
            <div class="flex sb mb6">
                <span>{{$t('m.ktq')}}（CJOY）</span>
                <span>100000.00</span>
            </div>
        </div>
    </div>

    <div class="qbkcolor">
        <div class="tcolor fw f20 mb16">{{$t('m.tdcksy')}}</div>
        <el-slider v-model="slider"></el-slider>
        <div class="flex sb tcolor f12">
            <span>100000CJS</span>
            <span>520000CJS</span>
        </div>
    </div>
</div>
</Page>
</template>

<script>
export default {
  data () {
    return {
        slider: 300
    };
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
    .sycalcer {
        width: 500px;
    }
}
</style>