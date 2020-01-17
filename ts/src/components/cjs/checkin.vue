<template>
<Page :title="$t('m.sytai')" borderLine padding >
    <Layer :type="isMobile" :float="true" v-if="isMobile ? true : show">
        <div class="checkin shadow center" :class="{flex1: isMobile}">
            <div class="ck-hd  tcolor" v-if="!isMobile">
                <i class="el-icon-error" @click="$emit('update:show', false)"></i>
                {{$t('m.sytai')}}
            </div>
            <div class="ck-bd">
                <span class="f14 tcolor">{{$t('m.querenzhifu')}}</span>
                <div class="tcolor ck-price">
                    <span class="f34 fw">{{d.value | currency(4)}}</span><span class="f14">{{d.coin | uppercase}}</span>
                </div>
                <div>
                    <img style="width: 20px" src="../../assets/images/plogo.png" alt="">
                    <div class="f12 tcolor">{{$t('m.buy') + 'CJS'}}</div>
                
                
                </div>
            </div>
            <div class="ck-ft">
                <span class="gcolor f12">{{$t('m.dqye')}} {{d.balance | currency(4) }}{{d.coin | uppercase}}</span>
                <div class="m16">
                    <el-button :loading="loader"   @click="buycheck" class='cj-btn-price f20 n-btn center'>{{$t('m.buy')}}</el-button>
                </div>
            </div>
        </div>
    </Layer>
</Page>
</template>
<script>
import Layer from '../widgets/layer';
import {mapGetters, mapActions} from 'vuex';
import Big from 'bignumber.js'
import verifyman from '../../mixins/index';
export default {
    components: {
        Layer
    },
    mixins: [verifyman],
    computed: {
        ...mapGetters(['isMobile']),
        d() {
            return this.isMobile ? this.$route.query : this.data;
        }
    },
    props: ['show','data'],
    data() {
        return {
            loader: false
        }
    },
    methods: {
        ...mapActions(['getManAssetsLists']),
           buycheck() {
               if(!this.d.value) return ;
               this.verifyMan().then(res => {
                    if(res.state == 'succ') {
                        this.buy(res.data);
                    }
                })
           },
           buy(jtdata) {
            this.loader = true;
            request.buyCJS({
                data: {
                    challenge: jtdata.geetest_challenge,
                    validate:jtdata.geetest_validate,
                    seccode:jtdata.geetest_seccode,
                    flag: this.flag,
                    id: this.d.id,
                    value: util.toHex(this.d.value, 18)
                }
            })
            .then(res => {
                this.$message.info(this.$t('m.buysuc'));
                this.getManAssetsLists();
                this.isMobile ? this.$router.back() : this.$emit('update:show', false);
            })
            .catch(err => {
                this.$message.info(this.$t('m.buyfail'))

            })
            .finally(() => {
                this.loader  = false;
            })
        }
    }
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

