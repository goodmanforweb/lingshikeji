<template>
    <Layer>
        <div class="inputpass dbox reinputpass">
            <div class="ip-tt f20 center">{{$t('ms.ljlj')}}</div>
            <div class="ip-info f14" v-html="$t('ms.conzhong')"></div>
            <div class="ip-input">
                <input type="text">
            </div>
            <div class="ip-btns flex">
                <el-button class="btn-round btn-cancel fma" @click="close">{{$t('ms.cancel')}}</el-button>
                <!-- <div class="btn-round fma" @click="close">{{$t('ms.cancel')}}</div> -->
                <div class="btn-round btn-confirm fma" @click="confirm">{{$t('ms.confirm')}}</div>
            </div>
        </div>
    </Layer>
</template>
<script>
import Layer from './layer';
import i18n from '../../../i18n/index';

export default {
    i18n,
    components: {
        Layer
    },
    beforeDestroy() {
        this.$el.parentElement.removeChild(this.$el);
    },
    methods: {
        close() {
            this.closer && this.closer();
            this.$destroy();
        },
        confirm() {
            this.confirmr && this.confirmr();
        }
    }
}
</script>

<style lang="scss">
.reinputpass {
    .ip-tt,.ip-info i {
        color: var(--wincolor);
    }
}
</style>


