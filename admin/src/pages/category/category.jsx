import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Select, Input, message } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import $myAxios from '../../api/myAxios'
const { Option } = Select;
export default class Category extends Component {
  addFormRef = React.createRef();
  updateFormRef = React.createRef();
  state = {
    loading: false,
    visibleStatus: 0,
    parentId: '0',
    parentName: '',
    categoryList: [],
    subCategoryList: [],
    categoryId: ''
  }
  componentDidMount() {
    this.initColumns()
    this.getCategoryList()
  }
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 300,
        key: 'action',
        render: (row) => (
          <span>
            <Button
              type="link"
              onClick={() => this.showUpdate(row)}
            >修改分类
            </Button>
            {this.state.parentId === '0' ? <Button type="link" onClick={() => this.handleSubCategory(row)}>查看子分类</Button> : null}
          </span>
        )
      }
    ]
  }
  handleCategory = () => {
    this.setState({
      parentId: '0',
      parentName: ''
    })
  }
  handleSubCategory = (row) => {
    this.setState({
      parentId: row._id,
      parentName: row.name
    },
      () => {
        this.getCategoryList()
      }
    )
  }
  getCategoryList = async () => {
    this.setState({
      loading: true
    })
    let res = await $myAxios('listCategoryApi', { parentId: this.state.parentId })
    if (this.state.parentId === '0') {
      this.setState({
        categoryList: res.data,
        loading: false
      })
    } else {
      this.setState({
        subCategoryList: res.data,
        loading: false
      })
    }
  }
  showAdd = () => {
    this.setState({ visibleStatus: 1 })
    this.addFormRef.current.setFieldsValue({ parentId: this.state.parentId })
  }
  showUpdate = (row) => {
    this.setState({ visibleStatus: 2, categoryId: row._id })
    this.updateFormRef.current.setFieldsValue({ categoryName: row.name, categoryId: row._id })
  }
  handleCancel = () => {
    this.setState({ visibleStatus: 0 })
  }
  addCategory = (formValues) => {
    console.log(formValues, this.addFormRef)
    this.addFormRef.current.validateFields()
      .then(values => {
        console.log(values)
        values.isLeaf = values.parentId !== '0'
        $myAxios('addCategoryApi', values).then(res => {
          if (res.status === 0) {
            message.success('操作成功')
            this.getCategoryList()
            this.handleCancel()
            this.addFormRef.current.resetFields()
          } else if (res.status === 1) {
            message.error(res.msg)
          }
        })
      }).catch(errorInfo => {
        console.log(errorInfo)
      })
  }
  updateCategory = () => {
    this.updateFormRef.current.validateFields()
      .then(values => {
        console.log(values)
        console.log(this.updateFormRef.current.getFieldsValue())
        $myAxios('updateCategoryApi', { categoryId: this.state.categoryId, categoryName: values.categoryName }).then(res => {
          if (res.status === 0) {
            message.success('操作成功')
            this.getCategoryList()
            this.handleCancel()
            this.updateFormRef.current.resetFields()
          } else if (res.status === 1) {
            message.error(res.msg)
          }
        })
      }).catch(errorInfo => {
        console.log(errorInfo)
      })
  }
  render() {
    const { parentId, parentName, categoryList, subCategoryList, visibleStatus, loading } = this.state
    const title = parentId === '0' ? '一级分类列表' : <><Button type="link" onClick={this.handleCategory}>一级分类列表</Button><ArrowRightOutlined /><span>  {parentName}分类列表</span></>
    const extra = <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={this.showAdd}
    >添加</Button>
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            loading={loading}
            rowKey={'_id'}
            dataSource={parentId === '0' ? categoryList : subCategoryList}
            columns={this.columns}
            pagination={{
              defaultPageSize: 10,
              showQuickJumper: true,
              showSizeChanger: true
            }}
          />
        </Card>
        <Modal
          title="添加分类"
          forceRender
          visible={visibleStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <Form ref={this.addFormRef} initialValues={{ parentId }}>
            <Form.Item name="parentId" label="所属分类" rules={[{ required: true, message: '必选' }]}>
              <Select>
                <Option value="0">一级分类</Option>
                {
                  categoryList.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                }
              </Select>
            </Form.Item>ß
            <Form.Item name="categoryName" label="分类名称" rules={[{ required: true, whitespace: true, message: '分类名称必须填写' }]}>
              <Input placeholder="请输入分类名称" />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="修改分类"
          forceRender
          visible={visibleStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <Form ref={this.updateFormRef} initialValues={{ categoryName: "", categoryId: '' }}>
            <Form.Item name="categoryName" label="分类名称" rules={[{ required: true, whitespace: true, message: '分类名称必须填写' }]}>
              <Input placeholder="请输入分类名称" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
