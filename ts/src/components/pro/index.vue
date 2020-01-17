<template>
<Page float styleBackIcon='filter: brightness(50);' routerBack="/index" class="flex" style="width: 100%">
    <div class="pro flex flex1 re">
        <div class="pro-bd flex1 flex hc vc" :class="{v:isMobile}">
            <template v-if="isMobile">
                <el-carousel ref="slider" :interval="5000"  :autoplay='false' :height="isMobile ? '350px' : '400px'"  arrow="never">
                    <el-carousel-item key=1>
                        <div class="pro-l">
                            <span :class="{let: isMobile}" class="llplus">{{$t('m.llplus')}}</span>
                            <div class="fw">
                                <span style="fontSize: 70px">PRO</span>
                                <span class="f30" style="vertical-align: 10px;">
                                    <i>.</i>
                                    <img style="width: 100px;" src="../../assets/images/prolog.png" alt="">
                                </span>
                            </div>
                            <div class="f18 fuper weixm" :class="{let: isMobile}" v-html="$t('m.pro1')">
                                
                            </div>
                            <div class="f12 m20 rliulan" :class="{let: isMobile}" style="opacity: .85" v-html="$t('m.pro2')">
                                
                            </div>
                        </div>
                    </el-carousel-item>
                    <el-carousel-item key=2>
                        <div class="pro-r">
                            <div class="pro-outline flex sb">
                                <div class="center po-l f14">
                                    <div v-html="$t('m.pro3')">
                                       
                                    </div>
                                    <div class="m20" v-html="$t('m.pro18')">
                                        
                                    </div>
                                </div>
                                <div class="center po-r" style="paddingTop: 40px">
                                    <div style="color:#C5E9FF" class='fw' v-html="$t('m.pro4')">
                                        
                                    </div>
                                    <div class="m20 f14" v-html="$t('m.pro5')">
                                        
                                    </div>
                                    <div class='f14' v-html="$t('m.pro6')">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <div class="center cj-btn-price-wrap">
                    <span class='cj-btn-price n-btn center nowrap' @click="$router.push('proin')">
                        {{$t('m.cwprocy')}}
                    </span>
                </div>
            </template>
             <div v-else>
                <div class="flex sb" >
                    <div class="pro-l">
                        <span class="llplus">{{$t('m.llplus')}}</span>
                        <div class="fw">
                            <span style="fontSize: 100px">PRO</span>
                            <span class="f30" style="vertical-align: 10px;">
                                <i>.</i>
                                <img style="width: 120px;" src="../../assets/images/prolog.png" alt="">
                            </span>
                        </div>
                        <div class="f26 weixm fuper" v-html="$t('m.pro1')">
                    
                        </div>
                        <div class="f14 m20 rliulan" style="opacity: .85;width:320px" v-html="$t('m.pro2')">
                            
                        </div>
                    </div>
                    <div class="pro-r">
                        <div class="pro-outline flex sb">
                            <div class="center po-l" >
                                <div v-html="$t('m.pro3')">
                                    
                                </div>
                                <div class="m20" v-html="$t('m.pro18')">
                                    
                                </div>
                            </div>
                            <div class="center po-r" style="paddingTop: 40px">
                                <div style="color:#C5E9FF" v-html="$t('m.pro4')">
        
                                </div>
                                <div class="m20" v-html="$t('m.pro5')">
                                    
                                </div>
                                <div v-html="$t('m.pro6')">
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='cj-btn-price n-btn center' style="display:inline-block" @click="proShow=true">
                    {{$t('m.cwprocy')}}
                </div>
                <div class="flex vc m20 wcolor">
                    <div v-if='false' @click="calcerShow=true" class="n-btn mr16" style="border: 1px solid #fff;padding:2px 4px;">
                        <img style="width: 18px" src="../../assets/images/calcericon.png">
                        <span>{{$t('m.syjsq')}}</span>
                    </div>
                    <div class="rliulan" v-html="$t('m.pro7')"> </div>
                </div>
            </div>

            <ul :class="`pro-lists flex hc ${isMobile ? 'fwrap f14' : ''}`">
                <li class="flex hc vc" v-for="(list, index) in lists" :key="index">
                    <span class="pro-l-icon">
                        <img :src="list.img" alt="">
                    </span>
                    <div class="pro-l-text fuper" v-html="$t(`m.pro${list.text}`)"></div>
                </li>
            </ul>
        </div>
        <RightPanel :show.sync="calcerShow"  :fullScreen="true" class="calcerPanel" >
           <Calcer />
        </RightPanel>

        <PRO  :show.sync="proShow" v-if="!isMobile"/>
    </div>
