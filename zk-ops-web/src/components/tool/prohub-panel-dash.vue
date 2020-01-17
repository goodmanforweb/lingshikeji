<!--  -->
<template>
<page title="查看报表" borderLine padding routerBack="/ppanel">

<div class="prohub-panel-dash " :class="{'block-padding': !isMobile}">
    <div class="flex vc">
        <span style="width: 46px;marginRight: 10px">
            <img src="../../assets/images/proicon.png" alt="">
        </span>
        <span class="tcolor fw f26">FunnyUP</span>
    </div>
    <div class="ppdd-dash  m16" :class="{flex: !isMobile}">
      <ul class="ppddd-left" :class="{'flex fwrap block block-padding': isMobile}">
        
        <li class="flex hc vc v bbox" :class="{'block block-padding': !isMobile}">
          <span class="gcolor f12 mb6">销售总量（CJS）</span>
          <div class="tcolor fw f26">12890</div>
        </li>
        <li class="flex hc vc v bbox" :class="{'block block-padding': !isMobile}">
          <span class="gcolor f12 mb6">预计销售总量（CJS）</span>
          <div class="tcolor fw f26">12890000</div>
        </li>
        <li class=" progress-block  bbox re" :class="{'block block-padding': !isMobile}">
          <canvas ref="progress"></canvas>
        </li>
      </ul>
      <div class="ppddd-right flex1 block block-padding bbox" :class="{'m16': isMobile}">
        <span class="gcolor f12">各矿机销售进度</span>
        <div class="chart-progress m16">
          <div class="cp-des mb6">
            <span class="tcolor f14 fw">点赞任务</span> <span class="f12 gcolor">(20000/100000)</span>
          </div>
          <div class="cp-bar flex vc">
            <div class="cp-bar-move flex1">
              <span class="cb-mover transi"></span>
            </div>
            <span class="cp-bar-num tcolor fw">20%</span>
          </div>
        </div>
        <div class="chart-progress m16">
          <div class="cp-des mb6">
            <span class="tcolor f14 fw">点赞任务</span> <span class="f12 gcolor">(20000/100000)</span>
          </div>
          <div class="cp-bar flex vc">
            <div class="cp-bar-move flex1">
              <span class="cb-mover transi"></span>
            </div>
            <span class="cp-bar-num tcolor fw">20%</span>
          </div>
        </div>
        <div class="chart-progress m16">
          <div class="cp-des mb6">
            <span class="tcolor f14 fw">点赞任务</span> <span class="f12 gcolor">(20000/100000)</span>
          </div>
          <div class="cp-bar flex vc">
            <div class="cp-bar-move flex1">
              <span class="cb-mover transi"></span>
            </div>
            <span class="cp-bar-num tcolor fw">20%</span>
          </div>
        </div>
        <div class="chart-progress m16">
          <div class="cp-des mb6">
            <span class="tcolor f14 fw">点赞任务</span> <span class="f12 gcolor">(20000/100000)</span>
          </div>
          <div class="cp-bar flex vc">
            <div class="cp-bar-move flex1">
              <span class="cb-mover transi"></span>
            </div>
            <span class="cp-bar-num tcolor fw">20%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="ppdd-dash-report pp-block-sec " v-if="!isMobile">
      <div class="tcolor fw f20">每日销售报表</div>
      <XXTable  class="flex1" :lists="lists" :pagerShow='false'>
            <XXTable-Column
            prop="date"
            label='日期'
            >
            </XXTable-Column>
            <XXTable-Column
            prop="amount"
            label="销售额"
            >
            </XXTable-Column>
      </XXTable>
      <div class="center f14 tcolor m20 fw cp" @click="panelShow=true">查看更多</div>
    </div>  
    <div class="flex sb vc block block-padding " v-else @click="$router.push('/pchecksale')">
      <span class="f14 tcolor">查看每日销售报表</span>
      <i class="el-icon-arrow-right"></i>
    </div>

    <RightPanel :show.sync="panelShow" class="prohubdashPanel" >
       <PDReport />
    </RightPanel>
</div>
</page>
</template>

<script>
import PDReport from './prohub-panel-dash-report';
import Progress from './kj-progress'
export default {
  data () {
    return {
      panelShow: false,
      lists: [
        {
          date: '2019:88:88',
          amount: 9900000
        },
        {
          date: '2019:88:88',
          amount: 9900000
        },
        {
          date: '2019:88:88',
          amount: 9900000
        },

      ]
    };
  },

  components: {
    PDReport
  },

  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    }
  },

  mounted() {
    setTimeout(() => {
      this.createProgress();
    }, 250)
  },

  methods: {
    createProgress() {
      new Progress(this.$refs.progress, '99%');
    }
  }
}

</script>
<style lang='scss'>
.progress-block {
  canvas {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.pc {
  .ppddd-left {
    width: 272px;
    margin-right: 16px;
    li:nth-of-type(2) {
      margin: 8px 0;
    }
  }
}
.ppddd-left {
  li {
    height: 110px;
  }
  
}
.cp-bar-move {
  height:5px;
  background:rgba(175,187,194,.2);
  border-radius:3px;
  margin-right: 16px;
  font-size: 0
}
.cb-mover {
    display: inline-block;
    height:5px;
    width: 50%;
    background:#086599;
    border-radius:3px;

}

.mobile {
  .ppddd-left,.prw-hd>ul {
    li:first-child, li:nth-child(2) {
      width: 50%;
    }
    li:last-child {
      width: 100%
    }
    li:first-child {
      border-right: 1px solid rgba(8, 100, 153, 0.1);
    }
  }
}
</style>