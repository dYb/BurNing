import Home from './components/Home.jsx'
import CreatePerson from './components/create-person.jsx'
import SearchPerson from './components/search-person.jsx'
import Login from './components/login.jsx'
import Profile from './components/profile.jsx'
import Post from './components/post.jsx'

// path: 路由地址
// name: 标签显示名称，为空时，不在header中显示
// component: 对应组建
// isAdmin: 仅Admin可以访问
// hideWhenLogin: 登录之后隐藏
// props: 由mapStatetoProps转换
// actions: 由mapDispatchtoProps转换
// mapStateToProps: 返回一个函数（参数{ location, match, history }），为connect函数的第一参数
// mergeProps: : 返回一个函数（参数{ location, match, history }），为connect函数的第三参数

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-person',
    name: 'Create Person',
    component: CreatePerson,
    props: ['personCreationResult', 'authToken'],
    actions: ['addPerson'],
    isAdmin: true
  }, {
    path: '/search-person',
    name: 'Search Person',
    component: SearchPerson,
    props: ['searchedPerson'],
    actions: ['searchPerson']
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
    props: ['authToken'],
    actions: ['doLogin'],
    hideWhenLogin: true,
    mergeProps: routeProps => (stateProps, dispatchProps, ownProps) => {
      const { location } = routeProps
      return Object.assign({}, ownProps, stateProps, dispatchProps, { location })
    }
  }, {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    props: ['authToken', 'profile'],
    actions: ['fetchProfile', 'doLogout']
  }, {
    path: '/post/:postId',
    component: Post,
    mapStateToProps: routeProps => state => {
      const { match: { params } } = routeProps
      return { post: state.posts ? state.posts[params.postId] : {} }
    },
    actions: ['fetchPost']
  }
]
export default routes
