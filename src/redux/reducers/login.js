import { SAVE_USERINFO, DELETE_USERINFO } from "../action_types";

let _user

// 获取user和token的数据,并验证user是否有错误
try {
  _user = JSON.parse(localStorage.getItem('user'));
  
} catch (error) {
  // 获取localstorage数据出错,使_user=null
  _user = null  //代表要储存一个对象,但是现在为null


}

let _token = localStorage.getItem('token')

let initState = {
  user: _user || {},
  token: _token || "",
  isLogin: _user && _token ? true : false
  //获取用户是否已经登录,只有_user和_token 都存在才为true
}


export default function (preState=initState, action) {
  const { type, data } = action
  let newState
  switch (type) {
    case SAVE_USERINFO:
      newState = {...data , isLogin:true}
      return newState
    
    case DELETE_USERINFO:
      newState = {user:{},token:'' , isLogin:false}
      return newState
    
    default:
      return preState
  }
}