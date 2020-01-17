<template>
    <div class="kj-power">
         <div class="kj-m-tt center f32">
            <span>{{$t('ms.nlz')}}</span>
            <span>{{pool.Energy}}</span>
        </div>

       <div class="kre-box-wrap">
            <div class="kre-box">
                <div class="km-box-tt center">
                    <span>{{$t('ms.buytl')}}</span>
                </div>
                <div class="kre-bd">
                    
                    <ul @click="showList" ref='ul'>
                        <li class="kre-list">
                            <div class="kj-pw-tt flex sb vc">
                                <div class="pw-avtar flex vc">
                                    <div class="pw-avtar-icon hearts">
                                        <span></span>
                                        <i></i>
                                    </div>
                                    <span class="pw-avtar-text f28">
                                        100{{$t('ms.dtlz')}}
                                    </span>
                                </div>
                                <div class="pw-price">
                                    <span class="pw-price-label f28">
                                        100
                                    </span>
                                    <span class="pw-price-stone">

                                    </span>
                                </div>
                            </div>
                            <div class="kj-pw-info flex sb vc">
                                <span class="pw-avtar-info f20">{{$t('ms.hftl', {num:100*ratio})}}</span>
                                <div class="pw-btns flex">
                                    <div class="kjbtn-wrap center">
                                        <el-button class="kjbtn kjbtn-invite disabled f18">
                                            {{$t('ms.zshy')}}
                                        </el-button>
                                        <!-- <div class="kjbtn kjbtn-invite disabled f18"></div> -->
                                        <div class="f14">{{$t('ms.zwkq')}}</div>
                                    </div>
                                    <el-button class="kjbtn kjbtn-buy f18  audiobtn" @click="buy(100)">
                                        {{$t('ms.buynow')}}
                                    </el-button>
                                </div>
                            </div>
                        </li>
                        <li class="kre-list">
                            <div class="kj-pw-tt flex sb vc">
                                <div class="pw-avtar flex vc">
                                    <div class="pw-avtar-icon phearts">
                                            <span></span>
                                            <i></i>
                                    </div>
                                    <span class="pw-avtar-text f28">
                                        1000{{$t('ms.dtlz')}}
                                    </span>
                                </div>
                                <div class="pw-price">
                                    <span class="pw-price-label f28">
                                        1000
                                    </span>
                                    <span class="pw-price-stone">

                                    </span>
                                </div>
                            </div>
                            <div class="kj-pw-info flex sb vc">
                                <span class="pw-avtar-info f20">{{$t('ms.hftl', {num:1000*ratio})}}</span>
                                <div class="pw-btns flex">
                                    <div class="kjbtn-wrap center">
                                        <el-button class="kjbtn kjbtn-invite disabled f18">
                                            {{$t('ms.zshy')}}
                                        </el-button>
                                        <!-- <div class="kjbtn kjbtn-invite disabled f18"></div> -->
                                        <div class="f14">{{$t('ms.zwkq')}}</div>
                                    </div>
                                    <el-button class="kjbtn kjbtn-buy f18 audiobtn" @click="buy(1000)">
                                        {{$t('ms.buynow')}}
                                    </el-button>
                                </div>
                            </div>
                        </li>
                        <li class="kre-list">
                            <div class="kj-pw-tt flex sb vc">
                                <div class="pw-avtar flex vc">
                                    <div class="pw-avtar-icon bhearts">
                                        <span></span>
                                        <i></i>
                                    </div>
                                    <span class="pw-avtar-text f28">
                                        {{$t('ms.quanman')}}
                                    </span>
                                </div>
                                <div class="pw-price">
                                    <span class="pw-price-label f28">
                                        {{needAllTL}}
                                    </span>
                                    <span class="pw-price-stone">

                                    </span>
                                </div>
                            </div>
                            <div class="kj-pw-info flex sb vc">
                                <span class="pw-avtar-info f20">{{$t('ms.hftl', {num:needAllTL*ratio})}}</span>
                                <div class="pw-btns flex">
                                    <div class="kjbtn-wrap center">
                                        <el-button class="kjbtn kjbtn-invite disabled f18">
                                            {{$t('ms.zshy')}}
                                        </el-button>
                                        <!-- <div class="kjbtn kjbtn-invite disabled f18"></div> -->
                                        <div class="f14">{{$t('ms.zwkq')}}</div>
                                    </div>
                                    <el-button class="kjbtn kjbtn-buy f18 audiobtn" @click="buy(needAllTL)">
                                        {{$t('ms.buynow')}}
                                    </el-button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="kjbtn-buy-wrap center" v-if="!isMobile">
                <router-link to="/kjbuyrecord">
                    <div class="kjbtn kjbtn-stone">
                        <span class="scale"></span>
                    </div>
                    <span class="kb-text">{{$t('ms.buyrecord')}}</span>
                </router-link>
                
            </div>
       </div>

        <Buyrecord v-if="isMobile" :fetchsuc="fetchsuc"/>
        
    </div>
