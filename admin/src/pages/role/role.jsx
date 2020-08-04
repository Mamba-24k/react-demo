import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import $myAxios from '../../api/myAxios'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import SetRoleAuth from './setRoleAuth'

class Role extends Component {
  addFormRef = React.createRef();
  treeFormRef = React.createRef();
  state = {
    loading: false,
    rolesList: [],
    role: {},
    isShowAdd: false,
    isShowSet: false
  }
  componentDidMount() {
    this.initCloums()
    this.getRolesList()
  }
  initCloums = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: create_time => dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: auth_time => auth_time ? dayjs(auth_time).format('YYYY-MM-DD HH:mm:ss') : ''
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
      // {
      //   title: '操作',
      //   width: 100,
      //   render: (row) => (
      //     <span>
      //       <Button type="link" onClick={() => this.handleDelete(row)}>删除</Button>
      //     </span>
      //   ),
      // },
    ]
  }
  getRolesList = async () => {
    let res = await $myAxios('listRoleApi')
    this.setState({
      rolesList: res.data
    })
  }
  handleDelete = (role) => {
    Modal.confirm({
      title: `是否确认删除角色${role.name}`,
      onOk: async () => {
        let res = await $myAxios('deleteRoleApi', { _id: role._id })
        if (res.status === 0) {
          message.success('删除用户成功')
          this.getUsersList()
        }
      }
    })
  }
  createRole = () => {
    this.addFormRef.current.validateFields()
      .then(async values => {
        let res = await $myAxios('addRoleApi', values)
        if (res.status === 0) {
          this.setState({ isShowAdd: false })
          this.getRolesList()
        }
      })
  }
  setRole = async () => {
    const { role } = this.state
    let menus = this.treeFormRef.current.getMenus()
    role.menus = menus
    // console.log(localStorage.userInfos)
    // role.auth_name = JSON.parse(localStorage.userInfos || '{}').username
    role.auth_name = this.props.userInfos&&this.props.userInfos.username
    let res = await $myAxios('updateRoleApi', role)
    if (res.status === 0) {
      message.success('设置角色权限成功')
      // this.getRolesList()
      this.setState(state => ({
        rolesList: [...state.rolesList],
        isShowSet: false
      }))
    }
  }
  onRow = (role) => {
    return {
      onClick: e => {
        this.setState({
          role
        })
      }
    }
  }
  render() {
    const { rolesList, role, loading, isShowAdd, isShowSet } = this.state
    const title = <>
      <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}><PlusOutlined/>创建角色</Button>&nbsp;&nbsp;
      <Button type="primary" onClick={() => this.setState({ isShowSet: true })} disabled={!role._id}>设置角色权限</Button></>
    return (
      <div>
        <Card title={title}>
          <Table
            bordered
            loading={loading}
            rowKey={'_id'}
            rowSelection={{ 
              type: 'radio', 
              selectedRowKeys: [role._id],
              onSelect: (role) => {
                this.setState({role})
              }
             }}
            dataSource={rolesList}
            columns={this.columns}
            pagination={{
              defaultPageSize: 10,
              showQuickJumper: true,
              showSizeChanger: true
            }}
            onRow={this.onRow}
          />
          <Modal
            title="创建角色"
            visible={isShowAdd}
            onOk={this.createRole}
            onCancel={() => this.setState({ isShowAdd: false })}
          >
            <Form ref={this.addFormRef} initialValues={{ roleName: "" }}>
              <Form.Item name="roleName" label="角色名称" rules={[{ required: true, whitespace: true, message: '角色名称必须填写' }]}>
                <Input placeholder="请输入角色名称" />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="设置角色权限"
            visible={isShowSet}
            onOk={this.setRole}
            onCancel={() => this.setState({ isShowSet: false })}
          >
            <SetRoleAuth ref={this.treeFormRef} role={role}></SetRoleAuth>
          </Modal>
        </Card>
      </div>
    )
  }
}
export default connect(
  state => ({userInfos: state.user}),
  {}
)(Role)