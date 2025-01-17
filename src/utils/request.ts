import axios from 'axios';
import axiosRetry from 'axios-retry';

//1. 创建axios对象
const service = axios.create({
    timeout: 5000,         // 设置全局超时时间
});

// 配置重试 npm install axios-retry
axiosRetry(service, {
    retries: 3, // 最大重试次数
    retryDelay: (retryCount) => {
        return retryCount * 1000; // 每次重试的时间间隔
    },
    shouldResetTimeout: true, // 在重试时重置超时时间
});

//2. 请求拦截器
service.interceptors.request.use(
    config => {  //config接收传来的各种数据
        //{}的目的就是再对config进行修改(有需要的话)

        return config;  //这里返回的是修改后的最终config,没有这一步 上面的修改不会实现  这个config直接传给后端去做判断(格式,参数存不存在...)
    },
    error => {
        Promise.reject(error);
    });

//3. 响应拦截器
service.interceptors.response.use(
    //code码是200
    response => {  //后端有反馈
        return response.data;
    },
    //如果返回的code码是400多500多,自动触发error
    error => {
        return Promise.reject(error);
    });

export default service;


