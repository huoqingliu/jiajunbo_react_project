import React, { Component } from 'react'
import { Button } from "antd";
import screenfull from "screenfull";
import { deleteUserInfo } from "../../redux/actions/login";

export default class Admin extends Component {
  state = {
    isFull: false
  }
  fullScreen = () => {
    const { isFull } = this.state;
    this.setState({ "isFull": !isFull })
    screenfull.toggle();
  }

  componentDidMount() {
    screenfull.onchange(() => {
      const { isFull } = this.state;
      this.setState({ "isFull": !isFull })
    })
  }

  
  render() {
    return (
      <div>
        123
        {this.state.isFull}?<Button size={"small"} onClick={this.fullScreen}>23</Button>:<Button size={"small"} onClick={this.fullScreen}>12</Button>
        


      </div>
    )
  }
}
