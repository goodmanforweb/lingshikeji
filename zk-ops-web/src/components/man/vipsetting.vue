<!--  -->
<template>
<page title="VIP设置" borderLine padding leftBtn='menu'>

<div class="vipsetting">
  <div class="x-hd m16 flex sb vc">
      <span class="f26 tcolor fw">VIP设置</span>
      <span class="fresh-action cp">
          <img src="../../assets/images/freshicon.png" alt="">
      </span>
  </div>
  <div class="vipsetting-bd flex fwrap">
    <div class="vip-add block vs-cube flex vc hc v fh" @click="panelHandle('add')">
      <div class="vs-plus center fw f26 m16 cp">+</div>
      <span class="f12 tcolor">添加等级</span>
    </div>

    <div class="vs-cube-wrap" v-for="(cube, index) in viplists" :key="index">
      <div class="block vs-cube re" :class="{'flex vc': isMobile, }">
        <div class="vc-hd">
          <span class="vs-edit cp" @click="panelHandle('edit',cube)"></span>
          <span class="tcolor f12">等级</span>
          <div class="tcolor f30">{{cube.name.toUpperCase()}}</div>
          <span class="gcolor f12">经验值 {{cube.exp || 0}}</span>
        </div>
        <div class="vc-bd">
          <span class="f12 gcolor">CJT每日提现限额</span>
          <div class="tcolor f14 mb20">{{cube.cjt}}</div>

          <span class="f12 gcolor">CJT每日提现限额</span>
          <div class="tcolor f14">{{cube.cjs}}</div>
        </div>

        <span class="vs-delete cp" @click="panelHandle('delete', cube.id)"></span>

      </div>
      <div class="f12 gcolor" :class="{center: !isMobile, right: isMobile}">修改时间：{{cube.updatetime | format}}</div>
    </div>

  </div>
  <!-- <div class="vipsetting-ft" v-if="!isMobile">
        <XXPager class="re-table-ft" @change="pagerChange"/>
  </div> -->
  <RightPanel :show.sync="panelShow"   class="blacklistPanel" >
        <VPanel @update:show = "panelShow=false" :panelData='panelData'/>
  </RightPanel>
</div>
</page>
</template>

<script>
import VPanel from './vipsetting-panel';
import {mapActions,mapGetters} from 'vuex'

export default {
  data () {
    return {
      panelData: {},
      panelShow: false,
    };
  },

  components: {
    VPanel
  },

  computed: {
    ...mapGetters(['viplists']),
    isMobile() {
      return this.$store.getters.isMobile
    }
  },

  mounted() {},

  methods: {
    pagerChange() {

    },
    deleteVip(id) {
      request.deleteVipItem({}, {id})
        .then(res => {
            this.$message.info('删除成功');
        })
    },
    panelHandle(type, data) {
      if(type == 'delete') {
        return this.deleteVip(data);
      }
      if(type == 'edit') {
        this.panelData = data;
      }
      if(this.isMobile) {
        return this.$router.push('/vipsettingpanel');
      }
      this.panelShow = true;
    }
  }
}

</script>
<style lang='scss'>
.pc {
  .vs-cube {
    width: 228px;
    height: 240px;
    margin: 8px;
    .vc-bd {
      margin-top: 40px
    }
  }
}
.vs-cube {
  padding: 16px;
  box-sizing: border-box;
}
.mobile {
  .vs-cube,.vs-cube-wrap {
    width: 100%;
    margin: 8px 0;
    .vc-hd {
      padding-right: 16px;
      margin-right: 16px;
      border-right: 1px solid rgba(8, 100, 153, 0.112);
    }
    .vs-edit {
      top: 16px;
    }
  }
  .vip-add {
    
  }
  .vs-plus {
    width: 35px;
    height: 35px;
    line-height: 35px;
    margin-right: 10px;
  }
  .vs-plus+span {
    font-size: 14px;
    font-weight: bold
  }
  
}
.vs-plus {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    line-height: 70px;
    background: rgba(8, 100, 153, 0.153);
    color: #086599;
  }
.vs-edit {
  position: absolute;
  top: 30px;
  right: 16px;
  width: 30px;
  height: 30px;
  background: url(../../assets/images/editicon.png) no-repeat center/18px;
}
.vs-delete {
    position: absolute;
    bottom: 16px;
    right: 16px;
    width: 30px;
    height: 30px;
    background: url(../../assets/images/canicon.png) no-repeat center/18px;

}
</style>