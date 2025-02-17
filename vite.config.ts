import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'  //8
import path from 'path';
import Components from 'unplugin-vue-components/vite';  //9
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({  //8
      resolvers: [ElementPlusResolver()],  //10.自动导入组件
      imports: ['vue', 'vue-router']  //自动引入核心vue,vue-router的API
    }),
    Components({  //9
      resolvers: [ElementPlusResolver()]  //10.自动按需加载组件
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  //代理设置
  server: {
    proxy: {
      '/api': 'http://testapi.xuexiluxian.cn'  //其他请求为/api/...时,被代理成http://testapi.xuexiluxian.cn/api/...
    }
  }
})