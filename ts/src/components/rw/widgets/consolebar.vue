<template>
    <div class="m16">
        <div v-if="data.isSign" class="block  hy-notice flex vc" :class="{'sb': !isMobile,v: isMobile}">
            <div class="flex vc" :class="{mb16: isMobile}">
                <i class='el-icon-circle-check yes-icon' v-if="data.isHYValid "></i>
                <i class='el-icon-warning sigh-icon' v-else></i>
                <div class="hyn-text ">
                    <div class="tcolor fuper">{{data.isHYValid ? $t('m.yqianyue')+" " +($i18n.locale == 'zh' ? data.name : data.name_en): ($i18n.locale == 'zh' ? data.name : data.name_en)+" " + $t('m.shixiao')}}</div>
                    <span class="gcolor f12">{{$t('m.youxiaoqizhi')}}{{data.end_time | format}}</span>
                </div>
            </div>

            <div @click="$emit('consoleBtnActive')" class="n-btn btn-tcolor nowrap">{{$t('m.hydash')}}</div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    props: ['data'],
    computed:{
        ...mapGetters(['isMobile'])
    }
}
</script>
