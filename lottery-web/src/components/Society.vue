<template>
    <div class="myhub">
        <div class="hb-hd">
            <div class="hub-pic center">
                <div class="canvas-box">
                    <canvas ref="cvs"></canvas>
                </div>
                <div class="hub-stars clearfix">
                    <!-- <img src="../assets/images/hubstars.png" alt=""> -->
                    <span class="fl">
                        <img src="../assets/images/hubleft.png" alt="">
                    </span>
                    <span class="fr">
                        <img src="../assets/images/hubright.png" alt="">
                    </span>
                </div>
                <!-- <img src="../assets/images/hub.png" alt=""> -->
                <div class="hub-pic-names clearfix f20">
                    <span class="fl">{{$t('ms.joyl')}}</span>
                    <span class="fr">{{$t('ms.lup')}}</span>
                </div>
                <div class="hub-pic-info center">
                    <span>{{$t('ms.lufm')}}</span>
                    <div>10,010.00</div>
                </div>
            </div>
            <div class="btn-round fma">{{$t('ms.invite')}}</div>
            <div class="hub-desc" v-html="$t('ms.hubdes')">
                
            </div>
        </div>
        <div class="hb-bd block">
            <el-table
            class="society-table"
            :data="tableData"
            :max-height="tableHeight"
            style="width: 100%">
                <el-table-column
                    prop="friends"
                    :label="$t('ms.friends')"
                    >
                </el-table-column>
                <el-table-column
                    prop="odds"
                    :label="$t('ms.odds')"
                    >
                </el-table-column>
                <el-table-column
                    prop="level"
                    :label="$t('ms.level')">
                </el-table-column>
                <el-table-column
                    prop="bonus"
                    :label="$t('ms.mybonus')">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Air from './air';
import mixin from './mixins/scroller';
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            tableData: Array.from({length: 100}).map(el => {
                return {
                    friends:'yoyo',
                    odds: '100.00',
                    level:'5%',
                    bonus:'5.00'
                }
            }),
            tableHeight: 'auto'
        }
    },
    created() {
        this.tableHeight = this.isMobile ? 'auto' : '500';
    },
    computed: {
        ...mapGetters(['isMobile'])
    },
    mixins: [mixin],
    mounted() {
        this.air = new Air(this.$refs.cvs);
        this.air.render();
        // 移动端 pc  统一下拉刷新处理
        this.addScrollListener(this.isMobile ? '.wrap' : '.society-table .el-table__body-wrapper', this.fetchMore);

    },
    beforeDestroy() {
        this.air && this.air.destroy();
    },
    methods: {
        fetchMore() {
            // 翻页计数器
            console.log('er');
            
        }
    }
}
</script>

<style lang="scss">
.myhub {
    max-width: 757px;
    margin: 0 auto;
    .hub-pic {
        position: relative;
        img {
            width: 100%
        }
        .hub-pic-names {
            span {
                display: inline-block;
            }
            span.fl {
                transform: translateX(-70%)
            }
            span.fr {
                transform: translateX(70%)
            }
        }
        .hub-pic-info {
            position: absolute;
            left:0;
            right:0;
            top:45%;
            span {
                color:#737373
            }
            div {
                font-size: .5rem;
            }
        }
    }
    .hb-hd {
        .btn-round {
            width: 188px;
            line-height: 40px;
            height: 40px;
            font-size: 0.3rem;
            font-weight: bold;
            text-align: center;
            margin: 0 auto;
        }
    }
    .hub-desc {
        font-family: 'pingfang';
        width: 80%;
        margin: 16px auto;
    }
    .hb-bd {
        overflow: hidden;
        .el-table thead tr, .el-table thead th{
            background-color: var(--textcolor);
            .cell {
                color: #B8B1A0
            }
        }
    }
}
.hub-pic {
    .airline {
        width: 100%
    }
    .hub-stars {
        img {
            width: 100%
        }
    }
}
.canvas-box {
    height: 200px;
    canvas {
        width: 100%;
        height: 100%;
    }
}

#air {
    animation: angle 4s 0s linear infinite;
}
// #air:hover {
//   -webkit-animation-play-state: paused;
//   animation-play-state: paused;
// }

.hub-stars {
    span img {
        width: 100%
    }
    span:first-child {
        width: 40px;
        margin-left: -20px
    }
    span:last-child {
        width: 50px;
        margin-right: -25px;
    }
}
@keyframes angle {
    0% {
        transform: rotate(0)
    }
    10% {
        transform: rotate(10deg)
    }
    20% {
        transform: rotate(20deg)
    }
    30% {
        transform: rotate(30deg)
    }
    40% {
        transform: rotate(40deg)
    }
    50% {
        transform: rotate(50deg)
    }
    60% {
        transform: rotate(60deg)
    }
    70% {
        transform: rotate(70deg)
    }
    80% {
        transform: rotate(80deg)
    }
    90% {
        transform: rotate(88deg)
    }
    100% {
        transform: rotate(100deg)
    }
}
</style>


