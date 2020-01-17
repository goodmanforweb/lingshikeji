<template>
    <div class="x-table">
        <div class="x-table-hd flex">
            <div class="x-item">NO</div>
            <div class="x-hd-scroller flex1">
                <ul class="scroller" ref="scroller" :style="`width:${xnumber.length*16}px`"><li v-for="(el, index) in xnumber" :key="index">{{el}}</li></ul>
            </div>
        </div>
        <div class="x-table-bd-wrap flex" :style="`height:${tableHeight}px`">
            <div class="x-table-left-sticky">
                <ul class="left-cont" ref="leftScroller">
                    <li v-for="(el, index) in ynumber" :key="index">{{el}}</li>
                </ul>
            </div>
            <div class="x-table-bd x-table-body-container flex1" ref="container">
                <div class="x-real-table-body" :style="`width:${16*xnum}px;height:${ynumber.length*17}px`">
                    <canvas id="grid" ref="grid"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Grid from './grid';
import util from 'util';
export default {
    data() {
        return {
            xnumber: [],
            ynumber: [],
            tableData3: Array.from({length: 70}).map((el,index) => {
                            let y1 = Math.ceil(Math.random()*69);
                            let y2 = Math.ceil(Math.random()*69);
                            let y3 = Math.ceil(Math.random()*69);
                            let y4 = Math.ceil(Math.random()*69);

                            return {
                                    no: index + 1,
                                    item: [y1,y2,y3,y4]
                                    }
                        })
        }
    },
    props: ['xnum', 'data', 'type', 'tableHeight'],
    created() {
        
    },
    mounted() {
        this.scoller = this.$refs.scroller;
        this.leftScroller = this.$refs.leftScroller;
        this.container = this.$refs.container;
        this.addScroller();
        this.createGridCanvas();
    },
    beforeDestroy() {
        this.container.removeEventListener('scroll', this.scrollListener, false);
    },
    methods: {
        setXNumber() {
            this.xnumber = Array.from({length: this.xnum}).map((el, index) => {
                return util.makeUp(index + 1)
            })
        },
        addScroller() {
            this.scrollListener = (e) => {
                this.scoller.style.marginLeft = `-${e.target.scrollLeft}px`;
                this.leftScroller.style.marginTop = `-${e.target.scrollTop}px`;
            }
            this.container.addEventListener('scroll', this.scrollListener, false);
        },
        createGridCanvas() {
            this.gridInstance = new Grid(this.$refs.grid, this.data, this.type);
        }
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler: function(n) {
                if(n.length > 0) {
                    this.ynumber = n.map(el => el.no);
                    this.gridInstance && this.$nextTick(() => {
                         this.gridInstance.rerender(n);
                    })
                }
            }
        },
        xnum: {
            immediate: true,
            handler: function() {
                this.setXNumber();
                this.gridInstance && this.gridInstance.clear();
            }
        }
    }
}
</script>

<style lang="scss">

.x-table {
    position: relative;
    overflow: hidden;
    background-color: #fff;
    .x-table-hd {
        overflow: hidden;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        z-index: 99;
        height: 17px;
        font-weight: bold;
        border-top: 1px solid #cac7bf;
        
    }
    .x-table-bd-wrap {
        margin-top: 17px;
        // height: 500px;
        overflow-y: auto;
        position: relative;
        
    }
    .x-table-bd {
        // background-color: aliceblue;
        overflow-x: auto;
    }
    .x-table-left-sticky {
        width: 60px;
        overflow: hidden;
    }
    .x-item {
        width: 60px;
        height: 100%;
    }
    .x-hd-scroller {
        overflow: hidden;
    }
    .x-real-table-body {
        
       
        background-color: #fff
    }


    .left-cont li, .x-item,.scroller li{
            text-align: center;
            line-height: 17px;
            font-family: arial;
            font-size: 12px;
            height: 17px;
            color: #7C7565;
            border-bottom: 1px solid #cac7bf;
            border-right: 1px solid #cac7bf;
            // border-left: 1px solid transparent;
            // border-top: 1px solid transparent;
            box-sizing: border-box;
        
    }
    .scroller {
        overflow: hidden;
        li {
           width: 16px;
           float: left;
        }
    }

    #grid {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>

