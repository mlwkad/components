import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
//@ts-ignore
import piniaPersist from 'pinia-plugin-persist'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.mount('#app')
import { useIntersectionObserver } from '@vueuse/core'
//app.directive('xx',{生命周期(){}})
app.directive('lazyimg', {  //创建 v-lazyimg 指令
    mounted(el) {  //指令在元素挂载后执行,el就是被绑定的元素
        //1.缓存图片的网址
        const originsrc = el.src
        //2.使用占位图(先不向真正的图片网址发起请求,防止过多请求)
        el.src = "#"
        //3.监视元素
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            if (isIntersecting) {
                //图片可见时,还原网址,发出请求
                el.src = originsrc
                console.log('图片出来了')
                stop()  //停止监视
                //每多一张图片可见,才多一次请求,表示成功实现
            }
        })
    }
})