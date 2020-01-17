<!--  -->
<template>
<page :title="isEdit ? '编辑广告' : '添加广告'" borderLine padding >
  <div class="adavail-panel panel-width" >
    <div class="tcolor x-hd fw f24 mb20">{{isEdit ? '编辑广告' : '添加广告'}}</div>

    <span class="gcolor f12">选择广告位置</span>
    <div class="flex viplevel sb m16">
      <div class="cp  block block-padding re dc-left-line flex1" @click="radioHandle(index)" v-for="(radio, index) in radios" :key="index" :class="{active: radio.active}">
          <i class="cp el-icon-circle-check w-icon w-yes w-icon-size"></i>
          <div class="tcolor f14 fw">{{radio.text}}</div>
      </div>
    </div>
    <div class="block block-padding m16">
      <div class="form-row ">
          <div class="tcolor f14">广告链接</div>
          <div class='flex borderLine'>
              <input type="text" class="flex1">
          </div>
      </div>
    </div>
     <div class="block block-padding m16">
      <div class="form-row ">
          <div class="tcolor f14">轮播顺序</div>
          <span class="gcolor f12">数字越小，轮播越前</span>
          <div class='flex borderLine'>
              <input type="text" class="flex1">
          </div>
      </div>
    </div>
     <div class="block block-padding m16">
       <div class="form-row" >
            <div class="tcolor f14">上传轮播图</div>
            <div class="gcolor f12 mb6">请上传1080*800的PNG图</div>
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
    <div class="center m20">
        <span class="n-btn btn-tcolor f20 btn-panel-sure">确 认</span>
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
      radios:[
            {
                text: '主页',
                active: true
            },
            {
                text: '项目页',
                active: false
            },
            {
                text: '会员中心',
                active: false
            },

        ]
    };
  },

  components: {},

computed: {
    isMobile() {
      return this.$store.getters.isMobile
    },
    isEdit() {
      return !!this.$route.query.edit;
    }
  },
  mounted() {},

  methods: {
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
.adavail-panel {
  .viplevel .block:nth-of-type(2) {
    margin: 0;
  }
  .viplevel {
    >.block {
      margin: 0 8px;
    }
    .block:first-of-type {
      margin-left: 0
    }
    .block:last-of-type {
      margin-right: 0
    }
  }
}
</style>