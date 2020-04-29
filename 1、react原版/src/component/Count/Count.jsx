import React, { Component } from 'react'

export default class Count extends Component {
  state = {
    number:1
  }
  increment = () => {
    const {value} =this.refs.selected
    let { number } = this.state
    number+= value*1
    this.setState({number})
  }
  decrement = () => {
    const {value} =this.refs.selected
    let { number } = this.state
    number-= value*1
    this.setState({number})
  }

  incrementIfOdd = () => {
    const {value} =this.refs.selected
    let { number } = this.state
    if (number%2===1) {
      number+= value*1
    }
    this.setState({number})
  }

  incrementAsync = () => {
    setTimeout(() => {
      const {value} =this.refs.selected
      let { number } = this.state
      number+= value*1
      this.setState({number})
    }, 500);
  }
  
  render() {
    return (
      <div>
        <span>{this.state.number}</span>
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
