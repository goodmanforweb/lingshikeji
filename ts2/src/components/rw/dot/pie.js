let echarts = require('echarts');




let option = {
    title: {
        left:'center',
        top:'middle',
        itemGap:3,
        text:'{a|总可转出}',
        textStyle: {
            rich: {
                a: {
                    align: 'center',
                    color:'#086599',
                    fontSize: 14
                }
            }
        },
        subtext: '{b|18989.98}',
        subtextStyle: {
            rich: {
                b: {
                    align: 'center',
                    color:'#086599',
                    fontSize: 16,
                    fontWeight:'bolder'
                }
            }
        }
    },
    tooltip: {
        show: true
    },
    color: ['#086599','#8EB8D0'],
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false,
                    
                },
                emphasis: {
                    show: false,
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
            ]
        }
]
};



export default container => {
    let myChart = echarts.init(container);
    myChart.setOption(option);
    return myChart;
}