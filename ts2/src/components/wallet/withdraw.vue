<template>
<Page :title="$t('m.cjoytx')" borderLine padding routerBack="/wallet">
    <div class="widthdraw" :class="{'wallet-sub': isMobile}" >
        <div class="tcolor f24 fw de-tt" v-if="!isMobile">{{$t('m.cjoytx')}}</div>

        <div :class="`${isMobile ? 're block' :''}`">
            <div :class="`${isMobile ? 'coin-name flex vc' : 'm20'}`">
                <span class="coin-icon" v-if="isMobile">
                    <img  alt="">
                </span>
                <div class="tcolor">
                    <span class="f14">{{$t('m.kyye')}}</span>
                    <div><span class="f40 fw">8989</span><span class="f12">.90</span></div>
                </div>
            </div>

            <div :class="{block: !isMobile}" :style="`${isMobile&& 'padding:16px;'}`">
                <div class="form-row">
                    <label for="" class="tcolor">{{$t('m.txsl')}}</label>
                    <div class="plat-input">
                        <input type="text" :placeholder="$t('m.txhint3')">
                    </div>
                </div>
                <div class="form-row">
                    <label for="" class="tcolor">{{$t('m.txdizhi')}}</label>
                    <div class="plat-input" >
                        <input type="text" :placeholder="$t('m.txhint4')">
                    </div>
                </div>
                <div class="form-row">
                    <label for="" class="tcolor">{{$t('m.mima')}}</label>
                    <div class="plat-input">
                        <input type="text" :placeholder="$t('m.txhint5')">
                    </div>
                </div>
                <div class="form-row">
                    <label for="" class="tcolor">{{$t('m.yzma')}}</label>
                    <div class="plat-input flex vc">
                        <input type="text" class="flex1" :placeholder="$t('m.txhint6')">
                        <span class="btn-get tcolor f14 ">{{$t('m.get')}}</span>
                    </div>
                </div>
                <div class="center">
                    <el-button class="tcolor n-btn btn-confirm">{{$t('m.sure')}}</el-button>
                </div>
            </div>

        </div>

        <div class="wi-hint f12 gcolor" style="marginTop: 30px;" v-html="$t('m.txhint')">
        </div>
    </div>
</Page>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters(['isMobile'])
    },
}
</script>

<style lang="scss">
.pc {
    .widthdraw {
        width: 350px
    }
}
.form-row {
    label {
        font-size: 14px;
    }
    margin-bottom: 16px;
}
.plat-input {
    border-bottom: 1px solid rgba(175, 187, 194, 0.493);
    input {
        margin-top: 10px;
        padding: 4px 2px;
        font-size: 12px;
        border:none;
        outline: none;
        width: 100%;
        color: #086599;
        box-sizing: border-box;
    }
}
 .ts .btn-confirm {
    padding: 0;
    width:79px;
    text-align: center;
    height:30px;
    line-height: 30px;
    color: #086599;
    border-radius:4px;
    border:1px solid rgba(8,101,153,1);

}
.ts .btn-get {
    cursor: pointer;
}
</style>

