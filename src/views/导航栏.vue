<template>
    <!--导航栏-->
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
        <a href="https://ak.hypergryph.com/#index" target="_blank" class="website"
            style='transform: translate(-12px,0);white-space: nowrap ;text-decoration: none;color: black;'>{{
                t('guan-wang') }}</a>
    </div>
    <!--回到顶部-->
    <div class="toTop" @click="toTop">
        <el-icon size="18px" class="topicon">
            <Top />
        </el-icon>
    </div>
    <!--切换语言-->
    <div class="changeLocale" @click="changeLocale">
        <el-icon size="18px" class="topicon">
            <Switch />
        </el-icon>
    </div>
    <!--人物一览-->
    <div class="public-position" v-SiHuaJinRu> <!---->
        <div style="position: relative;height: 100vh;">
            <div class="dis" style="position: absolute;overflow: auto;top: 0;bottom:15vh">
                <div v-for="item in img" class="cardbox cardbackground dis1">
                    <img :src=item class="personimg" v-lazyimg>
                </div>
            </div>
        </div>
    </div>
    <view1></view1>
</template>

<script setup lang="js">
import { onBeforeMount, onMounted, ref } from 'vue';
import { ArrowDownBold, Top, Switch } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import router from '@/router';
import view1 from '@/views/view1.vue'

const { t } = useI18n()

let list = [
    { name: t('person.name0'), content: [t('person.name1'), t('person.name2'), t('person.name3'), t('person.name4'), t('person.name5')] },
    { name: t('list.content1.first'), content: [t('list.content1.second'), t('list.content1.third'), t('list.content1.fourth'), t('list.content1.fifth'), t('list.content1.sixth')] },
    { name: t('list.content2.first'), content: [t('list.content2.second')] },
    { name: t('list.content3.first'), content: [t('list.content3.second')] },
]

