import React, { Component } from 'react'
import { Timeline, Tag } from 'antd'
import $myAxios from '../../api/myAxios'
import { ClockCircleOutlined } from '@ant-design/icons';
// import ConnectCounter from '../../containers/connectCounter'
import './home.less'
class Home extends Component {
  // componentDidMount() {
  //   let arr = ['1', '2', '3', '4']
  //   // async function go() {
  //   //   let reslut = ''
  //   //   for (let i = 0; i < arr.length; i++) {
  //   //     let res = await $myAxios('promiseArr', { num: arr[i] });
  //   //     reslut += res.data
  //   //     console.log(reslut)
  //   //   }
  //   //   // arr.forEach(async (v , i) => {
  //   //   //   let res = await $myAxios('promiseArr', { num: v });
  //   //   //   reslut += res.data
  //   //   //   console.log(reslut)
  //   //   // })
  //   //   console.log(reslut)
  //   // }
  //   // go()
  //   const Fun = (num) => {
  //     return $myAxios('promiseArr', { num })
  //   }
  //   let promiseArr = []
  //   arr.forEach(v => promiseArr.push(Fun(v)))
  //   console.log(promiseArr)
  //   // async function go (promiseArr) {
  //   //   let reslut = ''
  //   //   for (let value of promiseArr) {
  //   //     let res = await value
  //   //     console.log(res.data)
  //   //     reslut += res.data
  //   //     console.log(reslut)
  //   //   }
  //   //   console.log(reslut)
  //   // }
  //   async function go(promiseArr) {
  //     let reslut = ''
  //     await promiseArr.reduce((previousPromise, nextPromise) => {
  //       console.log('1')
  //       return nextPromise.then(res => {
  //         console.log(res);
  //         reslut += res.data
  //         console.log(reslut);
  //         // return nextPromise;
  //       });
  //     },Promise.resolve());
  //     console.log(reslut)
  //   }
  //   go(promiseArr)
  // }
  render() {
    return (
      <div className="home-box">
        {/* <ConnectCounter></ConnectCounter> */}
        <h2>您好，欢迎访问！</h2>
        <div>
          <h3>Mamba管理系统是个人学习以下技术的第一次实践：</h3>
          <ul className="ul-li">
            <li>1、<Tag color="#61dafb"><a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">react.js</a></Tag>框架</li>
            <li>2、<Tag color="#61dafb"><a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">react.js</a></Tag>相关生态：
            <Tag color="#4183c4"><a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer">react-router-dom</a></Tag>、
            <Tag color="#764abc"><a href="https://redux.js.org/redux" target="_blank" rel="noopener noreferrer">redux</a></Tag>
            ( <Tag color="purple"><a href="https://redux.js.org/basics/usage-with-react" target="_blank" rel="noopener noreferrer">react-redux</a></Tag>
            <Tag color="purple"><a href="https://github.com/reduxjs/redux-thunk" target="_blank" rel="noopener noreferrer">redux-thunk</a></Tag>
            <Tag color="purple"><a href="https://redux-saga-in-chinese.js.org" target="_blank" rel="noopener noreferrer">redux-saga</a></Tag>)等</li>
            <li>3、<Tag color="#f50"><a href="https://ant.design" target="_blank" rel="noopener noreferrer">Ant Design</a></Tag>: 蚂蚁金服基于react的UI组件库</li>
          </ul>
        </div>
        <h3 style={{textAlign: 'center',marginBottom: 30}}>时间轴</h3>
        <Timeline mode="alternate" pending="期待下步更新...">
          <Timeline.Item label="2015-07-15" color="green">create-react-app 搭建项目</Timeline.Item>
          <Timeline.Item label="2015-07-16" color="green">安装react-router-dom,完成页面路由基本功能</Timeline.Item>
          <Timeline.Item label="2015-07-17" color="green">安装antd,实现按需加载组件以及自定义主题</Timeline.Item>
          <Timeline.Item label="2015-07-18" color="green">利用antd组件Layout布局,进行页面整体布局</Timeline.Item>
          <Timeline.Item label="2015-07-20" color="green">完成侧边栏sideBar, 头部header以及面包屑导航breadcrumb</Timeline.Item>
          <Timeline.Item label="2015-07-21" color="green">Node.js+mongoose.js+MongoDB搭建后台服务，建立Schema数据模型: user、role、category、product</Timeline.Item>
          <Timeline.Item label="2015-07-23" color="green">完成服务端user、login模块接口，以及前端user、login页面</Timeline.Item>
          <Timeline.Item label="2015-07-28" color="green">完成服务端role、category、product模块接口，以及前端role、category、product页面等</Timeline.Item>
          <Timeline.Item label="2015-07-31" color="green">安装redux、react-redux、redux-thunk、redux-devtools-extension，学习redux,实现组件共享数据，如登陆用户信息userInfos</Timeline.Item>
          <Timeline.Item label="2015-08-01" color="green">代码上传gitHub，Nginx拉取代码，打包，启动node服务，域名解析、nginx转发, 线上访问</Timeline.Item>
          <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red">优化项目...</Timeline.Item>
        </Timeline>
      </div>
    )
  }
}
export default Home