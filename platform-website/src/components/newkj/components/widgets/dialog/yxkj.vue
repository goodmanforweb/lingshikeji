<template>
    <Layer @close="close" :title="$t('ms.mypool')">
        <div class="yxkj">
             <el-carousel ref="slider" :autoplay='false' :height="isMobile ? '8rem' : '5.5rem'" @change="sliderchange" arrow="never" indicator-position="none">
                <el-carousel-item v-for="(row,index) in tableData" :key="index">
                    <div class="yj-hd flex">
                        <div class="yj-avtar center">
                            <div class="yj-name f18 textshadow">{{row.kj}}</div>
                            <img :src="row.img || pic">
                        </div>
                        <ul class="yj-info flex1 f20">
                            <li class="flex sb lcolor">
                                <span >{{$t('ms.kj')}}</span>
                                <span >{{row.UID}}</span>
                            </li>
                            <li class="flex sb textshadow">
                                <span >{{$t('ms.mrsl')}}</span>
                                <span >{{row.counter}}</span>
                            </li>
                            <li class="flex sb hhcolor textshadow">
                                <span >{{$t('ms.mbkjsy')}}</span>
                                <span >{{row.tprofit}}</span>
                            </li>
                            <li class="flex sb textshadow">
                                <span >{{$t('ms.dqkjsy')}}</span>
                                <span >{{row.cprofit}}</span>
                            </li>
                            <li class="flex sb textshadow" v-if="cd.length > 0">
                                <span >{{$t('ms.kjcdown')}}</span>
                                <span >{{cd}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="yj-bd">
                         <Clock :time="row.clocktime" :activeTime="row.circler"/>
                    </div>
                </el-carousel-item>
            </el-carousel>

            <div class="yj-arrows flex sb">
                <a class="yj-left-stone audiobtn" @click="$refs.slider.next()"></a>
                <a class="yj-right-stone audiobtn" @click="$refs.slider.prev()"></a>
            </div>
            <div class="yj-indicator center">
               {{activeindex}}/{{tableData.length}}
            </div>
        </div>
    </Layer>
</template>
<script>
const pic = require("../../../assets/images/d1.png");
import util from 'util';
import Clock from '../clock/clock.vue';
import Layer from './layer';
// import i18n from 'i18n';
import {mapGetters} from 'vuex';
import store from 'store';
import i18n from 'i18n';
import Big from 'bignumber.js';
export default {
    data() {
        return {
            pic,
            tableData:[],
            activeindex:1,
            cd: ''
        }
    },
    i18n,
    store,
    components: {
        Layer,
        Clock
    },
    computed: {
    ...mapGetters(["isMobile"])
  },
    created() {
        console.log(this.pool.Machines);
        this.setTable(this.pool);
    },
    beforeDestroy() {
        console.log('ty');
        this.$el.parentElement.removeChild(this.$el);
        this.cdticker && clearInterval(this.cdticker);
    },
    methods: {
        sliderchange(e) {
            this.activeindex = e + 1;
            this.createCountDownTicker(this.tableData[e]);
        },
        createCountDownTicker(el) {
            this.cdticker && clearInterval(this.cdticker);
            
            this.cdticker = setInterval(() => {
                this.calcCountDown(el);
            }, 1000);
            return this.calcCountDown(el);            
        },
        calcCountDown(el) {
            if(!el.LastMine) {
                this.cd = '';
                return;
            }
            let cd = (new Date().getTime() - new Date(el.LastMine).getTime());
            let t = 24*60*60;
            cd = cd/1000;
            cd = cd%t;
            cd = t - cd;

            this.cd = this.calcTime(cd, 'dft');

            // let day, hour, minutes, seconds;
                
            // day = Math.floor(cd/(t));
            // hour = Math.floor((cd%(t))/(3600) );
            // let k = (cd%(t))%(3600);
            // minutes = Math.floor(k/60);
            // seconds = Math.floor(k%60);

            //     this.cd = {
            //     day,
            //     hour,
            //     minutes,
            //     seconds,
            //     show: day==0 && hour==0 && minutes==0 && seconds==0
            // };
        },
        clipText(id) {
            return this.$options.filters.clip(id);
        },
        calcTime(time, type) {
            // if (time == 0) return 0;
            let h, m, s, t, k;
            k = 60 * 60;
            h = Math.floor(Big(time).div(k).toNumber());
            m = Math.floor(Big((time % k)).div(60).toNumber());
            s = Math.floor((time % k) % 60);

            const config = {
                zh: () => {
                h = `${h}小时`;
                m = `${m}分`;
                s = `${s}秒`;
                },
                en: () => {
                h = `${h}H`;
                m = `${m}M`;
                s = `${s}S`;
                },
                dft: () => {
                h = (h + "").length < 2 ? "0" + h : h;
                m = (m + "").length < 2 ? "0" + m : m;
                s = (s + "").length < 2 ? "0" + s : s;
                }
            }[type || this.$i18n.locale]();
            return type ? `${h}:${m}:${s}` : `${h} ${m} ${s}`;
        },

        setTable(n) {
            if (n && Array.isArray(n.Machines)) {
                this.tableData = n.Machines.map(el => {
                    let t = Big(el.MineDuration).times(el.Reserves).div(el.Productivity).toNumber();
                return {
                    LastMine: el.LastMine,
                    UID: this.clipText(el.ID),
                    img: el.Img,
                    kj: el.Name,
                    counter: util.dropDec(el.Productivity, 1e4),
                    tprofit: util.dropDec(el.OriginReserves, 1e4),
                    cprofit: util.dropDec(el.HistoryMined, 1e4),
                    clocktime: this.calcTime(
                    Math.floor(t),
                    "dft"
                    ),
                    circler: Math.ceil((1 - el.Reserves / el.OriginReserves) * 60),
                    progresser: 10 - (el.Mines / el.MaxMines).toFixed(2) * 10
                };
                });
            } else {
                this.tableData = [];
            }
    },
        close() {
            this.closer && this.closer();
            this.$destroy();
        },
        confirm() {
            this.confirmr && this.confirmr();
            this.$destroy();
        }
    },

}
</script>

<style lang="scss">
.tl-wrap {
     padding: 0 0.2rem;
     .kjbtn {
         i {
             vertical-align: middle;
        }
         .l-icon {
             width: 0.16rem;
             height: 0.16rem;
             display: inline-block;
             background: url(../../../assets/images/licons.png) no-repeat 0 0.02rem/154%;
        }
    }
}
 .tl-avtar {
     width: 1.4rem;
     height: 1.4rem;
     
     background-image: linear-gradient(-180deg, #292C3F 0%, #494A56 3%, #585961 5%, #707179 6%, #8F8F96 9%, #A7A7AE 11%, #B9B8BE 14%, #C3C2C8 17%, #C5C5C5 20%);
     img {
         max-width: 80%;
         max-height: 80%;
         vertical-align: middle;
    }
    
}
 .yxkj {
     padding: 0.06rem;
     margin-top: -0.2rem;
     margin-bottom: -0.3rem;
     position: relative;
}
 .yj-arrows {
     position: absolute;
     top: 50%;
     left: -0.6rem;
     right: -0.6rem;
     transform: translateY(-50%);
     a {
         width: 0.6rem;
         height: 1rem;
         display: block;
         cursor: pointer;
         transition: filter .3s ease-in-out;
    }
    a:hover {
        filter:drop-shadow(4px 4px 2px #F2D788) saturate(80%)
    }
     .yj-left-stone {
         background: url(../../../assets/images/leftstone.png) no-repeat center/contain;
    }
     .yj-right-stone {
         background: url(../../../assets/images/stone.png) no-repeat center/contain;
    }
}
 .yj-indicator {
     position: absolute;
     bottom:-0.5rem;
     left: 0;
     right: 0;
     >a {
         cursor: pointer;
         width: 0.3rem;
         height: 0.3rem;
         display: inline-block;
         background: url(../../../assets/images/indi.png) no-repeat center/contain;
         transition: filter .3s ease-in-out;
         button {
             height: 0;
             width: 0;
             display: none;
         }
    }
    >a:hover {
        filter:drop-shadow(0 4px 2px #F2D788);
    }
     >a.active {
         background: url(../../../assets/images/india.png) no-repeat center/contain;
    }
}
 .yj-hd {
     padding:6px 0;
     border-top: 1px dashed #9D9D9D;
     border-bottom: 1px dashed #9D9D9D;
}
 .yj-info {
     li {
         white-space: nowrap;
         border-bottom: 1px dashed #9D9D9D;
         line-height: 1.5;
         min-height: 22px;
         span:last-child {
             max-width: 60%;
             overflow: hidden;
            //  text-overflow: ellipsis;
         }
    }
     li:last-child {
         border:none 
    }
}
 .yj-avtar {
     width: 1.2rem;
     height: 1.6rem;
     min-width: 90px;
     min-height: 114px;
     margin-right: 0.06rem;
     padding: 10px;
     box-sizing: border-box;
     background-color:#C5C5C5;
     overflow: hidden;
     .yj-name {
         padding-bottom: 0.16rem;
    }
     img {
        //  width: 0.9rem;
         max-height: 60%;
    }
}
 .yj-bd {
     canvas {
         width: 100%;
         height: 100%;
    }
}
 
</style>


