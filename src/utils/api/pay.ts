import  request from "@/utils/request";

export function payall(data:any){  
    return request({
        url: '/api/order/settlement',
        method:'post',
        data,  
        //单独给某个请求设置超时时间
        timeout:5000
    })
}