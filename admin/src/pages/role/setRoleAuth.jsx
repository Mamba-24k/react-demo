import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd'

import menuList from '../../assets/js/menuConfig'
const { Item } = Form
// const { TreeNode } = Tree
export default class SetRoleAuth extends Component {
  constructor(props) {
    super(props)
    const { menus } = this.props.role || {}
    this.state = {
      checkedKeys: menus || []
    }
  }
  // static getDerivedStateFromProps(props, state) {
  //   // render之前调用 
  //   console.log('getDerivedStateFromProps', props, state)
  //   state.checkedKeys = props.role.menus
  // }
  UNSAFE_componentWillReceiveProps(nextProps) { // props 更新
    this.setState({
      checkedKeys: nextProps.role.menus
    })
  }
  componentDidMount() {
    // this.menuList = this.getMenuNodes(menuList)
  }
  // getMenuNodes = List => {
  //   return List.map(item => {
  //     return <TreeNode title={item.title} key={item.key}>
  //       {item.children ? this.getMenuNodes(item.children) : null}
  //     </TreeNode>
  //   })
  // }
  onCheck = (checkedKeys) => {
    console.log(checkedKeys)
    this.setState({ checkedKeys })
  }
  getMenus = () => {
    return this.state.checkedKeys
  }
  render() {
    const { role } = this.props
    const { checkedKeys } = this.state
    return (
      <div>
        <Item label="角色名称">
          <Input value={role.name} disabled />
        </Item>
        <Item label="平台权限">
          <Tree
            checkable
            defaultExpandAll={true}
            checkedKeys={checkedKeys}
            treeData={menuList}
            onCheck={this.onCheck}
          >
            {/* <TreeNode title="平台权限" key="all">
              {this.menuList}
            </TreeNode> */}
          </Tree>
        </Item>
      </div>
    )
  }
}
