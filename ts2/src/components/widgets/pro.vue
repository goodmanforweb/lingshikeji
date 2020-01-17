<template>
<Page title="申请PRO" borderLine padding routerBack='/pro' >
    <Layer :type="isMobile" :float="true" v-if="isMobile ? true : show">
        <div class="checkin shadow center" :class="{flex1: isMobile}">
            <div class="ck-hd  tcolor" v-if="!isMobile">
                <i class="el-icon-error" @click="$emit('update:show', false)"></i>
                申请PRO
            </div>
            <div class="ck-bd">
                <div class="ercode">
                    <img src="../../assets/images/ercode.png" alt="">
                </div>
                <div class="tcolor f14" style="margin: 20px 0;">
                    微信添加CJ小助手获取申请材料
                    <br>
                    了解更多PRO成员权益
                </div>
                <div class="tqc f14">
                    <img style="width: 20px" src="../../assets/images/plogo.png" alt="">
                    CryptoJOY
                </div>
            </div>
        </div>
    </Layer>
</Page>
</template>
<script>
import Layer from './layer';
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters(['isMobile'])
  },
    components: {
        Layer
    },
    props: ['show']
}
</script>
<style lang="scss">
.ercode img {
    width: 200px
}
</style>

