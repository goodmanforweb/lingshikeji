<template>
    <Page :title="$t('m.report')" borderLine padding routerBack="/index">
        <div class="report-list flex1">
             <Scroll :fetch='fetch' trigger>
                <div  class="block flex sb vc" @click="toDetail(list)" v-for="(list, index) in lists" :key="index">
                    <div class="re-title tcolor">
                        {{list.title}}
                    </div>
                    <span class="re-date tqc f12">
                        {{list.createtime | format}}
                    </span>
                </div>
            </Scroll>
        </div>
    </Page>
</template>
<script>
export default {
    data() {
        return {
            lists: []
        }
    },
    created() {
        this.pager = 0;
        this.count = null;
        this.size = 30;
    },
    methods: {
        toDetail(list) {
            return this.$router.push({name:'detail',query: {id: list.id}})
        },
        fetch() {
            if(this.reportFetchLoader) return Promise.resolve();
            if(this.count) {
                if(this.pager*this.size >= this.count) {
                    return Promise.resolve();
                }
            }
            this.pager++;
            return this.getReports();
        },
        getReports() {
            this.reportFetchLoader = true;
            return request.getReportLists(
                {
                    params: {
                        pagesize: this.size,
                        offset: (this.pager - 1)*this.size,
                        key: this.$i18n.locale,
                        order: 'create_time',
                        desc: true
                    }
                }
                )
            .then(res => {
                if (res.status == 200) {
                    if(Array.isArray(res.data.list)) {
                        this.lists = this.lists.concat(res.data.list);
                    }
                    this.count = res.data.total;
                    } else {
                    this.$message.info(res.data.msg);
                }
            })
            .finally(() => {
                this.reportFetchLoader = false;
            });
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



