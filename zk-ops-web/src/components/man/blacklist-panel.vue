<!--  -->
<template>
<page title="添加黑名单" borderLine padding>
    <div class="blacklist-panel panel-width">
        <div class="tcolor x-hd fw f24 m20" >添加黑名单</div>

        <div class="block block-padding man-panel-block">
            <div class="tcolor f14">禁止注册的手机号码</div>
            <div class="form-row m16">
                <div class='flex borderLine'>
                    <input type="text" class="flex1" v-model.trim="phone" @unblur="check">
                    <span>
                        <i v-if="isOk==true" class="cp el-icon-circle-check w-icon w-yes w-icon-size"></i>
                        <i v-else-if="isOk===false" class="cp el-icon-circle-close w-icon w-no w-icon-size"></i>
                    </span>
                </div>
                <span class="warn-hint f12" v-if="isOk===false">已注册无法添加</span>
            </div>
            <div class="form-row center">
                <el-button :loading="loader" @click="submit" class="n-btn btn-tcolor-border f12">确 认</el-button>
            </div>
        </div>
    </div>
</page>
</template>

<script>
export default {
  data () {
    return {
        loader: false,
        phone: '',
        isOk: ''
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
      check() {
          request.checkIsBlackItem({phone: this.phone})
            .then(res => {
                if(res.data.ok) {
                    this.isOk = false;
                }
                else {
                    this.isOk = true;
                }
            })
      },
      submit() {
          if(!this.phone || !this.isOk) return;
            this.loader = true;
            request.addBlackItem({phone: this.phone})
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
i.w-icon-size:before {
    font-size: 20px;
}
.man-panel-block {
    
    .w-yes:before {
        color:#38B573
    }
    .w-no:before {
        color:#ED6363
    }
}
.form-row {
    input {
        border:none;
        outline: none;
        margin: 4px 0;
    }
}
.borderLine {
    border-bottom: 1px solid rgba(175, 187, 194, 0.432)
}
</style>