<template>
<Scroll :fetch="fetchmore" :disable="scrollDisable" trigger="true">
    <div class="yd">

        <ul>
            <li class="flex sb" v-for="(list, index) in lists" :key="index" @click="showDetail(list)">
                <div>
                    <span>{{list.date}}</span>
                    <span>{{list.issue}}</span>
                    &nbsp; &nbsp;
                     <span> 红包编号{{list.no}}</span>
                </div>
                <div>{{list.amount}}</div>
            </li>
        </ul>
        <transition name="fade">
            <div class="nodata center" v-if="lists.length == 0">暂时没有记录</div>
        </transition>
    </div>
</Scroll>
</template>
<script>
import Scroll from '../widget/scroll';
import util from '../../util/util';
import Big from 'bignumber.js';
import {mapGetters, mapActions} from 'vuex';
export default {
    data() {
        return {
            scrollDisable: false,
            lists:[]
        }
    },
    components: {
       Scroll 
    },
    created() {
        this.pager = 0;
        this.total = null;
        this.size = 12;
        // this.fetchmore();
    },
    computed: {
        ...mapGetters(['latestrecord'])
    },
    methods: {
        showDetail(list) {
            this.$router.push({
                name: 'reward',
                params: {
                    list,
                    id: list.id
                }
            })
        },
        fetchmore(update) {
            if(this.total != null) {
                if(this.size*this.pager >= this.total) {
                    this.scrollDisable = true;
                    return Promise.resolve();
                }
            }
            this.pager++;
            return this.getRecord(update);
        },
        getRecord(update) {
            return util.getyjrecord({
                params: {
                    size: this.size,
                    offset: (this.pager - 1)*this.size
                }
            }, this)
            .then(res => {
                if(res.data.code == 0) {
                  this.total = res.data.total;
                  const filter = this.$root.$options.filters;
                  let t = Array.isArray(res.data.list) && res.data.list.map(el => {
                      return {
                          date: filter.format(el.createtime, 'MM月DD日'),
                          ...el,
                          amount: el.status == 'WAITTING' ? '等待开奖' : ("+"+filter.currency(Big(el.value || 0).div(100).toNumber()))
                      }
                  });
                  t = t || [];
                  if(update) {
                      this.lists = [];
                  }
                  this.lists = this.lists.concat(t);
                }
            })
            .catch(err => {
              this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                
            });
        }
    },
    watch: {
        latestrecord: {
            deep: true,
            handler: function(n,o) {
                if(n.id && n.id != o.id) {
                    this.pager = 0;
                    this.total = null;
                    this.size = 12;
                    this.fetchmore(true);
                }
            }
        },
    }
}
</script>

<style lang="scss">
.yd {
    li {
        div:last-child {
            color:#A10D0D
        }
    }
}
</style>

