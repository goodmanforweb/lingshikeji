<!--  -->
<template>
<page title="添加会员" borderLine padding>

<div class="blacklist-panel-add panel-width" >
  <div class="tcolor fw f24 mb20 x-hd">添加会员</div>
  <!-- <div class="block block-padding m20 man-panel-block">
        <div class="tcolor f14">会员手机号码</div>
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
            <span class="n-btn btn-tcolor-border f12">确 认</span>
        </div>
    </div> -->
    <div class="gcolor f12 mb6">选择等级</div>
    <div class="viplevel">
      <div class="cp  block block-padding re dc-left-line" @click="radioHandle(index)" v-for="(radio, index) in radios" :key="index" :class="{active: radio.active}">
        <i class="cp el-icon-circle-check w-icon w-yes w-icon-size"></i>
        <div class="tcolor f20 fw mb16">{{radio.vip.toUpperCase()}}</div>
        <div class="flex sb f12 mb6">
          <span class="gcolor">CJT每日提现限额</span>
          <span class="tcolor">{{radio.cjt[1]}}</span>
        </div>
        <div class="flex sb f12">
          <span class="gcolor">CJS每日提现限额</span>
          <span class="tcolor">{{radio.cjs[1]}}</span>
        </div>
      </div>
    </div>

    <div class="center m20">
      <span class="n-btn f20 btn-tcolor btn-panel-sure">确 认</span>
    </div>

</div>
</page>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  data () {
    return {
      isOk: '',
      l: {
        name:'',
        min:'',
        max:'',
        cjs:'',
        cjt:'',
        exp:''
      },
      radios:[
        {
          vip: 'vip1',
          cjt: ['cjt', 10000000],
          cjs: ['cjs', 10000000],
          active: true
        },
        {
          vip: 'vip2',
          cjt: ['cjt', 20000000],
          cjs: ['cjs', 20000000],
          active: 0
        },
        {
          vip: 'vip3',
          cjt: ['cjt', 30000000],
          cjs: ['cjs', 30000000],
          active: 0
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
    radioHandle(idx) {
      this.radios.forEach((radio, index) => {
        radio.active = idx == index
      })
    },
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
      check2() {
        return true;
      },
      submit() {
          if(!this.check2() || !this.isOk) return;
            this.loader = true;
            request.addVipItem(this.l)
            .then(res => {
                this.$message.info('添加成功');
                this.$emit('update:show', false);
            })
            .finally(() => {
                this.loader  = false;
            })
      }
  },
  watch: {
    viplists: {
      immediate: true,
      deep: true,
      handler: function(n) {
        if(!util.isEmpty(n)) {
          this.radios = n.map((el, index) => {
            return {
              vip: 'vip'+ index + 1,
              cjt: ['cjt', el.cjt],
              cjs: ['cjs', el.cjs],
              active: false
            }
          })
        }
      }
    }
  }
}

</script>
<style lang='scss'>

</style>