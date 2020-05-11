import React, { Component } from 'react'
import { Card, Table, Input, Button,Select,message} from "antd";
import { PlusCircleOutlined,SearchOutlined } from '@ant-design/icons';
import { reqGoodsList ,reqSeacrch,reqUpdateGoodsStatus} from "@/api/index";
import { PAGE_SIZE } from "@/config";


const {Option} =Select
export default class Product extends Component {
	state = {
		GoodsList:[], //商品数据
		total:0,//数据总数
		pageNum:0,//当前是第几页
		searchType:'productName',//搜索方式(默认值是按名称搜)
		keyWord: '',//搜索的关键字
		isLoding: true
	}

	getGoodsList = async (pageNumber = 1) => {
		let result
		if (this.isSearch) {
			// 如果是搜索，就发送搜索的请求
			const {searchType,keyWord} = this.state
			result = await reqSeacrch(searchType,keyWord,pageNumber,PAGE_SIZE )
		} else {
		// 如果是获取商品列表，就发送获取商品列表的请求
			result = await reqGoodsList(pageNumber,PAGE_SIZE )
		}
		// console.log(result);
		const { status, data, msg } = result
		if (status === 0) {
			const { list, total, pageNum } = data
			this.setState({ GoodsList:list, total:total, pageNum:pageNum});
		} else {
			message.error(msg)
		}
		this.setState({isLoding:false})
	}

	changeStatus = async (_id, currentStatus) => {
		if (currentStatus===1) currentStatus=2
		else currentStatus=1
		
		let result = await reqUpdateGoodsStatus(_id, currentStatus)
		
		if (result.status ===0) {
			message.success(currentStatus === 1 ? '上架成功' : '下架成功')
			this.getGoodsList(this.state.pageNum)
		} else {
			message.warning(result.msg)
		}
		// console.log(this.state.GoodsList);
		// console.log(_id, currentStatus);
		
		
	}
	componentWillMount() {
		this.getGoodsList()
	}

	render() {
		const {GoodsList} = this.state
		const columns= [
			{
				title: '商品名称',
				dataIndex: 'name',
				key: 'name',
				render: text => <a>{text}</a>,
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
				key: 'desc',
			},
			{
				title: '价格',
				dataIndex: 'price',
				key: 'price',
				render:(price)=>'￥'+price
			},
			{
				title: '状态',
				// dataIndex: 'status',
				key: 'status',
				align:'center',
				render: (productObj) => {
					const {_id,status} = productObj
					return (
						<div>
							<Button type={status === 1 ? 'danger' : 'primary'} onClick={()=>this.changeStatus(_id,status)}>
									{status === 1 ? '下架' : '上架'}
							</Button><br/>
							<span>{status === 1 ? '在售' : '售罄'}</span>
						</div>
					)
				}
			},
			{
				title: '操作',
				dataIndex: '_id',
				key: 'action',
				align:'center',
				render:(id)=> (
					<div>
							
						<Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${id}`)}} >详情</Button><br/>
							
						<Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/updata/${id}`)}}>修改</Button>
					</div>
				)
			},
		]
		return (
			<Card
				title={
					<div>
						<Select 
							onChange= {value => this.setState({searchType:value})} 
							defaultValue="productName"
						>
							<Option value="productName">按名称搜索</Option>
							<Option value="productDesc">按描述搜索</Option>
						</Select>
						<Input 
							onChange= {event => this.setState({keyWord:event.target.value})}
							placeholder="搜索商品"
							allowClear
							style={{ width: "30%"}}
						/>
						<Button
							onClick={()=>{
								this.isSearch = true //标识当前动作为搜索
								this.getGoodsList() 
							}}
							type="primary">
							<SearchOutlined />
							搜索
						</Button>
					</div>
				}

				extra={
					<Button type="primary" onClick={()=>{
						this.props.history.push('/admin/prod_about/product/add')
					}}>
						<PlusCircleOutlined />
						添加
    			</Button>
				}
			>
				<Table
					columns={columns}//表格列配置
					dataSource={GoodsList}//表格的数据源
					bordered //边框
					rowKey="_id" //指定唯一值对应项
					loading={this.state.isLoding}
					pagination={{
						total: this.state.total,//数据总数
						pageSize: PAGE_SIZE,//每页多大
						current: this.state.pageNum, //当前是第几页
						onChange: (pageNumber) => { //页码改变的回调
							this.getGoodsList(pageNumber)
						}
					}}
				/>
			</Card>
		)
	}
}
