import Home from 'components/home.jsx'

import CreatePerson from 'containers/person/create.jsx'
import SearchPerson from 'containers/person/search.jsx'
import Profile from 'containers/person/profile.jsx'
import * as personActions from 'redux/modules/person'

import Login from 'containers/login'
import * as authActions from 'redux/modules/auth'

import CreatePost from 'containers/post/create.jsx'
import PostList from 'containers/post/list.jsx'
import Post from 'containers/post/content.jsx'
import * as postActions from 'redux/modules/post'


// path: 路由地址
// name: 标签显示名称，为空时，不在header中显示
// component: 对应组建
// isAdmin: 仅Admin可以访问
// hideWhenLogin: 登录之后隐藏
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
    name: 'Create Person',
    component: CreatePerson,
    mapStateToProps: routeProps => state => ({
      result: state.person.addResult,
      authToken: state.auth.user
    }),
    mapDispatchToProps: routeProps => ({
      addPerson: personActions['addPerson']
    })
  }, {
    path: '/search-person',
    name: 'Search Person',
    component: SearchPerson,
    mapStateToProps: routeProps => state => ({
      result: state.person.searchResult
    }),
    mapDispatchToProps: routeProps => ({
      searchPerson: personActions['searchPerson']
    })
  }, {
    path: '/login',
    component: Login,
    hideWhenLogin: true,
    mapStateToProps: routeProps => state => {
      const { location } = routeProps
      return {
        authToken: state.auth.uer,
        location
      }
    },
    mapDispatchToProps: routeProps => ({
      login: authActions['login']
    })
  }, {
    path: '/profile/:id',
    component: Profile,
    mapStateToProps: routeProps => state => {
      const { match: { params: { id } } } = routeProps
      return {
        id: +id,
        authToken: state.auth.user,
        profile: state.person.profile[id]
      }
    },
    mapDispatchToProps: routeProps => ({
      fetchProfile: personActions['fetchProfile'],
      logout: authActions['logout']
    })
  }, {
    path: '/post/:id',
    component: Post,
    mapStateToProps: routeProps => state => {
      const { match: { params: { id } } } = routeProps
      const post = state.post.posts[id] || { id: +id }
      return {
        authToken: state.auth.user,
        post
      }
    },
    mapDispatchToProps: routeProps => ({
      fetchPost: postActions['fetchPost']
    }),
    onNavigate: 'fetchPost'
  }, {
    path: '/create-post',
    component: CreatePost,
    mapStateToProps: routeProps => state => ({
      authToken: state.auth.user,
      result: state.post.addResult
    }),
    mapDispatchToProps: routeProps => ({
      addPost: postActions['addPost']
    })
  }, {
    path: '/post-list',
    component: PostList,
    name: 'Post List',
    mapStateToProps: routeProps => state => ({
      list: state.post.list
    }),
    mapDispatchToProps: routeProps => ({
      fetchPostList: postActions['fetchPostList']
    }),
    onNavigate: 'fetchPostList'
  }
]
export default routes
