<template>
<Page :title="$t('m.tqqr')" borderLine padding routerBack="ddash">
    <Layer :type="isMobile" :float="true" v-if="isMobile ? true : show">
        <div class="checkin shadow center" :class="{flex1: isMobile}">
            <div class="ck-hd  tcolor" v-if="!isMobile">
                <i class="el-icon-error" @click="$emit('update:show', false)"></i>
                {{$t('m.tqqr')}}
            </div>
            <div class="ck-bd center" style="paddingBottom: 30px">
                <p class="tcolor f12">{{$t('m.dqktiquepower')}}</p>
                <div class="redcolor">
                    <span class="f30">{{value}}</span>
                    <span class="f12">USD</span>
                </div>
                <div class="center f12 redcolor" v-show="isGet">{{$t('m.yigong')}}:{{total}}CJOY</div>
            </div>
            <div class="ck-ft" style="paddingBottom: 30px">
                <p class="center f12 gcolor" v-show="isGet">1.00000000USD ≈ {{powerprice | fix(4)}}CJOY</p>
                <div>
                    <el-button class='cj-btn-price f20 n-btn center' :loading="loader" @click='tiqucheck'>{{$t('m.ljitiqu')}}</el-button>
                </div>
            </div>
        </div>
    </Layer>
</Page>
</template>
<script>
import Layer from '../../widgets/layer';
import {mapGetters} from 'vuex';
import Big from 'bignumber.js'
import verifyman from '../../../mixins/index';
import Hub from '../../../Hub'

export default {
    data() {
        return {
            loader: false,
            powerprice: 0,
            isGet: false,
        }
    },
    mixins: [verifyman],
    components: {
        Layer
    },
    created() {
        this.isMobile && this.getPowerPrice();
    },
    computed: {
        ...mapGetters(['isMobile']),
        d() {
            return this.isMobile ? this.$route.query : this.data;
        },
        value() {
            if(!this.d.value) return 0;
            return util.fix(this.d.value, 4)
        },
        total() {
            return Big(this.value).times(this.powerprice).toFixed(4,1)
        }

    },
    props: ['show','data'],
    methods: {
        getPowerPrice() {
          request.getPowerPrice({params: {project: this.$route.params.id}})
          .then(res => {
              this.isGet = true;
              this.powerprice = res.data.price;
          })
        },
        tiqucheck() {
            if(Number(this.d.value) == 0) return;
            this.verifyMan().then(res => {
                if(res.state == 'succ') {
                    this.tiquhandle(res.data);
                }
            })
        },
        tiquhandle(jtdata) {
            this.loader = true;
            request.fwsWidthdraw({
                data: {
                    challenge: jtdata.geetest_challenge,
                    validate:jtdata.geetest_validate,
                    seccode:jtdata.geetest_seccode,
                    flag: this.flag,
                    project:this.d.id,
                    value: Number(this.d.value)
                }
            })
            .then(res => {
                this.$message.info(this.$t('m.exportsuc'));
                Hub.$emit('freshSignData', true);
                !this.isMobile && setTimeout(() => {
                    this.$emit('update:show', false)
                }, 1000)
                this.isMobile && this.$router.push(`/ddash?id=${this.d.id}`);
            })
            .catch(() => {
                this.$message.info(this.$t('m.exportfail'));
            })
            .finally(() => {
                this.loader = false;
            }) 
        }
    },
    watch: {
        show(n) {
            n && this.getPowerPrice();
        }
    }
}
</script>
<style lang="scss">


</style>

