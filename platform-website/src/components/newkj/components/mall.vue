<template>
    <div class="mall">
        <div class="kj-m-tt center f32">
            <span>{{$t('ms.pooltatal')}}</span>
            <span>{{totalPool | currency}}</span>
        </div>
        <div class="kj-m-select flex hc">
            <div class="km-box">
                <div class="km-box-tt center f30">
                    <span>{{$t("ms.kjsc")}}</span>
                </div>
                <div class="km-box-bd">
                    <ul class="flex kbb-lists sb">
                        <li class="kbb-item center audiobtn" :class="{active: list.active}" v-for="(list, index) in lists" :key="index" @click='showSpec(list)'>
                            <span class="kbbi-tt f18 textshadow">{{list.Name}}</span>
                            <div class="ki-icon dio1"><img :src="list.Img || pic" alt=""></div>
                            <div class="ki-price f18 ">{{list.Price | currency}} SUC</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="km-box-spec">
                <div class="km-box-tt center f24">
                    <span>{{$t('ms.kjinfo')}}</span>
                </div>
                <div class="km-box-s-bd">
                    <div class="ks-pic"><img :src="item.Img || pic" alt=""></div>
                    <div class="center textshadow">
                        <span class="ks-name f22">{{item.Name}}</span>
                        <div class="f24">{{item.Price | currency}} <i class="s-unit">SUC/{{$t("ms.tai")}}</i> </div>
                    </div>
                    <div class="ks-paper">
                        <ul class="ksp-info f20">
                            <li>
                                <span>{{$t("ms.yjkjsy")}}</span>
                                <div>{{item.Reserves  | currency}} SUC</div>
                            </li>
                             <li>
                                <span>{{$t("ms.wksc")}}</span>
                                <div>{{item.ServiceLife}}{{$t("ms.day")}}</div>
                            </li>
                             <li>
                                <span>{{$t("ms.sysl")}}</span>
                                <div>{{item.Stocks}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="center">
                        <el-button @click="buySure" :loading='loader' class="ks-btn kjbtn kjbtn-buy center audiobtn">
                            {{$t("ms.gm")}}
                        </el-button>
                    </div>
                    <!-- <div @click="buy" class="ks-btn kjbtn kjbtn-buy center">立即购买</div> -->
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
const pic = require("../assets/images/d1.png");

import apiconfig from "apiconfig";
import Big from "bignumber.js";
import util from "util";
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            totalPool: 0,
            pic:pic,
            item: {
                Name:'',
                Price:0,
                Reserves:0,
                ServiceLife:0,
                Stocks:0
            },
            loader: false,
            lists: [],
            cjtid: apiconfig.assetid
        };
    },
    computed: {
        ...mapGetters(['isMobile','pool'])
    },
    mounted() {
        this.getSku().then(res => {
            this.showSpec(res[0]);
        })
    },
    beforeRouteLeave (to, from, next) {
        this.dialogInstance && this.dialogInstance.close();
        next();
    },
    methods: {
        ...mapActions(["getAsset", "getPool"]),
        setTotalPool() {
            if(!this.pool.Machines) return;
            const totalPool = this.pool.Machines.reduce((prev, next) => {
                return prev + next.OriginReserves;
            }, 0);

            this.totalPool = util.dropDec(totalPool, 1e4);
      
        },
        showSpec(item) {
            this.lists.forEach(el => el.active = item.ID == el.ID);
            item.active = true;
            this.item = item;
        },
        resetBalance() {
            this.$store.commit("calcPool", {
                value: -this.target.Price
            });
            this.getAsset({ ctx: this, asset: this.cjtid });
            this.getPool({ ctx: this });
        },
        buySure() {
            let item = this.item;
            if(this.loader)return;
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
                text:item.Name+" "+ this.$t('ms.kj')
                },() => {
                    this.buy(item, id, target);
                }, () => {
                
                });
        },
        buy(item, id, target) {
            this.loader = true;
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
                    this.loader = false;
                });
        },
        getSku() {
            return util
            .getSku({}, {}, this)
            .then(res => {
            if (res.data.code == 0) {
                this.lists = res.data.list.map(el => {
                    return {
                        ...el,
                        active:false,
                        Price: util.dropDec(el.Price, 1e4),
                        Reserves: util.dropDec(el.Reserves, 1e4),
                        ServiceLife: Math.ceil(
                        Big(el.ServiceLife)
                            .div(24 * 60 * 60)
                            .toNumber()
                        )
                    };
                });
                return this.lists;
            }
            })
            .catch(err => {
                this.$message.info(this.errorInfo(err.response));
            })
            .finally(() => {});
        },
    },
    watch: {
        pool: {
        immediate: true, 
        handler: function(n) {
            this.setTotalPool();
        }
    }
  }
}
</script>

<style lang="scss">
 
</style>

