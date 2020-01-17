<template>
<Page float styleBackIcon='filter: brightness(50);' class="flex" style="width: 100%">
    <div class="pro flex flex1 re">
        <span  class="n-btn re-close" @click="$emit('update:show', false)">{{$t('m.finish')}}</span>
        <div class="pro-bd flex1 flex hc vc" :class="{v:isMobile}">
            <template v-if="isMobile">
                <el-carousel ref="slider" :interval="5000"  :autoplay='false' height="400px"  arrow="never">
                    <el-carousel-item key=1>
                        <div class="pro-l">
                            <span>{{$t('m.llplus')}}</span>
                            <div class="fw">
                                <span style="fontSize: 70px">PRO</span>
                                <span class="f30" style="vertical-align: 10px;">
                                    <i>.</i>
                                    <img style="width: 100px;" src="../../assets/images/prolog.png" alt="">
                                </span>
                            </div>
                            <div class="f18" v-html="$t('m.pro1')">
                                
                            </div>
                            <div class="f12 m20" style="opacity: .85" v-html="$t('m.pro2')">
                                
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
                                <div class="center po-r">
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
                <div class='cj-btn-price n-btn center' @click="$router.push('proin')">
                    {{$t('m.cwprocy')}}
                </div>
            </template>
            <div class="flex sb" v-else>
                <div class="pro-l">
                    <span>{{$t('m.llplus')}}</span>
                    <div class="fw">
                        <span style="fontSize: 100px">PRO</span>
                        <span class="f30" style="vertical-align: 10px;">
                            <i>.</i>
                            <img style="width: 120px;" src="../../assets/images/prolog.png" alt="">
                        </span>
                    </div>
                    <div class="f26" v-html="$t('m.pro1')">
                
                    </div>
                    <div class="f14 m20" style="opacity: .85" v-html="$t('m.pro2')">
                        
                    </div>

                    <div class='cj-btn-price n-btn center' @click="proShow=true">
                        {{$t('m.cwprocy')}}
                    </div>
                    <div class="flex vc m20">
                        <div @click="calcerShow=true" class="n-btn mr16" style="border: 1px solid #fff;padding:2px 4px;">
                            <img style="width: 18px" src="../../assets/images/calcericon.png">
                            <span>{{$t('m.syjsq')}}</span>
                        </div>
                        <div v-html="$t('m.pro7')"> </div>
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
                        <div class="center po-r">
                            <div style="color:#C5E9FF" v-html="$t('m.pro4')">
                                ，
                                如果你是：
                            </div>
                            <div class="m20" v-html="$t('m.pro5')">
                                
                            </div>
                            <div v-html="$t('m.pro6')">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ul :class="`pro-lists flex hc ${isMobile ? 'fwrap f14' : ''}`">
                <li class="flex hc vc">
                    <span class="pro-l-icon">
                        <img src="../../assets/images/gj.png" alt="">
                    </span>
                    <div class="pro-l-text" v-html="$t('m.pro12')">
                        
                    </div>
                </li>
                <li class="flex hc vc">
                    <span class="pro-l-icon">
                        <img src="../../assets/images/ll.png" alt="">
                    </span>
                    <div class="pro-l-text" v-html="$t('m.pro13')">
                        
                    </div>
                </li>
                <li class="flex hc vc">
                    <span class="pro-l-icon">
                        <img src="../../assets/images/yx.png" alt="">
                    </span>
                    <div class="pro-l-text" v-html="$t('m.pro14')">
                        
                    </div>
                </li>
                <li class="flex hc vc">
                    <span class="pro-l-icon">
                        <img src="../../assets/images/qq.png" alt="">
                    </span>
                    <div class="pro-l-text" v-html="$t('m.pro15')">
                        
                    </div>
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
     max-width: 955px;

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
     width: 300px;
     background: url(../../assets/images/path.png) no-repeat center;
     background-size: 100% 100%;
     padding: 20px;
     color:#fff;
 }
 .po-l {
     width: 180px;
     font-size: 14px
 }
 .po-r {
     width: 140px;
 }
 .pc {
     .pro-lists {
        margin: 0 auto;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        li {
            width: 248px;
            .pro-l-text {
                margin-top: 30px;
            }
        }
        li:nth-of-type(odd) {
            background: rgba(0,0,0,.55);
        }
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
 .mobile {
     .pro {
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
        .cj-btn-price {
            margin: 30px auto 40px;
            width: 60%;
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

