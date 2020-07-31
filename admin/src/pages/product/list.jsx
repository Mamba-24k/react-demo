import React, { Component } from 'react'
import { Card, Button, Input, Table, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import $myAxios from '../../api/myAxios'

const { Option } = Select;
class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0,
      pageNum: props.pageNum || 1,
      pageSize: props.pageSize || 1,
      loading: false,
      productList: [],
      searchType: 'productName',
      searchName: ''

    }
  }
  componentDidMount() {
    this.initColunms()
    this.getProductList()
  }
  initColunms = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: price => '¥' + price
      },
      {
        title: '状态',
        width: 100,
        render: (row) => {
          let { _id, status } = row
          return (
            <span>
              <Button type="primary" onClick={() => this.handleSaleStatus(_id, status === 1 ? 2 : 1)}>{status === 1 ? '下架' : '上架'}</Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (row) => (
          <span>
            <Button type="link" onClick={() => this.props.history.push('/product/addUpdate', row)}>修改</Button>
            <Button type="link" onClick={() => this.props.history.push('/product/addUpdate', row)}>详情</Button>
          </span>
        ),
      },
    ]
  }
  // getProductList = async (pageNum=1, pageSize=1) => {
  //   this.setState({
  //     loading: true
  //   })
  //   let res = await $myAxios('listProductApi', { pageNum, pageSize })
  //   this.setState({
  //   productList: res.data.list,
  //   pageNum,
  //   pageSize,
  //   total: res.data.total,
  //   loading: false
  //   })
  // }
  getProductList = async (pageNum = 1, pageSize = 1) => {
    this.setState({
      loading: true,
    })
    const { searchType, searchName } = this.state
    let params = {
      pageNum,
      pageSize,
      [searchType]: searchName
    }
    let res = await $myAxios('searchListProductApi', params)
    if (res.status === 0) {
      this.setState({
        productList: res.data.list,
        pageNum,
        pageSize,
        total: res.data.total,
        loading: false
      })
    } else {
      message.error(res.msg)
    }

  }
  handleSaleStatus = async (productId, status) => {
    let res = await $myAxios('productStatusApi', { productId, status })
    if (res.status === 0) {
      this.getProductList()
    }
  }
  render() {
    const { productList, loading, pageNum, pageSize, total, searchType, searchName } = this.state
    const title = (
      <span>
        <Select value={searchType}
          style={{ width: 130 }}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称来搜索</Option>
          <Option value="productDesc">按描述来搜索</Option>
        </Select>
        <Input value={searchName} placeholder='关键字'
          onChange={e => this.setState({ searchName: e.target.value })}
          style={{ width: 200, margin: '0 15px' }}
        ></Input>
        <Button type="primary" onClick={() => this.getProductList()}>搜索</Button>
      </span>
    )
    const extra = <Button type="primary" icon={<PlusOutlined />} onClick={() => this.props.history.push('/product/addUpdate')}>添加</Button>
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            pagination={{
              current: pageNum,
              pageSize,
              showQuickJumper: true,
              showSizeChanger: true,
              total: total,
              onChange: this.getProductList
            }}
            loading={loading}
            rowKey={'_id'}
            dataSource={productList}
            columns={this.columns}

          />
        </Card>
      </div>
    )
  }
}

export default List