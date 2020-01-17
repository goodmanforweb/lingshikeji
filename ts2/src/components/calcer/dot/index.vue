<!--  -->
<template>
<div class="dot-calcer" :class="{'flex fwrap': !isMobile}">
  <div class="dot-cer shadow" :class="{mb16: isMobile}">
    <div class="dc-tt qbk f20 tcolor center ">{{$t('m.nodecalcer')}}</div>
    <div class="dc-bd">
      <p class="tcolor fw center">{{$t('m.cwcjoy')}}</p>
      <select name="" id="" class="tcolor">
        <option value="0">
          20000（{{$t('m.onestar',{star :'一'})}}） CJS
        </option>
      </select>
      <div class="gcolor f14 mt6">≈￥100000</div>

      <div class="flex sb" style="marginTop: 90px">
        <span class="gcolor">{{$t('m.zke')}}</span>
        <span class="tcolor">95%</span>
      </div>
      <div class="flex sb borderLine m16" style="paddingBottom: 16px">
        <span class="gcolor">{{$t('m.fyzj')}}</span>
        <div class="right">
          <div class="f20 redcolor">19000CJS</div>
          <span class="gcolor f14">≈￥95000</span>
        </div>
      </div>

      <div class="flex sb">
        <span class="gcolor">{{$t('m.zsfwz')}}</span>
        <span class="tcolor">60000</span>
      </div>
    </div>
    <div class="dc-ft center qbk">
      <div class="n-btn  btn-tcolor f14">{{$t('m.cksy')}}</div>
      <div class="mt6 gcolor f12">{{$t('m.oneyearjs')}}</div>
    </div>
  </div>
  <div class="dot-server block">
    <div class="tcolor f20">{{$t('m.fwtype')}}</div>
    <p class="tcolor"> {{$t('m.dqsy')}}<span class="f26 fw">5%</span></p>
    <p class="tcolor center fw">{{$t('m.yjyjls')}}</p>
    <div class="flex sb tcolor prevei limitW">
      <span>10000</span>
      <span>CJS</span>
    </div>
    <p class="center mb16 f14 gcolor borderLine sec-line"> {{$t('m.dqjbls')}}0CJS-525000CJS</p>
    <div>
      <div class="f14 gcolor ">{{$t('m.xzsylx')}}</div>
      <div class="form-row m16">
        <label for="" class="tcolor">{{$t('m.wwsy')}}</label>
        <div class="gcolor f14">{{$t('m.cxzjsp')}}</div>
      </div>
      <div class="form-row m16">
        <label for="" class="tcolor">{{$t('m.dtsy')}}</label>
        <div class="gcolor f14">{{$t('m.syzsnlz')}}</div>
      </div>

      <div class="center" style="marginTop: 60px;">
        <div class="n-btn  btn-tcolor f14 " style="width: 50%;" @click="calcProfit">{{$t('m.jssy')}}</div>
      </div>
    </div>
  </div>
  <REST v-if="!isMobile" />
</div>
</template>

<script>
import REST from './rest'
export default {
  data () {
    return {
      slider: 20
    };
  },
  components: {REST},
  computed: {
    isMobile () {
          return this.$store.getters.isMobile
      }
  },
  mounted() {},
  methods: {
    calcProfit() {
      if(this.isMobile) {
        this.$router.push({name:'calcerrest'})
      }
    }
  }
}

</script>
<style lang='scss'>
.dot-cer ,.hy-alloc{
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
}
.dc-tt {
  height: 45px;
  line-height: 45px;
}
.pc {
  .dc-bd {
    padding: 16px 32px;
  }
}
.dc-bd {
  padding: 16px;
  select {
    background: rgba(8, 100, 153, 0.159);
    border-radius: 4px;
    height: 45px;
    line-height: 45px;
    width: 100%;
    border:none;
    outline: none;
    
  }
}
.dc-ft {
  padding: 30px 0;
}
.prevei {
  box-sizing: border-box;
  height: 45px;
  padding: 0 10px;
  line-height: 45px;
  border-radius: 5px;
  overflow: hidden;
  
  background: rgba(8, 100, 153, 0.159);

}
.limitW {
  width: 80%;
  margin: 0 auto;
}
.dot-server,.dot-output {
  .sec-line {
    padding-bottom: 16px;
  }
}
.slider-hint {
  i{
    margin: 0 6px;
  }
  i:before {
    content:'';
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 4px;
    background-color: #086599
  }
  i:last-child:before {
    background-color: #38B573
  }
}
.pc {
  .dot-cer {
    // width: 412px;
    flex: 1
  }
  .dot-server {
    flex: 1.2;
    // width: 564px;
    margin: 0 16px;
  }
  .dot-output {
    flex: 1.2;
    // width: 568px;
  }

}
</style>