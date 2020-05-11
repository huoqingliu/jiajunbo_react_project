import React, { Component } from 'react'
import logo from "@/assets/img/logo.png";
import { Menu } from 'antd';
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import menu from "@/config/menu_config";
import "./leftNav.less";
import { saveTitle } from "@/redux/actions/title";

const { SubMenu, Item } = Menu;

@connect(
	()=>({}),//映射状态
	{saveTitle}//映射操作状态的方法
)
@withRouter
 class leftNav extends Component {
  saveTitle = (title) => {
    this.props.saveTitle(title)
    // console.log('saveTitle成功');
  }

  createMenu = (MenuArr) => {
    return MenuArr.map((menuObj) => {
      if (!menuObj.children) {
        return (
          <Item key={menuObj.key}>
            <Link to={menuObj.path} onClick = {()=>{this.saveTitle(menuObj.title)}}>
            <menuObj.icon />
            {menuObj.title}
            </Link>
          </Item>
        )
      } else {
        return (
          <SubMenu key={menuObj.key} icon={<menuObj.icon />} title={menuObj.title}>
            {this.createMenu(menuObj.children)}
          </SubMenu>
        )
      }
    })
  }

  calculateTitle = () => {
    // 从当前路径中获取当前的key
    const { pathname } = this.props.location
    // console.log(pathname);
    let currentKey = pathname.split('/').slice(-1)[0]
    // console.log(currentKey);

    // 如果当前key为admin，则修改为home
    if (currentKey === 'admin') currentKey = 'home'
    
    let title = ''
    // 在menu中根据当前key查找当前的title
    menu.forEach((menuObj) => {
      if (menuObj.children instanceof Array) {
        let result = menuObj.children.find((children) => {
          return children.key === currentKey
        })
        if(result) title = result.title
      } else {
        if (menuObj.key ===currentKey) {
          title = menuObj.title
        }
      }
    })

    // 存储当前的title
    this.props.saveTitle(title)
    
  }
  componentWillMount() {
    this.calculateTitle()
  }
  render() {
    const {pathname} = this.props.location //获取路径，无论是展开还是选中，都是从路径中获取的。
    const openedkey = pathname.split('/') //要展开的菜单
    
    let checkedKey = openedkey.slice(-1) //要选中的菜单
    if (openedkey.indexOf('product')!==-1) {
      checkedKey = ['product']
    }
    // console.log(checkedKey);
    
    return (
      <div className='leftNav'>
        <div className='navTop'>
          <img src={logo} alt="" />
          <span>商品管理系统</span>
        </div>
        <div className='navBottom'>
          <div style={{ width: 200 }}>
            <Menu
              selectedKeys={checkedKey} //默认选中哪个菜单
              defaultOpenKeys={openedkey} //默认展开哪个菜单
              mode="inline" //菜单的模式
              theme="dark" //主题颜色
            >
              {this.createMenu(menu)}
          </Menu>
          </div>
        </div>
      </div>
    )
  }
}
export default leftNav