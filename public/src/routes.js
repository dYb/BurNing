import Home from './components/Home.jsx'
import CreatePerson from './components/create-person.jsx'
import SearchPerson from './components/search-person.jsx'
import Login from './components/login.jsx'

// path: 路由地址
// name: 标签显示名称
// component: 对应组建
// props: 由mapStatetoProps转换
// actions: 由mapDispatchtoProps转换
// isAdmin: 仅Admin可以访问
// hideWhenLogin: 登录之后隐藏

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
    hideWhenLogin: true
  }
]
export default routes
