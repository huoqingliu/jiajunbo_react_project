const initState = 0
export default function (preState=initState, action) {
  let newState 
  const {type,data }=action
  switch (type) {
    case 'increment':
      newState = preState + data
      console.log('加',preState,action);
      return newState
    case 'decrement':
      newState = preState - data
      console.log('减',preState,action);
      return newState
  
    default:
      console.log('初始化',preState,action);
      return preState
  }
}