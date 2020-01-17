let echarts = require('echarts');




let option = {
    legend: {
        show: true,
        
        data: [
        {
            name:'收益',
            icon: 'rect',
            textStyle: {
                color: '#8E9FA9',
                fontSize: 12
            }
        },
        {
            name: '转出',
            icon: 'rect',
            textStyle: {
                color: '#8E9FA9',
                fontSize: 12
            }
        }
    ],
        right: 20
    },
    tooltip: {
        show: true
    },
    grid: {
        right: 20,
        left: 40
    },
    color: ['#64A9D5','#7279ED'],
    xAxis: {
        type: 'category',
        data: ['11-1', '11-2', '11-3', '11-4', '11-5', '11-6', '11-7'],
        axisLabel: {
            color: '#8E9FA9'
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        boundaryGap: false
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#8E9FA9'
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    series: [
        {   
            name:'收益',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            lineStyle: {
                // color: '#64A9D5',
                width: 1
            },
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            // showSymbol: false,
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
        },
        {
            name:'转出',
            data: [820, 932, 901, 334, 490, 30, 100],
            type: 'line',
            lineStyle: {
                // color: '#7279ED',
                width: 1
            },
            symbol: 'circle',
            symbolSize: 6,
            smooth: true,
            // showSymbol: false,
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
        },
]
};



export default container => {
    let myChart = echarts.init(container);
    myChart.setOption(option);
    return myChart;
}