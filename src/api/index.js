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


// 请求商品列表
export const reqGoodsList = (pageNum,pageSize) => ajax.get('/manage/product/list',{params:{pageNum,pageSize}})


// 请求搜索商品
export const reqSeacrch = (searchType,keyWord,pageNum,pageSize) => ajax.get('/manage/product/search',{params:{ [searchType]:keyWord,pageNum,pageSize}})


// 请求商品上架下架
export const reqUpdateGoodsStatus = (productId,status) => ajax.post('/manage/product/updateStatus',{productId,status})

//根据商品ID获取商品
export const reqCurrentProduct = (productId)=>ajax.get('/manage/product/info',{params:{productId}})