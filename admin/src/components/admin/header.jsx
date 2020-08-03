import React, {
  // Component,
  useState,
  useEffect
} from 'react'
// import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearUser } from '../../redux/actions'


import { Modal, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import dayjs from 'dayjs'
import jsonp from 'jsonp' // 或安装 fetch-jsonp
// import menuList from '../../assets/js/menuConfig'

// class Header extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       currentTime: '',
//       dayPictureUrl: '',
//       weather: '',
//       currentTitle: ''
//     }
//   }
//   componentDidMount() {
//     console.log(this)
//     this.timer = setInterval(() => {
//       this.setState({
//         currentTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
//       })
//     }, 1000)
//     this.getWeatherInfo('杭州')
//   }
//   componentWillUnmount() {
//     clearInterval(this.timer)
//   }
//   getWeatherInfo = (city) => {
//     let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
//     jsonp(url, {}, (err, data) => {
//       if (!err && data.status === 'success') {
//         console.log(data)
//         let { dayPictureUrl, weather } = data.results[0].weather_data[0]
//         this.setState({ dayPictureUrl, weather })
//       }
//     })
//   }
//   getTitle = (path) => {
//     let title = ''
//     menuList.forEach(item => {
//       if (item.key === path) {
//         title = item.title
//       } else if (item.children) {
//         let menu = item.children.find(e => e.key === path)
//         if (menu) {
//           title = menu.title
//         }
//       }
//     })
//     return title
//   }
//   loginOut = () => {
//     Modal.confirm({
//       title: '确认退出?',
//       onOk: () => {
//         localStorage.removeItem('userInfo')
//         this.props.history.replace('/login')
//       },
//       onCancel: () => {
//         console.log('Cancel');
//       },
//     });
//   }
//   render() {
//     const { username } = JSON.parse(localStorage.userInfo || '{}')
//     const currentTitle = this.getTitle(this.props.location.pathname)
//     return (
//       <div className='header-box'>
//         <div className='header-top'>
//           <span>Hello! {username}</span>
//           <a href="#!" rel="noopener noreferrer" onClick={this.loginOut}>退出</a>
//         </div>
//         <div className='header-bottom'>
//           <div className="bottom-left">
//             {currentTitle}
//           </div>
//           <div className="bottom-right">
//             <span>{this.state.currentTime}</span>
//             <img src={this.state.dayPictureUrl} alt="weather" />
//             <span>{this.state.weather}</span>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// export default withRouter(Header)

const getWeatherInfo = (city) => {
  return new Promise((resolve, reject) => {
    let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const { dayPictureUrl, weather, temperature } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather, temperature })
      } else {
        reject(data)
      }
    })
  })
}
// const getTitle = (path) => {
//   let title = ''
//   menuList.forEach(item => {
//     if (item.key === path) {
//       title = item.title
//     } else if (item.children) {
//       let menu = item.children.find(e => path.indexOf(e.key) === 0)
//       if (menu) {
//         title = menu.title
//       }
//     }
//   })
//   return title
// }
const loginOut = (props) => {
  Modal.confirm({
    title: '确认退出?',
    onOk: () => {
      props.clearUser()
      // localStorage.removeItem('userInfo')
      // props.history.replace('/login')
    },
    onCancel: () => {
      console.log('Cancel');
    },
  });
}
const onTitleClick = ({ key, domEvent }) => {
  console.log({ key, domEvent })
}
const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
  console.log(item, key, keyPath, selectedKeys, domEvent)
}
let version = 'react'
const handleClick = e => {
  console.log('click ', e);
  version = e.key
  document.cookie = `version=${version};path=/;`
  window.location = 'https://www.coco727.com'
};
const menu = (
  <Menu onClick={handleClick}>
    <Menu.Item key="nuxt">
      nuxt.js
    </Menu.Item>
    <Menu.Item key="vue">
      vue.js
    </Menu.Item>
    <Menu.Item key="react" disabled>
      react.js
    </Menu.Item>
  </Menu>
);
const Header = (props) => {
  const [currentTime, setCurrentTime] = useState('')
  const [weatherInfo, setWeatherInfo] = useState({})
  // const currentTitle = getTitle(props.location.pathname)
  const currentTitle = props.currentTitle
  // const { username } = JSON.parse(localStorage.userInfo || '{}')
  const { username } = props.userInfo || {}
  useEffect(() => {
    let timer = setTimeout(() => {
      setCurrentTime(() => dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [currentTime])
  useEffect(() => {
    fetchData()
    async function fetchData() {
      let weatherInfo = await getWeatherInfo('杭州')
      setWeatherInfo(weatherInfo)
    }
  }, [])
  return (
    <div className='header-box'>
      <div className='header-top'>
        <div className="dropdown-box">
        <Dropdown overlay={menu} className="dropdown">
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            版本: {version}.js <DownOutlined />
          </a>
        </Dropdown>
        </div>

        <div className="top-right">
          <span>Hello! {username}</span>
          <a href="#!" rel="noopener noreferrer" onClick={() => loginOut(props)}>退出</a>
        </div>

      </div>
      <div className='header-bottom'>
        <div className="bottom-left">
          {currentTitle}
        </div>
        <div className="bottom-right">
          <span>{currentTime}</span>
          <img src={weatherInfo.dayPictureUrl} alt="weather" />
          <span>{weatherInfo.weather}</span>/<span>{weatherInfo.temperature}</span>
        </div>
      </div>
    </div>
  )
}
export default connect(
  state => ({ currentTitle: state.headTitle, userInfo: state.user }),
  { clearUser }
)(Header)
