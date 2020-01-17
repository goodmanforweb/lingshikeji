<!--  -->
<template>
<page title="添加矿机" borderLine padding routerBack="/pkjlists">

<div class="prohub-panel-addkj flex hc vc panel-height" >
    <div class="guide re">
        <div class="guide-banner shadow">
            <div class="gb-hd flex vc">
                <template v-for="(item, index) in items" >
                    <div class="bz active nowrap" :key="index">
                        <span>{{index + 1}}</span>
                        <span class="tcolor">{{item}}</span>
                    </div>
                    <div class="flex1 bz-line " :key="index" v-if="items.length -1 != index"></div>
                </template>
            </div>
            <div class="gb-bd">
                <el-carousel ref="slider" 
                height="400px" arrow="never" 
                @change="change" indicator-position="none" 
                :loop='false' :autoplay="false">
                    <el-carousel-item key="1">
                        <div class="flex gb">
                            <div class="gd-left flex1">
                                <div class="form-row">
                                    <span class="gcolor f12">任务矿机名称</span>
                                   <div class="borderLine">
                                        <input type="text" v-model="name" class="tcolor">
                                   </div>
                                </div>
                                <div class="form-row">
                                    <span class="gcolor f12">任务矿机价格</span>
                                   <div class="borderLine flex vc">
                                        <input type="text" v-model="price" class="tcolor flex1">
                                        <span class="f12 gcolor">CJS</span>
                                   </div>
                                </div>
                                <div class="form-row">
                                    <span class="gcolor f12">单任务产出</span>
                                   <div class="borderLine flex vc">
                                        <input type="text" v-model="output" class="tcolor flex1">
                                        <span class="f12 gcolor">CJT/任务</span>
                                   </div>
                                </div>
                                <div class="form-row">
                                    <span class="gcolor f12">任务矿机总产量</span>
                                   <div class="borderLine flex vc">
                                        <input type="text" v-model="totaloutput" class="tcolor flex1">
                                        <span class="f12 gcolor">CJS</span>
                                   </div>
                                </div>
                                <div class="form-row">
                                    <span class="gcolor f12">矿机周期</span>
                                    <div class="borderLine flex vc">
                                        <input type="text" v-model="day" class="tcolor flex1">
                                        <span class="f12 gcolor">天</span>
                                   </div>
                                </div>
                                <div class="form-row">
                                    <span class="gcolor f12">矿机上架库存</span>
                                   <div class="borderLine flex vc">
                                        <input type="text" v-model="sku" class="tcolor flex1">
                                        <span class="f12 gcolor">台</span>
                                   </div>
                                </div>
                            </div>
                            <div class="re gd-right" v-if="!isMobile">
                               <div class="mac block">
                                   <div class="mac-hd borderLine">
                                       <span class="mac-dots">
                                           <i></i>
                                           <i></i>
                                           <i></i>
                                       </span>
                                   </div>
                                   <div class="mac-bd flex fe re">
                                       <div class="reflect-info">
                                           <div class="tcolor f14">{{name}}</div>
                                           <div class="block block-padding re dc-left-line m16"></div>
                                           <div class="gcolor m16 f14">矿机参数</div>

                                           <div class="tcolor f14">{{output}} CJT/任务</div>
                                           <div class="gcolor f12">单任务产出</div>
                                           <div class="tcolor f14">{{totalouput}} CJT</div>
                                            <div class="gcolor f12">矿机总产量</div>
                                           <div class="tcolor f14">{{day}} 天</div>
                                           <div class="gcolor f12">矿机周期</div>
                                           <div class="tcolor"></div>
                                           <div class="center ">
                                               <span class="n-btn btn-tcolor-border f12 nowrap mb6" style="width: 50%">查看任务向导</span>
                                               <br>
                                               <span class="n-btn btn-tcolor f12 mb6"  style="width: 50%">{{totalouput}}CJS</span>
                                               <br>
                                               <span class="tcolor f12">剩余：{{sku}}台</span>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </el-carousel-item>

                    <el-carousel-item key="2">
                        <div class="flex gb">
                            <div class="gd-left">
                                <div class="gcolor f14">填写任务详解</div>
                                <textarea v-model="detail" class="f14 rwdesc tcolor block block-padding"></textarea>
                            </div>
                            <div class="re gd-right" v-if="!isMobile">
                                <div class="mac block">
                                   <div class="mac-hd borderLine">
                                       <span class="mac-dots">
                                           <i></i>
                                           <i></i>
                                           <i></i>
                                       </span>
                                   </div>
                                   <div class="mac-bd flex fe re">
                                       <div class="reflect-info">
                                           <div class="towrap block block-padding re dc-left-line m16">
                                               {{detail}}
                                           </div>
                                       </div>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </el-carousel-item>

                    <el-carousel-item key="3">
                        <div class="flex gb">
                            <div class="gd-left">
                                <div class="viplevel">
                                    <div class="cp  block block-padding re dc-left-line" @click="radioHandle(index)" v-for="(radio, index) in radios" :key="index" :class="{active: radio.active}">
                                        <i class="cp el-icon-circle-check w-icon w-yes w-icon-size"></i>
                                        <div class="tcolor fw">{{radio.text}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="gd-right re" v-if="!isMobile">
                                <div class="mac block">
                                   <div class="mac-hd borderLine">
                                       <span class="mac-dots">
                                           <i></i>
                                           <i></i>
                                           <i></i>
                                       </span>
                                   </div>
                                   <div class="mac-bd block-padding">
                                       
                                   </div>
                               </div>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="kj-pager flex sb" v-if="!isMobile">
                <span class="kj-la" @click="slide('prev')" :class="{prev}"></span>
                <span class="kj-ra" @click="slide('next')" :class="{next}"></span>
            </div>
        </div>
        <div class="kj-pager flex sb" style="margin: 20px auto" v-if="isMobile">
            <span class="kj-la" @click="slide('prev')" :class="{prev}"></span>
            <span class="kj-ra" @click="slide('next')" :class="{next}"></span>
        </div>
        <div class="center m20 addkj-btns" v-show="show">
            <span class="n-btn btn-tcolor-border" >保存稍后上架</span>
            <span class="n-btn btn-tcolor" >保存并上架</span>
        </div>
    </div>
</div>
</page>
</template>

<script>
export default {
  data () {
    return {
        prev: false,
        next: false,
        show: false,
        finishBtn:false,
        items: ['矿机属性','任务详解','选择向导'],
        name:'',
        price:'',
        output:'',
        totaloutput:'',
        day:'',
        sku:'',
        detail:'',
        radios: [
            {
                text: '通用向导',
                active: true
            },
            {
                text: '游戏类向导',
                active: false
            },

        ]
    };
  },

  components: {},

  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    }
  },

  mounted() {},

  methods: {
      change(e) {
            this.prev = e == 0;
            this.next = e == 2;
            [...document.querySelectorAll('.bz')].forEach((el, index) => {
                index == e ? el.classList.add('active') :  el.classList.remove('active');
            });
            this.show = e == 2;
            this.finishBtn = e == 2 ? '完成' : false;
        },
        slide(type) {
            this.$refs.slider[type]();
        },
        radioHandle(idx) {
      this.radios.forEach((radio, index) => {
        radio.active = idx == index
      })
    }
  }
}

