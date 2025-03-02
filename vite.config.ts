import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'  //8
import path from 'path';
import Components from 'unplugin-vue-components/vite';  //9
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //npm install rollup-plugin-visualizer --save-dev
    visualizer({ open: true }),  //打包结果分析
    vue(),
    AutoImport({  //8
      resolvers: [ElementPlusResolver()],  //10.自动导入组件
      imports: ['vue', 'vue-router']  //自动引入核心vue,vue-router的API
    }),
    Components({  //9
      resolvers: [ElementPlusResolver()]  //10.自动按需加载组件
    }),
    // compression({  //npm i vite-plugin-compression --save-dev  gzip压缩
    //   threshold: 10240,  //10kb
    //   algorithm: 'gzip'
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  
    }
  },
  //代理设置
  //npm i gh-pages -D  静态网页部署
  //"deploy": "gh-pages -d build",
  //先npm run build,将dist改名成build 再npm run deploy  获得新分支gh-pages
  server: {
    proxy: {
      '/api': 'http://testapi.xuexiluxian.cn'  //其他请求为/api/...时,被代理成http://testapi.xuexiluxian.cn/api/...
    }
  },
  build: {
    rollupOptions: {
      output: {
        //   manualChunks(id) {
        //     if (id.includes('src')) {
        //       return 'business'
        //     }
        //     else {
        //       console.log(id)  //其他默认打包到
        //     }
        //   },
        // manualChunks: {
        //   'chunk-vendors': ['vue', 'vue-router', 'pinia', 'axios', 'element-plus', '@vueuse/core', 'vue-i18n']
        // }
      }
    }
  }
})