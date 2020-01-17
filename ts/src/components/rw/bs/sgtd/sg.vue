<template>
    <ul>
        <li class="mb16" >
            <div class="bs-info-wrap flex">
                <div>
                    <div class="bs-avatar flex vc hc" :style="`backgroundImage:url(${data.img})`">
                        <div class="wc f800 f20 fuper center">{{data.name[$i18n.locale]}}</div>
                    </div>
                    <div class="bs-btns center" v-if="isMobile">
                        <el-button class="bs-btn" @click="btnHandle">{{btnText}}</el-button>
                        <div class="f12 tcolor mt6">
                            <a :href="data.url" target="_blank">{{$t('m.lioajiexm')}}</a>
                        </div>
                    </div>
                </div>
                <div class="bs-info flex1" :class="{'flex sb': !isMobile}">
                    <div class="bs-ii tcolor flex v sb">
                        <div class="bs-row">
                            <div class="f250">{{$t('m.fxjg')}}</div>
                            <div class="f500">1 {{uint[0]}} ≈ {{data.rate+" " +uint[1]}}</div>
                        </div>
                            <div class="bs-row">
                            <div class="f250">{{$t('m.mbsgsl')}}</div>
                            <div class="f500">{{data.total +' ' + uint[0]}}</div>
                        </div>
                    </div>
                    <div class="bs-ii tcolor flex v sb">
                        <div class="bs-row">
                            <div class="f250">{{$t('m.sgkstime')}}</div>
                            <div class="f500">{{data.start | format}}</div>
                        </div>
                            <div class="bs-row">
                            <div class="f250">{{$t('m.sgjstime')}}</div>
                            <div class="f500 redcolor">{{data.end | format}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bs-pro flex vc m16">
                <div class="flex1" :class="{center: isMobile}">
                    <el-progress :percentage="Number(data.progress)" :show-text="false" color="#2EBA7E" :stroke-width=8></el-progress>
                    <div class="f12 tcolor mt6">
                        {{$t('m.sgjd')}}: {{data.progress}}% &nbsp;&nbsp;{{data.finished + '' + uint[0]}}
                    </div>
                </div>
                <div class="bs-btns center" v-if="!isMobile">
                    <el-button class="bs-btn" @click="btnHandle">{{btnText}}</el-button>
                    <div class="f12 tcolor mt6">
                        <a :href="data.url" target="_blank">{{$t('m.lioajiexm')}}</a>
                    </div>
                </div>
            </div>
            <Buy :show="state" :info="data" :uint="uint" @buysuc="handle" v-if="!isMobile"/>
        </li>

        <el-dialog
        v-if="isMobile"
        class="bs-buy-dialog"
        :visible.sync="state"
        width="98%"
        :close-on-press-escape='false'
        :show-close="false"
        center>

         <Buy :info="data" :uint="uint"  :show="state"  @buysuc="handle"  />

        </el-dialog>
    </ul>
</template>
<script>
import {mapGetters} from 'vuex';
import Buy from './buy'
export default {
    props: ['data','uint'],
    data() {
        return {
            centerDialogVisible: false,
            state: false,
        }
    },
    components: {Buy},
    computed: {
      ...mapGetters(['isMobile']),
      btnText() {
            if(this.isMobile) return this.$t('m.sgxm');
            return !this.state ? this.$t('m.sgxm'): this.$t('m.shouqi');
      }
    },
    methods: {
        handle() {
            setTimeout(() => {
                this.state = false;
            }, 1500)
        },
        btnHandle() {
            if(this.isMobile) {
                this.state = true;
            }
            else {
                this.state = !this.state;
            }
        }
    }
}
</script>
<style lang="scss">
.bs-buy-dialog .el-dialog{
    background-color: transparent;
    box-shadow: none!important;
}
</style>
