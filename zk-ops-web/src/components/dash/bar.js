let echarts = require('echarts');



let option  = params=> ({
    tooltip: {
        show: true
    },
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
    },
    yAxis: {
        name:'换购量/万',
        nameTextStyle: {
            color: '#8E9FA9',
            padding: [0, 40 ,0, 0]
        },
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
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1020],
        type: 'bar',
        itemStyle: {
            color: 'rgba(8, 101, 153, 0.2)',
            barBorderRadius: 4
        },
        emphasis: {
            itemStyle: {
                color: '#086599'
            }
        },
        barWidth: params.barWidth || 30
    }]
});


export default (container,params) => {
    let myChart = echarts.init(container);
    myChart.setOption(option(params));
    return myChart;
}