let person = [{ name: t('person.name0'), content: ['https://media.prts.wiki/3/3a/%E5%A4%B4%E5%83%8F_%E7%BC%AA%E5%B0%94%E8%B5%9B%E6%80%9D.png', 'https://media.prts.wiki/9/9e/%E5%A4%B4%E5%83%8F_%E9%9C%8D%E5%B0%94%E6%B5%B7%E9%9B%85.png', 'https://media.prts.wiki/0/0d/%E5%A4%B4%E5%83%8F_%E6%B7%AC%E7%BE%BD%E8%B5%AB%E9%BB%98.png', 'https://media.prts.wiki/e/ed/%E5%A4%B4%E5%83%8F_%E4%BC%8A%E8%8A%99%E5%88%A9%E7%89%B9.png', 'https://media.prts.wiki/e/ee/%E5%A4%B4%E5%83%8F_%E5%A1%9E%E9%9B%B7%E5%A8%85.png', 'https://media.prts.wiki/8/83/%E5%A4%B4%E5%83%8F_%E7%99%BD%E9%9D%A2%E9%B8%AE.png', 'https://media.prts.wiki/3/39/%E5%A4%B4%E5%83%8F_%E8%B5%AB%E9%BB%98.png', 'https://media.prts.wiki/4/4f/%E5%A4%B4%E5%83%8F_%E5%A4%9A%E8%90%9D%E8%A5%BF.png', 'https://media.prts.wiki/9/9f/%E5%A4%B4%E5%83%8F_%E7%81%B5%E7%9F%A5.png', 'https://media.prts.wiki/d/d7/%E5%A4%B4%E5%83%8F_%E5%88%9D%E9%9B%AA.png', 'https://media.prts.wiki/0/0f/%E5%A4%B4%E5%83%8F_%E9%94%8F.png', 'https://media.prts.wiki/2/27/%E5%A4%B4%E5%83%8F_%E9%93%B6%E7%81%B0.png', 'https://media.prts.wiki/7/7d/%E5%A4%B4%E5%83%8F_%E5%B4%96%E5%BF%83.png', 'https://media.prts.wiki/0/03/%E5%A4%B4%E5%83%8F_%E8%80%80%E9%AA%91%E5%A3%AB%E4%B8%B4%E5%85%89.png', 'https://media.prts.wiki/c/c8/%E5%A4%B4%E5%83%8F_%E7%84%B0%E5%B0%BE.png', 'https://media.prts.wiki/f/f7/%E5%A4%B4%E5%83%8F_%E7%91%95%E5%85%89.png', 'https://media.prts.wiki/f/f8/%E5%A4%B4%E5%83%8F_%E9%9E%AD%E5%88%83.png', 'https://media.prts.wiki/f/f2/%E5%A4%B4%E5%83%8F_%E9%BB%8D.png', 'https://media.prts.wiki/e/e0/%E5%A4%B4%E5%83%8F_%E5%B7%A6%E4%B9%90.png', 'https://media.prts.wiki/1/1d/%E5%A4%B4%E5%83%8F_%E5%B0%8F%E6%BB%A1.png', 'https://media.prts.wiki/c/c4/%E5%A4%B4%E5%83%8F_%E7%83%9B%E7%85%8C.png', 'https://media.prts.wiki/4/42/%E5%A4%B4%E5%83%8F_%E8%A1%8C%E7%AE%B8.png', 'https://media.prts.wiki/6/66/%E5%A4%B4%E5%83%8F_%E4%BD%99.png', 'https://media.prts.wiki/9/9c/%E5%A4%B4%E5%83%8F_%E5%B9%B4.png', 'https://media.prts.wiki/4/41/%E5%A4%B4%E5%83%8F_%E5%90%BD.png', 'https://media.prts.wiki/3/33/%E5%A4%B4%E5%83%8F_%E4%B9%8C%E5%B0%94%E6%AF%94%E5%AE%89.png', 'https://media.prts.wiki/0/0d/%E5%A4%B4%E5%83%8F_%E6%AD%8C%E8%95%BE%E8%92%82%E5%A8%85.png', 'https://media.prts.wiki/b/be/%E5%A4%B4%E5%83%8F_%E5%BD%92%E6%BA%9F%E5%B9%BD%E7%81%B5%E9%B2%A8.png', 'https://media.prts.wiki/5/53/%E5%A4%B4%E5%83%8F_%E6%96%AF%E5%8D%A1%E8%92%82.png'] },
{ name: t('person.name1'), content: ['https://media.prts.wiki/3/3a/%E5%A4%B4%E5%83%8F_%E7%BC%AA%E5%B0%94%E8%B5%9B%E6%80%9D.png', 'https://media.prts.wiki/9/9e/%E5%A4%B4%E5%83%8F_%E9%9C%8D%E5%B0%94%E6%B5%B7%E9%9B%85.png', 'https://media.prts.wiki/0/0d/%E5%A4%B4%E5%83%8F_%E6%B7%AC%E7%BE%BD%E8%B5%AB%E9%BB%98.png', 'https://media.prts.wiki/e/ed/%E5%A4%B4%E5%83%8F_%E4%BC%8A%E8%8A%99%E5%88%A9%E7%89%B9.png', 'https://media.prts.wiki/e/ee/%E5%A4%B4%E5%83%8F_%E5%A1%9E%E9%9B%B7%E5%A8%85.png', 'https://media.prts.wiki/8/83/%E5%A4%B4%E5%83%8F_%E7%99%BD%E9%9D%A2%E9%B8%AE.png', 'https://media.prts.wiki/3/39/%E5%A4%B4%E5%83%8F_%E8%B5%AB%E9%BB%98.png', 'https://media.prts.wiki/4/4f/%E5%A4%B4%E5%83%8F_%E5%A4%9A%E8%90%9D%E8%A5%BF.png'] },
{ name: t('person.name2'), content: ['https://media.prts.wiki/9/9f/%E5%A4%B4%E5%83%8F_%E7%81%B5%E7%9F%A5.png', 'https://media.prts.wiki/d/d7/%E5%A4%B4%E5%83%8F_%E5%88%9D%E9%9B%AA.png', 'https://media.prts.wiki/0/0f/%E5%A4%B4%E5%83%8F_%E9%94%8F.png', 'https://media.prts.wiki/2/27/%E5%A4%B4%E5%83%8F_%E9%93%B6%E7%81%B0.png', 'https://media.prts.wiki/7/7d/%E5%A4%B4%E5%83%8F_%E5%B4%96%E5%BF%83.png'] },
{ name: t('person.name3'), content: ['https://media.prts.wiki/0/03/%E5%A4%B4%E5%83%8F_%E8%80%80%E9%AA%91%E5%A3%AB%E4%B8%B4%E5%85%89.png', 'https://media.prts.wiki/c/c8/%E5%A4%B4%E5%83%8F_%E7%84%B0%E5%B0%BE.png', 'https://media.prts.wiki/f/f7/%E5%A4%B4%E5%83%8F_%E7%91%95%E5%85%89.png', 'https://media.prts.wiki/f/f8/%E5%A4%B4%E5%83%8F_%E9%9E%AD%E5%88%83.png'] },
{ name: t('person.name4'), content: ['https://media.prts.wiki/f/f2/%E5%A4%B4%E5%83%8F_%E9%BB%8D.png', 'https://media.prts.wiki/e/e0/%E5%A4%B4%E5%83%8F_%E5%B7%A6%E4%B9%90.png', 'https://media.prts.wiki/1/1d/%E5%A4%B4%E5%83%8F_%E5%B0%8F%E6%BB%A1.png', 'https://media.prts.wiki/c/c4/%E5%A4%B4%E5%83%8F_%E7%83%9B%E7%85%8C.png', 'https://media.prts.wiki/4/42/%E5%A4%B4%E5%83%8F_%E8%A1%8C%E7%AE%B8.png', 'https://media.prts.wiki/6/66/%E5%A4%B4%E5%83%8F_%E4%BD%99.png', 'https://media.prts.wiki/9/9c/%E5%A4%B4%E5%83%8F_%E5%B9%B4.png', 'https://media.prts.wiki/4/41/%E5%A4%B4%E5%83%8F_%E5%90%BD.png'] },
{ name: t('person.name5'), content: ['https://media.prts.wiki/3/33/%E5%A4%B4%E5%83%8F_%E4%B9%8C%E5%B0%94%E6%AF%94%E5%AE%89.png', 'https://media.prts.wiki/0/0d/%E5%A4%B4%E5%83%8F_%E6%AD%8C%E8%95%BE%E8%92%82%E5%A8%85.png', 'https://media.prts.wiki/b/be/%E5%A4%B4%E5%83%8F_%E5%BD%92%E6%BA%9F%E5%B9%BD%E7%81%B5%E9%B2%A8.png', 'https://media.prts.wiki/5/53/%E5%A4%B4%E5%83%8F_%E6%96%AF%E5%8D%A1%E8%92%82.png'] }]

