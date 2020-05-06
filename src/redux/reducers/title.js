import { SAVE_TITLE,DELETE_USERINFO } from "../action_types";


// let _title = JSON.parse(localStorage.getItem('title'))|| "首页"
let _title =""

export default function (preState=_title, action) {
  const { type, data } = action
  let newState
  switch (type) {
    case SAVE_TITLE:
      newState = data
      return newState
    default:
      return preState
  }
}