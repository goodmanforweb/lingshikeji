<template>
    <div class="kj-record ">
        <div class="kre-box">
            <div class="km-box-tt center">
                <span>{{$t('ms.allrecord')}}</span>
            </div>
            <div class="kre-bd">
                <ul class="kre-bd-lists" ref="box">
                    <li class="kre-kg flex" v-for="(row,index) in tableData" :key="index">
                        <div class="kre-avtar"></div>
                        <div class="kre-info flex1">
                            <div class="kg-name lcolor f20"><span>{{row.craw}}</span></div>
                            <div class="kg-mash bhcolor f20"><span>{{$t("ms.tkj") + ": " + row.uid}}</span></div>
                            <div class="kg-acc bhcolor f20"><span>{{$t('ms.jszl') + ": " + row.tamount}}</span></div>
                            <div class="kg-time f18">{{row.time}}</div>
                        </div>
                    </li>
                    <li class="nodata center" v-if="tableData.length == 0">{{$t('ms.nodata')}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
const pic = require("../assets/images/d1.png");
import util from "util";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      tableData: [
        // {
        //   craw: "el.From",
        //   tamount: "el.Value / 1e4",
        //   time: "filters.format(el.CreateTime)",
        //   uid: "el.UID"
        // }
      ],
      loader: false,
      pic,
      cubeWidth: "",
    };
  },
  filters: {
    clip: function(str) {
      if (!str) return "";
      return (
        str.substring(0, 3) + "..." + str.substring(str.length - 6, str.length)
      );
    }
  },
  created() {
    this.pager = 0;
    this.count = null;
    this.size = 12;
  },
  mounted() {
    this.addScrollListener();
    this.loadmore();
  },
  beforeDestroy() {
    this.removeScrollListener();
  },
  computed: {
      ...mapGetters(['isMobile'])
  },
  methods: {
    addScrollListener() {
      const box = (this.box = this.$refs.box);
      box.addEventListener("scroll", this.scrollListenerHandler, false);
    },
    scrollListenerHandler() {
      const scrollTop = util.getScrollTop(this.box);
      const marker = this.box.scrollHeight - scrollTop - this.box.clientHeight;
      if (marker <= 1) {
        console.log(34);
        this.loadmore();
      }
    },
    removeScrollListener() {
      this.box.removeEventListener("scroll", this.scrollListenerHandler, false);
    },
    loadmore() {
      if (this.loader) return;
      if (this.count) {
        if (this.pager * this.size >= this.count) {
          return false;
        }
      }
      this.pager++;
      this.getAccList();
    },
    clipText(id) {
      return !this.isMobile ? this.$options.filters.clip(id) : id;
    },
    getAccList() {
      this.loader = true;
      util
        .getAccList(
          { params: { size: this.size, offset: (this.pager - 1) * this.size } },
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
                    img: el.Img,
                    craw: el.From,
                    price: util.dropDec(el.MachinePrice, 1e4),
                    tamount: util.dropDec(el.Value, 1e4),
                    time: filters.format(el.CreateTime),
                    uid: this.clipText(el.TMID)
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
    }
  }
};

</script>

<style lang="scss">
 
</style>
