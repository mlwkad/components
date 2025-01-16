<template>
    <div ref="b" class="filestyle" style="position: relative;">
        <input type="file" ref="a" style="display:none;position: absolute;top: 0px;" />
        <div style="font-size: 13px;">{{ name }}</div>
    </div>
</template>
<script setup lang="ts">
import SparkMD5 from 'spark-md5'
import { onMounted, ref } from 'vue'
let a = ref()
let b = ref()
//1.获取文件
onMounted(() => {
    a.value.onchange = async () => {
        let file = a.value.files[0]
        //2.文件分片
        let chuncks = fileChunck(file, 2 * 1024)  //1024字节=1kb,1024kb=1Mb
        //3.创建hash
        let hashresult = await hash(chuncks)
        //4.上传分片
        chuncksupload(chuncks, hashresult)
    }
})
//2.文件分片
function fileChunck(file: any, chuncksize: number) {
    let result = []
    //每次都从一个新片段开始
    for (let i = 0; i <= file.size; i += chuncksize) {
        //获取片段,加入result
        let chunck = file.slice(i, i + chuncksize)
        result.push(chunck)
    }
    //返回所有片段的集合
    return result
}
//3.创建hash(文件区分)(为每一片段生成一个独一无二的字符串)
//npm install spark-md5
function hash(chuncks: any) {
    return new Promise((resolve) => {
        let spark = new SparkMD5()
        function read(i: any) {
            //读取完最后一个片段
            if (i >= chuncks.length) {
                resolve(spark.end())  //整合所有片段的哈希值，并计算出整个文件的哈希值
                return
            }
            let Blob = chuncks[i]  //获取第i个片段
            //FileReader:读取文件并做一些操作
            let reader = new FileReader()
            reader.readAsArrayBuffer(Blob)  //读取文件内容到一个 ArrayBuffer(一种数据类型) 中。
            reader.onload = (event: any) => {  //load:文件读取成功完成时触发
                //event.target:锁定到真正触发事件的那个元素(reader.readAsArrayBuffer(Blob)这条指令)
                let bytes = event.target.result
                spark.append(bytes)  //spark.append:计算片段的哈希值
                read(i + 1)
            }
        }
        read(0)
    })
}
//4.上传分片
function chuncksupload(chuncks: any, hashresult: any) {
    chuncks.forEach((chunck: any, index: any) => {
        //FormData:构造键值对
        let data = new FormData()
        data.append('chunck', chunck)
        data.append('chunckname', `${hashresult}-${index}`)
        //将data发送给后端接口
    })
}
//无限制触发
let name = ref('选择文件')
onMounted(() => {
    b.value.onclick = () => {
        a.value.click()
    }
    a.value.onchange = () => {
        name.value = a.value.files[0].name
    }
})
//断点续传思路:为每个片段生成相应hash值,上传成功就在本地(随便哪里)保存其hash值,后续上传中断重新上传时通过对比每一段的hash值来判断是否上传
</script>
<style scoped>
.filestyle {
    width: fit-content;
    box-shadow: 1px 1px 5px rgb(81, 69, 69);
    border-radius: 12px;
    padding: 5px 5px 5px 5px;
    background-color: white;
}

.filestyle:hover {
    background: #ddd;
}

.file[data-v-f499eef6] {
    border: transparent;
}
</style>
