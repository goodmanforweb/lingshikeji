<template>
  <div class="depowith-records card">
      <Xtabs  v-if="isMobile" @change="switchTab" :tabnames="[$t('ms.deposit'), $t('ms.withdraw'), $t('ms.shz')]" :defaultKey="activeTab">
        <el-table
        slot="body"
        :data="tableData"
        max-height="600"
        v-loading="loaderShow"
        v-loadmore="loadMore"
        style="width: 100%">
          <el-table-column
            prop="time"
            :label="$t('ms.time')"
            
            >
          </el-table-column>


          <template v-if="type != 'audit'">
            <el-table-column
            prop="address"
            :label="$t('ms.address')"
            >
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.raddress" placement="top" effect="light">
                <a :href="`https://etherscan.io/address/${scope.row.raddress}`" target="_blank">{{scope.row.address}}</a>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="txid"
            :label="$t('ms.txid')">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.rtxid" placement="top" effect="light">
                <a :href="`https://etherscan.io/tx/${scope.row.rtxid}`" target="_blank">{{scope.row.txid}}</a>
              </el-tooltip>
            </template>
          </el-table-column>
          </template>


          <el-table-column
            prop="amount"
            :label="$t('ms.amount') +'('+$t('ms.chips')+')'">
          </el-table-column>
          <el-table-column
            prop="status"
            :label="$t('ms.status')">
          </el-table-column>
        </el-table>
      </Xtabs>
      <template v-if="!isMobile">
          <div class="xtab-row">
              <el-radio v-model="activeTab"  @change="switchTab" :label=0 >{{$t('ms.deposit')}}</el-radio>
              <el-radio v-model="activeTab"  @change="switchTab" :label=1 >{{$t('ms.withdraw')}}</el-radio>
              <el-radio v-model="activeTab"  @change="switchTab" :label=2 >{{$t('ms.shz')}}</el-radio>
          </div>
          <el-table
          slot="body"
          :data="tableData"
          :height="tableHeight"
          v-loading="loaderShow"
          v-loadmore="loadMore"
          style="width: 100%">
            <el-table-column
              prop="time"
              :label="$t('ms.time')"
              min-width="140"
              >
            </el-table-column>
            <template  v-if="type != 'audit'">
              <el-table-column
              prop="address"
              :label="$t('ms.address')"
              min-width="140"
              >
              <template slot-scope="scope">
                <a :href="`https://etherscan.io/address/${scope.row.raddress}`" target="_blank">{{scope.row.address}}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="txid"
              min-width="140"
              :label="$t('ms.txid')">
              <template slot-scope="scope">
                <a :href="`https://etherscan.io/tx/${scope.row.rtxid}`" target="_blank">{{scope.row.txid}}</a>
              </template>
            </el-table-column>
            </template>
            

            <el-table-column
              prop="amount"
              min-width="90"
              :label="$t('ms.amount') +'('+$t('ms.chips')+')'">
            </el-table-column>
            <el-table-column
              prop="status"
              :label="$t('ms.status')">
            </el-table-column>
          </el-table>
      </template>
  </div>
</template>

<script>
import util from "../../util/util";
import { mapGetters, mapActions } from "vuex";
import Xtabs from "../widget/xtabs/index";
import Clipboard from "clipboard";

