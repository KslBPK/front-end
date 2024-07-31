import Axios from "axios";


const service = Axios.create({
    // baseURL会自动加载在接口地址上
    // baseURL:"http://rap2api.taobao.org/app/mock/319762",
    baseURL:"/api",
    // 指定请求的超时毫秒数，如果请求超过这个时间，那么请求就会中断。
    timeout: 3000,
    headers: {
        'Content-type' : 'application/json;charset=utf-8',
    },
    // ‘auth’表示应该使用http基础验证，并提供凭据
    // 这将设置一个‘Authorization’头，覆写掉现有的任意使用‘header’设置的自定义‘Authorization’头
    auth: {
        username: 'superadmin',
        password: '1234567890'
    }
})

// 添加拦截请求器
service.interceptors.request.use(function(config){
    // 在发送请求前做些什么
    return config
},function(error){
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response){
    // 对响应数据做些什么
    return response
},function(error){
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default service