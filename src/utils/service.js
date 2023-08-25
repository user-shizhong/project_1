import axios from "axios"
import { Message } from 'element-ui';
const service = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000,
});
//请求拦截器
service.interceptors.request.use(config=>{
    if(sessionStorage.getItem("token")){
        config.headers.token= sessionStorage.getItem("token")
    }
   return config
})
//响应拦截器
service.interceptors.response.use(res=>{
     const result =res.data
     if(result.success){
        // Message({
        //     message:result.message,
        //     type:"success"
        // })
        return result
     }else{
        Message({
            message:result.message,
            type:"error"
        })
        return Promise.reject(new Error(result.message)||"输入错误")
     }
})  
export default service;