let img = ref(person[0].content)

let change = (item) => {
    person.forEach((eve) => {
        if (item === eve.name) {
            img.value = eve.content
        }
    })
}

let toTop = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

let changeLocale = () => {
    let currentLanguage = localStorage.getItem('language')
    if (currentLanguage === 'en') {
        localStorage.setItem('language', 'zh')
    }
    else {
        localStorage.setItem('language', 'en')
    }
    router.go(0)
}

</script>
<style scoped lang="less">
@import '@/assets/styles.less';

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

.public-position {
    margin: 0 auto;
    width: 88%;
}

.topback {
    flex-wrap: nowrap;
    position: sticky;
    top: 0px;
    background-color: @yellow-cal;
    z-index: 666;
    // background-color: transparent;
    // border-radius: 12px;
    // box-shadow: 10px 10px 10px $yellow-cal, -10px -10px 10px $yellow-cal , -10px 10px 10px $yellow-cal , 10px -10px 10px $yellow-cal
}

.back {
    background-color: @yellow-cal;
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
    object-fit: cover; //不缩放
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
    justify-content: flex-start;
    margin-top: 24px;
    align-content: flex-start;
}

.dis::-webkit-scrollbar {
    width: 8px;
}

.dis::-webkit-scrollbar-track {
    background: transparent;
}