</template>
<script>
import Buyrecord from './buyrecord';
import {mapGetters, mapActions} from 'vuex';
import util from 'util';
import Big from 'bignumber.js';
export default {
    data() {
        return {
            needAllTL: 0,
            fetchsuc: 0,
            ratio: 1
        }
    },
    computed: {
        ...mapGetters(['isMobile', 'pool', 'cjtid'])
    },
    components: {
        Buyrecord
    },
    created() {
        this.getRatio();
    },
    mounted() {
        this.setListActive(0)
    },
    methods: {
        ...mapActions(["getAsset"]),
        buy(value) {
            this.$dialog({
                text: value+this.$t('ms.dtlz')
            }, () => {
                this.buyEnergy(value);
            }, () => {

            })
        },
        showList(e) {
            let target = e.target, isGet = false, isFold = false, isButton = false;
            do {
                if(target.tagName == 'BUTTON') {
                    isButton = true;
                   break;
                }
                // if(target.className == 'pw-price-stone') {
                //     isFold = true;
                // }
                if(target.tagName == 'LI') {
                    isGet = true;
                    break;
                }
            } while (target = target.parentElement);
            if(!isGet || isButton || target.classList.contains('active'))return;
            // if(target.classList.contains('active')) {
            //     target.classList.remove('active')
            // }
            // else {
            //     target.classList.add('active')
            // }
            // if(target.classList.contains('active') && !isFold)return;
            let key = null;
            [...this.$refs.ul.children].forEach((el, index) => {
                if(el == target) {
                    return key = index;
                }
            });
            if(key == null)return;
            this.setListActive(key);
        },
        setListDeactive(key) {
            [...this.$refs.ul.children].forEach((el, index) => {
                if(index == key) {
                    el.classList.remove('active')
                }
            });
        },
        setListActive (key) {
            [...this.$refs.ul.children].forEach((el, index) => {
                if(index == key) {
                    if(el.classList.contains('active')) {
                        //do nothing
                    }
                    else {
                        el.classList.add('active')
                    }
                }
                else {
                    el.classList.remove('active')
                }
            });
        },
        setNeedAllTL() {
            if(Object.keys(this.pool).length == 0)return;
            const needPower = Big(this.pool.Valid).minus(this.pool.Free).toNumber();
            if(needPower > 0 && this.ratio) {
                this.needAllTL = Math.ceil(needPower/Number(this.ratio));
            } 
        },
        getRatio() {
            util
            .getRatio({}, {}, this)
            .then(res => {
                if (res.data.code == 0) {
                    this.ratio = res.data.ratio;
                    this.setNeedAllTL();
                }
            })
            .catch(err => {
                this.$message.info(this.errorInfo(err.response));
            })
            .finally(() => {});
        },
        buyEnergy(value) {
            value = Number(value);
            if(!value)return;
            value = Big(value).times(1e4).toNumber();
            util
            .buyEnergy({data: {value}}, {}, this)
            .then(res => {
                if (res.data.code == 0) {
                    this.$message.info(this.$t('ms.buysuc'));
                    this.getAsset({ ctx: this, asset: this.cjtid });
                    this.$store.commit('givenPool', {process: true, pool: res.data.pool});
                    this.fetchsuc++;
                    
                }
            })
            .catch(err => {
                this.$message.info(this.errorInfo(err.response));
            })
            .finally(() => {});
        }
    }
}
</script>

<style lang="scss">

 
</style>

