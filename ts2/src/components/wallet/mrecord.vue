<template>
    <Page :title="$t('m.cjoyjyjl')" borderLine padding routerBack="/wallet">
         <div class="record re">
            <div class="re-wrap block" >

               <div class="re-btns flex ">
                    <div class="flex1 tcolor" @click="tabHandle(index,btn)"   v-for="(btn, index) in btns" :key="index" :class="{active: btn.active}">{{btn.text}}</div>
                </div>

                <div class="re-table">
                    <el-table
                    :data="lists"
                    max-height="500">
                    <el-table-column
                    prop="stat"
                    width="30px"
                    >
                    <span slot-scope="scope" class="center">
                        <i :class="`re-icon re-${scope.row.stat}`"></i>
                    </span>
                    </el-table-column>
                    <el-table-column
                    prop="time"
                    :label="$('m.jytime')"
                    min-width="100px"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    :label="$('m.dizhi')"
                    min-width="140px"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="txid"
                    label="TXID"
                    min-width="140px"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="amount"
                    :label="$('m.amount')">
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    :label="$('m.state')">
                    </el-table-column>
                </el-table>
                </div>
            </div>
            <div class="kj-pager flex sb" style="width: 120px;margin: 20px auto;">
                <span class="kj-la"></span>
                <span class="kj-ra"></span>
            </div>
        </div>
    </Page>
</template>
<script>
export default {
    data() {
        return {
            btns: [
                {
                    name:'deposit',
                    text:'充值',
                    active:true
                },
                {
                    name:'withdraw',
                    text:'提现',
                    active: false
                },
                {
                    name:'audit',
                    text:'审核中',
                    active: false
                },

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


.re-hd {
    text-align: right;
    margin: 10px 0;
}
.re-table {
    padding: 16px;
}
.re-table-hd {
    padding: 0 16px;
}
.re-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
}

.mobile {
    .re-wrap {
        overflow-x: auto;
        padding: 0;
    }
    .re-btns {
        >div {
            line-height: 50px;
            text-align: center;
            transition: all .3s linear;
            padding: 2px 10px;
            opacity: .3;
        }
        div.active {
            opacity: 1;
            font-weight: bold;
            background: #F2F7FA;
        }
    }
}
</style>

