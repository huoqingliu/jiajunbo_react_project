import Count from "../components/Count/Count";
import { connect } from 'react-redux'
import { increment,decrement } from "../redux/actions/count";
function mapStateToProps(state) {
  return {count:state}
}

function mapDispatchToProps(dispatch) {
  return {
    increment: (value) => dispatch(increment(value)),
    decrement: (value) => dispatch(decrement(value))
  }
}
// connect(mapStateToProps,mapDispatchToProps)(Count)这里只能传这两个函数吗？
export default connect(mapStateToProps,mapDispatchToProps)(Count)