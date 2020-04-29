import {INCREMENT,DECREMENT} from '../action_types'

//创建加的action
export const increment = value => ({type:INCREMENT,data:value})

//创建减的action
export const decrement = value => ({type:DECREMENT,data:value})