<template>
    <Layer @close="close" :title="$t('ms.nljyz')" class="energywrap">
        <div class="energy-box">
            <div class="energy-text center mb20">
                <span class="xn hcc f30">{{$t('ms.wyxn')}}:</span>
                <div class="f30"><span class="lcc">{{slidervalue}}/</span><span class="hcc">{{totalenergy}}</span> </div>
            </div>
            <div class="energy-slider flex sb vc">
                <span class="jian es-btn-icon" @click="reduc"></span>
                <div class="flex1">
                    <el-slider class="es-slider" v-model="slidervalue" :min=0 :max='Math.floor(totalenergy)'/>
                </div>
                <span class="jia es-btn-icon" @click="plus"></span>
            </div>
            <div class="f20">
                <span>{{$t('ms.xynl')}}:</span> {{pool.Energy}}
            </div>
            <el-button class="kjbtn ks-btn kjbtn-buy audiobtn" @click="confirm" :loading='btnloader' :disabled="diable">
                {{$t('ms.confirm')}}
            </el-button>
            <div class="center tz" >
                <router-link to="/kjpower" class="f20 bugou">{{$t('ms.buypower')}}</router-link>
            </div>
        </div>
    </Layer>
</template>
<script>
import Layer from './layer';
import i18n from 'i18n';
import store from 'store';
import router from 'xrouter';
import util from 'util';
import {mapGetters} from 'vuex';
import Big from 'bignumber.js';
export default {
    data() {
        return {
            data: {
                src: '',
                text:''
            },
            value:0,
            max: 100,
            totalenergy: 10,
            slidervalue: 0,
            btnloader: false,
            showbugou: false,
            diable:false

        }
    },
    i18n,
    store,
    router,
    components: {
        Layer
    },
    beforeDestroy() {
        this.$el.parentElement.removeChild(this.$el);
    },
    computed: {
        ...mapGetters(['pool', 'audio'])
    },
    created() {
        this.coin = document.querySelector('#coin');
        this.showbugou = this.pool.Energy < 1;
        this.calcEnergy();
    },
    methods: {
        reduc() {
            let slidervalue = this.slidervalue;
            if(--slidervalue == 0) return;
            this.slidervalue = slidervalue;
        },
        plus() {
            let slidervalue = this.slidervalue;
            if(++slidervalue > Math.floor(this.totalenergy)) return;
            this.slidervalue = slidervalue;
        },
        calcEnergy() {
            let t = Big(this.pool.Valid).minus(this.pool.Free).toNumber();
            this.totalenergy = Math.ceil(t);
        },
        close() {
            this.closer && this.closer();
            this.$destroy();
        },
        confirm() {
            this.confirmr && this.confirmr();
            const promi = this.mine();
            if(this.audio.tx && (util.checkSys() == 'ios')) {
                setTimeout(() => {
                    this.coin.play();
                }, 200);
            }
            promi && promi.then(data => {
                this.close();
                this.showFire(data);
            })
            // this.$destroy();
        },
        showFire(data) {
            this.$fire({
                mined: data
            }, () => {}, () => {});
        },
        mine() {
            if(this.slidervalue > this.pool.Energy || this.diable || this.slidervalue <= 0) return;
            this.btnloader = true;
            return util
            .mine({data: {
                value: Big(this.slidervalue).times(1e4).toNumber(),
            }}, {}, this)
            .then(res => {
                    if (res.data.code == 0) {
                        let oldMined = this.pool.weekBalance, newMined = 0;
                        if (Array.isArray(res.data.pool.Machines)) {
                        let t = res.data.pool.Machines.reduce((prev, next) => Big(prev).plus(next.Mined).toNumber(), 0);

                        newMined = util.dropDec(t, 1e4);
                        this.$store.commit('givenPool', {process: true, pool: res.data.pool});
                        return Math.abs(Big(oldMined).minus(newMined).toNumber());
                    }   
                }
            })
            .catch(err => {
                this.$message.info(this.errorInfo(err.response));
            })
            .finally(() => {
                this.btnloader = false;
            });
        },
        checkPower() {
            if(this.slidervalue > this.pool.Energy) {
                this.slidervalue = Math.floor(this.pool.Energy);
                this.showbugou = true;
                this.diable = true
            }
            else {
                this.diable = false
            }
            
        }
    },
    watch: {
        '$route.name': function() {
            this.close();
        },
        slidervalue:{
            immediate: true,
            handler: function() {
                this.checkPower();
            }
        }
    }
}
</script>

<style lang="scss">
.energy-box {
    padding: 0 20px;
    margin-top: -20px;
    .ks-btn {
        margin: 20px 0;
    }
    .el-slider__runway {
       margin:0;
        background: url(../../../assets/images/sliderbar.png) no-repeat center/100% 100%;
        height: 16px;
    }
    .el-slider__bar {
        margin: 1px 2px 3px;
        height: calc(100% - 4px);
        
        border-radius: 10px;
        box-sizing: border-box;
        background: url(../../../assets/images/slideractivebar.png) no-repeat center/100% 100%;
    }
    .el-slider__button-wrapper {
        top: -10px;
    }
    .el-slider__button {
        border: 3px solid #57D1E0;
    }
}
.es-btn-icon {
    width: 40px;
    height: 37px;
    cursor: pointer;
    transition: all .3s linear;
}
.es-btn-icon:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 2px #000;
}
.jian {
    background: url(../../../assets/images/jian.png) no-repeat center/contain;
}
.jia {
    background: url(../../../assets/images/jia.png) no-repeat center/contain;
}
.es-slider {
    width: 80%;
    margin: 0 auto;
}
.hcc {
    color:#5E6074
}
.lcc {
    color:#35B6B9
}
.xn {
    line-height: 2;
}
.bugou {
    color:#202848;
    border-bottom: 1px solid #202848;
    padding-bottom: 4px;
}
</style>


