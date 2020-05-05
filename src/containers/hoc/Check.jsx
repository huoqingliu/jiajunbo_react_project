import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';


export default function name(ReciveComponent) {
  @connect(
    state => ({ isLogin: state.userInfo.isLogin }),
    {}
  )
  class TargetComponent extends Component {
    render() {
      const { isLogin } = this.props
      const { pathname } = this.props.location
      
      
      console.log(this.props);
      console.log(isLogin,pathname);
 
      
      if (isLogin&&pathname==="/login") return <Redirect to='/admin' />
      if (!isLogin&&pathname!=="/login") return <Redirect to='/login' />
      return <ReciveComponent {...this.props} />
    }
  }
  return TargetComponent
}