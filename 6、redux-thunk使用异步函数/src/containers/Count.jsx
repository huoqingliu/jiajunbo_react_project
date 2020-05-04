import Count from "../components/Count/Count";
import { connect } from 'react-redux'
import { increment, decrement } from "../redux/actions/count";

/* 
function mapStateToProps(state) {
  return {count:state}
} 
 */

/* 
function mapDispatchToProps(dispatch) {
  return {
    increment: (value) => {dispatch(increment(value))},
    decrement: (value) => {dispatch(decrement(value))}
  }
} 
*/
/*
connect(返回状态的函数,修改状态的函数)(UI组件)
connect(mapStateToProps,mapDispatchToProps)(Count)这里只能传这两个函数吗？
 */


export default connect(
  state => ({count:state}),
  /* dispatch => (
    {
      increment: (value) => {dispatch(increment(value))},
      decrement: (value) => {dispatch(decrement(value))}
    }
  ) */
  /* {//经过connect的加工,会包装成上面的样子
    increment:increment, 
    decrement:decrement
  } */
  //因为对象中的属性名和值同名,可以再次简写为:
  {increment,decrement}
)(Count)


// connect中可以写{increment,decrement}的原因

/* 
可以**看做**内部有一个封装成下面样子的函数：
  ({a,b}) => {
    return dispatch => (
      {
        a: (value) => {dispatch(a(value))},
        b: (value) => {dispatch(b(value))}
      }
    )
  }
  所以{increment,decrement}会被包装成这个样子：
    increment: (value) => {dispatch(increment(value))},
    decrement: (value) => {dispatch(decrement(value))}
 */