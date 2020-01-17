<!--  -->
<template>
  <page title="提现审核列表" borderLine padding leftBtn="menu">
    <!-- <span slot="layer-right-btn" class="date-choose cp" >
      <i class="w-date" @click="dateShow = !dateShow">
        <img src="../../assets/images/dateicon.png" alt>
      </i>
    </span> -->
    <div class="wallet">
      <div class="x-hd m16" v-if="!$isMobile">
          <div class="flex vc">
            <span class="f26 tcolor fw">提现审核列表</span>
            <span class="date-choose cp" @click="dateShow = !dateShow">
              <i class="w-date">
                <img src="../../assets/images/dateicon.png" alt>
              </i>
            </span>
            <el-date-picker
              v-show="dateShow"
              v-model="date"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
        </div>
      </div>
      <div class="wallet-hd flex sb m16">
        <XXRadio
          v-show="tabRadioShow"
          class="wh-radio flex gcolor f14"
          :texts="radioTexts"
          v-model="radioValue"
        ></XXRadio>

        <!-- <XXSearch v-model="inputValue" @hideEvent="val => tabRadioShow = val" class="wh-search"/> -->
      </div>
      <Scroll :fetch="mobileFetch" ref='scroll' >
        <div class="wallet-bd flex sb fv" :class="{block: $isMobile}">
          <XXTable
            class="flex1 wallet-table"
            :data="lists"
            @pagerChange="pagerChange"
            :pagerShow="true"
          >
            <XXTable-Column prop="date" label="提现时间" :min-width="`${$isMobile ? '160px' : ''}`"></XXTable-Column>
            <XXTable-Column prop="user" label="用户"></XXTable-Column>
            <!-- <XXTable-Column prop="level" label="VIP等级"></XXTable-Column> -->
            <XXTable-Column prop="amount" label="提现金额"></XXTable-Column>
             <XXTable-Column prop="to" label="地址" width="120px">
               <template v-slot:default="slotProps">
                <span class="cancopy" :data="slotProps.row.to">{{slotProps.row.to}}</span>
              </template>
             </XXTable-Column>
            <XXTable-Column prop="state" label="状态">
              <template v-slot:default="slotProps">
                <span v-html="slotProps.row.state"></span>
              </template>
            </XXTable-Column>
            <XXTable-Column
              prop="yes"
              label="操作"
              :width="`${$isMobile ? '60px' : '120px'}`"
              :fixed="`${$isMobile ? 'right' : false}`"
            >
              <template v-slot:default="slotProps">
                <template v-if="!$isMobile&&slotProps.row.isShowBtn">
                  <i
                    class="el-icon-circle-check w-icon w-yes cp"
                    @click="handle('yes', slotProps.row)"
                  ></i>
                  <i class="el-icon-circle-close w-icon w-no cp" @click="handle('no', slotProps.row)"></i>
                </template>
                <template v-else-if="$isMobile&&slotProps.row.isShowBtn">
                  <el-popover placement="bottom" width="65" trigger="click">
                    <i
                      class="el-icon-circle-check w-icon w-yes cp"
                      @click="handle('yes', slotProps.row)"
                    ></i>
                    <i
                      class="el-icon-circle-close w-icon w-no cp"
                      @click="handle('no', slotProps.row)"
                    ></i>
                    <button slot="reference" class="wallet-table-handle fw">&middot;&middot;&middot;</button>
                  </el-popover>
                </template>
              </template>
            </XXTable-Column>
          </XXTable>
          <div class="kj-aside wallet-aside">
            <div class="kj-state">
              <XXRadio
                :class="`${$isMobile ? 'flex sb f12 kj-state-dot' : 'f14'} re`"
                :texts="radioAsideTexts"
                v-model="radioAsideValue"
              ></XXRadio>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
  </page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Clipboard from "clipboard";
import { setTimeout } from 'timers';

