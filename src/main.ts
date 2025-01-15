import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
//@ts-ignore
import piniaPersist from 'pinia-plugin-persist'
const app = createApp(App)
const pinia=createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.mount('#app')