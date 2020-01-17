<!--  -->
<template>
<page title="添加向导" borderLine padding routerBack="/kjguide">

<div class="guide-panel-add flex hc vc panel-height">
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
                        <div class="flex gb vc">
                            <div class="gd-left flex1">
                                <div class="gcolor f14">填写做任务需要准备的事项，如注册、项目网址等</div>
                                <textarea v-model="detail" class="m16 f14 rwdesc tcolor block block-padding" 
                                style="height: 120px"></textarea>
                                <textarea v-model="detail" placeholder="注意事项（非必填）" class="f14 rwdesc tcolor block block-padding" 
                                style="height: 60px"></textarea>
                            </div>
                            <div class="re gd-right" >
                                <img style="width: 285px" src="../../assets/images/b2.png" alt="">
                            </div>
                        </div>
                    </el-carousel-item>

                    <el-carousel-item key="2">
                        <div class="flex gb vc">
                            <div class="gd-left flex1">
                                <div class="gcolor f14">如何挖矿，请写明通用步骤</div>
                                <textarea v-model="detail" class="m16 f14 rwdesc tcolor block block-padding" 
                                style="height: 120px"></textarea>
                                <textarea v-model="detail" placeholder="注意事项（非必填）" class="f14 rwdesc tcolor block block-padding" 
                                style="height: 60px"></textarea>
                            </div>
                            <div class="re gd-right">
                                <img style="width: 285px" src="../../assets/images/b1.png" alt="">
                            </div>
                        </div>
                    </el-carousel-item>

                    <el-carousel-item key="3">
                        <div class="flex gb vc">
                           <div class="gd-left flex1">
                                <div class="gcolor f14">挖矿可以收获的矿晶数量、分发时间等</div>
                                <textarea v-model="detail" class="m16 f14 rwdesc tcolor block block-padding" 
                                style="height: 120px"></textarea>
                                <textarea v-model="detail" placeholder="注意事项（非必填）" class="f14 rwdesc tcolor block block-padding" 
                                style="height: 60px"></textarea>
                            </div>
                            <div class="gd-right">
                               <img class="gd-last-pic" style="width: 236px" src="../../assets/images/b3.png" alt="">
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
        items: ['准备事项','挖矿步骤','收获矿晶'],
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
.guide-panel-add {
    .gd-left,.gd-right {
        width: auto;
    }
    .gd-right {
        margin-left: 60px;
    }
}
</style>