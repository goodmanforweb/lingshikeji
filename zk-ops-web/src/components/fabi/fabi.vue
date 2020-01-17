<!--  -->
<template>
<page title="发币"  borderLine padding >
<div class="tofabi">
<div class="tcolor x-hd fw f24 mb20" v-if="!$isMobile">发币</div>
<div class="block block-padding">
        <div class="form-row m20">
            <div class="tcolor f14">发币数量</div>
            <div class='flex borderLine'>
                <input class="f12 gcolor flex1" type="number" v-model.trim="amount">
            </div>
        </div>

        <div class="form-row center">
                <el-button :loading="fabiLoader" @click="doFaBi" class="n-btn f20 btn-tcolor btn-panel-sure">确 认</el-button>
        </div>
    </div>

</div>
</page>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data () {
    return {
        amount:0,
        fabiLoader: false
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
      doFaBi() {
      if(this.fabiLoader) return false;
      this.fabiLoader = true;
      request.doFaBi({total: this.amount})
      .then(res => {
        setTimeout(() => {
          if(!this.$isMobile) {
            this.$emit('update:show', false)
          }
          else {
            this.$router.back();
          }
        },1000)
        this.$message.info('发币成功');
      })
      .catch(err => {
        this.$message.info(window.errorInfo(err.data.message));
      })
      .finally(() => {
        
        this.fabiLoader = false
      }) 
    },
  }
}

</script>
<style lang='scss'>
.pc {
    .tofabi {
        width: 300px
    }
}
.block-padding {
    padding: 16px;
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