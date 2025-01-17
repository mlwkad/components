<template>
    <input ref="a" class="input">
    <div class="time">时间戳: {{ timestamp }}</div>
    <div class="time" style="font-size: 13px;">实际时间:{{ actuallyDate }}</div>
</template>
<script setup lang="js">
//思路:存储数据的同时设置过期时间并一起存储,下次访问数据时检查是否过期,过期就删除
import { onMounted, ref } from 'vue';
let a = ref()
onMounted(() => {
    a.value.oninput = (e) => {
        saveData('username', e.target.value,)
    }
    a.value.value = getData('username')
})

//存储数据的函数
function saveData(key, value, overTime = 1) {
    const now = new Date().getTime();  //获取时间戳
    const lastTime = now + overTime * 60 * 1000;  // 设置过期时间(默认1分钟), *1000=1s *60=1min
    const data = {
        value: value,
        lasttime0: lastTime
    }
    //value值是一个对象时,要转化成JSON字符串
    localStorage.setItem(key, JSON.stringify(data));
}

//获取数据的函数
function getData(key) {
    const savedData = localStorage.getItem(key);
    //没有找到数据
    if (!savedData) {
        return '信息过期,请重新输入'
    }

    const now = new Date().getTime();
    const Data = JSON.parse(savedData)
    // 检查当前时间与过期时间
    if (now > Data.lasttime0) {
        // 如果过期，删除该键并结束
        localStorage.removeItem(key);
        return '信息过期,请重新输入'
    }

    return Data.value; // 返回有效数据
}

const now = new Date();             // 创建当前的日期对象
const timestamp = now.getTime();     // 获取当前的时间戳（毫秒）

// 转换为可读的日期
const readableDate = new Date(timestamp);
const actuallyDate = readableDate.toString()

</script>
<style scoped>
.input {
    margin-top: 25px;
    border-radius: 12px;
    border: none;
    padding: 10px;
    font-size: 15px;
}
.time{
    background-color: white;
    border-radius: 12px;
    font-size:15px;
    padding: 10px;
    margin:10px 0 10px 0;
    color:grey;
}
</style>