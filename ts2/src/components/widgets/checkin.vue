<template>
<Page title="收银台" borderLine padding >
    <Layer :type="isMobile" :float="true" v-if="isMobile ? true : show">
        <div class="checkin shadow center" :class="{flex1: isMobile}">
            <div class="ck-hd  tcolor" v-if="!isMobile">
                <i class="el-icon-error" @click="$emit('update:show', false)"></i>
                收银台
            </div>
            <div class="ck-bd">
                <span class="f14 tcolor">确认支付</span>
                <div class="tcolor ck-price">
                    <span class="f34 fw">100000</span><span class="f14">CJS</span>
                </div>
                <div>
                    <img style="width: 20px" src="../../assets/images/plogo.png" alt="">

                    <div class="f14 tcolor ck-py" >朋友圈集赞任务</div>
                    <div class="f12 tcolor">CryptoJOY</div>
                
                
                </div>
            </div>
            <div class="ck-ft">
                <span class="gcolor f12">当前余额: 100,000.00 CJS</span>
                <div>
                    <div class='cj-btn-price f20 n-btn center'>购买</div>
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
    components: {
        Layer
    },
    computed: {
        ...mapGetters(['isMobile'])
  },
    props: ['show']
}
</script>
<style lang="scss">

.pc {
    .checkin {
        width: 460px;
    }
}
.checkin {
    border-radius: 8px;
    overflow: hidden;
}
.ck-hd {
   padding: 20px 16px;
   position: relative;
}
.ck-hd i {
    position: absolute;
    top: 20px;
    left: 16px;
    cursor: pointer;
    color:#BED4E1;
    font-size: 26px;
}
.ck-hd,.ck-ft {
    background: #E8F1F7
}
.ck-bd {
    padding: 30px 10px 16px;
    background: #fff;
}
.ck-price {
    margin: 8px 0 40px;
}
.ck-ft {
    padding: 8px;
}
.ck-py {
    margin: 8px 0;
}
</style>

