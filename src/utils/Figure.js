import echarts from './china';
const option_china = (data) => {return {
    title: {
        text: '相关文书（Top 1000）地域分布',
        x: 'center'
    },
    tooltip: {//提示框组件。
        trigger: 'item'//数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
    },
    visualMap: {//颜色的设置  dataRange
        x: 'left',
        y: 'bottom',
        splitList: [
            { start: 100, end: 1000, color: '#FF7F50' },
            { start: 50, end: 100, color: 'rgb(141,220,229)' },
            { start: 20, end: 50, color: 'rgb(136,233,204)'},
            { start: 0, end: 20, color: '#84fab0' },
        ],
    },
    series: [
        {
            name: '文书数目',
            type: 'map',
            mapType: 'china',
            roam: false,//是否开启鼠标缩放和平移漫游
            itemStyle: {
                normal: {//是图形在默认状态下的样式
                    label: {
                        show: false,//是否显示标签
                        textStyle: {
                            color: "rgb(249, 249, 249)"
                        }
                    }
                },
                emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                    label: { show: false }
                },
                click: {
                    label: {show: false}
                }
            },
            top: "10%",
            data: data
        }
    ]
}};

const option_type = data => { return {
    title: {
        text: '案件类型分布',
        x: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center',
        show: false
    },
    series: [
        {
            name: '案件类型',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: data
        }
    ]
};}

const option_program = data => { return {
    title: {
        text: '审判程序分布',
        x: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center',
        show: false
    },
    series: [
        {
            name: '审判程序',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: data
        }
    ]
};}

const option_court = data => { return {
    title: {
        text: '法院层级分布',
        x: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center',
        show: false
    },
    series: [
        {
            name: '法院层级',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: data
        }
    ]
};}

const myChart = (data) => {
    console.debug(data);
    const chinaMap = echarts.init(document.getElementById('china-map'));
    const typeMap = echarts.init(document.getElementById('ctype-map'));
    const programMap = echarts.init(document.getElementById('program-map'));
    const courtMap = echarts.init(document.getElementById('court-map'));

    const mapData = [];
    for(const [key, value] of Object.entries(data.place)) { mapData.push({name: key, value}); }
    chinaMap.setOption(option_china(mapData));

    const typeData = [];
    for(const [key, value] of Object.entries(data.ctype)) { typeData.push({name: key, value}); }
    typeMap.setOption(option_type(typeData));

    const programData = [];
    for(const [key, value] of Object.entries(data.program)) { programData.push({name: key, value}); }
    programMap.setOption(option_program(programData));

    const courtData = [];
    for(const [key, value] of Object.entries(data.court)) { courtData.push({name: key, value}); }
    courtMap.setOption(option_court(courtData));

}
export {myChart};