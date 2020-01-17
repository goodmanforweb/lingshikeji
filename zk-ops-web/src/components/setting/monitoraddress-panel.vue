<!--  -->
<template>
<page :title="renderData.name" borderLine padding >
    <div class="monitoraddress-panel panel-width" >
    <div class="tcolor fw f24 m20 x-hd">{{renderData.name}}</div>
    <div class="block block-padding man-panel-block">
        <div class="form-row m16">
            <div class="tcolor f14">{{renderData.form[0]}}</div>
            <div class='flex borderLine'>
                <input type="text" class="flex1">
            </div>
        </div>
        <div class="form-row m16" v-if='renderData.form[1]'>
            <div class="tcolor f14">{{renderData.form[1]}}</div>
            <div class='flex borderLine vc'>
                <input type="text" class="flex1">
                <select class="coin-choose">
                    <option :value="coin" :Key="index" v-for="(coin, index) in coins">{{coin}}</option>
                </select>
            </div>
        </div>
        <div class="form-row m16" v-if='renderData.form[2]'>
            <div class="tcolor f14">{{renderData.form[2]}}</div>
            <div class='flex borderLine'>
                <input type="text" class="flex1">
            </div>
        </div>

        <div class="form-row m16" v-if='renderData.upload'>
            <div class="tcolor f14">渠道LOGO</div>
            <div class="gcolor f12 mb6">请上传15*15的PNG图</div>
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
const config = {
    sysconfig: {
        name:'添加配置',
        form: ['配置内容','数值'],
    },
    itoper: {
        name:'添加运维',
        form: ['提醒内容','数值','运维手机号码']
    },
    monitoraddress: {
        name:'添加监控地址',
        form: ['监控地址','数值','小数位']
    },
    tranoper: {
        name:'添加社交渠道',
        form: ['渠道名称'],
        upload:1
    }
};
export default {
    props: ['panelData'],
  data () {
    return {
        coins: ['CJT','CJS'],
        dialogImageUrl: '',
        dialogVisible: false,
    };
  },

  components: {},
  created() {
    
      
  },
  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    },
    renderData() {
        if(this.isMobile) {
            return config[this.$route.query.type];
        }
        return config[this.panelData.type]
    }
  },

  mounted() {},

  methods: {
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
.coin-choose {
    width: 55px;
    height: 20px;
    border: 1px solid #086599;
    border-radius: 4px;
    color: #086599;
    font-size: 12px;
}
div.el-upload--picture-card {
    width: 68px;
    height: 68px;
    line-height: 73px;
}
</style>