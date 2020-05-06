import React, { Component } from 'react'
import {Button,Modal} from 'antd'
import {
	FullscreenOutlined,
	FullscreenExitOutlined,
	ExclamationCircleOutlined
} from '@ant-design/icons';
import screenfull from 'screenfull'
import { connect } from 'react-redux'
import dayjs from "dayjs";
import { deleteUserInfo } from '@/redux/actions/login'
import { saveTitle } from "@/redux/actions/title";
import demo from './demo.jpg'
import './css/header.less'
import { reqWeatherData } from "../../../api/index";


const { confirm } = Modal;


@connect(
	state => ({
		user: state.userInfo.user,
		title:state.title
	}),//映射状态
	{deleteUserInfo,saveTitle}//映射操作状态的方法
)
class Header extends Component {

	state = {
		isFull:false, //标识是否全屏
		time: dayjs().format('YYYY年MM月DD日 hh:mm:ss'),
		weatherData: {}
	}

	//退出登录
	logout = ()=>{
		confirm({
			title: '确定退出登录吗？', //弹窗的提示文字
			icon: <ExclamationCircleOutlined />, //弹窗中的图标
			content: '退出后需要重新登录', //副标题
			cancelText:'取消',
			okText:'确认',
			onOk:()=> { //确定按钮的回调
				this.props.deleteUserInfo()
				this.props.saveTitle('')
			}
		});
	}

	//全屏/非全屏切换
	fullScreen  = ()=>{
		screenfull.toggle(); //切换全屏
	}
	getWeather = async() => {
		let result = await reqWeatherData()	
		const {dayPictureUrl,weather,temperature} = result
		this.setState({weatherData:{dayPictureUrl,weather,temperature}})
	}

	componentDidMount(){
		//检测屏幕的变化
		screenfull.onchange(()=>{
			const {isFull} = this.state
			this.setState({isFull:!isFull})
		})
		this.time = setInterval(() => {
			this.setState({time:dayjs().format('YYYY年MM月DD日 hh:mm:ss')})
		}, 1000);

		// this.getWeather();
		
	}
	componentWillUnmount() {
		clearInterval(this.time);
	}

	render() {
		const { isFull, time } = this.state
		// const { weatherData }=this.state
		// const { dayPictureUrl, weather, temperature } = weatherData
		
		return (
			<div className="header">
				<div className="header-top">
					<Button size="small" onClick={this.fullScreen}>
						{isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
					</Button>
					<span className="username">欢迎,{this.props.user.username}</span>
					<Button type="link" size="small" onClick={this.logout}>退出登录</Button>
				</div>
				<div className="header-bottom">
					<div className="bottom-left">
						<span>{this.props.title}</span>
					</div>
					<div className="bottom-right">
						<span>{time}</span>
						<img src={demo} alt="天气图片"/>
						<span>多云转晴 </span>
						<span>温度：0~15℃</span>
						{/* <img src={dayPictureUrl} alt="天气图片"/>
						<span>{weather}</span>
						<span>温度：{temperature}</span> */}
					</div>
				</div>
			</div>
		)
	}
}

export default Header

// export default connect(
// 	state => ({
// 		user: state.userInfo.user
// 	}),//映射状态
// 	{deleteUserInfo}//映射操作状态的方法
// )(Header)
