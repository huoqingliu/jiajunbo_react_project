import React, { Component } from 'react'
import { Card, Button, List, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
// import { reqCurrentProduct } from "@/api/index";
import './css/AddUpdata.less'
import PictureWall from "./PictureWall/PictureWall";
import RichText from "./RichText/RichText";



const { Item } = List
export default class AddUpdate extends Component {

  render() {
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
              <span>000</span>
            </Item>
            <Item className='item'>
              <span className="title">商品描述:</span>
              <span>000</span>
            </Item>
            <Item className='item'>
              <span className="title">商品价格:</span>
              <span>000</span>
            </Item>
            <Item className='item'>
              <span className="title">商品内容:</span>
              <PictureWall/>
            </Item>
            <Item className='item'>
              <RichText/>
            </Item>
            
          </List>
        </Card>
      </div>
    )
  }
}
