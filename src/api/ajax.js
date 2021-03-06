import axios from "axios";
import qs from "querystring";
import {
  message as Msg
} from 'antd'
import store from "@/redux/store";
// 制作进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";

// 使用antd的message 组件

axios.defaults.baseURL = '/api'

axios.defaults.timeout = 2000


// 请求拦截器
axios.interceptors.request.use((config) => {
  nprogress.start()
  const { method, data } = config
  //统一处理post请求json编码问题（转为urlencoded）
  if (method.toLocaleLowerCase() === 'post' && data instanceof Object) {
    config.data = qs.stringify(data)
  }

  //如果存在token，那就携带token
	const {token} = store.getState().userInfo
	if(token){
		config.headers.Authorization = 'atguigu_'+token
	}
  return config
})

// 响应拦截器
axios.interceptors.response.use(
  response => {
    nprogress.done()
    // const {
    //   msg,
    //   status
    // } = response.data
    // console.log(response.data);
    // if (status === 0) {
    //   // 请求成功,正常返回response.data
      return response.data;
    // } else {
      // 请求出错,调用antd的message组件弹窗提示。并返回response.data
      // Msg.error(msg, 1)
      // return response.data;
    // }
  },
  err => {
    let errmsg = '未知错误，请联系管理员'
    const {
      message
    } = err
    if (message.indexOf('401') !== -1) errmsg = '未登录或身份过期，请重新登录！'
    else if (message.indexOf('Network Error') !== -1) errmsg = '网络不通，请检查网络连接！'
    else if (message.indexOf('timeout') !== -1) errmsg = '网络不稳定，连接超时！'

    Msg.error(errmsg, 1)
    return new Promise(() => {})
  });

export default axios