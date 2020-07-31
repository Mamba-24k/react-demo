import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import List from './list'
import AddUpdate from './addUpdate'

export default class Product extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/product' exact component={List}></Route>
          <Route path='/product/addUpdate' component={AddUpdate}></Route>
          <Redirect to="/product"></Redirect>
        </Switch>
      </div>
    )
  }
}