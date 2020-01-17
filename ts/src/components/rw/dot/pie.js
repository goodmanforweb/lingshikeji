let echarts = require('echarts');




let option = data => ({
    title: {
        left:'center',
        top:'middle',
        itemGap:3,
        text:`{a| ${data.text[0]} }`,
        textStyle: {
            rich: {
                a: {
                    align: 'center',
                    color:'#086599',
                    fontSize: 12
                }
            }
        },
        subtext: `{b|${data.total}}`,
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
            name: data.text[1],
            type:'pie',
            radius: ['70%', '90%'],
            // roseType : 'radius',
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
            data:data.value
        }
]
});



export default (container, data) => {
    let myChart = echarts.init(container);
    myChart.setOption(option(data));
    return myChart;
}