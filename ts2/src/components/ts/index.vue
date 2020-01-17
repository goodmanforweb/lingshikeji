<template>
    <div class="ttss" id="ttss">
        <div class="full-slider re">
            <el-carousel ref="slider" :loop='true' :interval="5000" height="100vh"  indicator-position='none' arrow="never" @change="change">
                <el-carousel-item key=1>
                    <div class="fs-slide fs-index flex hc vc">
                        <div>
                            <div class="fs-index-pic">
                            <img  src="../../assets/images/ftext.png" alt="">
                            </div>
                            <div class="center fs-index-info" >
                                {{$t('m.gkcw')}}
                            </div>
                            <div class='cj-btn-price n-btn center shadow' @click="$router.push({name: 'login'})">
                                <img style="width: 30px;marginRight: 10px;" src="../../assets/images/indexlogo.png" alt="">
                                {{$t('m.loginnow')}}
                            </div>
                            <div class="f12 center" style="marginTop: 100px;" v-html="$t('m.indexdesx')">
                               
                            </div>
                        </div>
                    </div>
                </el-carousel-item>
                <el-carousel-item key=2>
                    <div class="fs-slide fs-second">

                    </div>
                </el-carousel-item>
            </el-carousel>

            <div class="fs-indicator-wrap" :style="`width:${barwidth}px`" v-if="!isMobile">
                <div class="fs-indicator"></div>
                <span class="f60 fs-text">{{pager + 1 | makeUp}}</span>
                <span class="fs-bar" ref="bar"></span>

                <div class="fs-pager flex sb">
                    <span class="fs-p-la" @click="move('prev')"></span>
                    <span class="fs-p-ra" @click="move('next')"></span>
                </div>
            </div>

            <div class="fs-indicator-wrap flex vc" v-else>
                <div class="fs-indicator flex1" ref='barbox'></div>
                <span class="f24 fs-text">{{pager + 1 | makeUp}}</span>
                <span class="fs-bar" ref="bar"></span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
import util from '../../util';
export default {
    data() {
        return {
            pager: 0,
            barwidth: 700
        }
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    mounted() {
        setTimeout(() => {
            this.setBarWidth();
        }, 500);
        this.destroyTouch = util.touch(this.$el, this.touchListener.bind(this));
    },
    beforeDestroy() {
        this.destroyTouch();
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
        moveBar(index) {
            this.$refs.bar.style.left = this.isMobile ? (index * this.singleBarWidth) + 'px' : (index * 130 + 'px');
        },
        setBarWidth() {
            if(this.isMobile) {
                this.barwidth = this.$refs.barbox.clientWidth;
                this.singleBarWidth = Math.floor(this.barwidth/this.$refs.slider.$children.length);
                this.$refs.bar.style.width = this.singleBarWidth + 'px';
                return;
            }
        
            this.barwidth = 130 * this.$refs.slider.$children.length;

            

        },
        change(e) {
            this.pager = e;
            this.moveBar(e);
            this.setNavStyle(e);
        },
        setNavStyle(e) {
            let classList = document.querySelector('#bd').classList;
            let s = false;
            if(this.isMobile) {
                s = e == 1;
            }
            else {
                s = e == 0;
            }
            s ? classList.add('ts_bd_slider') : classList.remove('ts_bd_slider');
        },
        move(type) {
            this.$refs.slider[type]();
        }
    }
}
</script>

<style lang="scss">
#ttss {
    padding:0;
}
.full-slider {

}
.full-slider,.fs-slide {
    width: 100%;
    height: 100vh;
}
.fs-index {
    color:#fff;
    background: url(../../assets/images/f1.jpg) no-repeat center/cover;
}
.fs-second {
    background: url(../../assets/images/f2.jpg) no-repeat center/cover;
}

.pc {
    .fs-indicator-wrap {
        bottom: 30px;
        right: 0;
        left: 0;
        width: 700px;
    }
    .fs-bar {
        top:-3px;
        display: inline-block;
   }
   .fs-text {
        position: absolute;
        right: 0px;
        top: 0;
        transform: translateX(110%) translateY(-50%);
        width: 60px;
        height: 70px;
    }
    .fs-index-pic {
        img {
            width: 700px;
        }
    }
    .fs-index-info {
        font-size: 24px;
        margin: 40px 0;
    }
}
.mobile {
   .fs-indicator-wrap {
        bottom: 30px;
        right: 20px;
        left: 20px;
   }
   .fs-text {
        margin-left: 10px;
        width: 40px;
        height: 30px;
    }
    .fs-index-pic {
        width: 80%;
        margin:0 auto
    }
    .fs-index-info {
        margin: 40px auto;
    }
    .fs-index-hint {
        display:block;
    }
}
.fs-indicator-wrap {
    position: absolute;
    height: 30px;
    margin: auto;
    z-index: 99;
}
.fs-bar {
    transition: all .3s linear;
    position: absolute;
    left: 0;
    width:131px;
    height:6px;
    background:rgba(216,216,216,1);
    box-shadow:0px 0px 8px 0px rgba(208,240,255,1);
    border-radius:7px;
}
.fs-indicator-wrap {
    color:#fff;
}
.fs-indicator {
    position: relative;
    border-top: 2px solid #D0F0FF;;
}

.fs-pager {
    position: absolute;
    top: 0;
    right: -60px;
    left: -60px;
    transform: translateY(-50%);
    span {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-position: center;
        background-size: 14px auto;
        background-repeat: no-repeat;
        transition: background-color .3s linear;
        filter: brightness(50);
    }
    span.fs-p-la {
        background-image: url(../../assets/images/la.png)
    }
    span.fs-p-ra {
        transform: translateX( 210%);
        background-image: url(../../assets/images/ra.png)
    }
    span:hover {
        filter: brightness(1);
        background-color: #fff;
    }


}

</style>


