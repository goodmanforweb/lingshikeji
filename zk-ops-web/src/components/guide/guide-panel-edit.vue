
<!--  -->
<template>
<page title="编辑向导" borderLine padding routerBack="/kjguide">

<div class="guide-panel-edit flex hc vc panel-height" >
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
                                    <span class="gcolor f12">填写项目名称</span>
                                    <div class="borderLine">
                                            <input type="text" v-model="name" class="tcolor">
                                    </div>
                                </div>
                                <div class="form-row m16" >
                                    <div class="tcolor f14">项目彩色LOGO</div>
                                    <div class="gcolor f12 mb6">请上传84*84PNG格式的图片</div>
                                    <div>
                                        <el-upload
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        list-type="picture-card"
                                        :on-preview="handlePictureCardPreview"
                                        :on-remove="handleRemove">
                                        <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
                                    </div>
                                </div>
                                <div class="form-row m16" >
                                    <div class="tcolor f14">项目纯白LOGO</div>
                                    <div class="gcolor f12 mb6">请上传28*28PNG格式的图片</div>
                                    <div>
                                        <el-upload
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        list-type="picture-card"
                                        :on-preview="handlePictureCardPreview"
                                        :on-remove="handleRemove">
                                        <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
                                    </div>
                                </div>
                                <div class="form-row m16" >
                                    <div class="tcolor f14">项目背景</div>
                                    <div class="gcolor f12 mb6">请上传512*800PNG格式的图片</div>
                                    <div>
                                        <el-upload
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        list-type="picture-card"
                                        :on-preview="handlePictureCardPreview"
                                        :on-remove="handleRemove">
                                        <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
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
                                           
                                       </div>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </el-carousel-item>

                    <el-carousel-item key="2">
                        <div class="flex gb">
                            <div class="gd-left flex1">
                                <div class="gcolor f14">填写项目简介</div>
                                <textarea v-model="detail" class="m16 f14 rwdesc tcolor block block-padding" 
                                style="height: 200px"></textarea>
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
                                           
                                       </div>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </el-carousel-item>

                    <el-carousel-item key="3">
                        <div class="flex gb">
                           <div class="gd-left flex1">
                                <div class="form-row flex vc">
                                    <select class="coin-choose">
                                        <option :value="coin" :Key="index" v-for="(coin, index) in coins">{{coin}}</option>
                                    </select>
                                    <div class="borderLine flex vc">
                                        <span class="gcolor f12">地址</span>
                                        <input  class="flex1 f14 tcolor" type="text" />     
                                    </div>
                                    <span>
                                        <i class="el-icon-circle-plus cp guide-add-icon"></i>
                                        <i class="el-icon-remove cp guide-delete-icon"></i>
                                    </span>
                                </div>
                                <div class="form-row flex vc">
                                    <select class="coin-choose">
                                        <option :value="coin" :Key="index" v-for="(coin, index) in coins">{{coin}}</option>
                                    </select>
                                    <div class="borderLine flex vc">
                                        <span class="gcolor f12">地址</span>
                                        <input  class="flex1 f14 tcolor" type="text" />     
                                    </div>
                                    <span>
                                        <i class="el-icon-circle-plus cp guide-add-icon"></i>
                                        <i class="el-icon-remove cp guide-delete-icon"></i>
                                    </span>
                                </div>
                                <div class="form-row flex vc">
                                    <select class="coin-choose">
                                        <option :value="coin" :Key="index" v-for="(coin, index) in coins">{{coin}}</option>
                                    </select>
                                    <div class="flex vc">
                                        <div>
                                            <el-upload
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove">
                                            <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="dialogVisible">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                            </el-dialog>
                                        </div>
                                        <span class="gcolor f12">上传二维码图片</span>
                                    </div>
                                    <span>
                                        <i class="el-icon-circle-plus cp guide-add-icon"></i>
                                        <i class="el-icon-remove cp guide-delete-icon"></i>
                                    </span>
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
                                   <div class="mac-bd flex fe re">
                                       <div class="reflect-info">
                                           
                                       </div>
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
        dialogImageUrl: '',
        dialogVisible: false,
        prev: false,
        next: false,
        show: false,
        finishBtn:false,
        items: ['基础资料','项目简介','社交渠道'],
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
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
  }
}

</script>
<style lang='scss'>
.guide-panel-edit {
    div.el-upload--picture-card {
        width: 40px;
        height: 40px;
        line-height: 48px;
    }
    .coin-choose {
        margin-right: 10px;
    }
}
.mac {
    min-height: 200px;
}
.guide-add-icon:before {
    color: #086599
}
.guide-delete-icon:before {
    color: #8E9FA9
}
</style>