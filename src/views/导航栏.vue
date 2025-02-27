<template>
    <div class="display topback">
        <div class="img">
            <el-avatar src="https://tse1-mm.cn.bing.net/th/id/OIP-C.dqPyOiwPKuzGfWuEdYcz1wAAAA?rs=1&pid=ImgDetMain" />
        </div>
        <div class="display back">
            <div v-for="item in list" class="two" style="position: relative;">
                <!--@mouseenter="choose = item" @mouseleave="choose = ''"-->
                {{ item.name }}
                <el-icon class="icon">
                    <ArrowDownBold />
                </el-icon>
                <div style="position: absolute;" class="more"><!-- v-show="item == choose ? true : false"-->
                    <div v-for="items in item.content" style="margin: 6px 0;" class="detail" @click="change(items)">{{
                        items }}</div>
                </div>
            </div>
        </div>
        <a href="https://ak.hypergryph.com/#index" target="_blank"
            style='transform: translate(-12px,0);white-space: nowrap ;text-decoration: none;color: black;'>官网</a>
    </div>
    <div class="toTop" @click="toTop">
        <el-icon>
            <Top />
        </el-icon>
    </div>
    <div class="public-position" ref="C">
        <div class="dis">
            <div v-for="item in img" class="cardbox cardbackground dis1">
                <!-- <el-icon class="cardcontent">
                    <Basketball />
                </el-icon> -->
                <img :src=item class="personimg" v-lazyimg>
            </div>
        </div>
    </div>
    <div class="public-position">
        <file_upload class="file"></file_upload>
    </div>
    <div class="public-position">
        <WebWorker></WebWorker>
    </div>
    <div class="public-position" ref="A">
        <Echarts></Echarts>
    </div>
    <div class="public-position" ref="B">
        <overTimeData />
    </div>
    <div class="public-position" ref="D">
        <overTimeData />
    </div>
    <div class="public-position">
        <el-row :gutter="20">
            <el-col :span="12" :offset="0"></el-col>
            <el-col :span="12" :offset="0"></el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import file_upload from '@/components/file_upload.vue';
