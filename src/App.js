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

// 装饰器语法

// 需要安装一个解析装饰器语法的库
// yarn add -s @babel/plugin-proposal-decorators

// 情况1: 装饰器函数没有return
// 该函数没有return(代码中没有写return,不管默认的return)
// function demo(target) {
//   target.a = 1
//   target.b = 2
// }


// 使用装饰器语法:
// @demo
// class MyClass{ }

// console.dir(MyClass)

// 注意:
// 装饰器语法格式固定如下：
// @装饰器函数
// class 需要被装饰的类{}
// 他们会被认为是一个整体


// 上方的代码, 会被翻译成如下代码：
// class MyClass{ }
// demo(MyClass)

// console.dir(MyClass)

// 即:装饰器函数没有返回值时,则装饰器函数会把a和b添加给被装饰的类


// 情况2: 装饰器函数有return
// 该函数有return
// function demo(target) {
//     target.a = 1
//     target.b = 2
//     return 100
// }
  
// 使用装饰器语法:
// @demo
// class MyClass{ }

// console.log(MyClass.a);//undefined
// console.log(MyClass.b);//undefined
// console.log(MyClass);//100

// 由于上方的装饰器函数有返回值，所以上方的代码, 会被翻译成如下代码：
// class MyClass{ }
// MyClass=demo(MyClass)

// console.log(MyClass)

// 即:装饰器函数有返回值时,则装饰器函数会把返回值赋值给被装饰的类
// 此时装饰器函数返回的是什么，被装饰的类就会被赋值为什么


// 情况3：装饰器是另外一个函数的返回值

// function test() {
//   function demo(target) {
//     target.a = 1;
//     target.b = 2;
//     return target
//   }
//   return demo
// }

// 使用装饰器语法:
// @test()
// class MyClass{ }

// console.dir(MyClass);

// 上方的代码, 会被翻译成如下代码：
// class MyClass{ }
// test()(MyClass)

// console.dir(MyClass)
