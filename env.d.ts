/// <reference types="vite/client" />

//告诉 TypeScript 所有 .vue 文件都应该被当作 Vue 组件来处理
//消除文件隐式
declare module "*.vue" {  

    import Vue from 'vue';  

    export default Vue;  

  }