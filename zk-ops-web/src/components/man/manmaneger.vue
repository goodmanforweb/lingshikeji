<!--  -->
<template>
<page title="会员管理" borderLine padding leftBtn='menu'>
<span slot="layer-right-btn" class="date-choose cp" @click="dateShow = !dateShow">
    <i class="w-date"><img src="../../assets/images/dateicon.png" alt=""></i>
</span>
<div class='manmaneger'>
  <div class="x-hd m16 " v-if="!isMobile">
      <div class='flex vc'>
          <span class="f26 tcolor fw">会员管理</span>
          <span class="date-choose cp" @click="dateShow = !dateShow">
              <i class="w-date"><img src="../../assets/images/dateicon.png" alt=""></i>
          </span>
          <el-date-picker
              v-show="dateShow"
              v-model="date"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
              </el-date-picker>
      </div>
  </div>
  <div class="wallet-hd flex sb m16 vc">
      <XXRadio class="wh-radio flex gcolor f14" :texts="radioTexts" v-model="radioValue"></XXRadio>

      <XXSearch v-model="inputValue" class="wh-search"/>
  </div>
  <Scroll :initListener="$isMobile" :fetch="mobileFetch">
    <div class="mangg-bd">
      <XXTable :data="lists"
      @pagerChange="pagerChange"
      :pagerShow="true"
      >
              <XXTable-Column
              prop="date"
              label='注册时间'
              >
              </XXTable-Column>
              <XXTable-Column
              prop="user"
              label="用户"
              >
              </XXTable-Column>
              <XXTable-Column
              prop="phone"
              label='手机号'
              >
              </XXTable-Column>
              <XXTable-Column
              prop="level"
              label="VIP等级"
              >
              </XXTable-Column>
              <XXTable-Column
              prop="state"
              label="状态"
              >
              <template   v-slot:default="slotProps">
                  <span v-html="slotProps.row.state"></span>
              </template>
              </XXTable-Column>
              <XXTable-Column
              prop="yes"
              :width="`${isMobile ? '60px' : '180px'}`"
              :fixed="`${isMobile ? 'right' : false}`"
              >
              <template v-slot:default="slotProps">
                  <template v-if="!isMobile">
                      <el-button :loading="slotProps.row.loader" @click="amendUserState(slotProps.row, 1,!slotProps.row.forbid_login)" class="n-btn btn-tcolor man-btn" :class="{'btn-disable': slotProps.row.forbid_login}">禁止登陆</el-button>
                      <el-button :loading="slotProps.row.loader" @click="amendUserState(slotProps.row, 0,!slotProps.row.forbid_withdraw)" class="n-btn btn-tcolor man-btn" :class="{'btn-disable': slotProps.row.forbid_withdraw}">禁止提现</el-button>
                  </template>
                  <template v-else>
                      <el-popover
                          placement="bottom"
                          width="65"
                          trigger="click">
                      <el-button :loading="slotProps.row.loader" @click="amendUserState(slotProps.row, 1, !slotProps.row.forbid_login)" class="n-btn btn-tcolor man-btn" :class="{'btn-disable': slotProps.row.forbid_login}">禁止登陆</el-button>
                      <el-button :loading="slotProps.row.loader" @click="amendUserState(slotProps.row, 0, !slotProps.row.forbid_withdraw)" class="n-btn btn-tcolor man-btn" :class="{'btn-disable': slotProps.row.forbid_withdraw}">禁止提现</el-button>

                          <button slot="reference" class="wallet-table-handle fw">&middot;&middot;&middot;</button>
                      </el-popover>
                  </template>
              </template>
              </XXTable-Column>
          </XXTable>
    </div>
  </Scroll>
  </div>
</page>
</template>

<script>
export default {
  data () {
    return {
      dateShow: false,
      date: '',
      inputValue:'',
      radioTexts: ['全部','正常','禁止登陆','禁止提现','全异常'],
      radioValue:'全部',
      lists: [
        {
          date: '2011:99:99',
          user: 'dada',
          phone: '12345678904567',
          level: 12,
          state:'正常'
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
  created() {
    this.param = {};
  },
  mounted() {
    
  },
  methods: {
    amendUserState(row, key, value) {
      row.loader = true;
      request.amendUserState({
        is_login_field: !!key,
        is_forbid: value
      }, {userid: row.id})
      .then(res => {
        this.$message.info('处理成功');
        this.freshListsData();
      })
      .finally(() => {
        row.loader = false
      })
    },
    getLists() {
      return request.getUserLists({
        ...this.param,
        order:'created_time',
        desc: true,
        pagesize: this.size,
        offset: (this.page-1)*this.size
      })
      .then(res => {
        if(!this.emptyCheck(res.data)) return [];
        return res.data.map(el => {
          let state = [];
          el.forbid_login && (state.push('禁止登录'))
          el.forbid_withdraw && (state.push('禁止提现'))
          state.length == 0 && (state.push('正常'))
          state = state.length == 2 ? state.join('<br />') : state;
          return {
            ...el,
            date: util.format(el.createtime),
            user: el.username,
            level: el.vip_id,
            state
          }
        })
      })
    }
  },
  watch: {
    date: {
      deep: true,
      handler: function(n) {
        if(n.length ==2) {
          this.param = Object(this.param, {start: n[0], end: n[1]});
        }
        else if(n.length == 0){
          delete this.param.start;
          delete this.param.end;
        }
         this.fetch();
      }
    },
    radioValue: {
      immediate: true,
      handler: function(n) {
        this.param.status = this.radioTexts.indexOf(n);
        this.fetch();
      }
    }
  }
}

</script>
<style lang='scss'>
.manmaneger .man-btn {
  // width: 64px;
  // height: 35px;
  // line-height: 35px;
}
.mobile {
  .wallet-hd {
    overflow-x: auto
  }
}
</style>