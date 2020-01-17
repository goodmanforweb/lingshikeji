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
                {{$t('m.jsqhint1')}} </div>
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
            <div class="flex sb">
                <span>{{$t('m.compower')}}</span>
                <span>
                    <el-tooltip  placement="top" effect="light">
                        <div slot="content" class="f12 gcolor" style="width:100px"> 绿色数字代表需要额外充值的能力，当能量充足时才能完全提取完产出的CJOY</div>
                        <i class="el-icon-question ask-icon"></i>
                    </el-tooltip>
                    <i>89000+</i>
                    <i class="lcolor">2000</i>
                </span>
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
    .sycal-bd {
        width: 80%;
    }
}
.sycal-bd {
        margin: 16px auto;
}
.qbkcolor {
     background: rgba(8, 100, 153, 0.111);
     padding: 10px;
}
.ask-icon:before {
    font-size: 20px;
    color: #a7d1e4
}
div.el-tooltip__popper.is-light {
    background: #fff;
    border: none;
    box-shadow:0px -8px 20px 0px rgba(25,101,147,0.1);
}
div.popper__arrow {
    border:none
}
</style>