.dis::-webkit-scrollbar-thumb {
    background: rgb(100, 100, 100);
    border-radius: 10px;
}

.dis::-webkit-scrollbar-thumb:hover {
    background: #b0b0b0;
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

// .one-container {
//     >ul {
//         @for $i from 1 through 6 {
//             >li:nth-child(#{$i}) {
//                 position: relative;
//                 list-style-type: none;
//                 opacity: 0.6;
//                 cursor: pointer;

//                 /*悬停在li上时,更改字体透明度*/
//                 &:hover {
//                     opacity: 1;
//                 }

//                 // &:after {
//                 //     content: '';
//                 //     position: absolute;
//                 //     top: 110%;
//                 //     left: -5%;
//                 //     width: 110%;
//                 //     height: 5px;
//                 //     border-radius: 12px;

//                 //     @if $i ==1 {
//                 //         background-color: rgb(0, 183, 255);
//                 //     }

//                 //     @else if $i==2 {
//                 //         background-color: rgb(255, 3, 45);

//                 //     }

//                 //     @else {
//                 //         background-color: goldenrod;
//                 //     }

//                 //     /*不hover时,隐藏,向下移动*/
//                 //     opacity: 0;
//                 //     transform: translateY(3px);
//                 //     transition: opacity 0.5s ease,
//                 //     transform 0.5s ease;
//                 // }

//                 // /*悬停在li上时,触发新的after*/
//                 // &:hover:after {
//                 //     /*继承上面的after属性*/
//                 //     opacity: 1;
//                 //     transform: translateY(0);
//                 // }
//             }
//         }
//     }
// }

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
    background-color: @yellow-cal;
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
    font-size: 24px;
    width: 19vw;
    height: 30vh;
    min-height: 90px;
    max-height: 160px;
    background-color: white;
    border-radius: 12px;
    margin: 1.5vw 1.1vw;
    transform: translate(0);
    box-shadow: 0px 0px 10px rgb(195, 195, 195);
    transition: transform 0.4s ease-out, box-shadow 0.3s ease-out;
}

.cardbox:hover {
    transform: translate(0, -10px);
    box-shadow: 0px 0px 20px rgb(253, 253, 253);
    transition: transform 0.4s ease-out, box-shadow 0.3s ease-out;
}

@media(max-width:700px) {
    .cardbox {
        width: 25.3vw;
        height: 25vw;
    }

    .website {
        margin-left: 12px;
    }
}

@media(min-width:1100px) {
    .cardbox {
        width: 14vw;
        height: 28vh;
        margin: 1.3vw 1.4vw;
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
    bottom: 7px;
    right: 7px;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0px 1px 7px rgb(255, 255, 255);
    transition: box-shadow 0.2s ease-out;
    z-index: 666;
    background-color: @yellow-cal-less;
}

.changeLocale {
    position: fixed;
    background-color: white;
    width: fit-content;
    padding: 15px 15px 12px;
    margin-left: 12px;
    bottom: 66px;
    right: 7px;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0px 1px 7px rgb(255, 255, 255);
    transition: box-shadow 0.2s ease-out;
    z-index: 666;
    background-color: @yellow-cal-less;
}

.toTop:hover {
    box-shadow: 1px 1px 10px @yellow-cal;
    transition: box-shadow 0.2s ease-out;
}

.cardbackground {
    background-color: @yellow-cal-less;
}

.toTop:hover .topicon {
    animation: totop 1s linear infinite;
}

@keyframes totop {
    0% {}

    30% {
        opacity: 0;
        transform: translate(0px, -10px);
    }

    60% {
        transform: translate(0px, 10px);
        opacity: 0;
    }

    100% {}
}
</style>