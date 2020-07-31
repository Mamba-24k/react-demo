import React, {
  // Component
  // useState, 
  // useEffect
 } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
//具体导航的名称
// const breadcrumbNameMap = {
//   '': 'Home',
//   '/category': 'Category',
//   '/product': 'Product',
//   '/product/addUpdate': 'AddUpdate',
//   '/user': 'User',
//   '/role': 'Role',
//   '/bar': 'Bar',
//   '/line': 'Line',
//   '/pie': 'Bar',
// }
const routes = [
  {
    path: '',
    breadcrumbName: 'Home',
  },
  {
    path: 'category',
    breadcrumbName: 'Category',
  },
  {
    path: 'product',
    breadcrumbName: 'Product',
  },
  {
    path: 'addUpdate',
    breadcrumbName: 'AddUpdate',
  },
  {
    path: 'user',
    breadcrumbName: 'User',
  },
  {
    path: 'role',
    breadcrumbName: 'Role',
  },
  {
    path: 'bar',
    breadcrumbName: 'Bar',
  },
  {
    path: 'line',
    breadcrumbName: 'Line',
  },
  {
    path: 'pie',
    breadcrumbName: 'Pie',
  },

];
function tranRoutes(props) {
  let pathArr = props.currentPath.split('/').filter(i => i)
  pathArr.unshift('')
  let breadArr = []
  pathArr.forEach(name => {
    let breadRoutes = routes.filter(item => item.path === name)
    breadArr = [...breadArr, ...breadRoutes]
  })
  // console.log(breadArr)
  return breadArr
}
function itemRender(route, params, routes, paths) {
  // console.log(route, params, routes, paths)
  const last = routes.indexOf(route) === routes.length - 1
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
      // <Breadcrumb.Item key={route.path}>
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
      // </Breadcrumb.Item>
    )
}
const BreadRoutes = (props) => {
  // const [breadRoutes, setBreadRoutes] = useState([])
  // const [extraBreadcrumbItems, setExtraBreadcrumbItems] = useState(null)
  // useEffect(() => {
  //   setBreadRoutes(tranRoutes(props))
  // }, [props])
  // useEffect(() => {
  //   //将切分的路径读出来，形成面包屑，存放到extraBreadcrumbItems
  //   setExtraBreadcrumbItems(() => {
  //     let pathSnippets = props.currentPath.split('/').filter(i => i)
  //     pathSnippets.unshift('')
  //     console.log(pathSnippets)
  //     return pathSnippets.map((_, index) => {
  //       let url = `${pathSnippets.slice(0, index + 1).join('/')}`;
  //       console.log(url)
  //       return (
  //         <Breadcrumb.Item key={url}>
  //           <Link to={url}>
  //             {breadcrumbNameMap[url]}
  //           </Link>
  //         </Breadcrumb.Item>
  //       )
  //     })
  //   })
  // }, [props])
  return (
    <>
      {/* <Breadcrumb style={{ margin: '16px 0' }}>{extraBreadcrumbItems}</Breadcrumb> */}
      <Breadcrumb style={{ margin: '16px 0' }} itemRender={itemRender} routes={tranRoutes(props)} />
    </>
  )
}
export default BreadRoutes

// export default class BreadRoutes extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pathSnippets: null,
//       extraBreadcrumbItems: null,
//     }
//   }
//   getPath = () => {
//     //对路径进行切分，存放到this.state.pathSnippets中
//     console.log(this.props.currentPath)
//     console.log(this.props.currentPath.split('/'))
//     let paths = this.props.currentPath.split('/').filter(i => i)
//     paths.unshift('')
//     this.setState({
//       pathSnippets: paths
//     },() => {
//       console.log(this.state.pathSnippets)
//       this.setState({
//         extraBreadcrumbItems:  this.state.pathSnippets.map((_, index) => {
//           let url = `${this.state.pathSnippets.slice(0, index + 1).join('/')}`
//           console.log(url)

//           return (
//             <Breadcrumb.Item key={url}>
//               <Link to={url}>
//                 {breadcrumbNameMap[url]}
//               </Link>
//             </Breadcrumb.Item>
//           )
//         })
//       })
//     })
//   }
//   UNSAFE_componentWillReceiveProps(nextProps) { // props 更新
//     this.getPath();
//   }
//   componentDidMount() {
//     this.getPath();
//   }
//   render() {
//     return <Breadcrumb style={{ margin: '16px 0' }}>{this.state.extraBreadcrumbItems}</Breadcrumb>;
//   }
// }