import WebWorker from '@/components/WebWorker.vue';
import Echarts from '@/components/Echarts.vue';
import overTimeData from '@/components/overTimeData.vue';
import { useIntersectionObserver } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { ArrowDownBold, Top, Basketball } from '@element-plus/icons-vue'
let A = ref(null)
let B = ref(null)
let C = ref(null)
let D = ref(null)
let choose = ref<any>([])
let list = [
    { name: '阵营', content: ['全部', '莱茵生命', '喀兰贸易', '临光骑士团', '大炎', '深海猎人'] },
    { name: '时装', content: ['时代', '0011制造', '冰原信使', '珊瑚海岸', '生命之地'] },
    { name: '强度', content: ['排名'] },
    { name: '素材', content: ['浏览'] },
    // { name: '官方网址', content: ['https://ak.hypergryph.com/#index'] }
]
let person = [{ name: '全部', content: ['https://media.prts.wiki/3/3a/%E5%A4%B4%E5%83%8F_%E7%BC%AA%E5%B0%94%E8%B5%9B%E6%80%9D.png', 'https://media.prts.wiki/9/9e/%E5%A4%B4%E5%83%8F_%E9%9C%8D%E5%B0%94%E6%B5%B7%E9%9B%85.png', 'https://media.prts.wiki/0/0d/%E5%A4%B4%E5%83%8F_%E6%B7%AC%E7%BE%BD%E8%B5%AB%E9%BB%98.png', 'https://media.prts.wiki/e/ed/%E5%A4%B4%E5%83%8F_%E4%BC%8A%E8%8A%99%E5%88%A9%E7%89%B9.png', 'https://media.prts.wiki/e/ee/%E5%A4%B4%E5%83%8F_%E5%A1%9E%E9%9B%B7%E5%A8%85.png', 'https://media.prts.wiki/8/83/%E5%A4%B4%E5%83%8F_%E7%99%BD%E9%9D%A2%E9%B8%AE.png', 'https://media.prts.wiki/3/39/%E5%A4%B4%E5%83%8F_%E8%B5%AB%E9%BB%98.png', 'https://media.prts.wiki/4/4f/%E5%A4%B4%E5%83%8F_%E5%A4%9A%E8%90%9D%E8%A5%BF.png', 'https://media.prts.wiki/9/9f/%E5%A4%B4%E5%83%8F_%E7%81%B5%E7%9F%A5.png', 'https://media.prts.wiki/d/d7/%E5%A4%B4%E5%83%8F_%E5%88%9D%E9%9B%AA.png', 'https://media.prts.wiki/0/0f/%E5%A4%B4%E5%83%8F_%E9%94%8F.png', 'https://media.prts.wiki/2/27/%E5%A4%B4%E5%83%8F_%E9%93%B6%E7%81%B0.png', 'https://media.prts.wiki/7/7d/%E5%A4%B4%E5%83%8F_%E5%B4%96%E5%BF%83.png', 'https://media.prts.wiki/0/03/%E5%A4%B4%E5%83%8F_%E8%80%80%E9%AA%91%E5%A3%AB%E4%B8%B4%E5%85%89.png', 'https://media.prts.wiki/c/c8/%E5%A4%B4%E5%83%8F_%E7%84%B0%E5%B0%BE.png', 'https://media.prts.wiki/f/f7/%E5%A4%B4%E5%83%8F_%E7%91%95%E5%85%89.png', 'https://media.prts.wiki/f/f8/%E5%A4%B4%E5%83%8F_%E9%9E%AD%E5%88%83.png', 'https://media.prts.wiki/f/f2/%E5%A4%B4%E5%83%8F_%E9%BB%8D.png', 'https://media.prts.wiki/e/e0/%E5%A4%B4%E5%83%8F_%E5%B7%A6%E4%B9%90.png', 'https://media.prts.wiki/1/1d/%E5%A4%B4%E5%83%8F_%E5%B0%8F%E6%BB%A1.png', 'https://media.prts.wiki/c/c4/%E5%A4%B4%E5%83%8F_%E7%83%9B%E7%85%8C.png', 'https://media.prts.wiki/4/42/%E5%A4%B4%E5%83%8F_%E8%A1%8C%E7%AE%B8.png', 'https://media.prts.wiki/6/66/%E5%A4%B4%E5%83%8F_%E4%BD%99.png', 'https://media.prts.wiki/9/9c/%E5%A4%B4%E5%83%8F_%E5%B9%B4.png', 'https://media.prts.wiki/4/41/%E5%A4%B4%E5%83%8F_%E5%90%BD.png', 'https://media.prts.wiki/3/33/%E5%A4%B4%E5%83%8F_%E4%B9%8C%E5%B0%94%E6%AF%94%E5%AE%89.png', 'https://media.prts.wiki/0/0d/%E5%A4%B4%E5%83%8F_%E6%AD%8C%E8%95%BE%E8%92%82%E5%A8%85.png', 'https://media.prts.wiki/b/be/%E5%A4%B4%E5%83%8F_%E5%BD%92%E6%BA%9F%E5%B9%BD%E7%81%B5%E9%B2%A8.png', 'https://media.prts.wiki/5/53/%E5%A4%B4%E5%83%8F_%E6%96%AF%E5%8D%A1%E8%92%82.png'] },
{ name: '莱茵生命', content: ['https://media.prts.wiki/3/3a/%E5%A4%B4%E5%83%8F_%E7%BC%AA%E5%B0%94%E8%B5%9B%E6%80%9D.png', 'https://media.prts.wiki/9/9e/%E5%A4%B4%E5%83%8F_%E9%9C%8D%E5%B0%94%E6%B5%B7%E9%9B%85.png', 'https://media.prts.wiki/0/0d/%E5%A4%B4%E5%83%8F_%E6%B7%AC%E7%BE%BD%E8%B5%AB%E9%BB%98.png', 'https://media.prts.wiki/e/ed/%E5%A4%B4%E5%83%8F_%E4%BC%8A%E8%8A%99%E5%88%A9%E7%89%B9.png', 'https://media.prts.wiki/e/ee/%E5%A4%B4%E5%83%8F_%E5%A1%9E%E9%9B%B7%E5%A8%85.png', 'https://media.prts.wiki/8/83/%E5%A4%B4%E5%83%8F_%E7%99%BD%E9%9D%A2%E9%B8%AE.png', 'https://media.prts.wiki/3/39/%E5%A4%B4%E5%83%8F_%E8%B5%AB%E9%BB%98.png', 'https://media.prts.wiki/4/4f/%E5%A4%B4%E5%83%8F_%E5%A4%9A%E8%90%9D%E8%A5%BF.png'] },
{ name: '喀兰贸易', content: ['https://media.prts.wiki/9/9f/%E5%A4%B4%E5%83%8F_%E7%81%B5%E7%9F%A5.png', 'https://media.prts.wiki/d/d7/%E5%A4%B4%E5%83%8F_%E5%88%9D%E9%9B%AA.png', 'https://media.prts.wiki/0/0f/%E5%A4%B4%E5%83%8F_%E9%94%8F.png', 'https://media.prts.wiki/2/27/%E5%A4%B4%E5%83%8F_%E9%93%B6%E7%81%B0.png', 'https://media.prts.wiki/7/7d/%E5%A4%B4%E5%83%8F_%E5%B4%96%E5%BF%83.png'] },
{ name: '临光骑士团', content: ['https://media.prts.wiki/0/03/%E5%A4%B4%E5%83%8F_%E8%80%80%E9%AA%91%E5%A3%AB%E4%B8%B4%E5%85%89.png', 'https://media.prts.wiki/c/c8/%E5%A4%B4%E5%83%8F_%E7%84%B0%E5%B0%BE.png', 'https://media.prts.wiki/f/f7/%E5%A4%B4%E5%83%8F_%E7%91%95%E5%85%89.png', 'https://media.prts.wiki/f/f8/%E5%A4%B4%E5%83%8F_%E9%9E%AD%E5%88%83.png'] },
{ name: '大炎', content: ['https://media.prts.wiki/f/f2/%E5%A4%B4%E5%83%8F_%E9%BB%8D.png', 'https://media.prts.wiki/e/e0/%E5%A4%B4%E5%83%8F_%E5%B7%A6%E4%B9%90.png', 'https://media.prts.wiki/1/1d/%E5%A4%B4%E5%83%8F_%E5%B0%8F%E6%BB%A1.png', 'https://media.prts.wiki/c/c4/%E5%A4%B4%E5%83%8F_%E7%83%9B%E7%85%8C.png', 'https://media.prts.wiki/4/42/%E5%A4%B4%E5%83%8F_%E8%A1%8C%E7%AE%B8.png', 'https://media.prts.wiki/6/66/%E5%A4%B4%E5%83%8F_%E4%BD%99.png', 'https://media.prts.wiki/9/9c/%E5%A4%B4%E5%83%8F_%E5%B9%B4.png', 'https://media.prts.wiki/4/41/%E5%A4%B4%E5%83%8F_%E5%90%BD.png'] },
{ name: '深海猎人', content: ['https://media.prts.wiki/3/33/%E5%A4%B4%E5%83%8F_%E4%B9%8C%E5%B0%94%E6%AF%94%E5%AE%89.png', 'https://media.prts.wiki/0/0d/%E5%A4%B4%E5%83%8F_%E6%AD%8C%E8%95%BE%E8%92%82%E5%A8%85.png', 'https://media.prts.wiki/b/be/%E5%A4%B4%E5%83%8F_%E5%BD%92%E6%BA%9F%E5%B9%BD%E7%81%B5%E9%B2%A8.png', 'https://media.prts.wiki/5/53/%E5%A4%B4%E5%83%8F_%E6%96%AF%E5%8D%A1%E8%92%82.png'] }]
let img = ref<any>(person[0].content)
let change = (items: any) => {
    person.forEach((eve) => {
        if (items === eve.name) {
            img.value = eve.content
        }
    })
}
let isshow = (element: any) => {
    const { stop } = useIntersectionObserver(element, ([{ isIntersecting }]) => {  //元素每次将要显示或者被隐藏时触发
        //stop()//停止监视元素(只监视一次),不写就是一直监视元素
        if (isIntersecting) {
            element.classList.add('fade-in-animation')
            // element.classList.remove('fade-out-animation')
        }
        else {  //视为不显示时
            // element.classList.add('fade-out-animation')
            element.classList.remove('fade-in-animation')
            element.style.opacity = '0'  //关键:设为透明防频闪
        }
    }, { threshold: 0.15 })  //显示元素的百分之多少时,视为组件将要显示
}
onMounted(() => {
    isshow(A.value)
    isshow(B.value)
    isshow(C.value)
    isshow(D.value)
})
let toTop = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}
</script>
<style scoped lang="scss">
//npm install -D sass sass-loader
$yellow-cal: #DCC9A9;
$yellow-cal-less: rgb(253, 240, 218);
$red-cal: #B83A2D;
$green-cal: #4E6851;

