<template>
    <div class="mall kjwrap">
        <p class="highlight center tit">{{$t("ms.kjsc")}}</p>
         <div class="ml" v-for="(list, index) in lists" :key="index">
            <div class="list flex">
               <div class="list-wrap flex1 flex" >
                   <div class="list-pic center">
                        <div class="kj-icon"><img :src="list.Img || pic" alt=""></div>
                        <div v-if="!isMobile" class="kj-type">{{list.Name}}</div>
                    </div>
                    <div class="kj-desc flex1" :class="{nostore: list.Stocks==0}">
                      <div class="kj-desc-wrap">
                        <p v-if="isMobile" class="kj-type center">{{list.Name}}</p>
                        <p class="kj-hint">{{$t("ms.wksc")}}：{{list.ServiceLife}}{{$t("ms.day")}}</p>
                        <p class="kj-t">{{$t("ms.mbkj")}}：{{list.Price | currency}} SUC/{{$t("ms.tai")}}</p>
                        <p>{{$t("ms.yjkjsy")}}：{{list.Reserves  | currency}} SUC</p>
                      </div>
                      <div class="kj-desc-layer flex" v-if="list.Stocks==0">
                        <img src="../assets/images/star.png" alt="">
                        <span>{{$t('ms.kjtosee')}}</span>
                      </div>
                    </div>
               </div>
                <div class="list-btn center">
                    <el-button type="primary" :loading="list.loader" round @click="buySure(list)">{{$t("ms.gm")}}</el-button>
                    <span class="wcolor"> {{$t("ms.sysl")}}： {{list.Stocks}}</span>
                </div>
            </div>
        </div>

        <div class="slmj"><img src="../assets/images/bumble.png" alt=""> <span class="highlight">{{$t("ms.slmjrh")}}</span></div>
       <Step></Step>

    </div>
</template>

<script>
const pic = require("../assets/images/d1.png");
import util from "util";
import { mapGetters, mapActions } from "vuex";
import Step from "./Step";
import apiconfig from "apiconfig";
import Big from "bignumber.js";

export default {
  data() {
    return {
      lists: [],
      pic: pic,
      cjtid: apiconfig.assetid,
      isMobile: window.innerWidth <= 700
    };
  },
  components: {
    Step
  },
  beforeRouteLeave (to, from, next) {
    this.dialogInstance && this.dialogInstance.close();
    next();
  },
  created() {
  },
  computed: {
    ...mapGetters(["pool"])
  },
  mounted() {
    this.getSku();
  },
  
  methods: {
    ...mapActions(["getAsset", "getPool"]),
    resetBalance() {
      this.$store.commit("calcPool", {
        value: -this.target.Price
      });
      this.getAsset({ ctx: this, asset: this.cjtid });
      this.getPool({ ctx: this });
    },
    getSku() {
      util
        .getSku({}, {}, this)
        .then(res => {
          if (res.data.code == 0) {
            this.lists = res.data.list.map(el => {
              el.loader = false;
              return {
                ...el,
                Price: util.dropDec(el.Price, 1e4),
                Reserves: util.dropDec(el.Reserves, 1e4),
                ServiceLife: Math.ceil(
                  Big(el.ServiceLife)
                    .div(24 * 60 * 60)
                    .toNumber()
                )
              };
            });
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {});
    },
    buySure(item) {
      
      const id = item.ID;
      let target = (this.target = this.lists.find(el => el.ID == id));
      if (!target || target.loader) return false;
      if (item.Stocks <= 0) {
        this.$message.info(this.$t("ms.nostocks"));
        return false;
      }
      if (item.Price > this.pool.Balance) {
        this.$message.info(this.$t("ms.nomoney"));
        return false;
      }

      this.dialogInstance = this.$dialog({
          src:item.Img,
          text:item.Name
        },() => {
          this.buy(item, id, target);
        }, () => {
          
        })
    },
    buy(item, id, target) {
      target.loader = true;
      util
        .buyPool({ data: { sku: id } }, {}, this)
        .then(res => {
          if (res.data.code == 0) {
            this.$message.info(this.$t("ms.buysuc"));
            this.getSku();
            this.resetBalance();
          }
        })
        .catch(err => {
          this.$message.info(this.errorInfo(err.response));
        })
        .finally(() => {
          target.loader = false;
        });
    }
  },
  
};
</script>

<style lang="scss" >
.mall {
  .mid {
    margin: 1rem 0;
  }
  .wcolor {
    font-size: 12px;
  }
  .choose {
    flex: 1;
  }
  .choose-info {
    flex: 2;
    margin: 0 4rem;
    padding: 3rem 0;
    flex-direction: column;
    justify-content: center;
  }
  .bd .el-carousel__arrow {
    background-color: transparent;
    font-size: 30px;
  }
  .el-carousel__item {
    text-align: center;
  }
  .kj-icon {
    width: auto;
    display: inline-block;
    img {
      max-width: 36%;
    }
  }
  .kj-hint {
    color: #666;
    font-size: 12px;
  }
  .list {
    align-items: center;
  }
  .list-wrap {
    align-items: center;
  }
  .list-pic {
    width: 14.375rem;
    height: 14.375rem;
    background-color: #201b4f;
    border-radius: 4px;
    padding: 2rem 1rem 1rem;
    box-sizing: border-box;
    .kj-type {
      font-size: 1.7rem;
      padding-top: 1rem;
    }
  }
  .kj-desc {
    padding: 0 4rem;
    position: relative;
  }
  .kj-desc.nostore {
    .kj-desc-wrap {
      filter:blur(2px);
    }

    .kj-desc-layer {
      position: absolute;
      top:0;
      left:4rem;
      right:4rem;
      bottom:0;
      z-index: 99;
      background-color: rgba(38,32,94,0.8);
      box-sizing: border-box;
      align-items: center;
      font-size: 16px;
      img, span {
        vertical-align: middle;
        
      }
      img {
        width: 50px;
        margin-right: 1rem;
      }
    }

  }
  
  
  .list-btn {
    width: 200px;
    margin-right: 5rem;
    margin-bottom: -2rem;
    .el-button {
      display: block;
      margin-bottom: 1rem;
      width: 100%;
      height: 50px;
      border-radius: 30px;
      font-size: 1.5rem;
      background-color: #c121ff;
      border-color: #c121ff;
    }
  }
  .kj-t {
    color: #ff2de9;
  }
  .kj-fter {
    justify-content: space-between;
    align-items: center;
    .el-button {
      width: 150px;
    }
  }
  .ml {
    margin: 2rem 0;
    padding: 1rem;
    border-radius: 4px;
    background-color: #26205e;
  }
  .slmj {
    text-indent: 2em;
    margin: 4rem 0;

    img {
      width: 25px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      display: inline;
      font-size: 30px;
    }
  }
}
</style>