export default {
  name: "DepoWithRecords",
  components: {
    Xtabs
  },
  data() {
    return {
      tableData: [],
      loaderShow: false,
      activeTab: 0,
      isMobile: window.innerWidth > 704,
      tableHeight: 400,
      type:'deposite'
    };
  },
  computed: {
    ...mapGetters(["assetList", "asset"])
  },
  created() {
    this.pager = 0;
    this.count = null;
    this.size = Math.ceil(600 / 48);

    this.coin = this.$route.params.id.toUpperCase();
    this.type = this.$route.query.type || "deposite";
    this.setTab();
    this.isMobile && this.getAssetData();
  },
  mounted() {
    this.createCopy();
    if (!this.isMobile) {
      this.setMobileTableHeight();
      this.size = Math.ceil(this.tableHeight / 80);
      this.getAssetData();
    }
  },
  methods: {
    ...mapActions(["getAsset", "getAssetLists"]),
    init() {
      this.currentasset = this.assetList.find(el => el.symbol == this.coin);
      this.loadMore();
    },
    getAssetData() {
      if (this.assetList.length == 0 && Object.keys(this.asset).length == 0) {
        this.loaderShow = true;
        this.getAssetLists(this)
          .then(data => {
            data.forEach(el => {
              //只拿当前的
              el.symbol == this.coin &&
                this.getAsset({ ctx: this, asset: el.asset }).then(res => {
                  this.init();
                });
            });
          })
          .finally(() => {
            this.loaderShow = false;
          });
      } else {
        this.init();
      }
    },
    createCopy() {
      new Clipboard(".depowith-records .el-button", {
        text: function(trigger) {
          return trigger.getAttribute("data");
        }
      }).on("success", e => {
        this.$message.info(this.$t("ms.copy"));
        e.clearSelection();
      });
    },
    setTab() {
      this.activeTab = { deposite: 0, withdraw: 1 , audit: 2}[this.type];
    },
    clip(str) {
      if (!str) return "";
      return (
        str.substring(0, 8) + "..." + str.substring(str.length - 6, str.length)
      );
    },
    switchTab(e) {
      let type = ["deposite", "withdraw", 'audit'][e];
      this.$router.push({ name: "walletrecord", query: { type } });
    },
    loadMore() {
      if (this.loaderShow) return;
      if (this.count) {
        if (this.pager * this.size >= this.count) {
          return false;
        }
      }
      this.pager++;
      this.getRecords();
    },
    getRiskLog() {
      this.loaderShow = true;
      util.getRiskLog({
        params: {
          status: 'AUDIT',
          size:20,
          offset: 0
        }
      }, {}, this)
      .then(res => {
          if (res.data.code == 0) {
            let filters = this.$root.$options.filters;
            this.count = res.data.count;
            let result = res.data.list.map(order => {
              return {
                time: filters.format(order.createtime),
                amount: filters.currency(order.value_dec),
                status: order.status
              };
            });
            this.tableData = this.tableData.concat(result);
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.loaderShow = false;
        });
    },
    getRecords() {
      this.loaderShow = true;
      this.records = [];
      if(this.type == 'audit') {
        this.getRiskLog();
        return ;
      }
      const type =
        this.type == "deposite" ? "getDepositRecords" : "getWithdrawRecords";

      util[type](
        {
          params: {
            asset: this.currentasset.asset,
            offset: (this.pager - 1) * this.size,
            size: this.size,
            orderby: "create_time",
            order: "desc"
          }
        },
        {},
        this
      )
        .then(res => {
          if (res.data.code == 0) {
            let filters = this.$root.$options.filters;
            let decimals = res.data.decimals;
            this.count = res.data.total;
            let result = res.data.list.map(order => {
              return {
                time: filters.format(order.createtime),
                address: this.clip(order.address),
                raddress: order.address,
                txid: this.clip(order.tx),
                rtxid: order.tx,
                amount: filters.currency(util.fromHex(order.value, decimals)),
                status: order.status
              };
            });
            this.tableData = this.tableData.concat(result);
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.loaderShow = false;
        });
    },
    setMobileTableHeight() {
      let getHeight = selector => document.querySelector(selector).clientHeight;
      const navHeight = getHeight(".nav");
      const xtabhdHeight = getHeight(".xtab-hd");
      const xtabrowHeight = getHeight(".xtab-row");
      const tableHdHeight = getHeight(".el-table__header-wrapper");

      return (this.tableHeight =
        window.innerHeight -
        (navHeight + xtabhdHeight + xtabrowHeight + tableHdHeight + 4));
    }
  },
  watch: {
    $route: function(n) {
      this.pager = 0;
      this.count = null;
      this.tableData = [];
      this.type = n.query.type;

      this.setTab();
      this.loadMore();
    }
  }
};
</script>

<style lang="scss">
.bd .el-table__body td {
  border-color: transparent;
}
.bd .el-table__header th.is-leaf {
  border-color: rgba(0, 0, 0, 0.05);
}
.depowith-records {
  padding-top: 8px;
  .xtab-hd {
    border-top: none;
  }
  .xtab-wrap .xtab-hd .xtab {
    padding: 0;
  }
  .el-table::before {
    height: 0;
  }
  .cell .el-button {
    padding: 0;
  }
  .cell {
    white-space: nowrap
  }
}
@media screen and (max-width: 700px) {
  .el-table {
    .cell {
      font-size: 12px;
    }
  }
}
</style>