.public-position {
    margin: 0 auto;
    width: 80%;
}

.topback {
    flex-wrap: nowrap;
    position: sticky;
    top: 0px;
    background-color: $yellow-cal;
    z-index: 666;
    // background-color: transparent;
    // border-radius: 12px;
    // box-shadow: 10px 10px 10px $yellow-cal, -10px -10px 10px $yellow-cal , -10px 10px 10px $yellow-cal , 10px -10px 10px $yellow-cal
}

.back {
    background-color: $yellow-cal;
    border-radius: 12px;
    width: 80%;
}

.one-nav {
    display: flex;
    justify-content: space-around;
    padding: 7px;
}

.personimg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
}

.display {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 35px;
    padding: 3px 12px;
    flex-wrap: nowrap;
    height: fit-content;
}

.dis {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 24px;
}

.dis1 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.more {
    display: none;
}

.two {
    padding: 12px 0;
    margin-right: 14px;
    font-size: 17px;
}

.two:last-child {
    margin-right: 0;
}

.two:hover .more {
    opacity: 1;
    top: 46px;
    z-index: 5;
    background-color: rgb(253, 240, 218);
    border-radius: 12px;
    box-shadow: 0 0 12px grey;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: fit-content
}

.hover div {
    margin: 6px 0;
}

