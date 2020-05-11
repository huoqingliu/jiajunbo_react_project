import React, { Component } from 'react'
import { Card, Button, List, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqCurrentProduct } from "@/api/index";
import './css/detail.less'
import { IMAGE_BASE_URL } from "@/config";
const { Item } = List
export default class Detail extends Component {
  state = {
    product:{imgs:[]},
    id: this.props.match.params.id,
  }

  getCurrentProduct=async (id)=>{
    const result = await reqCurrentProduct(id)
    // console.log(result);
    const { status, data, msg } = result
    if (status === 0) {
      // console.log(data);
      this.setState({product:data})
      this.setState({ name: status })
    } else {
      message.error(msg)
    }
  }

  componentWillMount() {
    this.getCurrentProduct(this.state.id)
  }
  render() {
    // console.log(this.state.product);
    
    const { name, desc, price, detail, imgs } = this.state.product
    return (
      <div>
        <Card
          title={
            <div>
              <Button
                type='link'
                onClick={() => {
                  this.props.history.goBack()
                }}>
                <ArrowLeftOutlined />
              返回
            </Button>
              <span>商品详情</span>
            </div>
          }
        >
          <List className='list'>
            <Item className='item'>
              <span className="title">商品名称:</span>
              <span>{name}</span>
            </Item>
            <Item className='item'>
              <span className="title">商品描述:</span>
              <span>{desc}</span>
            </Item>
            <Item className='item'>
              <span className="title">商品价格:</span>
              <span>{price}</span>
            </Item>
            <Item className='item'>
              <span className="title">商品图片:</span>
              {
                imgs.map((imgName)=>{
                  return <img key={imgName} src={IMAGE_BASE_URL+imgName} alt="product"/>
                })
              }
            </Item>
            <Item className='item'>
              <span className="title">商品内容:</span>
              <span dangerouslySetInnerHTML={{__html:detail}}/>
            </Item>
          </List>
        </Card>
      </div>
    )
  }
}