</script>
<style lang='scss'>
.guide-banner {
    background: #fff;
    border-radius: 10px;
    position: relative;
}
.gb {
    padding: 20px;
}
.gb-hd {
    border-radius: 10px 10px 0 0;
    padding: 20px 16px;
    border-bottom:1px solid rgba(25,101,147,.2)
}
.bz-line {
    border-bottom: 2px solid #979797;
    height: 1px;
    margin: 0 10px;
}
.bz {
    span {
        vertical-align: middle;
        opacity: .47;
        transition: all .3s linear;
        will-change: font-size
    }
    span:first-child {
        width: 23px;
        height: 23px;
        display: inline-block;
        line-height: 23px;
        background: #086599;
        border-radius: 50%;
        text-align: center;
        color:#fff;
    }
    span:last-child {
        font-size: 12px;
    }
}
.bz.active {
    span {
        opacity: 1;
    }
    span:first-child {
        width: 37px;
        height: 37px;
        line-height: 37px;
    }
    span:last-child {
        font-size: 18px;
    }
}
.prev, .next {
    opacity: .47!important;
} 
.finish-btn {
    margin-top: 30px;
     width: 180px;
    height: 45px;
    line-height: 45px;
}
.pc {
    .w340 {
        width: 340px;
    }
    .w380 {
        width: 380px;
    }
    .guide-banner {
        width: 700px;
    }
    .guide {
        .kj-pager span{
            position: absolute;
            top: 50%;
            opacity: 1;
            z-index: 99;
        }
        .kj-pager span:first-child {
            left:-60px;
        }
        .kj-pager span:last-child {
            right: -60px;
        }
    }
}

.gd-right {
    width: 350px;
    margin-left: 20px;
}
.mac {
    width: 350px;
    border:1px solid rgba(6, 40, 58, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0.8);
    transform-origin: right top;

}
.reflect-info {
    width: 175px;
    background: #DFEBF1;
    padding: 6px;
    box-sizing: border-box;
}
.mac-hd {
    padding: 10px 4px;
}
.mac-dots {
    font-size: 0;
    i {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 3px;
        border-radius: 50%;
    }
    i:first-of-type {
        background-color: #FD5A52
    }
    i:nth-of-type(2) {
        background-color: #E4BF29
    }
    i:nth-of-type(3) {
        background-color: #52C12B
    }
}

.rwdesc {
    outline: none;
    width: 80%;
    height: 250px;
    border:1px solid rgba(6, 40, 58, 0.2);
}

.pc {
    .panel-height {
        height: 100vh;
    }
    .rwdesc {
        width: 100%;
    }
    .addkj-btns {
        span:first-child {
            margin-right: 16px;
        }
        span {
            width: 140px;
        }
    }
}
.mobile {
    div.gd-left {
        text-align: left!important;
    }
    .gd-right {
        display: none;
    }
    .addkj-btns {
        span {
            display: block;
            margin: 16px auto;
            width: 80%;
        }
    }
    .guide {
            padding: 0;
            display: block;
            width: 100%;
        }
    .prohub-panel-addkj {
        
        .form-row {
            text-align: left
        }
    }
}
</style>