import React, { Component } from 'react'
// import store from "../../redux/store";
// import { increment,decrement } from "../../redux/actions/count";



export default class Count extends Component {
  
  increment = () => {
    const { value } = this.refs.selected
    // store.dispatch(increment(value*1))
    this.props.increment(value*1)
  }
  decrement = () => {
    const { value } = this.refs.selected
    // store.dispatch(decrement(value*1))
    this.props.decrement(value*1)

  }

  incrementIfOdd = () => {
    const {value} =this.refs.selected
    let number  = this.props.count
    if (number%2===1) {
      // store.dispatch(increment(value*1))
    this.props.increment(value*1)

    }
  }

  incrementAsync = () => {
    const {value} =this.refs.selected
    setTimeout(() => {
      // store.dispatch(increment(value*1))
    this.props.increment(value*1)

    }, 500);
  }
  
  render() {
    console.log(this.props);
    
    return (
      <div>
        <h2>求和为:{this.props.count}</h2>
        <br />
        <select ref='selected'>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>加</button>&nbsp;
        <button onClick={this.decrement}>减</button>&nbsp;
        <button onClick={this.incrementIfOdd}>奇数加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;
      </div>
    )
  }
}
