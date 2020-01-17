<template>
    <div class="record re">
        <span class="re-close" @click="$emit('update:show', false)">{{$t('m.finish')}}</span>
        <div class="re-wrap" style='paddingTop: 40px'>
            <div class="flex sb vc tcolor p20">
                <div class="fw">{{$t('m.cjoyjyjl')}}</div>
                <div class="re-btns flex">
                    <div @click="tabHandle(index,btn)" v-for="(btn, index) in btns" :key="index" :class="{active: btn.active}">{{$t(`m.${btn.text}`)}}</div>
                </div>
            </div>

            <div class="re-table">
                <div class="re-table-hd f12 gcolor flex">
                    <span style="minWidth: 80px"></span>
                    <span class="flex1 center" v-for="(head, index) in header" :key="index">{{head}}</span>
                </div>
                <div class="re-table-bd tcolor f12">
                    <div class="re-table-hd-row flex block" v-for="(list, index) in lists" :key="index">
                        <span style="minWidth: 80px"  class="center">
                            <i :class="`re-icon re-${list.stat}`"></i>
                        </span>
                        <span class="flex1 center" v-for="(item, idx) in ['time','address','txid','amount']" :key="idx">{{list[item]}}</span>
                        <span class="flex1 center fw">{{list.state}}</span>
                    </div>
                </div>
            </div>

            <div class="kj-pager flex sb m20">
                <span class="kj-la"></span>
                <span class="kj-ra"></span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            btns: [
                {
                    name:'deposit',
                    text:'cz',
                    active:true
                },
                {
                    name:'withdraw',
                    text:'tx',
                    active: false
                },
                {
                    name:'audit',
                    text:'audit',
                    active: false
                },

            ],
            header: [
                '交易时间',
                '地址',
                'TXID',
                '数量',
                '状态'
            ],
            lists: [
                {
                    time: '2016.11.11 12:12:12',
                    address: '0xb3d3...cac9f7',
                    txid: '0xdf50...6d1968',
                    amount: '10,000',
                    state: '成功',
                    stat:'suc'
                },
                {
                    time: '2016.11.11 12:12:12',
                    address: '0xb3d3...cac9f7',
                    txid: '0xdf50...6d1968',
                    amount: '10,000',
                    state: '失败',
                    stat:'fail'
                },
                {
                    time: '2016.11.11 12:12:12',
                    address: '0xb3d3...cac9f7',
                    txid: '0xdf50...6d1968',
                    amount: '10,000',
                    state: '确认中',
                    stat:'check'
                },
                {
                    time: '2016.11.11 12:12:12',
                    address: '0xb3d3...cac9f7',
                    txid: '0xdf50...6d1968',
                    amount: '10,000',
                    state: '审核中',
                    stat:'audit'
                },
            ]
        }
    },
    methods: {
        tabHandle(idx, btn) {
            this.btns.forEach((el, index) => {
                el.active = idx == index
            })
        }
    }
}
</script>

<style lang="scss">
.recordPanel .rp-aside {
    left: 0;
}
.record {
    position: relative;
}

.re-hd {
    text-align: right;
    margin: 10px 0;
}
// .re-close {
//     color:#A0B8C4;
//     background: #fff;
//     border-radius: 4px;
//     padding: 2px 10px;
//     cursor: pointer;
// }
.re-table-hd {
    padding: 0 16px;
}
.re-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
}
.re-suc {
    background: url(../../assets/images/suc.png) no-repeat center/contain;
}
.re-fail {
    background: url(../../assets/images/fail.png) no-repeat center/contain;
}
.re-audit {
    background: url(../../assets/images/audit.png) no-repeat center/contain;
}
.re-check {
    background: url(../../assets/images/check.png) no-repeat center/contain;
}
.re-table-hd-row {
    border-radius: 4px;
    margin: 10px 0;
    cursor: pointer;
}
.pc {
    .re-wrap {
        width: 860px;
        margin: 0 auto;
        .kj-pager {
            width: 160px;
        }
    }
    .re-btns {
        >div {
            border: 1px solid #086599;
            text-align: center;
            color:#086599;
            border-radius: 4px;
            transition: all .3s linear;
            padding: 2px 10px;
            margin: 0 10px;
            cursor: pointer;
        }
        div.active {
            color:#fff;
            background: #086599;
        }
    }
}

</style>

