<template>
    <div class="block  trend-block trend-chart">
        <div>
            <div class="tcolor fw">{{$t('m.pricetrend')}}</div>
            <span class="f12 gcolor">{{$t('m.7daypd')}}</span>
        </div>
        <div class="trend" ref="echart" >
            <NoRecord style="minWidth:100%;" iconwidth="60" :hasicon="true" :text="$t('m.zshimeiyoujl')" class="flex hc vc v" v-if="chartNoData"/>
        </div>
        <slot />
    </div>
</template>
<script>
let echarts = require('echarts');
let option = data => ({
                grid: {
                    bottom: 30
                },
                backgroundColor: '#fff',
                xAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#8E9FA9'
                    },
                    type: 'category',
                    data: data.date
                    // data: ['11.11', '11.12', '11.13', '11.14', '11.15', '11.16', '11.16']
                },
                yAxis: {
                    type: 'value',
                    show: false
                },
                tooltip: {
                        formatter: function (params) {
                            return params.value + 'CJS' + '<br>' + params.name
                        }
                },
                color: ['#64A9D5'],
                series: [{
                    // data: [820, 932, 901, 934, 1290, 1330, 1320],
                    data: data.value,
                    type: 'line',
                    smooth: true,
                    showSymbol: true,
                    areaStyle: {
                        color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#64A9D5' // 0% 处的颜色
                                }, {
                                    offset: 0.8, color: '#fff' // 100% 处的颜色
                                },{
                                    offset: 1, color: '#fff' // 100% 处的颜色
                                }
                                ],
                                global: false // 缺省为 false
                            }
                    }
                    
                }]
            });
export default {
    data() {
        return {
            cjschartdata : [],
            chartNoData: false
        }
    },
    mounted() {
       this.getCJSPriceRecord().then(res => {
           if(res) {
               this.chartNoData = false;
               this.showCharts(res)
           }
           else {
               this.chartNoData = true;
           }
       })
    },
    methods: {
        showCharts(data) {
            !util.isEmpty(data) && setTimeout(() => {
                let myChart = echarts.init(this.$refs.echart);
                myChart.setOption(option(data));
            }, 600)
        },
        getCJSPriceRecord() {
            return request.getCJSPriceRecord({
                params: {
                    start:util.getDay(-7),
                    end: util.getDay(0)
                }
            })
            .then(res => {
                let filters = this.$root.$options.filters;
                let t = {
                    date: [],
                    value: []
                };
                if(util.isEmpty(res.data)) return false;
                res.data.list.forEach( el => {
                    t.date.push(filters.format(el.created_time, 'MM-DD')),
                    t.value.push(util.fix(el.price, 4))
                });
                return this.cjschartdata = t;

            })
                
        }
    }
}
</script>
<style lang="scss">
.trend {
    overflow: hidden;
    height: 250px;
    width: 100%;
}
</style>

