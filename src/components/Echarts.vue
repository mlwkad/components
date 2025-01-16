<template>
    <div ref="el" id="el" style="height: 330px;width: auto;" class="echarts"></div>
</template>
<script setup lang="ts">
let click_times = ref(0)
import { onMounted, ref } from 'vue';
//1.引入Echarts  npm install echarts
import * as echarts from 'echarts'

//2.实现响应式  npm install @vueuse/core
import { useResizeObserver } from '@vueuse/core/index.cjs';
let el = ref()
//监视该元素,尺寸变化时触发回调
useResizeObserver(el, () => {
    //重新初始化图表并调整尺寸
    let mychart = echarts.init(el.value)
    mychart.resize()
})

//3.图表
let chart = () => {
    let mychart0: any = document.getElementById('el')
    let mychart1 = echarts.init(mychart0)
    var option = {
        title: {
            //位置
            left: '10%',
            top: '1%',
            //主标题
            text: '总业绩额',
            link: 'https://www.bilibili.com/',
            target: 'self',  //当前页面跳转,blank(默认):新开页面跳转
            textStyle: {
                color: 'grey',
                fontSize: "15px",
            },
            backgroundColor: "transport",  //textStyle里用不了的写在外边
            //副标题
            subtext: '新策略',
            sublink: 'https://www.bilibili.com/',
            subtarget: 'blank',
            subtextStyle: {
                color: 'grey',
                fontSize: "12px",
            },
        },
        tooltip: {  //每一点的详细信息
            trigger: 'axis',  //同时显示同一列的详细信息
            // triggerOn:'click',  //点击显示
            // showDelay:'200',  //延时展示
            // hideDelay:'200',  //延时隐藏
            axisPointer: {
                // type:'cross|shadow',  //十字/区间的详细信息
                type: 'shadow',
                // axis:'x|y'  //切换主轴
            },
        },
        legend: {  //图例
            right: '10%',
            top: '1%',
            // orient: 'horizontal|vertical',  //水平/垂直排列
            itemGap: 40,  //间距
            textStyle: {
                fontSize: '12px'
            }
        },
        grid: {  //四边留出的空白
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            // position:'top',
            type: 'category',  //类型:按category(种类)分,data有几个,series就显示几个数据
            boundaryGap: false,  //区间定位
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today']
        },
        yAxis: [
            {
                axisLabel: {
                    formatter: '{value}个'
                },
                splitLine: {
                    show: false // 关闭背景中的横线
                }
            },
            {
                axisLabel: {
                    formatter: '{value}元'
                },
            }
        ],
        series: [
            {
                name: '人流量',
                type: 'line',
                yAxisIndex: 0,  //分出多个Y轴,防止共用一个轴时数量级差异过大,yAxis相应的有两个输入
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '销量',
                type: 'line',
                yAxisIndex: 1,
                data: [82000, 93200, 90100, 93400, 129000, 133000, click_times.value]
            }
        ]
    }
    option && mychart1.setOption(option);
}

//4.启动
onMounted(() => {
    chart()
    //记录点击量:点击某个元素时触发事件:通过接口告诉后端哪个元素被点击了并计数
    //整个文档添加点击事件
    document.addEventListener('click', () => {
        click_times.value += 99999
        chart()
    })
})
</script>
<style scoped>
.echarts {
    background-color: white;
    border-radius: 12px;
    margin-top: 25px;
}
</style>