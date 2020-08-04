import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'

// import $myAxios from '../../api/myAxios'

import './login.less'
import logo from '../../assets/images/mamba.png'
import { asyncSetUser } from '../../redux/actions'

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
const Login = (props) => {
  // const userInfos = JSON.parse(localStorage.userInfos || '{}')
  const userInfos = props.userInfos || {}
  if (userInfos && userInfos._id) {
    return <Redirect to='/'></Redirect>
  }
  const [form] = Form.useForm()
  const onFinish = formValues => {
    console.log(form)
    console.log(formValues)
    form.validateFields().then(values => {
        console.log(values)
        props.asyncSetUser(values)
        // $myAxios('loginApi', values).then(res => {
        //   if (res.status === 0) {
        //     message.success('登陆成功')
        //     localStorage.userInfos = JSON.stringify(res.data)
        //     props.history.replace('/')
        //   } else if (res.status === 1) {
        //     message.error(res.msg)
        //   }
        // })
      }).catch(errorInfo => {
        console.log(errorInfo)
      })
  }
  return (
    <div className="login-box">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登陆</h2>
        <Form className="login-form" form={form} onFinish={onFinish}>
          <Form.Item name="username" hasFeedback rules={[{ required: true, whitespace: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" hasFeedback rules={[{ required: true, whitespace: true, validator: validPassWord }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}
export default connect(
  state => ({userInfos: state.user}),
  {asyncSetUser}
)(Login) 