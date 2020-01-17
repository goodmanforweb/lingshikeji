<!--  -->
<template>
<page title="矿机列表" borderLine padding routerBack="/ppanel">
    <Scroll trigger>
    <div class="pp-lists " >
        <ul class="ppl flex fwrap sb">
            <li class="block flex vc hc v bbox" @click="panelHandle('PAddKJ')">
                <div class="vs-plus center fw f26 m16 cp">+</div>
                <div class="fw tcolor">添加矿机</div>
                <div class="f12 gcolor">添加项目的矿机</div>
            </li>
            <li class="block re block-padding bbox flex v sb" v-for="(cube, index) in cubes" :key="index">
                <el-popover
                    popper-class="popper"
                    placement="bottom"
                    width="80"
                    trigger="hover"
                    v-model="cube.pop">
                    <ul >
                        <li class="cp" @click="panelHandle('PRWDash')">查看报表</li>
                        <li class="cp" @click="panelHandle('PRWDash')">矿机介绍</li>
                        <li class="cp">下线矿机</li>
                    </ul>
                    <span class="b-san" slot="reference" @click="cube.pop = !cube.pop">
                        <img src="../../assets/images/dots.png" alt="">
                    </span>
                </el-popover>
                <div>
                    <div class="tcolor">{{cube.name}}</div>
                    <span class="f12 gcolor">库存：{{cube.sku}}</span>
                    <div class="f14">{{cube.state}}</div>
                </div>
                <div class="ppl-tal">
                    <span class="f12 gcolor">总销量</span>
                    <div class="f14 tcolor mb20">{{cube.total}}CJS</div>

                    <span class="f12 gcolor">已售出</span>
                    <div class="f14 tcolor">{{cube.sell}}</div>
                </div>
            </li>
        </ul>
    </div>
    </Scroll>
</page>
</template>

<script>
export default {
  data () {
    return {
        cubes: [
            {
                name:'朋友圈集赞任务',
                sku: '1000',
                state: '上线中',
                total: 1000000,
                sell: 33,
                pop: false
            },
            {
                name:'朋友圈集赞任务',
                sku: '1000',
                state: '已下线',
                total: 1000000,
                sell: 33,
                pop: false
            },
            {
                name:'朋友圈集赞任务',
                sku: '1000',
                state: '编辑中',
                total: 1000000,
                sell: 33,
                pop: false
            },

        ],
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
      panelHandle(type, data) {
          if(this.isMobile) {
              let cf = {
                PState: 'pstate',
                PDetail: 'pdetail',
                PDash: 'pdash',
                PRWDash: 'prw',
                PAddKJ: 'addkjguide'
              }[type];
              return this.$router.push(cf);
          }
      },
  }
}

</script>
<style lang='scss'>

</style>