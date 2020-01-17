<template>
<Scroll :fetch="fetchmore" :disable="scrollDisable" trigger="true">
    <div class="yq">
        <ul>
            <li class="flex sb" v-for="(list, index) in lists" :key="index">
                <span>{{list.date}}</span>
                <span>{{list.nickname}} 为我助力：{{list.cnt}}次</span>
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
    },
    methods: {
        fetchmore() {
            if(this.total != null) {
                if(this.size*this.pager >= this.total) {
                    this.scrollDisable = true;
                    return Promise.resolve();
                }
            }
            this.pager++;
            return this.getRecord();
        },
        getRecord() {
            return util.getinvitedrecord({
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
                          nickname: el.nickname,
                          cnt: el.cnt
                      }
                  });
                  t = t || [];
                  this.lists = this.lists.concat(t);
                }
            })
            .catch(err => {
              this.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                
            });
        }
    }
}
</script>
<style lang="scss">
.yq {
    li {
        text-transform: lowercase
    }
}
</style>

