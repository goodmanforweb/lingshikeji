<template>
    <Page :title="$t('m.hubcenter')" borderLine padding routerBack='/kj'>
         <div class="hub hub2" >
             <div v-if="!isMobile">
                  <div class="tcolor fw">
                    {{$t('m.hubcenter')}}
                </div>
                <span class="gcolor f12"> Funnyup</span>
             </div>

            <div :class="`${isMobile ? 'block' : 'hub-chart flex'}`">
                <div v-if="isMobile" class="flex sb fw borderLine">
                    <span class="tcolor f14"> Funnyup</span>
                    <span class="f12 gcolor"> {{$t('m.hunnum')}}<i class="tcolor f18">3</i></span>
                </div>

                <div class="flex water-block2" :class="{block: !isMobile}" >
                    <div class="canvas-wrap">
                        <canvas ref="circle" ></canvas>
                    </div>
                    <div class="flex v sb">
                    <div class="hubwater">
                            <div>{{$t('m.hubwater')}}</div>
                            <span>10000000</span>
                    </div>

                        <div class="manwater">
                            <div>{{$t('m.manwater')}}</div>
                            <span>10000000</span>
                        </div>
                    </div>
                </div>
                <div v-if="!isMobile" class="block flex1" style="marginLeft: 8px;width: 160px">
                    <div class="canvas-wrap">
                        <canvas ref="water" ></canvas>
                    </div>
                </div>
            </div>

            <div class="hub-table m20">
                <div class="red-hd">
                    <span class="f18 tcolor fw">
                        YOYO
                    </span>
                </div>
                <el-table
                    :data="tableData"
                    max-height="500"
                    style="width: 100%">
                    <el-table-column
                    prop="user"
                    :label="$t('m.man')"
                    >
                    <span class="user_name" slot-scope="scope" :title="scope.row.ruser">{{scope.row.user}}</span>
                    </el-table-column>
                    <el-table-column
                    prop="water"
                    :label="$t('m.water')"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="level"
                    :label="$t('m.level')">
                    </el-table-column>
                    <el-table-column
                    prop="bonus"
                    :label="$t('m.bonus')">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </Page>
</template>
<script>
import Water from './dot.js';
import Circle from './circle.js';
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            tableData: []
        }
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    mounted() {
        this.showCircle();
        this.showDot();
    },
    methods: {
        showCircle() {
            let rate = .3;
            if (!this.circleChartInstance) {
                this.circleChartInstance = new Circle(
                this.$refs.circle,
                isNaN(rate) ? Math.PI : 2 * Math.PI * rate,
                3434.67
                );
            } else {
                this.circleChartInstance.rerender(
                isNaN(rate) ? Math.PI : 2 * Math.PI * rate,
                3434.67
                );
            }
        },
        showDot() {
            let level = 32;
            if (!this.waterball) {
                this.waterball = new Water(
                this.$refs.water,
                isNaN(level) ?  0 : level,
                );
            } else {
                this.waterball.rerender(isNaN(level) ?  0 : level,);
            }

        }
    }
}
</script>
<style lang="scss">
.pc {
    .hub2 {
        width: 470px
    }
    .water-block2 {
        margin-right: 8px;
        width: 240px;
    }
}
.mobile {

}
.hub {
    .el-table th, .el-table tr, .el-table, .el-table__expanded-cell {
        background-color: transparent;
    }
    .el-table td, .el-table th.is-leaf {
        border-bottom: none
    }
    .el-table::before {
        height: 0;
    }
    .red-hd {
        padding-bottom: 4px;
        border-bottom: 1px solid rgba(0, 89, 130, 0.137)
    }
    .block .borderLine {
        padding-bottom: 12px;
        margin-bottom: 12px;
    }
}
.hub-chart {
    margin-top: 30px
}
.canvas-wrap {
    width: 130px;
    height: 130px;
    margin: 0 auto;
    canvas {
        width: 100%;
        height: 100%;
        
    }
}
.hubwater {
    color:#086599;
}
.manwater {
    color: rgba(8, 101,153, 0.4);
}
.hub-table {
    thead {
        .cell {
            font-size: 12px;
        }
    }
    tbody {
        .cell {
            font-size: 14px;
            color: #086599
        }
    }
}
</style>

