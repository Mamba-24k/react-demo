import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Select, Input, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import $myAxios from '../../api/myAxios'
import dayjs from 'dayjs'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
const { Option } = Select
const validPassWord = (rule, value, callback) => {
  if (!value) {
    // callback('密码必须输入') callback  4.0 已弃用
    return Promise.reject('密码必须输入');
  } else if (value.length < 4) {
    // callback('密码长度不能小于4位')
    return Promise.reject('密码长度不能小于4位');
  } else if (value.length > 12) {
    // callback('密码长度不能大于12位')
    return Promise.reject('密码长度不能大于12位');
  } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    // callback('密码必须是英文、数字或下划线组成')
    return Promise.reject('密码必须是英文、数字或下划线组成');
  } else {
    return Promise.resolve();
    // callback()
  }
}
export default class User extends Component {
  addFormRef = React.createRef();
  treeFormRef = React.createRef();
  state = {
    loading: false,
    usersList: [],
    user: {},
    rolesList: [],
    isShowAdd: false
  }
  componentDidMount() {
    this.initColumns()
    this.getUsersList()
  }
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: create_time => dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: role_id => this.state.rolesList.find(v => v._id === role_id).name
      },
      {
        title: '操作',
        width: 100,
        render: (row) => (
          <span>
            <Button type="link" onClick={() => this.showUpdate(row)}>修改</Button>
            <Button type="link" onClick={() => this.handleDelete(row)}>删除</Button>
          </span>
        ),
      },
    ]
  }
  getUsersList = async () => {
    let res = await $myAxios('listUserApi')
    this.setState({
      usersList: res.data.users,
      rolesList: res.data.roles
    })
  }
  showAdd = () => {
    this.setState({ isShowAdd: true, user: {} })
    this.addFormRef.current.resetFields()
  }
  showUpdate = (user) => {
    this.setState({
      user,
      isShowAdd: true
    })
    this.addFormRef.current.setFieldsValue(user)
  }
  handleSubmit = () => {
    this.addFormRef.current.validateFields()
      .then(async values => {
        this.setState({loading: true})
        let url = this.state.user._id ? 'updateUserApi' : 'addUserApi'
        if (this.state.user._id) {
          values._id = this.state.user._id
        }
        let res = await $myAxios(url, values)
        if (res.status === 0) {
          this.setState({ isShowAdd: false,isShowSet: false,loading: false })
          this.getUsersList()
        }
      })
  }
  handleDelete = (user) => {
    Modal.confirm({
      title: `是否确认删除用户${user.username}`,
      onOk: async () => {
        let res = await $myAxios('deleteUserApi', { userId: user._id })
        if (res.status === 0) {
          message.success('删除用户成功')
          this.getUsersList()
        }
      }
    })
  }
  render() {
    const { usersList, loading, isShowAdd, rolesList, user } = this.state
    const title = <Button type="primary" onClick={this.showAdd}><PlusOutlined/>创建用户</Button>
    return (
      <div>
        <Card title={title}>
          <Table
            bordered
            loading={loading}
            rowKey={'_id'}
            dataSource={usersList}
            columns={this.columns}
            pagination={{
              defaultPageSize: 10,
              showQuickJumper: true,
              showSizeChanger: true
            }}
          />
          <Modal
            title={user._id ? "修改用户" : "创建用户"}
            forceRender
            visible={isShowAdd}
            onOk={this.handleSubmit}
            onCancel={() => this.setState({ isShowAdd: false })}
          >
            <Form {...layout} ref={this.addFormRef} initialValues={{}}>
              <Form.Item label="用户名" name="username" hasFeedback rules={[{ required: true, whitespace: true, message: 'Please input your Username!' }]}>
                <Input placeholder="Username" />
              </Form.Item>
              {user._id ? null : <Form.Item label="密码" name="password" hasFeedback rules={[{ required: true, whitespace: true, validator: validPassWord }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>}
              <Form.Item label="手机号" name="phone" hasFeedback rules={[{ required: true, whitespace: true, message: 'Please input your Username!' }]}>
                <Input placeholder="Phone" />
              </Form.Item>
              <Form.Item label="邮箱" name="email" hasFeedback rules={[{ required: true, whitespace: true, message: 'Please input your Username!' }]}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="角色" name="role_id" hasFeedback rules={[{ required: true, whitespace: true, message: 'Please input your Username!' }]}>
                <Select placeholder="请选择">
                  {
                    rolesList.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                  }
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    )
  }
}