.one-container {
    >ul {
        @for $i from 1 through 6 {
            >li:nth-child(#{$i}) {
                position: relative;
                list-style-type: none;
                opacity: 0.6;
                cursor: pointer;

                /*悬停在li上时,更改字体透明度*/
                &:hover {
                    opacity: 1;
                }

                // &:after {
                //     content: '';
                //     position: absolute;
                //     top: 110%;
                //     left: -5%;
                //     width: 110%;
                //     height: 5px;
                //     border-radius: 12px;

                //     @if $i ==1 {
                //         background-color: rgb(0, 183, 255);
                //     }

                //     @else if $i==2 {
                //         background-color: rgb(255, 3, 45);

                //     }

                //     @else {
                //         background-color: goldenrod;
                //     }

                //     /*不hover时,隐藏,向下移动*/
                //     opacity: 0;
                //     transform: translateY(3px);
                //     transition: opacity 0.5s ease,
                //     transform 0.5s ease;
                // }

                // /*悬停在li上时,触发新的after*/
                // &:hover:after {
                //     /*继承上面的after属性*/
                //     opacity: 1;
                //     transform: translateY(0);
                // }
            }
        }
    }
}

.file {
    margin-top: 17px;
    border: solid 1px black;
}

.detail {
    background-color: transparent;
    padding: 5px 8px;
    white-space: nowrap;
    cursor: pointer;
}

.detail:hover {
    background-color: $yellow-cal;
    border-radius: 12px;
}

.list {
    position: absolute;
}

.icon {
    transform: translate(-4px, 2px) scale(0.8);
    transition: transform 0.5s ease-out;
}

.two:hover .icon {
    transform: translate(-4px, 2px) scale(0.8) rotate(180deg);
    transition: transform 0.5s ease-out;
    position: relative;
}

.cardbox {
    width: 16vw;
    height: 60vh;
    background-color: white;
    border-radius: 12px;
    height: 160px;
    margin: 12px 7px 12px;
    transform: translate(0);
    box-shadow: 0px 0px 10px rgb(195, 195, 195);
    transition: transform 0.4s ease-out, box-shadow 0.3s ease-out;
}

.cardbox:hover {
    transform: translate(0, -10px);
    box-shadow: 0px 0px 20px rgb(253, 253, 253);
    transition: transform 0.4s ease-out, box-shadow 0.3s ease-out;
}

.cardbox:nth-child(4n) {
    margin-right: 0;
}

.cardbox:nth-child(4n+1) {
    margin-left: 0;
}

@media(max-width:650px) {
    .cardbox {
        width: 30vw;
        height: 30vw;
    }

    .cardbox:nth-child(2n) {
        margin-right: 0;
    }

    .cardbox:nth-child(2n+1) {
        margin-left: 0;
    }
}

@media(max-width:520px) {
    .cardbox {
        width: 70vw;
        height: 30vh;
        margin-left: 0;
        margin-right: 0;
    }
}

.img {
    transform: scale(1.2);
    margin-left: 12px;
}

.img .el-avatar--circle {
    margin-top: 3px;
}

@media(max-width:600px) {
    .img {
        order: 2;
    }

    .back {
        order: 1;
    }
}

.cardcontent {
    animation: to 3s linear infinite
}

@keyframes to {
    0% {
        transform: scale(3) rotate(0deg);
    }

    25% {
        transform: scale(1.6) rotate(90deg);
    }

    50% {
        transform: scale(3) rotate(180deg);
    }

    75% {
        transform: scale(1.6) rotate(270deg);
    }

    100% {
        transform: scale(3) rotate(360deg);
    }
}

.toTop {
    position: fixed;
    background-color: white;
    width: fit-content;
    padding: 15px 15px 12px;
    margin-left: 12px;
    top: 40%;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0px 1px 7px rgb(255, 255, 255);
    transition: box-shadow 0.2s ease-out;
}

.toTop:hover {
    box-shadow: 1px 1px 10px rgb(147, 242, 255);
    transition: box-shadow 0.2s ease-out;
}

.fade-in-animation {
    animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
    }

    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.fade-out-animation {
    animation: fadeOut 0.1s ease-out forwards;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    100% {
        opacity: 0;
        transform: scale(0.9);
    }
}

.cardbackground {
    background-color: $yellow-cal-less;
}
</style>