import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Login from "./page/login/login";
import Admin from "./page/Admin/admin";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/Admin' component={Admin} />
        <Route path='/login' component={Login} />
        <Redirect to='login'/>
      </Switch>
    )
  }
}
