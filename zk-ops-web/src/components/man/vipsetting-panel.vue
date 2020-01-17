<!--  -->
<template>
<page :title="`${type}VIP等级`" borderLine padding>

<div class="vipsetting-panel panel-width" >
    <div class="tcolor fw f24 m20 x-hd">{{type}}VIP等级</div>
    <div class="block block-padding">
        <div class="form-row">
            <div class="tcolor f14">等级名称</div>
            <div class='flex borderLine'>
                <input class="f12 gcolor flex1" type="text" v-model.trim="l.name">
            </div>
            <!-- <span class="warn-hint f12">已注册无法添加</span> -->
        </div>
        <div class="form-row m20">
            <div class="tcolor f14">升级经验值</div>
            <div class='flex'>
                <span class="flex1 borderLine">
                     <input class="f12 gcolor" style="width: 100%" type="number" v-model.trim="l.exp">
                </span>
                <!-- <span style="width: 22px;margin:0 10px;">
                    <img src="../../assets/images/playicon.png" alt="">
                </span>
                <span class="flex1 borderLine">
                     <input class="f12 gcolor" style="width: 100%" type="text">
                </span> -->
               
            </div>
        </div>
        <div class="form-row m20">
            <div class="tcolor f14">CJT每日提现额度</div>
            <div class='flex borderLine'>
                <input class="f12 gcolor flex1" type="number" v-model.trim="l.cjt">
            </div>
        </div>
        <div class="form-row m20">
            <div class="tcolor f14">CJS每日提现额度</div>
            <div class='flex borderLine'>
                <input class="f12 gcolor flex1" type="number" v-model.trim="l.cjs">
            </div>
        </div>

        <div class="form-row center">
    <el-button :loading="loader" @click="handle" class="n-btn f20 btn-tcolor btn-panel-sure">确 认</el-button>
        </div>
    </div>
      
</div>
</page>
</template>

<script>
export default {
    props: ['panelData'],
  data () {
    return {
        type: '添加',
       loader: false,
       l: {
        name:'',
        min:'',
        max:'',
        cjs:'',
        cjt:'',
        exp:'',
      },
    };
  },
  components: {},
  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    }
  },
  created() {
      this.type = util.isEmpty(this.panelData) ? '添加' : '修改';
      if(util.isEmpty(this.panelData)) {
          this.type = '添加';
          this.tp = 0;
      }
      else {
          this.l = this.panelData;
          this.type = '修改';
          this.tp = 1;
      }
  },
  mounted() {},

  methods: {
      handle() {
          this.tp = 0  ? this.submit() : this.amend();
      },
      amend() {
        let t = Object.values(this.l).filter(el => el == '');
        if(t.length > 0) return ;
        this.loader = false;
        request.amendVipItem(this.l, {id: this.panelData.id})
        .then(res => {
            this.$message.info('修改成功');
            this.$emit('update:show', false);
        })
        .finally(() => {
            this.loader  = false;
        })
     },
     submit() {
        let t = Object.values(this.l).filter(el => el == '');
        if(t.length > 0) return ;
        this.loader = false;
        
        request.addVipItem(this.l)
        .then(res => {
            this.$message.info('添加成功');
            this.$emit('update:show', false);
        })
        .finally(() => {
            this.loader  = false;
        })
    }
  }
}

</script>
<style lang='scss'>
</style>