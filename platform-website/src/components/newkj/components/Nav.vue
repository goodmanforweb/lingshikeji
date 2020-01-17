<template>
    <div class="nav clearfix" :class="{'nav-fixed': isFixed}">
        <div class="ke-pager-btn ke-btn fl audiobtn" @click="back">
            <span class="scale left-back"></span>
        </div>
        <div class="item-show fr" @click="$router.push({name:'kjexchange'})">
            <div class="is-hd"><span class="is-plus scale"></span></div>
            <div class="is-ww">
                <div class="is-tit">
                     {{($route.name == 'kjpower' ? 'CJT' : 'SUC') + " " +$t('ms.dh')}}
                </div>
                <div class="is-bk flex">
                    <div class="is-bd fma">{{($route.name == 'kjpower' ? (asset[cjtid] ?  Math.floor(asset[cjtid].value) : 0) : Math.floor(pool.Balance)) | currency}}</div>
                    <div class="is-ft"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const routerConfig = {
  kjindex: ['kjmall','kjrecord','kjpower','kjjz'],
  kjpower: ['kjbuyrecord']
};
import util from 'util';
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            isFixed: false
        }
    },
    mounted() {
        this.isMobile && window.addEventListener("scroll", this.scrollHandler, false);
    },
    computed: {
        ...mapGetters(['isMobile','pool','cjtid','asset'])
    },
    beforeDestroy() {
        this.isMobile && window.removeEventListener("scroll", this.scrollHandler, false);
    },
    methods: {
        scrollHandler() {
            let stop = util.getScrollTop();
            this.isFixed = stop > 200;
            // Hub.$emit("navChange", this.isFixed);
        },
        back() {
            let cname = this.$route.name;
            let temp = [];
            //特殊处理 exchange页面
            if(cname == 'kjexchange') {
                window.history.length > 1 ? this.$router.back() : this.$router.push({name: 'kjindex'});
                return;
            }
            for(let i in routerConfig) {
                if(routerConfig[i].includes(cname)) {
                    this.$router.replace({name: i});
                    break;
                }
                else {
                    temp.push(false);
                }
            }
            if(temp.length == Object.keys(routerConfig).length) {
                window.history.length > 1 ? this.$router.back() : this.$router.push({name: 'kjindex'});
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.nav {
    padding: 30px 10px;
    cursor: pointer;
    .el-icon-arrow-left:before {
        font-size: 34px;
        font-weight: bolder;
    }
    .ke-btn {
        width: .66rem;
        height: .66rem;
        span {
            background: url(../assets/images/backicon.png) no-repeat center/38%;
        }
    }
}
.mobile {
    .nav {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2000;
    }
    .nav-fixed {
        position: fixed;
    }
  }
</style>
