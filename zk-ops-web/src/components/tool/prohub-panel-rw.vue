<!--  -->
<template>
<page title="任务详情" borderLine padding routerBack="/pkjlists">

<div class="prohub-panel-rw block-padding">
    <div class="tcolor fw f24 mb20 x-hd">朋友圈集赞任务</div>
    <div class="prw-hd m16">
        <ul class="flex hc fwrap" :class="{'block block-padding': isMobile}">
            <li class="flex hc vc v bbox" :class="{'block block-padding': !isMobile}">
                <span class="gcolor f12 mb6">已挖矿（CJT）</span>
                <div class="tcolor fw f26">12890</div>
            </li>
            <li class="flex hc vc v bbox" :class="{'block block-padding': !isMobile}">
                <span class="gcolor f12 mb6">矿池总量（CJT）</span>
                <div class="tcolor fw f26">12890</div>
            </li>
            <li class="flex hc vc v progress-block re bbox" :class="{'block block-padding': !isMobile}">
                <canvas ref="progress1"></canvas>
            </li>
        </ul>
        <ul class="flex hc fwrap" :class="{'block block-padding m16': isMobile}">
            <li class="flex hc vc v bbox" :class="{'block block-padding': !isMobile}">
                <span class="gcolor f12 mb6">销售总量（CJS）</span>
                <div class="tcolor fw f26">12890</div>
            </li>
            <li class="flex hc vc v bbox" :class="{'block block-padding': !isMobile}">
                <span class="gcolor f12 mb6">预计销售总量（CJS）</span>
                <div class="tcolor fw f26">12890</div>
            </li>
            <li class="flex hc vc v progress-block re bbox" :class="{'block block-padding': !isMobile}">
                <canvas ref="progress2"></canvas>
            </li>
        </ul>
    </div>
    <div class="prw-ft pp-block-sec" v-if="!isMobile">
        <div class="tcolor fw f20">矿池详情</div>
        <XXTable  class="flex1" :lists="lists" :pagerShow='false'>
                <XXTable-Column
                prop="kjnum"
                label='矿机编号'
                >
                </XXTable-Column>
                <XXTable-Column
                prop="buydate"
                label="购买时间"
                >
                </XXTable-Column>
                <XXTable-Column
                prop="user"
                label="所属用户"
                >
                </XXTable-Column>
                <XXTable-Column
                prop="restdate"
                label="剩余时间"
                >
                </XXTable-Column>
                <XXTable-Column
                prop="kjprog"
                label="挖矿进度"
                >
                </XXTable-Column>
                <XXTable-Column
                prop="amount"
                label="挖矿数量（CJT）"
                >
                </XXTable-Column>
        </XXTable>
        <div class="center f14 tcolor m20 fw cp" @click="panelShow=true">查看更多</div>
    </div>  
    <div class="flex sb vc block block-padding " v-else @click="$router.push('/pcheckpool')">
        <span class="f14 tcolor">查看矿池详情</span>
        <i class="el-icon-arrow-right"></i>
    </div>

    <RightPanel :show.sync="panelShow" class="prohubrwPanel" >
       <PPRDetail />
    </RightPanel>
</div>
</page>
</template>

<script>
import PPRDetail from './prohub-panel-rw-detail'
import Progress from './kj-progress'

export default {
  data () {
    return {
        panelShow: false,
        lists: [
            {
                kjnum: '000000000',
                buydate:'2018-90-90',
                user:'uuuu',
                restdate:'4天 11:11:11',
                kjprog:'30%',
                amount:'20000'
            },
            {
                kjnum: '000000000',
                buydate:'2018-90-90',
                user:'uuuu',
                restdate:'4天 11:11:11',
                kjprog:'30%',
                amount:'20000'
            },
            {
                kjnum: '000000000',
                buydate:'2018-90-90',
                user:'uuuu',
                restdate:'4天 11:11:11',
                kjprog:'30%',
                amount:'20000'
            },

        ]
    };
  },

  components: {
      PPRDetail
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
        new Progress(this.$refs.progress1, '99%');
        new Progress(this.$refs.progress2, '99%');
    }
  }
}

</script>
<style lang='scss'>
.pc {
    .prw-hd {
        li {
            width: 272px;
            margin: 8px;
        }
        li:first-of-type {
            margin-left: 0;
        }
    }
}
.mobile {
    .prw-hd {
        li {
            margin: 8px 0;
        }
    }
}
.prw-hd {
        li {
            height: 110px;
        }
        
    }
</style>