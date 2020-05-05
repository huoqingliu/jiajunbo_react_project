import React, { Component } from 'react'
import logo from "@/assets/img/logo.png";
import { Menu } from 'antd';
import menu from "@/config/menu_config";
import "./leftNav.less";

const { SubMenu, Item } = Menu;
export default class leftNav extends Component {
  createMenu = (MenuArr) => {
    return MenuArr.map((menuObj) => {
      if (!menuObj.children) {
        return (
          <Item key={menuObj.key} icon={<menuObj.icon />}>
            {menuObj.title}
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
  render() {
    return (
      <div className='leftNav'>
        <div className='navTop'>
          <img src={logo} alt="" />
          <span>商品管理系统</span>
        </div>
        <div className='navBottom'>
          <div style={{ width: 200 }}>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
            >
              {this.createMenu(menu)}
          </Menu>
          </div>
        </div>
      </div>
    )
  }
}
