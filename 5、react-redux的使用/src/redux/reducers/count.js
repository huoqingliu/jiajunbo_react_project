import { INCREMENT, DECREMENT } from "../action_types";
const initState = 0//初始化preState
export default function (preState=initState, action) {
  let newState 
  const {type,data }=action
  switch (type) {
    case INCREMENT://如果是加
      newState = preState + data
      console.log('加',preState,action);
      return newState
    case DECREMENT://如果是减
      newState = preState - data
      console.log('减',preState,action);
      return newState
  
    default://如果是第一次，没有之前的state，则初始化preState
      console.log('初始化',preState,action);
      return preState
  }
}