</Page>
</template>
<script>
// import Calcer from '../calcer/index'
const Calcer = () => import('../calcer/index'/*webpackChunkName:'calcer' */)

import PRO from '../widgets/pro';
import util from '../../util';
import {mapGetters} from 'vuex';
export default {
    components: {
        PRO,
        Calcer
    },
    data() {
        return {
            lists: [
                {
                    img: require("../../assets/images/gj.png"),
                    text: 12
                },
                {
                    img: require("../../assets/images/ll.png"),
                    text: 13
                },
                {
                    img: require("../../assets/images/yx.png"),
                    text: 14
                },
                {
                    img: require("../../assets/images/qq.png"),
                    text: 15
                },
            ],
            panel: '',
            calcerShow: false,
            proShow: false
        }
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    mounted() {
        this.isMobile && (this.destroyTouch = util.touch(this.$refs.slider.$el, this.touchListener.bind(this)));
    },
    beforeDestroy() {
         this.isMobile && this.destroyTouch();
    },
    methods: {

        touchListener(direction) {
            //3向左 4向右
            if(direction == 3) {
                this.$refs.slider.prev();
            }
            else if(direction == 4) {
                this.$refs.slider.next();
            }
        },
    },
}
</script>

<style lang="scss">
.zh {
    .jjj,.el-button {
         letter-spacing: 2px;
    }
    .ck-hd,.tool-list-text {
        letter-spacing: 3px;
    }
    .llplus {
        letter-spacing: 4px;
    }
    .weixm {
        letter-spacing: 5px;
        font-weight: 345;
    }
    .rliulan {
        letter-spacing: 2px;
        font-weight: 335;
    }
    .pro-r,.pro-lists {
        font-weight: 345;
    }
    div.cj-btn-price {
        letter-spacing: 2px;
        font-weight: 345;
    }
}

.calcerPanel {
    .rp-aside {
        display: flex;
        justify-content: center;
        // align-items: center;
    }
}
.pro {
    .guide-btn-back {
        background: #fff;
        padding: 0 10px;
    }
    background: url(../../assets/images/probk.jpg) no-repeat center/cover;
 }
 .pro-bd {
     max-width: 1100px;

     margin: 40px auto 0;
     position: relative;
     >div {
         width: 100%;
         margin-top: -200px;
     }
 }
 .pro-l {
     color:#fff;
     .cj-btn-price {
         margin-left:0;
     }
 }
 .pro-outline {
     background: url(../../assets/images/path.png) no-repeat center;
     background-size: 100% 100%;
     padding: 20px;
     color:#fff;
 }
 .po-l {
     width: 130px;
     font-size: 14px
 }
 .po-r {
     width: 140px;
 }
 .pc {
     .pro-outline {
          width: 300px;
     }
     .pro-lists {
        margin: 0 auto;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        li {
            flex: 1;
            .pro-l-text {
                margin-top: 30px;
            }
        }
        li:nth-of-type(odd) {
            background: rgba(0,0,0,.55);
        }
    }
    .pro .cj-btn-price {
        width: auto;
        padding: 0 16px;
        display: inline-block;
    }
 }
 .pro-lists {

     li {
         color:#fff;
         height: 166px;
         position: relative;
         background: rgba(0,0,0,.41);
         .pro-l-icon {
             position: absolute;
             top: 20px;
             right: 20px;
             width: 30px;
         }
         
     }
 }
 .zh.mobile {
     .let {
         letter-spacing: 3px;
        //  text-align: center;
     }
 }
 .en.mobile {
     .pro .cj-btn-price {
        width: auto
    }
 }
 .mobile {
     .pro {
         .pro-r {
             padding-left:1px
         }
        position: relative;
        background: url(../../assets/images/probk.jpg) no-repeat right/cover;
        .el-carousel {
            width: 80%;
            margin: 60px auto 0;
        }
        .el-carousel__indicator {
            margin: 0 10px
        }
        .el-carousel__indicator .el-carousel__button {
            width:15px;
            height:7px;
            background:rgba(216,216,216,0.3);
            border-radius:7px;
            transition: all .3s ease-in-out;
        }
        .el-carousel__indicator.is-active .el-carousel__button{
            width:27px;
            background:rgba(216,216,216,1);
            box-shadow:0px 0px 8px 0px rgba(208,240,255,1);
        }
        .cj-btn-price-wrap {
             margin: 30px auto 40px;
        }
        .el-carousel__item {
            overflow: hidden
        }
        .cj-btn-price {
            display: inline-block;
           
            width: 70%;
            padding: 0 16px;
            // width: 60%;
        }
    }
     .pro-lists {
         width: 100%;
        li {
            width: 50%;
        }
        li:first-child, li:last-child {
            background: rgba(0,0,0,.55);
        }
    }
 }
</style>

