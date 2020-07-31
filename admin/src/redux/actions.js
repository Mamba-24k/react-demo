import { INCREASR, DECREASE, SET_HEAD_TITLE,SET_USER,CLEAR_USER } from './action-types'
import $myAxios from '../api/myAxios'
import { message } from 'antd';
export const increase = number => ({ type: INCREASR, data: number })
export const decrease = number => ({ type: DECREASE, data: number })
export const asyncIncrease = number => {
  return dispatch => {
    setTimeout(() => {
      dispatch(increase(number))
    }, 1000)
  }
}
export const setHeadTitle = title => ({ type: SET_HEAD_TITLE, data: title })
export const setUser = user => ({ type: SET_USER, data: user })
export const clearUser = user => {
  localStorage.removeItem('userInfo')
  return { type: CLEAR_USER, data: user }
}
export const asyncSetUser = user => {
  return dispatch => {
    $myAxios('loginApi', user).then(res => {
      if (res.status === 0) {
        message.success('登陆成功')
        localStorage.userInfo = JSON.stringify(res.data)
        dispatch(setUser(res.data))
      } else if (res.status === 1) {
        message.error(res.msg)
      }
    })
  }
}

