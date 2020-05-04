import { SAVE_USERINFO, DELETE_USERINFO } from "../action_types";

// 保存user信息到localstorage中
export const saveUserInfo = userObj => {
  const { user, token } = userObj
  localStorage.setItem('user',JSON.stringify(user))
  localStorage.setItem('token', token)
  
  return { type: SAVE_USERINFO, data: userObj }
}


// 删除localstorage中的user信息
export const deleteUserInfo = () => {
  localStorage.clear()
  return { type: DELETE_USERINFO}
}