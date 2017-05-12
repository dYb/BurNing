import Home from './components/Home.jsx'
import CreatePerson from './components/create-person.jsx'
import SearchPerson from './components/search-person.jsx'
import CreatePost from './components/create-post.jsx'
import PostList from './components/post-list.jsx'
import Profile from './components/profile.jsx'
import Login from './components/login.jsx'
import Post from './components/post.jsx'

// path: 路由地址
// name: 标签显示名称，为空时，不在header中显示
// component: 对应组建
// isAdmin: 仅Admin可以访问
// hideWhenLogin: 登录之后隐藏
// props: 由mapStatetoProps转换
// actions: 由mapDispatchtoProps转换
// mapStateToProps: 返回一个函数（参数{ location, match, history }），为connect函数的第一参数

const routes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home
  },
  {
    path: '/create-person',
    component: CreatePerson,
    props: ['personCreationResult', 'authToken'],
    actions: ['addPerson']
  }, {
    path: '/search-person',
    name: 'Search Person',
    component: SearchPerson,
    props: ['searchedPerson'],
    actions: ['searchPerson']
  }, {
    path: '/login',
    component: Login,
    mapStateToProps: routeProps => state => {
      const { location } = routeProps
      return {
        authToken: state.authToken,
        location
      }
    },
    actions: ['doLogin'],
    hideWhenLogin: true
  }, {
    path: '/profile/:id',
    component: Profile,
    mapStateToProps: routeProps => state => {
      const { match: { params: { id } } } = routeProps
      return {
        id: +id,
        authToken: state.authToken,
        profile: (state.profile && state.profile[id]) ? state.profile[id] : null
      }
    },
    actions: ['fetchProfile', 'doLogout'],
    onNavigate: 'fetchProfile'
  }, {
    path: '/post/:id',
    component: Post,
    mapStateToProps: routeProps => state => {
      const { match: { params: { id } }, location } = routeProps
      const { post } = location.state || { post: { id } }
      return {
        post: (state.posts && state.posts[id]) ? state.posts[id] : post,
        authToken: state.authToken,
        location
      }
    },
    actions: ['fetchPost'],
    onNavigate: 'fetchPost'
  }, {
    path: '/create-post',
    component: CreatePost,
    props: ['authToken', 'postCreationResult'],
    actions: ['addPost']
  }, {
    path: '/post-list',
    component: PostList,
    name: 'Post List',
    props: ['postList'],
    actions: ['fetchPostList'],
    onNavigate: 'fetchPostList'
  }
]
export default routes
