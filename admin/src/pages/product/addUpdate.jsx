
import React, { Component } from 'react'
import { Card, Button, Form, Cascader, Input, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import $myAxios from '../../api/myAxios'
import UploadFile from '../../components/product/uploadFile'
import RichTextEditor from '../../components/product/richTextEditor'

const { TextArea } = Input
const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
}
const validPrice = (rule, value, callback) => {
  if (value * 1 > 0) {
    return Promise.resolve();
  } else {
    return Promise.reject('价格必须大于0');
  }
}
class addUpdate extends Component {
  productFormRef = React.createRef();
  uploadRef = React.createRef();
  editorRef = React.createRef();
  constructor(props) {
    super(props)
    this.state = {
      options: []
    }
  }
  productInfo = this.props.location.state
  componentDidMount() {
    console.log(this.productInfo)
    this.getCategoryList('0')
  }
  getCategoryList = async (parentId) => {
    let res = await $myAxios('listCategoryApi', { parentId })
    let Opt = res.data
    if (parentId === '0') {
      this.setState({
        options: Opt
      })
      if (this.productInfo) {
        this.productFormRef.current.setFieldsValue(this.productInfo)
        let categorys = []
        if (this.productInfo.pcategoryId === '0') {
          categorys.push(this.productInfo.categoryId)
        } else {
          categorys.push(this.productInfo.pcategoryId)
          categorys.push(this.productInfo.categoryId)
          let subOpt = await this.getCategoryList(this.productInfo.pcategoryId)
          let target = Opt.find(v => v._id === this.productInfo.pcategoryId)
          console.log(target)
          target.children = subOpt
        }
        this.productFormRef.current.setFieldsValue({ categorys })
      }
    } else {
      return Opt
    }
  }
  onFinish = () => {
    this.productFormRef.current.validateFields()
      .then(values => {
        console.log(values)
        if (values.categorys.length === 1) {
          values.pcategoryId = '0'
          values.categoryId = values.categorys[0]
        } else {
          values.pcategoryId = values.categorys[0]
          values.categoryId = values.categorys[1]
        }
        values.imgs = this.uploadRef.current.getImgs()
        values.detail = this.editorRef.current.getDetail()
        if (this.productInfo) {
          values._id = this.productInfo._id
        }
        let url = this.productInfo ? 'updateProductApi' : 'addProductApi'
        $myAxios(url, values).then(res => {
          console.log(res)
          if (res.status === 0) {
            message.success('操作成功')
            this.props.history.goBack()
          } else if (res.status === 1) {
            message.error(res.msg)
          }
        })
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }
  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  }
  loadData = async selectedOptions => {
    console.log(selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true
    let opt = await this.getCategoryList(targetOption._id)
    targetOption.loading = false
    if (opt && opt.length > 0) {
      targetOption.children = opt
    } else {
      targetOption.isLeaf = true
    }
    this.setState({
      options: [...this.state.options],
    })
  };
  render() {
    const title = (
      <span>
        <ArrowLeftOutlined style={{ color: '#1DA57A', fontSize: 20, marginRight: 10 }} onClick={() => this.props.history.goBack()} />
        <span>添加商品</span>
      </span>
    )
    const { imgs, detail } = this.productInfo || {}
    console.log( imgs, detail )
    return (
      <Card title={title}>
        <Form {...layout} ref={this.productFormRef} initialValues={{}} onFinish={this.onFinish}>
          <Form.Item name="name" label="商品名称" hasFeedback rules={[{ required: true, whitespace: true, message: 'Please input your Username!' }]}>
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item name="desc" label="商品描述" hasFeedback rules={[{ required: true, whitespace: true, message: 'Please input your Username!' }]}>
            <TextArea
              placeholder="请输入商品描述"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item name="price" label="商品价格" rules={[{ required: true, validator: validPrice }]}>
            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
          </Form.Item>
          <Form.Item name="categorys" label="商品分类" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Cascader
              fieldNames={{ label: 'name', value: '_id', children: 'children' }}
              options={this.state.options}
              loadData={this.loadData}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item label="商品图片" hasFeedback rules={[{ required: true, whitespace: true, message: 'Please input your Username!' }]}>
            <UploadFile ref={this.uploadRef} imgs={imgs}></UploadFile>
          </Form.Item>
          <Form.Item label="商品详情" hasFeedback rules={[{ required: true, whitespace: true, message: 'Please input your Username!' }]}>
            <RichTextEditor ref={this.editorRef} detail={detail}></RichTextEditor>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default addUpdate;