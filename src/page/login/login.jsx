import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from "../../api/index";

import "./css/login.less";
import Logo from "./img/logo.png";


const {Item} =Form
// Form.Item简写为：Item
export default class Login extends Component {
  // 表单验证成功后才触发onFinish
  onFinish = async values => {
    // console.log('Received values of form: ', values);
    const result = await reqLogin(values)
    console.log(result);
    
  };

/* 用户名/密码的的合法性要求
            1). 必须输入
            2). 必须大于等于4位
            3). 必须小于等于12位
            4). 必须是英文、数字、下划线组成 */
  
  // verify在输入框有内容输入时触发，校验密码
  verify = (_, values) => {
    // 创建errArr为数组，并把触发的问题push到数组中
    let errArr = []
    if (values.length>13) errArr.push('密码必须小于13位！')
    if (values.length<=4) errArr.push('密码必须大于4位！')
    if (!values.trim()) errArr.push('密码不能为空！')
    if (! /^\w+$/.test(values)) errArr.push('密码必须为是字母,数字或下划线组成！')
    if (errArr.length === 0) {
      //输出成功的promise
      return Promise.resolve()
    } else {
      //输出失败的promise，并把errArr作为参数
      return Promise.reject(errArr)
    }
  }
  render() {
    return (
      <div className='login'>
        <header>
          <img src={Logo} alt="logo" />
          <h1>后台管理系统</h1>
        </header>
        <div className='panel'>
          <h2>用户登录</h2>
          {/* 使用antd的form组件 */}
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Item
              name="username"
              // 校验规则，设置字段的校验逻辑
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
                {
                  whitespace: true,
                  message: '用户名不能为空！'
                },
                {
                  max: 12,
                  message: '用户名长度最大为12位字符！'
                },
                {
                  min: 4,
                  message: '用户名长度最小为4位字符！'
                },
                {
                  pattern: /^\w+$/,
                  message: '用户名必须是字母,数字或下划线组成！'
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Item>
            <Item
              name="password"
              // 自定义校验，接收 Promise 作为返回值 
              rules={[
                {
                  validator: this.verify
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Item>

            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}
