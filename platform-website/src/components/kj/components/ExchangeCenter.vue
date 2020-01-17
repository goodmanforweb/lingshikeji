<template>
    <div class="exchange-center kjwrap">
        <p class="center highlight tit">{{$t("ms.dhzx")}}</p>
        <div class="exchange-limit-wrap">
          <Exchange :good="true"  @exchangeSuc="getNewRecord"/>
        </div>
        <Kjbox class="record">
            <span class="highlight pd">{{$t("ms.dhjl")}}</span>
            <div class="ex-table">
                <el-table
                    :data="tableData"
                    max-height="500"
                    v-loading="loader"
                    v-loadmore="loadmore"
                    style="width: 100%">
                    <el-table-column
                        prop="time"
                        min-width="140px"
                        :label="$t('ms.dhtime')">
                    </el-table-column>
                    <el-table-column
                        prop="pare"
                        :label="$t('ms.dhdui')"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        :label="$t('ms.dhsl')">
                    </el-table-column>
                    </el-table>
            </div>
        </Kjbox>
    </div>
</template>
<script>
import Exchange from "./Exchange";
import util from "util";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      loader: false
    };
  },
  created() {
    this.pager = 0;
    this.count = null;
    this.size = 12;
    this.loadmore();
  },
  computed: {
    ...mapGetters(["login"])
  },
  components: {
    Exchange
  },
  methods: {
    loadmore() {
      if (this.loader) return;
      if (this.count) {
        if (this.pager * this.size >= this.count) {
          return false;
        }
      }
      this.pager++;
      this.getTransfer();
    },
    getTransfer() {
      this.loader = true;
      util
        .getTransfer(
          {
            params: {
              uid: this.login.user.id,
              size: this.size,
              offset: (this.pager - 1) * this.size,
              orderby: "create_time", //选填
              order: "DESC"
            }
          },
          {},
          this
        )
        .then(res => {
          if (res.data.code == 0) {
            const dataArr = res.data.list;
            const filters = this.$root.$options.filters;
            this.count = res.data.count;
            Array.isArray(dataArr) &&
              (this.tableData = this.tableData.concat(
                dataArr.map(el => {
                  return {
                    time: filters.format(el.CreateTime),
                    pare: { TRANS_IN: "CJT/SUC", TRANS_OUT: "SUC/CJT" }[
                      el.Type
                    ],
                    amount: util.dropDec(el.Value, 1e4)
                  };
                })
              ));
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getNewRecord() {
      this.pager = 0;
      this.count = null;
      this.tableData = [];
      this.loadmore();
    }
  }
};
</script>

<style lang="scss" >
.exchange-center {
  margin: 1rem;
  .a-btn {
    margin-bottom: 2rem;
  }
  .record {
    margin-top: 2rem;
  }
  .rapid-exchange {
    .ex-item,
    .ex-input {
      height: 4rem;
      line-height: 4rem;
    }
    .a-btn {
      height: 4rem;
      width: 30%;
      margin-bottom: 1rem;
    }
  }
}
</style>


