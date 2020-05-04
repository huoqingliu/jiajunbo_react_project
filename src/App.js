import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Login from "./containers/login/login";
import Admin from "./containers/Admin/admin";

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
