<!--  -->
<template>
<Page :title="$t('m.hydash')" borderLine padding>
<span class="tcolor f12" slot="layer-right-btn" @click="$router.push('/guide')">{{$t('m.guide')}}</span>

<div class="dot-detail">
    <div class="flex sb vc" v-if="!isMobile">
        <span class="tcolor fw f24">
            {{$t('m.bnrw')}}
        </span>
        <router-link to="/guide" class="n-btn btn-tcolor-border">
            {{$t('m.checkguide')}}
        </router-link>
    </div>

    <div class="dh-bar block re tcolor m16">
      {{$t('m.bnhint1')}}
    </div>
    <div class="sb" :class="{flex: !isMobile}">
      <div class="bn-cube center block" :class="{'flex sb vc mb16':isMobile}">
        <div class="gcolor">{{$t('m.bnhint2')}}</div>
        <span class="tcolor f24">10%</span>
      </div>
      <div class="bn-cube center block" :class="{'flex sb vc':isMobile}">
        <div class="gcolor">{{$t('m.scangzqi')}}</div>
        <span class="tcolor f24">365{{$t('m.day')}}</span>
      </div>
    </div>
    <div class="f14 tcolor m20">
      {{$t('m.bnhint3')}}
    </div>

    <div class="center">
        <div class="tcolor f14 mb6">{{$t('m.kgmesy')}}8</div>
        <div class="n-btn f20 btn-tcolor hcenter btn-panel-width" >19000 CJ</div>
    </div>

    
</div>
</Page>
</template>

<script>
export default {
    props: ['panelData'],
    data () {
        return {
            
        };
    },
    created() {
        
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

.pc {
  .dot-detail {
    width: 500px;
  }
  .bn-cube {
    width: 200px;
  }
}
.mobile {
  .bn-cube {

  }
}
</style>