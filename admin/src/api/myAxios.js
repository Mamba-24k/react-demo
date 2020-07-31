import axios from 'axios'
import { message } from 'antd'
import apiList from './apiList.js'
console.log(process.env)
let config = {
  baseURL: "",
  timeout: 10 * 1000, // Timeout
  withCredentials: false, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data
  },
  function (error) {
    if (error.response.data.message) {
      message.error(error.response.data.message)
    }
    if (error.response.status === 401) {
      // router.push('/login')
    }
    // Do something with response error
    return Promise.reject(error)
  }
)
const myAxios = (key, paramsData) => {
  let method = apiList[key].method
  let url = apiList[key].url
  let params = {}
  if (method === 'get' || method === 'delete') {
    params = {
      params: paramsData
    }
  } else if (method === 'post' || method === 'put' || method === 'patch') {
    params = paramsData
  }
  return new Promise((reslove, reject) => {
    _axios[method](url, params).then(res => {
      reslove(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export default myAxios
