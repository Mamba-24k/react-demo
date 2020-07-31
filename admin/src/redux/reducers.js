import { combineReducers } from 'redux'
// import {combineReducers} from '../lib/my-redux'

import { INCREASR, DECREASE, SET_HEAD_TITLE, SET_USER, CLEAR_USER } from './action-types'


function count(state = 0, action) {
  // console.log('count', state, action)
  switch (action.type) {
    case INCREASR:
      return state + action.data
    case DECREASE:
      return state - action.data
    default:
      return state
  }
}
function headTitle(state = '首页', action) {
  // console.log('headTitle', state, action)
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}
let userInfo = JSON.parse(localStorage.userInfo || '{}')
function user(state = userInfo, action) {
  // console.log('user', state, action)
  switch (action.type) {
    case SET_USER:
      return action.data
    case CLEAR_USER:
      return {}
    default:
      return state
  }
}
export default combineReducers({
  count,
  headTitle,
  user
})