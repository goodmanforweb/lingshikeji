<template>
    <Page :title="$t('m.report')" borderLine padding >
        <div class="report-list flex1">
             <Scroll :fetch='fetch' trigger>
                <div  class="block flex sb vc" @click="toDetail(list)" v-for="(list, index) in lists" :key="index">
                    <div class="re-title tcolor">
                        {{list.title}}
                    </div>
                    <span class="re-date tqc f12">
                        {{list.date}}
                    </span>
                </div>
            </Scroll>
        </div>
    </Page>
</template>
<script>
import util from "../../util";
export default {
    data() {
        return {
            lists: [
                {
                    title: '系统升级公告系统升级公告系统升级公告系统升级公告系统升级公告',
                    date: '2018.1.1 11:11:12'
                },
                {
                    title: '系统升级公告',
                    date: '2018.1.1 11:11:12'
                },
                {
                    title: '系统升级公告',
                    date: '2018.1.1 11:11:12'
                },
                {
                    title: '系统升级公告',
                    date: '2018.1.1 11:11:12'
                }
            ]
        }
    },
    methods: {
        toDetail(list) {
            this.$router.push('/detail')
        },
        fetch() {
            return new Promise();
        }
            
    }
}
</script>
<style lang="scss">
.report-list {
    .block {
        margin-bottom: 16px;
    }
    .re-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .re-date {
        min-width: 100px;
        margin-left: 10px;
    }
}
</style>



