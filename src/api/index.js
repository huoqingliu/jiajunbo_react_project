import ajax from "./ajax";
import jsonp from "jsonp";
import { AK, LOCATION } from "@/config";
import { message } from "antd";

// 请求登录
export const reqLogin = (loginObj)=> ajax.post('/login', loginObj)

// 请求天气信息
export const reqWeatherData = () => {
  const URL = `http://api.map.baidu.com/telematics/v3/weather?location=${LOCATION}&output=json&ak=${AK}`
  return new Promise((resolve)=>{
		//使用jsonp库发送请求
    jsonp(URL, { timeout: 2000, },
      (err, data) => {
        if (!err) {
        console.log(data);
				resolve(data.results[0].weather_data[0])
			}else{
				message.error('请求天气信息有误，请联系管理员')
			}
		})
	})
}