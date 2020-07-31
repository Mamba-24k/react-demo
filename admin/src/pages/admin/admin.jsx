import React, { Component } from 'react'
import { Redirect, Link, Route, Switch } from 'react-router-dom'
import './admin.less'
import { Layout } from 'antd';
import Header from '../../components/admin/header'
import Sidebar from '../../components/admin/sideBar'
import BreadRoutes from '../../components/admin/breadcrumb'
import logo from '../../assets/images/logo.png'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import { connect } from 'react-redux'

const { Content, Footer, Sider } = Layout;

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }
  currentOpen = ''
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    // const userInfo = JSON.parse(localStorage.userInfo || '{}')
    const userInfo = this.props.userInfo || {}
    if (!userInfo || !userInfo._id) {
      return <Redirect to='/login'></Redirect>
    }
    return (
      <div className="admin-box">
        <Layout style={{ minHeight: '100%' }}>
          <Sider
            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <Link to='/' className="login-header">
              <img src={logo} alt="logo" />
              <h1>管理系统</h1>
            </Link>
            <Sidebar {...this.props}></Sidebar>
          </Sider>
          <Layout className={this.state.collapsed ? "side-fold" : 'side-nofold'}>
            <Header {...this.props} />
            <Content style={{ margin: '0 16px 0', overflow: 'initial' }}>
              <BreadRoutes currentPath={this.props.location.pathname}></BreadRoutes>
              <div className="site-layout-background" style={{ background: '#fff' }}>
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/category' component={Category} />
                  <Route path='/product' component={Product} />
                  <Route path='/user' component={User} />
                  <Route path='/role' component={Role} />
                  <Route path='/bar' component={Bar} />
                  <Route path='/line' component={Line} />
                  <Route path='/pie' component={Pie} />
                  <Redirect to='/'></Redirect>
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default connect(
  state => ({userInfo : state.user}),
  {}
)(Admin) 