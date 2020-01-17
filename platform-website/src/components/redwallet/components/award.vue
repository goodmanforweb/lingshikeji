<template>
    <div class="award">
        <ul>
            <li class="flex sb" v-for="(list, index) in lists" :key="index" :class="{myself: list.isme, dajiang:!list.isme && (list.isdajiang || list.isxingyun)}">
                <span>
                    <i  class="h-a-icon"></i>
                    {{list.nickname}}
                </span>
                <span> <i v-if="list.isdajiang || list.both" >(大奖)</i> <i v-if="list.isxingyun || list.both">(幸运数字)</i> {{list.value | currency}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import util from '../util/util';
import Big from 'bignumber.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            arr:30,
            scrollDisable: false,
            lists: []
        }
    },
    beforeRouteEnter (to, from, next) {
        from.path.indexOf('reward') > -1 && sessionStorage.setItem('awardbefore', from.path);
        next();
    },
    computed: {
        ...mapGetters(['loginInfo'])
    },
    created() {

        // this.getissuedetail(this);
        // this.pager = 0;
        // this.total = null;
        // this.size = 12;
        // this.fetchmore();
        this.getissuedetail().then(issue => {
            this.getRecord(issue);
        })
    },
    methods: {
        
        getRecord(issue) {
            console.log(issue);
            return util.getawardrecord({
                params: {
                    issue_id: this.$route.params.id,
                    // size: this.size,
                    // offset: (this.pager - 1)*this.size
                }
            }, this)
            .then(res => {
                if(res.data.code == 0) {
                //   this.total = res.data.total;
                    this.scrollDisable = true;
                    let prearr = [], postarr = [];
                    this.lists = res.data.list.forEach((el ,index)=> {
                        (el.user_id == this.loginInfo.user.id ? prearr : postarr).push({
                            nickname: el.nickname,
                            isme: el.user_id == this.loginInfo.user.id,
                            value: Big(el.value).div(1e2).toNumber(),
                            isdajiang: el.no == issue.no && el.no != issue.luck,
                            isxingyun: el.no != issue.no && el.no == issue.luck,
                            both:  el.no == issue.no && el.no == issue.luck,
                            index:index+1
                        });
                    });
                    this.lists = prearr.concat(postarr);

                }
            })
        },
        getissuedetail() {
            this.urlparams = {id: this.$route.params.id};
            return util.getissuedetail({}, this)
            .then(res => {
                if(res.data.code == 0) {
                    delete this.urlparams;
                    return {
                        luck: res.data.record.L,
                        no: res.data.record.person_num
                    }
                }
            })
        },
    }
}
</script>
<style lang="scss">

.award {
    li {
        border-bottom: 1px solid rgba(216, 216, 216, 0.486);
        line-height: 2.5
    }
    li.myself {
        color: #A10D0D;
        .h-a-icon {
            background: url(../assets/images/icon.png) no-repeat 0 -270px/100%;
        }
    }
    li.dajiang {
        color: #AF8E15;
        .h-a-icon {
            background: url(../assets/images/icon.png) no-repeat 0 -293px/100%;
        }
    }
    .h-a-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
}
.gl,.award,.detail {
    padding: 0 16px;
    background-color: #F2F2F2;
    overflow: hidden;
}
</style>
