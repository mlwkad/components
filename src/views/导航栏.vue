<template>
    <div class="one-container">
        <ul class="one-nav">
            <li v-for="item in list">{{ item }}</li>
        </ul>
    </div>
    <div class="public-position">
        <el-row :gutter="5"><!-- <el-row :gutter="20">gutter:左右内边距 -->
            <el-col v-for="item in 6" :span="8" :offset="0">
                <div class="two-box">
                    <img>
                </div>
            </el-col>
        </el-row>
    </div>
    <div class="public-position">
        <file_upload class="file"></file_upload>
    </div>
    <div class="public-position">
        <WebWorker></WebWorker>
    </div>
    666
</template>
<script setup lang="js">
import file_upload from '@/components/file_upload.vue';
import WebWorker from '@/components/WebWorker.vue';
let list = ['HTML', 'TS', 'CSS', 'ES6', 'WEBSOCKET', 'VUE3']
</script>
<style scoped lang="scss">
@import url();
$color: red;

/*npm install -D sass sass-loader*/
.public-position {
    margin: 0 auto;
    width: 60%;
}

.one-container {
    width: 60%;
    background-color: white;
    margin: 0 auto;
    border-radius: 7px;
    box-shadow: 1px 1px 5px grey;
    // transform: translate(0, 8vh); 会让元素脱离文档流,占据原位置的空间,并浮动在新位置
    margin-top: 8vh;
}

.one-nav {
    display: flex;
    justify-content: space-around;
    padding: 7px;
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

                &:after {
                    content: '';
                    position: absolute;
                    top: 110%;
                    left: -5%;
                    width: 110%;
                    height: 5px;
                    border-radius: 12px;

                    @if $i ==1 {
                        background-color: rgb(0, 183, 255);
                    }

                    @else if $i==2 {
                        background-color: rgb(255, 3, 45);

                    }

                    @else {
                        background-color: goldenrod;
                    }

                    /*不hover时,隐藏,向下移动*/
                    opacity: 0;
                    transform: translateY(3px);
                    transition: opacity 0.5s ease,
                    transform 0.5s ease;
                }

                /*悬停在li上时,触发新的after*/
                &:hover:after {
                    /*继承上面的after属性*/
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }
    }
}

.two-box {
    background-color: white;
    width: 80%;
    margin: 0 auto;
    height: 80px;
    margin-top: 12px;
    margin-bottom: 12px;
    border-radius: 12px;
    box-shadow: 0px 0px 1px;
    transform: translate(0);
    transition: box-shadow 80ms ease, transform 200ms ease;
}

.two-box:hover {
    box-shadow: 1px 1px 5px rgb(43, 43, 23);
    transform: translateY(-3px);
    transition: box-shadow 80ms ease, transform 200ms ease;
    cursor: pointer;
}

.file {
    margin-top: 17px;
    border: solid 1px black;
}
</style>