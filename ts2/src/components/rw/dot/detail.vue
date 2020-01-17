<!--  -->
<template>
<Page :title="table.bd[0]" borderLine padding routerBack="/dotrw">
<span class="tcolor f12" slot="layer-right-btn" @click="$router.push('/guide')">{{$t('m.guide')}}</span>
<div class="dot-detail">
    <div class="flex sb vc" v-if="!isMobile">
        <span class="tcolor fw f24">
            {{table.bd[0]}}
        </span>
        <router-link to="/guide" class="n-btn btn-tcolor-border">
            {{$t('m.checkguide')}}
        </router-link>
    </div>

    <div class="dh-bar block re tcolor m16">
        {{$t('m.hyy9')}}
    </div>
    <div class="dot-table f14 m16">
        <table>
            <thead>
                <tr class="">
                    <td v-for="(h, index) in table.hd" :key='index'>{{h}}</td>
                </tr>
            </thead>
            <tbody>
                <tr class="tcolor">
                    <td v-for="(h, index) in table.bd" :key='index'>{{h}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="f14 hcolor m20" v-html="$t('m.hydesc')">
        
    </div>
    <div class="center">
        <p class="tcolor f14">{{$t('m.kgmesy')}}8</p>
        <div class="n-btn f20 btn-tcolor hcenter db btn-panel-width" >19000 CJ</div>
        <p class="f14 tqc">{{$t('m.yuanprice')}}20000 CJS，{{$t('m.yiyouhui')}}5%</p>
    </div>

    
</div>
</Page>
</template>

<script>
const stars = [
    [
        '一星服务商',
        '10',
        '20000CJS',
        '5%',
        '60000',
        '5%',
        '自由',
        '525000CJS'
    ],
    [
        '二星服务商',
        '10',
        '50000CJS',
        '7%',
        '200000',
        '3%',
        '必须',
        '2100000CJS'
    ],
    [
        '三星服务商',
        '6',
        '100000CJS',
        '9%',
        '500000',
        '1%',
        '必须',
        '1050000CJS'
    ],
    [
        '四星服务商',
        '4',
        '200000CJS',
        '10%',
        '1200000',
        '0%',
        '必须',
        '满级'
    ],

]
export default {
    props: ['panelData'],
    data () {
        return {
            table: {
                hd: ['城市服务商类型','开放名额','城市服务商锁仓额度','城市服务商服务收益','服务能量值','城市服务商管理收益差额','是否落地运行','晋升至下一级服务标准'],
                bd: []
            }
        };
    },
    created() {
        this.table.bd = stars[this.panelData || this.star]
    },
    components: {},
    computed: {
        isMobile() {
            return this.$store.getters.isMobile
        },
        star() {
            return this.$route.query.star;
        }
    },
    mounted() {},
    methods: {}
}

</script>
<style lang='scss'>
.pc {
    .dot-detail {
        width: 760px;
    }
    .btn-panel-width {
        width: 250px;
    }
}
.mobile {
    .dot-table {
        overflow-x: auto;
        table {
            width: 600px;
        }
    }
}
.dot-table {
    table {
        border-collapse: collapse;
        text-align: center;
        border-radius: 4px;
        overflow: hidden;
    }
    thead {
        background: #086599;
        color:#fff;
        td {
            height: 50px;
            border-right: 1px solid #fff;
        }
        td:last-child {
            border:none
        }

    }
    tbody {
        background: #fff;
        td {
            height: 60px;
            border-right: 1px solid rgba(8, 101, 153,.1);
        }
        td:last-child {
            border:none
        }
        tr td:first-child {
            background: rgba(8, 101, 153,.15);
        }
    }
    
}
</style>