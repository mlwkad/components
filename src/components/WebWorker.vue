<template>
    <div class="main">
        请输入x的值:<input v-model="shuru" class="input">
        <button @click="calc">开始计算1到x的累加和:{{ result }}</button>
    </div>
</template>
<script setup lang="js">
//1.分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
//2.Worker 线程无法读取本地文件（file://），会拒绝使用 file 协议来创建 Worker实例，它所加载的脚本，必须来自网络(URL网址形式)。
//2.public目录下的文件可以直接 http://localhost:8080/xxx.xx 来访问
//3.无法读取主线程所在网页的 DOM 对象,无法使用document、window、parent这些对象
import { ref } from 'vue';
let shuru = ref(0)
let result = ref(0)
// //创建webworker,为该线程引入指定脚本
let web = new Worker('http://localhost:5173/calc.js')
function calc() {
    web.postMessage(shuru.value)
}
web.onmessage = (e) => {
    result.value = e.data
}
</script>
<style scoped>
.main {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-top: 25px;
    background-color: white;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 1px 1px 5px grey;
}

.input {
    width: 25px;
}
</style>