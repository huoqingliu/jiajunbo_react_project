import React, { Component } from 'react'
import { Layout } from "antd";
import { connect } from 'react-redux'
import {Switch,Route,Redirect} from "react-router-dom";
import Header from './Header/Header'
import LeftNav from "./LeftNav/LeftNav";
import './css/admin.less'
import Check from "../hoc/Check";
import Home from './Home/Home'
import User from './User/User'
import Role from './Role/Role'
import Product from './Product/Product'
import Category from './Category/Category'
import Bar from './Bar/Bar'
import Line from './Line/Line'
import Pie from './Pie/Pie'
import AddUpdata from "./Product/AddUpdata/AddUpdata";
import Detail from "./Product/Detail/Detail";

const {Footer, Sider, Content} =Layout



@connect(
	state =>({ //映射状态
		isLogin: state.userInfo.isLogin,

	}),
	{} //映射操作状态的方法
)
@Check
class Admin extends Component {
  
  
  render() {
    
    // if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <Layout className="admin-container">
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content>
						<Switch>
							<Route path="/admin/home" component={Home}/>
							<Route path="/admin/prod_about/category" component={Category}/>
							<Route path="/admin/prod_about/product" exact component={Product}/>
							<Route path="/admin/user" component={User}/>
							<Route path="/admin/role" component={Role}/>
							<Route path="/admin/charts/bar" component={Bar}/>
							<Route path="/admin/charts/line" component={Line}/>
							<Route path="/admin/charts/pie" component={Pie} />
							<Route path="/admin/prod_about/product/add" component={AddUpdata}/>
							<Route path="/admin/prod_about/product/detail/:id" component={Detail} />
							<Route path="/admin/prod_about/product/updata/:id" component={AddUpdata} />
							
							<Redirect to="/admin/home"/>
						</Switch>
					</Content>
          <Footer className="admin-footer">推荐使用谷歌浏览器，获取最佳用户体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin

// export default connect(
// 	state =>({ //映射状态
// 		isLogin:state.userInfo.isLogin
// 	}),
// 	{} //映射操作状态的方法
// )(Admin)