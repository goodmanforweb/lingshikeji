<!--  -->
<template>
<Page style="height:100%" :title="$t('m.hysj')" borderLine padding >

<div class="hysj flex v hc vc" style="minHeight:100%;">
    <div class="checkin shadow mb6" :class="{flex1: isMobile}">
        <div class="ck-hd  tcolor center" v-if="!isMobile">
            <i class="el-icon-error" @click="$emit('update:show', false)"></i>
            {{$t('m.hysj')}}
        </div>
        <div class="ck-bd tcolor f14">
           <p> {{ $t('m.jin')+$t('m.onestar',{star: '二'})+$t('m.jjer')}}</p>
            <div>
                <i class='va el-icon-circle-check yes-icon'></i>
                <span class="va">{{$t('m.syfuwjb')}}：5% -> 7%</span>
            </div>
            <div>
                <i class='va el-icon-circle-check yes-icon'></i>
                <span class="va">{{$t('m.jjrange')}}：0-525000CJS -> 525001-100000CJS</span>
            </div>
            <div>
                <i class='va el-icon-circle-check yes-icon'></i>
                <span class="va">{{$t('m.nlzsong')}}：60000 -> 300000</span>
            </div>

            <p class="center">{{$t('m.ccsjneed')}}</p>
            <p class="center redcolor">
                <span class="f18">0.00</span>
                <i class="f12">CJS</i>
            </p>
        </div>
        <div class="ck-ft center">
            <span class="gcolor f12">{{$t('m.dqye')}}: 100,000.00 CJS</span>
            <div>
                <div class='cj-btn-price f20 n-btn center'>{{$t('m.buy')}}</div>
            </div>
        </div>
    </div>
    <div class="f12 redcolor">{{$t('m.sjhint1')}}</div>
</div>
</Page>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  components: {},
  computed: {
      isMobile() {
          return this.$store.getters.isMobile
      }
  },
  mounted() {},
  methods: {}
}

</script>
<style lang='scss'>
.hysj {
    .ck-bd {
        padding: 30px 30px 16px;
        .yes-icon {
            vertical-align: middle
        }
        .yes-icon:before {
            font-size: 16px;
        }

    }
}
</style>