const ddconfig = {
  all: '全部',
  Created: "已创建",
  Committed: "确认中",
  Pending: "处理中",
  Confirmed: "已确认",
  Confirmed_Success: "确认成功",
  Confirmed_Fail: "确认失败",
  Canceled: "已取消"
};
const shconfig = {
    all: '全部',
  Audit_Created: "等待审核",
  Audit_Success: "审核通过",
  Audit_Fail: "审核不通过"
};
const t = Object.assign({}, ddconfig, shconfig);
export default {
  data() {
    return {
      isAudit: true,
      tabRadioShow: true,
      radioTexts: ["全部"],
      radioAsideTexts: ["全部", "审核中", "通过", "拒绝"],
      radioAsideValue: "全部",
      radioValue: "全部",
      inputValue: "",
      date: [],
      dateShow: false,
      lists: [
        // {
        //   date: "2016.11.11 12:12:122016.11.11 12:12:122016.11.11 12:12:12",
        //   user: 2000,
        //   level: 0,
        //   amount: "3000CJT",
        //   state: "审核中"
        // }
      ]
    };
  },
  computed: {
    ...mapGetters(["assets"])
  },
  created() {
    this.reset();
    this.setAsideRadios();
    this.param = {
        isAudit: true
    };
  },
  mounted() {
    this.$isMobile && this.$refs.scroll.init(document.querySelector('.mn'));
    this.toFetch();
  },
  methods: {
    createCopy() {
          this.oldcopy && this.oldcopy.destroy();
          this.oldcopy = new Clipboard(this.$el.getElementsByClassName('cancopy'), {
              text: function(trigger) {
                  return trigger.getAttribute("data");
              }
          }).on("success", e => {
              this.$message.info('复制成功');
              e.clearSelection();
          })
      },
    setAssetRadios() {
      this.radioTexts = this.radioTexts.concat(
        this.assets.map(el => el.symbol)
      );
    },
    setAsideRadios() {
        if(this.isAudit) {
            this.radioAsideTexts = Object.values(shconfig);
        }
        else {
            this.radioAsideTexts = Object.values(ddconfig);
        }
    },
    fresh(row) {
      let t = this.lists.find(el => el.id == row.id);
      t = this.lists.indexOf(t);
      this.lists.splice(t, 1);
    },
    handle(type, row) {
      request
        .doTxAudit({ id: row.id, status: { yes: 2, no: 3 }[type] })
        .then(res => {
          this.fresh(row);
          this.$message.info("操作成功");
        });
    },
    getStateText(el) {
      let str = t[el.audit_status]
      if(el.is_manual && (el.tx.indexOf('#') <= -1)) {
        str += '<br>(需要手工转账)';
      }
      return str;
    },
    getLists() {
      return request
        .getTxLists({
          ...this.param,
          order: "created_time",
          desc: true,
          pagesize: this.siz,
          offset: (this.page - 1) * this.siz
        })
        .then(res => {
          if (!this.emptyCheck(res.data, 'withdraws')) return [];
          setTimeout(() => {
            this.createCopy();
          }, 500);
          return res.data.withdraws.map(el => {
            el.is_manual = el.is_manual || false;
            return {
              ...el,
              date: util.format(el.createtime),
              user: el.user,
              amount: util.fromHex(el.value, el.decimals),
              state: this.getStateText(el),
              isShowBtn: el.audit_status == 'Audit_Created',
            };
          });
        });
    }
  },
  watch: {
    date: {
      deep: true,
      handler: function(n) {
        if (n.length == 2) {
          this.param = Object.assign(this.param, { start: n[0], end: n[1] });
        } else if (n.length == 0) {
          delete this.param.start;
          delete this.param.end;
        }
        this.reset();
        this.toFetch();
      }
    },
    radioValue: {
      handler: function(n) {
        if (n == "全部") {
          delete this.param.asset;
        } else {
          const t = this.assets.find(el => el.symbol == n);
          this.param.asset = t.asset;
        }
        this.reset();
        this.toFetch();
      }
    },
    radioAsideValue: {
      handler: function(n) {
        if(this.isAudit) {
            this.param.status = this.radioAsideTexts.indexOf(n);
        }
        else {
            let t = this.radioAsideTexts.indexOf(n);
            if(t == 0) {
                delete param.status;
            }
            else {
                this.param.status = t - 1;
            }
        }
        this.reset();
        this.toFetch();
      }
    },
    assets: {
      immediate: true,
      deep: true,
      handler: function(n) {
        if (!util.isEmpty(n)) {
          this.setAssetRadios();
        }
      }
    },
    isAudit: {
        handler:function(n) {
            this.param.is_audit = n;
            this.setAsideRadios();
            this.toFetch();
        }
    }
  }
};
</script>
<style lang='scss'>
.mobile {
  .wh-radio {
    font-size: 12px;
    li {
      height: 30px;
      line-height: 30px;
    }
  }
  .wallet-aside {
    border-radius: 6px;
    background: #f9fbfc;
    padding: 32px 10px 0;
  }
}
.wh-radio {
  li {
    text-transform: uppercase;
    line-height: 40px;
    height: 40px;
    padding: 0 10px;
    transition: all 0.3s linear;
    margin: 0 5px;
  }
  li.active {
    color: #086599;
    border-radius: 4px;
    background: #fff;
    font-weight: bold;
  }
}
.pc {
  .wh-search {
    width: 330px;
  }
}
.w-icon:before {
  color: #8e9fa9;
  font-size: 30px;
}
.w-yes:hover:before {
  color: #38b573;
}
.w-no:hover:before {
  color: #ed6363;
}
.w-date {
  display: inline-block;
  width: 20px;
}
.date-choose {
  padding: 0 20px;
}
.kj-state {
  ul {
    padding-right: 20px;
  }
  ul:after {
    content: "";
    position: absolute;
    top: 16px;
    z-index: 0;
    bottom: 16px;
    right: 8px;
    width: 1px;
    border-right: 1px solid #cadde8;
  }
  li {
    cursor: pointer;
    line-height: 40px;
    text-align: right;
    color: #8e9fa9;
    position: relative;
    transition: all 0.3s linear;
  }
  li.active {
    color: #086599;
  }
  li.active:after {
    background: #fff;
    border: 2px solid #086599;
    width: 6px;
    height: 6px;
    z-index: 99;
  }
  li:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: -16px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #cadde8;
  }
}
.wallet-table {
  .w-icon {
    display: inline-block;
  }
}
.wallet-table-handle {
  width: 24px;
  line-height: 24px;
  height: 24px;
  border-radius: 50%;
  background: #cadde8;
  font-size: 14px;
  text-align: center;
  color: #086599;
  border: none;
  outline: none;
  padding: 0;
}
</style>