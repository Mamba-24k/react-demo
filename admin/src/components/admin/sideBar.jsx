import React, {
  // useState, 
  // useEffect
} from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'antd';

import { connect } from 'react-redux'
import { setHeadTitle } from '../../redux/actions'
import menuList from '../../assets/js/menuConfig'

const { SubMenu } = Menu;
const getIsAuth = (item, props) => {

  let { key, isPublic } = item
  // let userInfo = JSON.parse(localStorage.userInfo || "{}")
  const userInfo = props.userInfo || {}
  let userName = userInfo.username
  let menus = userInfo.role_id ? userInfo.role_id.menus : []
  if (userName === 'admin' || isPublic || menus.indexOf(key) !== -1) {
    return true
  } else if (item.children) {
    let findObj = item.children.find(v => menus.indexOf(v.key) !== -1)
    return !!findObj
  }
  return false
}
const getMenuNodes = (List, props) => {

  let currentPath = props.location.pathname
  return List.map(item => {
    let isAuth = getIsAuth(item, props)
    if (!isAuth) {
      return false
    }
    if (!item.children) {
      if (item.key === currentPath) {
        props.setHeadTitle(item.title)
      }
      return <Menu.Item key={item.key} icon={item.icon} onClick={() => props.setHeadTitle(item.title)}>
        <Link to={item.key}>{item.title}</Link>
      </Menu.Item>
    } else {
      let menu = item.children.find(e => currentPath.indexOf(e.key) === 0)
      if (menu) {
        props.setHeadTitle(menu.title)
        // this.currentOpen = item.key
        // console.log('currentOpen', this.currentOpen)
      }
      return <SubMenu key={item.key} icon={item.icon} title={item.title}>
        {getMenuNodes(item.children,props)}
      </SubMenu>
    }
  })
}
const getOpenKey = (path) => {
  let openKey = ''
  menuList.forEach(item => {
    if (item.children) {
      let menu = item.children.find(e => e.key === path)
      if (menu) {
        openKey = item.key
      }
    }
  })
  return openKey
}

const sideBar = (props) => {
  console.log(props)
  let currentPath = props.location.pathname
  if (currentPath.indexOf('/product') === 0) {
    currentPath = '/product'
  }
  return (
    <Menu theme="dark" mode="inline" selectedKeys={[currentPath]} defaultOpenKeys={[getOpenKey(currentPath)]}>
      {getMenuNodes(menuList, props)}
    </Menu>
  )
}
export default connect(
  state => ({}),
  { setHeadTitle }
)(sideBar)