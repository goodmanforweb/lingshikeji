<!--  -->
<template>
  <page title="发币" borderLine padding leftBtn="menu">
    <div class="fabi">
      <div class="x-hd m16" >
          <div class="flex vc sb">
            <span class="f26 tcolor fw" v-if="!$isMobile">发币</span>
            <div>
              <el-button style="width: auto;padding: 2px 10px" class="n-btn btn-tcolor-border f14" 
              @click="handle('Fabi')">为账户发币</el-button>
              <div class="n-btn btn-tcolor-border f14" 
              @click="handle('Panel')">发币记录</div>
            </div>
        </div>
      </div>
      <div  class="stepp p16">
          <div class="tcolor" style="paddingBottom: 16px">发币进度</div>
          <div class="flex vc tcolor f14" v-if="isRun">
           <span>正在执行中：</span>
           <div class="flex hc vc runloader" style="width: 100px;height: 30px" v-loading="isRun" element-loading-background="transparent" element-loading-spinner="el-icon-loading"></div>
          </div>
          <div class="flex vc tcolor f14" v-if="nextTime">
           <span>下次可执行时间：</span>
          {{nextTime}}
          </div>
          <div class="flex vc tcolor f14">
           <span> 未开始({{d.r}})：</span>
            <el-progress class="flex1" :percentage="d.p"></el-progress>
          </div>
          <div class="flex vc tcolor f14">
           <span> 已完成({{d.r1}})：</span>
            <el-progress class="flex1" :percentage="d.p1"></el-progress>
          </div>
          
        </div>
      <Scroll :fetch="mobileFetch" ref='scroll' >
        <div class="wallet-bd flex sb fv" :class="{block: $isMobile}">
          <XXTable
            class="flex1 wallet-table"
            :data="lists"
            @pagerChange="pagerChange"
            :pagerShow="true"
          >
            <XXTable-Column prop="date" label="操作时间" :minWidth="`${$isMobile ? 140 : ''}`"></XXTable-Column>
            <XXTable-Column prop="user" label="账户"></XXTable-Column>
            <XXTable-Column prop="phone" label="手机号"></XXTable-Column>
            <XXTable-Column prop="amount" label="发币金额"></XXTable-Column>
          </XXTable>
        </div>
      </Scroll>
        <RightPanel :show.sync="panelShow"   class="fabiPanel" >
            <component :is="pl" @update:show="e => panelShow = e"></component>
        </RightPanel>
    </div>
  </page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Panel from './panel.vue'
import Fabi from './fabi.vue'
export default {
  data () {
    return {
      nextTime: '',
      isRun: false,
      lists: [],
      pl:'',
      panelShow: false,
      fabiLoader: false,
      faLoader: false,
      stepActive: 0,
      stepShow: true,
      d: {
        r:0,
        r1:0,
        r2:0,
        p:0,
        p1:0
      }
    };
  },
  components: {
    Panel,
    Fabi
  },
  created() {
      this.reset();
      this.getFaBiState();
      this.ticker = setInterval(() => {
        this.getFaBiState();
      }, 1000*5)
  },
  mounted() {
      this.$isMobile && this.$refs.scroll.init(document.querySelector('.mn'));
      this.toFetch();
  },
  beforeDestroy() {
    clearInterval(this.ticker);
  },
  methods: {
    handle(type) {
      if(this.$isMobile) {
        return this.$router.push({name: {Panel: 'fabip', Fabi: 'dofabi'}[type]});
      }
      this.pl = this.$options.components[type];
      this.panelShow = true;
    },
    getFaBiState() {
      if(this.faLoader) return false;
      this.faLoader = true;
      request.getFaBiState({})
      .then(res => {
    //     "committed": "1"    //已完成
    // "created":"1"//未开始
    // "pending":"2" //进行中
        let data = res.data;
        data.created = Number(data.created || 0);
        data.committed = Number(data.committed || 0);
        let total = data.created + data.committed;
        this.isRun = data.is_running;
        this.nextTime = util.format(data.nextTime);
        this.d = {
          p: Math.floor(data.created/total*100),
          p1: Math.floor(data.committed/total*100),
          r: data.created,
          r1: data.committed
        }
      })
      .finally(() => {
        this.faLoader = false
      }) 
    },
    doFaBi() {
      if(this.fabiLoader) return false;
      this.fabiLoader = true;
      request.doFaBi({})
      .then(res => {
        this.$message.info('发币成功');
      })
      .catch(err => {
        this.$message.info('发币失败');
      })
      .finally(() => {
        this.fabiLoader = false
      }) 
    },
    getLists() {
        return request
            .getFaBiLists({
            order: "create_time",
            desc: true,
            pagesize: this.siz,
            offset: (this.page - 1) * this.siz
            })
            .then(res => {
            if (!this.emptyCheck(res.data, 'list')) return [];

            return res.data.list.map(el => {
                return {
                ...el,
                date: util.format(el.createtime),
                user: el.username,
                amount: el.value,
                };
            });
        });
    }
  }
}

</script>
<style lang='scss'>
.pc {
  .stepp {
    padding-top: 0
  }
}
.fabi {
  .wallet-bd {
    overflow: hidden;
  }
}
.mobile {
  .fabi {
    .x-hd {
      display: block
    }
  }
}
.runloader {
  .el-loading-mask {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-loading-spinner {
    margin: 0;
    top:0;
    position: static;
  }
}
</style>