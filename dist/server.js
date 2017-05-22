/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Sequelize = __webpack_require__(50);
const { times } = __webpack_require__(7);
const Faker = __webpack_require__(40);

const { ARRAY, INTEGER, STRING, BOOLEAN } = Sequelize;

// const Conn = new Sequelize('postgres://uqgfpeqv:fQ2UfMhPUWNefdqBo6ML2v7JTIKcy9hx@qdjjtnkv.db.elephantsql.com:5432/uqgfpeqv')
const Conn = new Sequelize('postgres', 'postgres', 'ybduan', { dialect: 'postgres' });

const Person = Conn.define('person', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: STRING,
    allowNull: false
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false
  }
});

const Post = Conn.define('post', {
  title: {
    type: STRING,
    allowNull: false
  },
  content: {
    type: STRING,
    allowNull: false
  },
  outward: {
    type: BOOLEAN,
    defaultValue: false
  },
  receivers: {
    type: ARRAY(INTEGER),
    defaultValue: []
  }
});

Person.hasMany(Post);
Post.belongsTo(Person);

module.exports = {
  DB: Conn,
  Person,
  Post
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.login = login;
exports.logout = logout;

var _axios = __webpack_require__(39);

var _axios2 = _interopRequireDefault(_axios);

var _jwtDecode = __webpack_require__(45);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOGIN = 'burning/auth/LOGIN';
const LOGIN_SUCCESS = 'burning/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'burning/auth/LOGIN_FAIL';
const LOGOUT = 'burning/auth/LOGOUT';

const initState = { user: null };
// reducer

exports.default = (state = initState, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return _extends({}, state, {
        loggingIn: true
      });
    case LOGIN_SUCCESS:
      return _extends({}, state, {
        loggingIn: false,
        user: action.result
      });
    case LOGIN_FAIL:
      return _extends({}, state, {
        loggingIn: false,
        user: null,
        loginError: action.error
      });
    case LOGOUT:
      return _extends({}, state, {
        user: null
      });
    default:
      return state;
  }
};

function login(person, remember) {
  return dispatch => {
    dispatch({
      type: LOGIN
    });
    return _axios2.default.post('/login', _extends({}, person)).then(result => {
      if (!result.data) {
        dispatch({
          type: LOGIN_FAIL,
          error: result.errors
        });
        return Promise.resolve(false);
      }
      const authToken = (0, _jwtDecode2.default)(result.data);
      dispatch({
        type: LOGIN_SUCCESS,
        result: authToken
      });
      if (remember && authToken) {
        localStorage.setItem('token', JSON.stringify(authToken));
      } else {
        document.cookie = 'jsonwebtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
      return authToken;
    });
  };
}
function logout() {
  localStorage.removeItem('token');
  document.cookie = 'jsonwebtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  return {
    type: LOGOUT,
    authToken: null
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = __webpack_require__(27);

var _home2 = _interopRequireDefault(_home);

var _create = __webpack_require__(31);

var _create2 = _interopRequireDefault(_create);

var _search = __webpack_require__(33);

var _search2 = _interopRequireDefault(_search);

var _profile = __webpack_require__(32);

var _profile2 = _interopRequireDefault(_profile);

var _person = __webpack_require__(11);

var personActions = _interopRequireWildcard(_person);

var _login = __webpack_require__(30);

var _login2 = _interopRequireDefault(_login);

var _auth = __webpack_require__(5);

var authActions = _interopRequireWildcard(_auth);

var _create3 = __webpack_require__(35);

var _create4 = _interopRequireDefault(_create3);

var _list = __webpack_require__(36);

var _list2 = _interopRequireDefault(_list);

var _content = __webpack_require__(34);

var _content2 = _interopRequireDefault(_content);

var _post = __webpack_require__(12);

var postActions = _interopRequireWildcard(_post);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// path: 路由地址
// name: 标签显示名称，为空时，不在header中显示
// component: 对应组建
// isAdmin: 仅Admin可以访问
// hideWhenLogin: 登录之后隐藏
// mapStateToProps: 返回一个函数（参数{ location, match, history }），为connect函数的第一参数

const routes = [{
  path: '/',
  name: 'Home',
  exact: true,
  component: _home2.default
}, {
  path: '/create-person',
  name: 'Create Person',
  component: _create2.default,
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
  component: _search2.default,
  mapStateToProps: routeProps => state => ({
    result: state.person.searchResult
  }),
  mapDispatchToProps: routeProps => ({
    searchPerson: personActions['searchPerson']
  })
}, {
  path: '/login',
  component: _login2.default,
  hideWhenLogin: true,
  mapStateToProps: routeProps => state => {
    const { location } = routeProps;
    return {
      authToken: state.auth.uer,
      location
    };
  },
  mapDispatchToProps: routeProps => ({
    login: authActions['login']
  })
}, {
  path: '/profile/:id',
  component: _profile2.default,
  mapStateToProps: routeProps => state => {
    const { match: { params: { id } } } = routeProps;
    return {
      id: +id,
      authToken: state.auth.user,
      profile: state.person.profile[id]
    };
  },
  mapDispatchToProps: routeProps => ({
    fetchProfile: personActions['fetchProfile'],
    logout: authActions['logout']
  })
}, {
  path: '/post/:id',
  component: _content2.default,
  mapStateToProps: routeProps => state => {
    const { match: { params: { id } } } = routeProps;
    const post = state.post.posts[id] || { id: +id };
    return {
      authToken: state.auth.user,
      post
    };
  },
  mapDispatchToProps: routeProps => ({
    fetchPost: postActions['fetchPost']
  }),
  onNavigate: postActions['fetchPost']
}, {
  path: '/create-post',
  component: _create4.default,
  mapStateToProps: routeProps => state => ({
    authToken: state.auth.user,
    result: state.post.addResult
  }),
  mapDispatchToProps: routeProps => ({
    addPost: postActions['addPost']
  })
}, {
  path: '/post-list',
  component: _list2.default,
  name: 'Post List',
  mapStateToProps: routeProps => state => ({
    list: state.post.list
  }),
  mapDispatchToProps: routeProps => ({
    fetchPostList: postActions['fetchPostList']
  }),
  onNavigate: postActions['fetchPostList']
}];
exports.default = routes;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { makeExecutableSchema, addErrorLoggingToSchema } = __webpack_require__(43);

const { DB } = __webpack_require__(4);
// const { resolveForAdmin } = require('./auth')

const schema = `
  # This is a person
  type Person {
    id: Int!
    # 显示名称
    name: String!
    # 邮箱
    email: String!
    # 是否是管理员
    isAdmin: Boolean
    # 所发表的文章
    posts: [Post]
  }

  # Person creation message
  type PersonCreation {
    message: String
    created: Boolean!
  }

  # This is a post
  type Post {
    id: Int
    title: String
    content: String
    # 是否公开
    outward: Boolean
    # 创建者
    person: Person
    # 允许查看的人
    receivers: [Int]
  }

  # post creation message
  type PostCreation {
    message: String
    id: Int
  }

  # This is root query
  type Query {
    people(id: Int, email: String): [Person]
    posts(id: Int, title: String): [Post]
  }


  # Functions to create stuff
  type Mutation {
    # Add a person
    addPerson (name: String!, email: String!, password: String!): PersonCreation

    # Add a post
    addPost (title: String!, content: String!, outward: Boolean): PostCreation
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolveFunctions = {
  Person: {
    posts(person, args, context = {}) {
      // return person.getPosts()
      const where = context.authToken && person.id === context.authToken.id ? null : { outward: true };
      return person.getPosts({ where }).then(data => {
        return data;
      });
    }
  },
  Post: {
    person(post) {
      return post.getPerson();
    },
    content(post, args, context = {}) {
      const userId = context.authToken ? context.authToken.id : null;
      if (!post.outward && userId !== post.personId && post.receivers.indexOf(userId) < 0) {
        return null;
      }
      return post.content;
    }
  },
  Query: {
    async people(_, { id, email }) {
      let args = {};
      if (id || id === 0) args.id = id;
      if (email) args.email = email;
      const people = await DB.model('person').findAll({
        attributes: { exclude: ['password'] },
        where: args
      });
      return people;
    },
    posts(_, { id, title }, context = {}) {
      let args = {};
      if (id || id === 0) {
        args = { id };
      } else if (title) {
        args = { title };
      } else if (context.authToken) {
        Object.assign(args, {
          $or: [{ personId: context.authToken.id }, { receivers: { $contained: [context.authToken.id] } }, { outward: true }]
        });
      } else {
        Object.assign(args, { outward: true });
      }
      return DB.model('post').findAll({ where: args });
    }
  },
  Mutation: {
    addPerson(_, args) {
      return DB.model('person').create(args).then(() => ({ created: true })).catch(err => {
        return {
          message: err.message,
          created: false
        };
      });
    },
    addPost(_, args, context = {}) {
      if (!context.authToken) {
        return new Error('Unauthorized');
      }
      return DB.model('post').create(Object.assign({}, args, {
        personId: context.authToken.id
      }));
    }
  }
};
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolveFunctions
});
addErrorLoggingToSchema(executableSchema, { log: e => console.error(e.stack) });
module.exports = executableSchema;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Forbidden = ({ history, location: { pathname } }) => _react2.default.createElement(
  'div',
  { style: { marginTop: '20px' } },
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h2',
      null,
      '403 ~ Forbidden'
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: {
          pathname: '/login',
          state: { from: { pathname } }
        }, className: 'btn btn-lg btn-success' },
      'LOGIN TO VIEW'
    ),
    _react2.default.createElement(
      'button',
      { onClick: e => {
          if (history.length < 1) {
            history.push('/');
          } else {
            history.goBack();
          }
        }, type: 'button', className: 'btn btn-lg btn-link' },
      'Back'
    )
  )
);

exports.default = (0, _reactRouterDom.withRouter)(Forbidden);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NotFound = ({ history }) => _react2.default.createElement(
  'div',
  { style: { marginTop: '20px' } },
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h2',
      null,
      '404 ~ NOT FOUND'
    ),
    _react2.default.createElement(
      'button',
      { onClick: e => {
          if (history.length < 1) {
            history.push('/');
          } else {
            history.goBack();
          }
        }, type: 'button', className: 'btn btn-lg btn-link' },
      'Back'
    )
  )
);

exports.default = (0, _reactRouterDom.withRouter)(NotFound);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addPerson = addPerson;
exports.searchPerson = searchPerson;
exports.fetchProfile = fetchProfile;
const { graphQLHelper } =  false ? require('utils/client-graphql-helper') : __webpack_require__(13);

const ADD = 'burning/person/ADD';
const DELETE = 'burning/person/DELETE';
const SEARCH = 'burning/person/SEARCH';
const PROFILE = 'burning/person/PROFILE';

const initState = {
  profile: {}
};

exports.default = (state = initState, action = {}) => {
  switch (action.type) {
    case ADD:
      return _extends({}, state, {
        addResult: action.result
      });
    case SEARCH:
      return _extends({}, state, {
        searchResult: action.result
      });
    case DELETE:
      return _extends({}, state, {
        deleteResult: action.result
      });
    case PROFILE:
      return _extends({}, state, {
        profile: _extends({}, state.profile, {
          [action.result.id]: action.result
        })
      });
    default:
      return state;
  }
};

function addPerson(person) {
  return (dispatch, getState) => {
    const mutation = `
      mutation AddPerson($name: String!, $email: String!, $password: String!){
        addPerson(name: $name, email: $email, password: $password){
          message
          created
        }
      }
    `;
    const { authToken } = getState();
    return graphQLHelper(mutation, person, { authToken }).then(data => {
      dispatch({ type: ADD, result: data.addPerson });
      return data.addPerson;
    });
  };
}
function searchPerson(person) {
  return dispatch => {
    const query = `
      query People($id: Int, $email: String) {
        people(id: $id, email: $email) {
          id
          name
          email
        }
      }
    `;
    return graphQLHelper(query, person).then(data => data.people).then(people => {
      dispatch({ type: SEARCH, result: people });
      return people;
    });
  };
}
function fetchProfile(person) {
  return (dispatch, getState) => {
    const { authToken } = getState();
    const query = `
      query People($id: Int, $email: String) {
        people(id: $id, email: $email) {
          id
          name
          email
          posts {
            id
            title
          }
        }
      }
    `;
    return graphQLHelper(query, person, { authToken }).then(data => data.people).then(people => {
      dispatch({
        type: PROFILE,
        result: people[0] || person
      });
      return people;
    });
  };
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addPost = addPost;
exports.fetchPost = fetchPost;
exports.fetchPostList = fetchPostList;
const { graphQLHelper } =  false ? require('utils/client-graphql-helper') : __webpack_require__(13);

const ADD = 'burning/post/ADD';
const LOAD = 'burning/post/LOAD';
const LIST = 'burning/post/LIST';
const DELETE = 'burning/post/DELETE';
const SEARCH = 'burning/post/SEARCH';

const initState = {
  list: [],
  posts: {}
};

exports.default = (state = initState, action = {}) => {
  switch (action.type) {
    case ADD:
      return _extends({}, state, {
        addResult: action.result
      });
    case LOAD:
      return _extends({}, state, {
        posts: _extends({}, state.posts, {
          [action.result.id]: action.result
        })
      });
    case LIST:
      return _extends({}, state, {
        list: action.result
      });
    case DELETE:
      return _extends({}, state, {
        posts: _extends({}, state.posts, {
          [action.result.id]: null
        })
      });
    case SEARCH:
      return _extends({}, state, {
        searchResult: action.result
      });
    default:
      return state;
  }
};

function addPost(post) {
  return (dispatch, getState) => {
    const mutation = `
      mutation AddPost($title: String!, $content: String!, $outward: Boolean) {
        addPost(title: $title, content: $content, outward: $outward) {
          id
          message
        }
      }
    `;
    return graphQLHelper(mutation, post).then(data => data.addPost).then(result => {
      dispatch({ type: ADD, result });
      return result;
    });
  };
}

function fetchPost({ id, title }) {
  return (dispatch, getState) => {
    const query = `
      query PostsInfo($id: Int, $title: String) {
        posts(id: $id, title: $title) {
          id
          title
          outward
          content
          person {
            id
            name
            email
          }
        }
      }
    `;
    const { authToken } = getState();
    return graphQLHelper(query, { id, title }, { authToken }).then(result => result.posts).then(posts => {
      const post = posts && posts[0] ? posts[0] : null;
      dispatch({
        type: LOAD,
        result: post
      });
      return post;
    });
  };
}
function fetchPostList() {
  return (dispatch, getState) => {
    const query = `
      query {
        posts {
          id
          title
        }
      }
    `;
    const { authToken } = getState();
    return graphQLHelper(query, null, { authToken }).then(result => result.posts).then(posts => {
      dispatch({
        type: LIST,
        result: posts
      });
      return posts;
    });
  };
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphQLHelper = graphQLHelper;

var _graphql = __webpack_require__(41);

var _schema = __webpack_require__(8);

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function graphQLHelper(query, variables, context = {}) {
  return (0, _graphql.graphql)(_schema2.default, query, {}, context, variables).then(result => {
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data;
  });
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _koaRouter = __webpack_require__(2);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _login = __webpack_require__(24);

var _login2 = _interopRequireDefault(_login);

var _graphql = __webpack_require__(23);

var _graphql2 = _interopRequireDefault(_graphql);

var _universal = __webpack_require__(26);

var _universal2 = _interopRequireDefault(_universal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter2.default();

router.get('/favicon.ico', ctx => {
  ctx.redirect('https://facebook.github.io/react/favicon.ico');
});

router.use(_login2.default.routes()).use(_graphql2.default.routes()).use(_universal2.default.routes());

module.exports = router;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("koa-jwt");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _koa = __webpack_require__(19);

var _koa2 = _interopRequireDefault(_koa);

var _koaJwt = __webpack_require__(21);

var _koaJwt2 = _interopRequireDefault(_koaJwt);

var _koaBodyparser = __webpack_require__(20);

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _lodash = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = __webpack_require__(18);
const { DB, Person } = __webpack_require__(4);
const app = new _koa2.default();
app.use((0, _koaBodyparser2.default)()).use((0, _koaJwt2.default)({
  cookie: 'jsonwebtoken',
  secret: 'NETEASE',
  passthrough: true
})).use(router.routes()).use(router.allowedMethods());
// Always return the main index.html, so react-router render the route in the client


// router.get('*', async (ctx, next) => {
//   if (ctx.path.endsWith('graphiql')) {
//     await next()
//   } else {
//     await send(ctx, 'public/index.html')
//   }
// })


app.listen(3000, '0.0.0.0', () => console.log('Now browser to localhost:3000/graphql'));

DB.sync({ force: true }).then(() => {
  (0, _lodash.times)(10, i => {
    Person.create({
      name: 'ybduan' + i,
      email: 'dyb' + i + '@gmail.com',
      password: '123456',
      isAdmin: i === 0
    }).then(person => {
      return person.createPost({
        title: `Sample title by ${person.name}`,
        content: `This is a sample article`,
        outward: i % 2 === 0,
        receivers: [1]
      });
    });
  });
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Router = __webpack_require__(2);
const { graphqlKoa, graphiqlKoa } = __webpack_require__(42);
const schema = __webpack_require__(8);

const router = new Router();

router.post('/graphql', graphqlKoa(ctx => {
  return {
    schema,
    context: {
      authToken: ctx.state.user
    },
    debug: "production" === 'development'
  };
}));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
module.exports = router;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Router = __webpack_require__(2);
const { DB } = __webpack_require__(4);
const router = new Router();
const { sign } = __webpack_require__(44);

router.post('/login', async ctx => {
  const { email, password } = ctx.request.body;
  if (!email || !password) {
    ctx.body = '';
    return;
  }
  const person = await DB.model('person').find({ where: { email, password } });
  if (person) {
    const token = await sign({ id: person.id, email, name: person.name, isAdmin: person.isAdmin }, 'NETEASE', { expiresIn: '7 days' });
    ctx.body = token;
    ctx.cookies.set('jsonwebtoken', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      overwrite: true,
      httpOnly: false
    });
  } else {
    ctx.body = '';
  }
});
module.exports = router;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _fs = __webpack_require__(15);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(16);

var _path2 = _interopRequireDefault(_path);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _koaRouter = __webpack_require__(2);

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _bluebird = __webpack_require__(14);

var _reactRedux = __webpack_require__(3);

var _reactRouterDom = __webpack_require__(1);

var _server = __webpack_require__(46);

var _App = __webpack_require__(28);

var _App2 = _interopRequireDefault(_App);

var _store = __webpack_require__(38);

var _store2 = _interopRequireDefault(_store);

var _routes = __webpack_require__(6);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readFile = (0, _bluebird.promisify)(_fs2.default.readFile);
const router = new _koaRouter2.default();

router.get('/', async ctx => {
  const filePath = _path2.default.resolve(__dirname, '../..', 'public', 'index.html');
  try {
    const html = await readFile(filePath, 'utf8');
    if (false) {
      ctx.body = html.replace('{{SSR}}', '').replace('{{STATE}}', '{}');
      return;
    }
    const context = {};
    const store = (0, _store2.default)({
      auth: {
        user: ctx.state.user
      }
    });
    let match = null;
    const matchedRoute = _routes2.default.find(route => {
      match = (0, _reactRouterDom.matchPath)(ctx.req.url, route);
      return match;
    });
    if (matchedRoute && matchedRoute.onNavigate && typeof matchedRoute.onNavigate === 'function') {
      await store.dispatch(matchedRoute.onNavigate(match.params));
    }
    const markup = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouterDom.StaticRouter,
        {
          location: ctx.req.url,
          context: context
        },
        _react2.default.createElement(_App2.default, { location: { pathname: ctx.req.url } })
      )
    ));
    if (context.url) {
      ctx.redirect(301, context.url);
    } else {
      // we're good, send the response
      const preloadState = JSON.stringify(store.getState());
      ctx.body = html.replace('{{SSR}}', markup).replace('{{STATE}}', preloadState.replace(/</g, '\\u003c'));
    }
  } catch (err) {
    console.error(err);
    ctx.body = err.toString();
    ctx.status = 404;
  }
});
module.exports = router;
/* WEBPACK VAR INJECTION */}.call(exports, "server\\routes"))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const fs = __webpack_require__(15);
const { resolve } = __webpack_require__(16);

const Router = __webpack_require__(2);
const { promisify } = __webpack_require__(14);

let router = null;

if (true) {
  router = __webpack_require__(25);
} else {
  router = new Router();
  const readFile = promisify(fs.readFile);
  const filePath = resolve(__dirname, '../..', 'public', 'index.html');

  router.get('/', async ctx => {
    const html = await readFile(filePath, 'utf8');
    ctx.body = html.replace('{{STATE}}', '{}').replace('{{SSR}}', '');
  });
}

exports.default = router;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Home = () => _react2.default.createElement(
  "div",
  { className: "jumbotron" },
  _react2.default.createElement(
    "div",
    { className: "container" },
    _react2.default.createElement(
      "h1",
      { className: "display-3" },
      "Hello, world!"
    ),
    _react2.default.createElement(
      "p",
      null,
      "This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique."
    ),
    _react2.default.createElement(
      "p",
      null,
      _react2.default.createElement(
        "a",
        { className: "btn btn-primary btn-lg", href: "#", role: "button" },
        "Learn more \xBB"
      )
    )
  )
);

exports.default = Home;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(3);

var _reactRouterDom = __webpack_require__(1);

var _ = __webpack_require__(10);

var _2 = _interopRequireDefault(_);

var _routes = __webpack_require__(6);

var _routes2 = _interopRequireDefault(_routes);

var _header = __webpack_require__(29);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as actions from '../actions'

// import './app.css'


// import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
const App = () => {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_header2.default, null),
    _react2.default.createElement(
      'div',
      { className: 'container g-container' },
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _routes2.default.map((route, i) => _react2.default.createElement(_reactRouterDom.Route, { exact: true, key: i, path: route.path, render: routeProps => {
            const mapStateToProps = route.mapStateToProps ? route.mapStateToProps(routeProps) : null;
            const mapDispatchToProps = route.mapDispatchToProps ? route.mapDispatchToProps(routeProps) : null;
            const Connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(route.component);
            return _react2.default.createElement(Connector, null);
          } })),
        _react2.default.createElement(_reactRouterDom.Route, { component: _2.default })
      )
    )
  );
};
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
// <CSSTransitionGroup
//   transitionName="fade"
//   transitionEnterTimeout={600}
//   transitionLeaveTimeout={600} >
// </CSSTransitionGroup>

exports.default = App;
// export default connect(state => ({ authToken: state.authToken }))(App)

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(3);

var _reactRouterDom = __webpack_require__(1);

var _recompose = __webpack_require__(47);

var _routes = __webpack_require__(6);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Header = ({ authToken }) => _react2.default.createElement(
  'nav',
  { className: 'navbar navbar-toggleable-md navbar-inverse bg-primary' },
  _react2.default.createElement(
    'ul',
    { className: 'navbar-nav mr-auto' },
    _routes2.default.map(route => {
      if (!route.name) {
        return null;
      }
      {/*// 仅管理员及未登录时显示
        if (authToken && !authToken.isAdmin) {
         return null
        }
        // 登录时隐藏
        if (route.hideWhenLogin && authToken) {
         return null
        }*/}
      return _react2.default.createElement(
        'li',
        { className: 'nav-item', key: route.name },
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { exact: true, activeClassName: 'active', className: 'nav-link', to: route.path },
          route.name
        )
      );
    })
  ),
  _react2.default.createElement(
    'div',
    { className: 'my-5 my-lg-0' },
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/create-post', className: 'btn btn-outline-success mr-2 my-2 my-sm-2' },
      '+ POST'
    ),
    !authToken ? _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/login', className: 'btn btn-outline-secondary my-2 my-sm-2' },
      'LOGIN'
    ) : _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/profile/' + authToken.id, className: 'btn btn-outline-secondary ml-2 my-sm-2' },
      'PROFILE'
    )
  )
);
// import { withRouter } from 'react-router'
exports.default = (0, _recompose.compose)(_reactRouterDom.withRouter, (0, _reactRedux.connect)(state => ({ authToken: state.auth.user })))(Header);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _reactRedux = __webpack_require__(3);

var _auth = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Login extends _react2.default.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.login = async e => {
      e.preventDefault();
      const email = this.email.value;
      const password = this.password.value;
      const remember = this.remember.checked;
      if (!email || !password) return;
      const result = await this.props.login({ email, password }, remember);
      console.log(result);
      if (!result) {
        this.email.value = '';
        this.password.value = '';
      }
    }, _temp;
  }

  render() {
    const { authToken, location } = this.props;
    const from = location.state ? location.state.from : { pathname: '/' };

    if (authToken) {
      return _react2.default.createElement(_reactRouterDom.Redirect, { to: from });
    }
    return _react2.default.createElement(
      'form',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Sign In'
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { className: 'col-form-label col-form-label-lg', htmlFor: 'personEmail' },
          'Email:'
        ),
        _react2.default.createElement('input', { type: 'email', className: 'form-control form-control-lg', ref: input => {
            this.email = input;
          }, id: 'personEmail', placeholder: 'Email' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { className: 'col-form-label col-form-label-lg', htmlFor: 'password' },
          'Password:'
        ),
        _react2.default.createElement('input', { type: 'password', className: 'form-control form-control-lg', ref: input => {
            this.password = input;
          }, id: 'password', placeholder: 'Password' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-check' },
        _react2.default.createElement(
          'label',
          { className: 'form-check-label' },
          _react2.default.createElement('input', { type: 'checkbox', defaultChecked: true, ref: input => {
              this.remember = input;
            }, className: 'form-check-input' }),
          '\xA0Remember me in 7 days'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'button',
          { type: 'submit', className: 'btn btn-primary btn-lg btn-block', onClick: this.login },
          'Sign In'
        )
      ),
      authToken === false && _react2.default.createElement(
        'div',
        { className: 'alert alert-danger', role: 'alert' },
        _react2.default.createElement(
          'strong',
          null,
          'Failed!'
        )
      )
    );
  }
}

exports.default = (0, _reactRedux.connect)(state => ({ authToken: state.auth.user }), { login: _auth.login })(Login);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _ = __webpack_require__(9);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreatePerson extends _react2.default.PureComponent {
  render() {
    const { result, addPerson, authToken } = this.props;
    // 如果已登录，但不是管理员，则提示没有权限
    if (authToken && !authToken.isAdmin) {
      return _react2.default.createElement(_2.default, null);
    }
    // 未登录，跳转到登录页
    if (!authToken) {
      return _react2.default.createElement(_reactRouterDom.Redirect, { to: {
          pathname: '/login',
          state: {
            from: { pathname: '/create-person' }
          }
        } });
    }
    return _react2.default.createElement(
      'form',
      null,
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'personName' },
          'Person Name'
        ),
        _react2.default.createElement('input', { type: 'text', className: 'form-control', ref: input => {
            this.name = input;
          }, id: 'personName', placeholder: 'Name' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'password' },
          'Password'
        ),
        _react2.default.createElement('input', { type: 'password', className: 'form-control', ref: input => {
            this.password = input;
          }, id: 'password', placeholder: 'Password' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'personEmail' },
          'Email'
        ),
        _react2.default.createElement('input', { type: 'email', className: 'form-control', ref: input => {
            this.email = input;
          }, id: 'personEmail', placeholder: 'Email' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group row' },
        _react2.default.createElement(
          'div',
          { className: 'offset-sm-2 col-sm-10' },
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-primary', onClick: e => {
                e.preventDefault();
                const name = this.name.value;
                const email = this.email.value;
                const password = this.password.value;
                if (!name || !email || !password) return;
                addPerson({ name, email, password });
                this.name.value = '';
                this.email.value = '';
                this.password.value = '';
              } },
            'Sign Up'
          )
        )
      ),
      result !== undefined && (result.created ? _react2.default.createElement(
        'div',
        { className: 'alert alert-success', role: 'alert' },
        _react2.default.createElement(
          'strong',
          null,
          'Well done!'
        ),
        ' You successfully create a person.'
      ) : _react2.default.createElement(
        'div',
        { className: 'alert alert-danger', role: 'alert' },
        _react2.default.createElement(
          'strong',
          null,
          'Error!'
        ),
        ' ',
        result.message
      ))
    );
  }
}
exports.default = CreatePerson;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Profile extends _react2.default.PureComponent {
  componentDidMount() {
    const { id, fetchProfile, profile } = this.props;
    if (!profile) {
      fetchProfile({ id });
    }
  }
  render() {
    const { id, authToken, profile, logout } = this.props;
    if (!profile || !profile.name) {
      return _react2.default.createElement(
        'div',
        null,
        'No person'
      );
    }
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'form',
        null,
        _react2.default.createElement(
          'div',
          { className: 'form-group row' },
          _react2.default.createElement(
            'label',
            { className: 'col-2', htmlFor: 'id' },
            'ID'
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-10', id: 'id' },
            profile.id
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group row' },
          _react2.default.createElement(
            'label',
            { className: 'col-2', htmlFor: 'name' },
            'name'
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-10', id: 'name' },
            profile.name
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group row' },
          _react2.default.createElement(
            'label',
            { className: 'col-2', htmlFor: 'email' },
            'email'
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-10', id: 'email' },
            profile.email
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group row' },
          _react2.default.createElement(
            'label',
            { className: 'col-2', htmlFor: 'posts' },
            'posts'
          ),
          _react2.default.createElement(
            'ul',
            { className: 'col-10' },
            profile.posts && profile.posts.map(post => {
              return _react2.default.createElement(
                'li',
                { key: post.id },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/post/' + post.id, className: 'btn btn-link' },
                  post.title
                )
              );
            })
          )
        ),
        authToken && authToken.id === id && _react2.default.createElement(
          'button',
          { onClick: logout, type: 'button', className: 'btn btn-danger btn-lg btn-block' },
          'LOGOUT'
        )
      )
    );
  }
}
exports.default = Profile;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SearchPerson extends _react2.default.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.search = e => {
      e.preventDefault();
      const data = {};
      if (+this.id.value) {
        data['id'] = +this.id.value;
      }
      if (this.name.value) {
        data['name'] = this.name.value;
      }
      if (this.email.value) {
        data['email'] = this.email.value;
      }
      this.props.searchPerson(data);
    }, _temp;
  }

  render() {
    return _react2.default.createElement(
      'form',
      null,
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'id' },
          'ID'
        ),
        _react2.default.createElement('input', { type: 'text', className: 'form-control', ref: input => {
            this.id = input;
          }, id: 'id', placeholder: 'ID' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'personName' },
          'Person Name'
        ),
        _react2.default.createElement('input', { type: 'text', disabled: true, className: 'form-control', ref: input => {
            this.name = input;
          }, id: 'personName', placeholder: 'Name' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'email' },
          'Email'
        ),
        _react2.default.createElement('input', { type: 'text', className: 'form-control', ref: input => {
            this.email = input;
          }, id: 'email', placeholder: 'Email' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group row' },
        _react2.default.createElement(
          'div',
          { className: 'offset-sm-2 col-sm-10' },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-outline-success my-2 my-sm-0', type: 'submit', onClick: this.search },
            'Search'
          )
        )
      ),
      this.props.result && _react2.default.createElement(
        'ul',
        { className: 'border' },
        this.props.result.map(p => _react2.default.createElement(
          'li',
          { key: p.id },
          'ID: ',
          p.id,
          ' name: ',
          p.name,
          ' email: ',
          p.email,
          _react2.default.createElement('br', null),
          'POST: ',
          p.post
        ))
      )
    );
  }
}
exports.default = SearchPerson;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ = __webpack_require__(10);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Post extends _react2.default.PureComponent {
  componentDidMount() {
    const { post, fetchPost } = this.props;
    const { id, content } = post || {};
    if (!content) {
      fetchPost({ id: +id });
    }
  }
  render() {
    const { post, authToken } = this.props;
    const { title, outward, person } = post || {};
    const { id, name, email } = person || {};
    let content = post.content;
    // 文章拥有者 && 加载过数据 && 仍然没有内容
    if (authToken && authToken.id === id && !content) {
      return _react2.default.createElement(_2.default, null);
    }
    // 不是公开的 && 不是文章拥有者
    if (!outward && !content) {
      content = 'content is not visiable';
    }
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        title
      ),
      _react2.default.createElement(
        'h4',
        null,
        name,
        ' ',
        email
      ),
      _react2.default.createElement(
        'div',
        null,
        content || 'loading...'
      )
    );
  }
}
exports.default = Post;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _ = __webpack_require__(9);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreatePost extends _react2.default.PureComponent {
  render() {
    const { addPost, authToken, result } = this.props;
    // 如果已登录，但不是管理员，则提示没有权限
    if (authToken && !authToken.isAdmin) {
      return _react2.default.createElement(_2.default, null);
    }
    // 未登录，跳转到登录页
    if (!authToken) {
      return _react2.default.createElement(_reactRouterDom.Redirect, { to: {
          pathname: '/login',
          state: {
            from: { pathname: '/create-post' }
          }
        } });
    }
    return _react2.default.createElement(
      'form',
      null,
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'title' },
          'Title'
        ),
        _react2.default.createElement('input', { type: 'text', className: 'form-control', ref: input => {
            this.title = input;
          }, id: 'title', placeholder: 'Title' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'content' },
          'Content'
        ),
        _react2.default.createElement('textarea', { type: 'text', className: 'form-control', ref: input => {
            this.content = input;
          }, id: 'content', placeholder: 'Content' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', { type: 'checkbox', ref: input => {
              this.outward = input;
            } }),
          ' Public ',
          _react2.default.createElement(
            'small',
            { className: 'form-text text-muted' },
            'Checked can be accessed by others.'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'form-group row' },
        _react2.default.createElement(
          'div',
          { className: 'col-sm-10' },
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-success btn-lg', onClick: e => {
                e.preventDefault();
                const title = this.title.value;
                const content = this.content.value;
                const outward = this.outward.checked;
                if (!title || !content) return;
                addPost({ title, content, outward });
              } },
            'Add'
          ),
          _react2.default.createElement(
            'button',
            { type: 'reset', className: 'btn btn-secondary btn-lg ml-2', onClick: e => {} },
            'Reset'
          )
        )
      )
    );
  }
}
exports.default = CreatePost;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostList extends _react2.default.Component {
  componentDidMount() {
    const { fetchPostList, list } = this.props;
    if (!list || !list.length) {
      fetchPostList();
    }
  }
  render() {
    const { list } = this.props;
    if (!list || !list.length) {
      return _react2.default.createElement(
        'div',
        null,
        'loading....'
      );
    }
    return _react2.default.createElement(
      'ul',
      null,
      list.map(post => _react2.default.createElement(
        'li',
        { key: post.id },
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: {
              pathname: '/post/' + post.id,
              state: { post }
            } },
          post.title
        )
      ))
    );
  }
}
exports.default = PostList;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(17);

var _auth = __webpack_require__(5);

var _auth2 = _interopRequireDefault(_auth);

var _post = __webpack_require__(12);

var _post2 = _interopRequireDefault(_post);

var _person = __webpack_require__(11);

var _person2 = _interopRequireDefault(_person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  auth: _auth2.default,
  post: _post2.default,
  person: _person2.default
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = __webpack_require__(17);

var _reduxDevtoolsExtension = __webpack_require__(48);

var _reducers = __webpack_require__(37);

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxThunk = __webpack_require__(49);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(initialState = {}) {
  return (0, _redux.createStore)(_reducers2.default, initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk2.default)));
}

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("faker");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("graphql-server-koa");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("recompose");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODZhNjFkYzZkNjlkNDIxNTVhZTQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia29hLXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2RiLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1eC9tb2R1bGVzL2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc2NoZW1hLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzQwMy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvNDA0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXgvbW9kdWxlcy9wZXJzb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4L21vZHVsZXMvcG9zdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvc2VydmVyLWdyYXBocWwtaGVscGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJsdWViaXJkXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImtvYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImtvYS1ib2R5cGFyc2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia29hLWp3dFwiIiwid2VicGFjazovLy8uL3NlcnZlci9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9ncmFwaHFsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9zc3IuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy91bml2ZXJzYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaG9tZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvQXBwL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9oZWFkZXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL2xvZ2luL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9wZXJzb24vY3JlYXRlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9wZXJzb24vcHJvZmlsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvcGVyc29uL3NlYXJjaC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvcG9zdC9jb250ZW50LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9wb3N0L2NyZWF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lcnMvcG9zdC9saXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXgvcmVkdWNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHV4L3N0b3JlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmFrZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJncmFwaHFsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ3JhcGhxbC1zZXJ2ZXIta29hXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ3JhcGhxbC10b29sc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImp3dC1kZWNvZGVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVjb21wb3NlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtdGh1bmtcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiJdLCJuYW1lcyI6WyJTZXF1ZWxpemUiLCJyZXF1aXJlIiwidGltZXMiLCJGYWtlciIsIkFSUkFZIiwiSU5URUdFUiIsIlNUUklORyIsIkJPT0xFQU4iLCJDb25uIiwiZGlhbGVjdCIsIlBlcnNvbiIsImRlZmluZSIsIm5hbWUiLCJ0eXBlIiwiYWxsb3dOdWxsIiwidW5pcXVlIiwiZW1haWwiLCJ2YWxpZGF0ZSIsImlzRW1haWwiLCJwYXNzd29yZCIsImlzQWRtaW4iLCJkZWZhdWx0VmFsdWUiLCJQb3N0IiwidGl0bGUiLCJjb250ZW50Iiwib3V0d2FyZCIsInJlY2VpdmVycyIsImhhc01hbnkiLCJiZWxvbmdzVG8iLCJtb2R1bGUiLCJleHBvcnRzIiwiREIiLCJsb2dpbiIsImxvZ291dCIsIkxPR0lOIiwiTE9HSU5fU1VDQ0VTUyIsIkxPR0lOX0ZBSUwiLCJMT0dPVVQiLCJpbml0U3RhdGUiLCJ1c2VyIiwic3RhdGUiLCJhY3Rpb24iLCJsb2dnaW5nSW4iLCJyZXN1bHQiLCJsb2dpbkVycm9yIiwiZXJyb3IiLCJwZXJzb24iLCJyZW1lbWJlciIsImRpc3BhdGNoIiwicG9zdCIsInRoZW4iLCJkYXRhIiwiZXJyb3JzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJhdXRoVG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImRvY3VtZW50IiwiY29va2llIiwicmVtb3ZlSXRlbSIsInBlcnNvbkFjdGlvbnMiLCJhdXRoQWN0aW9ucyIsInBvc3RBY3Rpb25zIiwicm91dGVzIiwicGF0aCIsImV4YWN0IiwiY29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwicm91dGVQcm9wcyIsImFkZFJlc3VsdCIsImF1dGgiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJhZGRQZXJzb24iLCJzZWFyY2hSZXN1bHQiLCJzZWFyY2hQZXJzb24iLCJoaWRlV2hlbkxvZ2luIiwibG9jYXRpb24iLCJ1ZXIiLCJtYXRjaCIsInBhcmFtcyIsImlkIiwicHJvZmlsZSIsImZldGNoUHJvZmlsZSIsInBvc3RzIiwiZmV0Y2hQb3N0Iiwib25OYXZpZ2F0ZSIsImFkZFBvc3QiLCJsaXN0IiwiZmV0Y2hQb3N0TGlzdCIsIm1ha2VFeGVjdXRhYmxlU2NoZW1hIiwiYWRkRXJyb3JMb2dnaW5nVG9TY2hlbWEiLCJzY2hlbWEiLCJyZXNvbHZlRnVuY3Rpb25zIiwiYXJncyIsImNvbnRleHQiLCJ3aGVyZSIsImdldFBvc3RzIiwiZ2V0UGVyc29uIiwidXNlcklkIiwicGVyc29uSWQiLCJpbmRleE9mIiwiUXVlcnkiLCJwZW9wbGUiLCJfIiwibW9kZWwiLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsImV4Y2x1ZGUiLCJPYmplY3QiLCJhc3NpZ24iLCIkb3IiLCIkY29udGFpbmVkIiwiTXV0YXRpb24iLCJjcmVhdGUiLCJjcmVhdGVkIiwiY2F0Y2giLCJlcnIiLCJtZXNzYWdlIiwiRXJyb3IiLCJleGVjdXRhYmxlU2NoZW1hIiwidHlwZURlZnMiLCJyZXNvbHZlcnMiLCJsb2ciLCJlIiwiY29uc29sZSIsInN0YWNrIiwiRm9yYmlkZGVuIiwiaGlzdG9yeSIsInBhdGhuYW1lIiwibWFyZ2luVG9wIiwiZnJvbSIsImxlbmd0aCIsInB1c2giLCJnb0JhY2siLCJOb3RGb3VuZCIsImdyYXBoUUxIZWxwZXIiLCJBREQiLCJERUxFVEUiLCJTRUFSQ0giLCJQUk9GSUxFIiwiZGVsZXRlUmVzdWx0IiwiZ2V0U3RhdGUiLCJtdXRhdGlvbiIsInF1ZXJ5IiwiTE9BRCIsIkxJU1QiLCJ2YXJpYWJsZXMiLCJyb3V0ZXIiLCJnZXQiLCJjdHgiLCJyZWRpcmVjdCIsInVzZSIsImFwcCIsInNlY3JldCIsInBhc3N0aHJvdWdoIiwiYWxsb3dlZE1ldGhvZHMiLCJsaXN0ZW4iLCJzeW5jIiwiZm9yY2UiLCJpIiwiY3JlYXRlUG9zdCIsIlJvdXRlciIsImdyYXBocWxLb2EiLCJncmFwaGlxbEtvYSIsImRlYnVnIiwiZW5kcG9pbnRVUkwiLCJzaWduIiwicmVxdWVzdCIsImJvZHkiLCJmaW5kIiwidG9rZW4iLCJleHBpcmVzSW4iLCJjb29raWVzIiwic2V0IiwibWF4QWdlIiwib3ZlcndyaXRlIiwiaHR0cE9ubHkiLCJyZWFkRmlsZSIsImZpbGVQYXRoIiwiX19kaXJuYW1lIiwiaHRtbCIsInJlcGxhY2UiLCJzdG9yZSIsIm1hdGNoZWRSb3V0ZSIsInJvdXRlIiwicmVxIiwidXJsIiwibWFya3VwIiwicHJlbG9hZFN0YXRlIiwidG9TdHJpbmciLCJzdGF0dXMiLCJmcyIsInByb21pc2lmeSIsIkhvbWUiLCJBcHAiLCJtYXAiLCJDb25uZWN0b3IiLCJIZWFkZXIiLCJMb2dpbiIsIlB1cmVDb21wb25lbnQiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiY2hlY2tlZCIsInByb3BzIiwicmVuZGVyIiwiaW5wdXQiLCJDcmVhdGVQZXJzb24iLCJ1bmRlZmluZWQiLCJQcm9maWxlIiwiY29tcG9uZW50RGlkTW91bnQiLCJTZWFyY2hQZXJzb24iLCJzZWFyY2giLCJwIiwiQ3JlYXRlUG9zdCIsIlBvc3RMaXN0IiwiQ29tcG9uZW50IiwiY29uZmlndXJlU3RvcmUiLCJpbml0aWFsU3RhdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNB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Q0Q7QUFDRjtBQUNEb0gsV0FBUztBQUNQLFVBQU0sRUFBRXJILElBQUYsS0FBVyxLQUFLb0gsS0FBdEI7QUFDQSxRQUFJLENBQUNwSCxJQUFELElBQVMsQ0FBQ0EsS0FBSzRDLE1BQW5CLEVBQTJCO0FBQ3pCLGFBQU87QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFQO0FBQ0Q7QUFDRCxXQUNFO0FBQUE7QUFBQTtBQUVJNUMsV0FBSzRHLEdBQUwsQ0FBU3JKLFFBQ1A7QUFBQTtBQUFBLFVBQUksS0FBS0EsS0FBS2tDLEVBQWQ7QUFBa0I7QUFBQTtBQUFBLFlBQU0sSUFBSTtBQUMxQmdELHdCQUFVLFdBQVdsRixLQUFLa0MsRUFEQTtBQUUxQjNDLHFCQUFPLEVBQUVTLElBQUY7QUFGbUIsYUFBVjtBQUdkQSxlQUFLMUI7QUFIUztBQUFsQixPQURGO0FBRkosS0FERjtBQVlEO0FBeEJtRDtrQkFBakNrTSxROzs7Ozs7Ozs7Ozs7O0FDSHJCOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVlLDRCQUFnQjtBQUM3QmhKLHNCQUQ2QjtBQUU3QnhCLHNCQUY2QjtBQUc3Qkg7QUFINkIsQ0FBaEIsQzs7Ozs7Ozs7Ozs7O2tCQ0FTNkssYzs7QUFMeEI7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRWUsU0FBU0EsY0FBVCxDQUF3QkMsZUFBZSxFQUF2QyxFQUEyQztBQUN4RCxTQUFPLDRDQUVMQSxZQUZLLEVBR0wsaURBQ0UsaURBREYsQ0FISyxDQUFQO0FBT0QsQzs7Ozs7O0FDYkQsa0M7Ozs7OztBQ0FBLGtDOzs7Ozs7QUNBQSxvQzs7Ozs7O0FDQUEsK0M7Ozs7OztBQ0FBLDBDOzs7Ozs7QUNBQSx5Qzs7Ozs7O0FDQUEsdUM7Ozs7OztBQ0FBLDZDOzs7Ozs7QUNBQSxzQzs7Ozs7O0FDQUEscUQ7Ozs7OztBQ0FBLHdDOzs7Ozs7QUNBQSxzQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODZhNjFkYzZkNjlkNDIxNTVhZTQiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2Etcm91dGVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwia29hLXJvdXRlclwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtcmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKVxyXG5jb25zdCB7IHRpbWVzIH0gPSByZXF1aXJlKCdsb2Rhc2gnKVxyXG5jb25zdCBGYWtlciA9IHJlcXVpcmUoJ2Zha2VyJylcclxuXHJcbmNvbnN0IHsgQVJSQVksIElOVEVHRVIsIFNUUklORywgQk9PTEVBTiB9ID0gU2VxdWVsaXplXHJcblxyXG4vLyBjb25zdCBDb25uID0gbmV3IFNlcXVlbGl6ZSgncG9zdGdyZXM6Ly91cWdmcGVxdjpmUTJVZk1oUFVXTmVmZHFCbzZNTDJ2N0pUSUtjeTloeEBxZGpqdG5rdi5kYi5lbGVwaGFudHNxbC5jb206NTQzMi91cWdmcGVxdicpXHJcbmNvbnN0IENvbm4gPSBuZXcgU2VxdWVsaXplKCdwb3N0Z3JlcycsICdwb3N0Z3JlcycsICd5YmR1YW4nLCB7IGRpYWxlY3Q6ICdwb3N0Z3JlcycgfSlcclxuXHJcbmNvbnN0IFBlcnNvbiA9IENvbm4uZGVmaW5lKCdwZXJzb24nLCB7XHJcbiAgbmFtZToge1xyXG4gICAgdHlwZTogU1RSSU5HLFxyXG4gICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgIHVuaXF1ZTogdHJ1ZVxyXG4gIH0sXHJcbiAgZW1haWw6IHtcclxuICAgIHR5cGU6IFNUUklORyxcclxuICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICB1bmlxdWU6IHRydWUsXHJcbiAgICB2YWxpZGF0ZToge1xyXG4gICAgICBpc0VtYWlsOiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICBwYXNzd29yZDoge1xyXG4gICAgdHlwZTogU1RSSU5HLFxyXG4gICAgYWxsb3dOdWxsOiBmYWxzZVxyXG4gIH0sXHJcbiAgaXNBZG1pbjoge1xyXG4gICAgdHlwZTogQk9PTEVBTixcclxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2VcclxuICB9XHJcbn0pXHJcblxyXG5jb25zdCBQb3N0ID0gQ29ubi5kZWZpbmUoJ3Bvc3QnLCB7XHJcbiAgdGl0bGU6IHtcclxuICAgIHR5cGU6IFNUUklORyxcclxuICAgIGFsbG93TnVsbDogZmFsc2VcclxuICB9LFxyXG4gIGNvbnRlbnQ6IHtcclxuICAgIHR5cGU6IFNUUklORyxcclxuICAgIGFsbG93TnVsbDogZmFsc2VcclxuICB9LFxyXG4gIG91dHdhcmQ6IHtcclxuICAgIHR5cGU6IEJPT0xFQU4sXHJcbiAgICBkZWZhdWx0VmFsdWU6IGZhbHNlXHJcbiAgfSxcclxuICByZWNlaXZlcnM6IHtcclxuICAgIHR5cGU6IEFSUkFZKElOVEVHRVIpLFxyXG4gICAgZGVmYXVsdFZhbHVlOiBbXVxyXG4gIH1cclxufSlcclxuXHJcblBlcnNvbi5oYXNNYW55KFBvc3QpXHJcblBvc3QuYmVsb25nc1RvKFBlcnNvbilcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIERCOiBDb25uLFxyXG4gIFBlcnNvbixcclxuICBQb3N0XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2RiLmpzIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xyXG5pbXBvcnQgZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnXHJcblxyXG5jb25zdCBMT0dJTiA9ICdidXJuaW5nL2F1dGgvTE9HSU4nXHJcbmNvbnN0IExPR0lOX1NVQ0NFU1MgPSAnYnVybmluZy9hdXRoL0xPR0lOX1NVQ0NFU1MnXHJcbmNvbnN0IExPR0lOX0ZBSUwgPSAnYnVybmluZy9hdXRoL0xPR0lOX0ZBSUwnXHJcbmNvbnN0IExPR09VVCA9ICdidXJuaW5nL2F1dGgvTE9HT1VUJ1xyXG5cclxuY29uc3QgaW5pdFN0YXRlID0geyB1c2VyOiBudWxsIH1cclxuLy8gcmVkdWNlclxyXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUgPSBpbml0U3RhdGUsIGFjdGlvbiA9IHt9KSA9PiB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBMT0dJTjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBsb2dnaW5nSW46IHRydWVcclxuICAgICAgfVxyXG4gICAgY2FzZSBMT0dJTl9TVUNDRVNTOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGxvZ2dpbmdJbjogZmFsc2UsXHJcbiAgICAgICAgdXNlcjogYWN0aW9uLnJlc3VsdFxyXG4gICAgICB9XHJcbiAgICBjYXNlIExPR0lOX0ZBSUw6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgbG9nZ2luZ0luOiBmYWxzZSxcclxuICAgICAgICB1c2VyOiBudWxsLFxyXG4gICAgICAgIGxvZ2luRXJyb3I6IGFjdGlvbi5lcnJvclxyXG4gICAgICB9XHJcbiAgICBjYXNlIExPR09VVDpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICB1c2VyOiBudWxsXHJcbiAgICAgIH1cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvZ2luKHBlcnNvbiwgcmVtZW1iZXIpIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiBMT0dJTlxyXG4gICAgfSlcclxuICAgIHJldHVybiBheGlvcy5wb3N0KCcvbG9naW4nLCB7IC4uLnBlcnNvbiB9KVxyXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgaWYgKCFyZXN1bHQuZGF0YSkge1xyXG4gICAgICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlOiBMT0dJTl9GQUlMLFxyXG4gICAgICAgICAgICBlcnJvcjogcmVzdWx0LmVycm9yc1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGF1dGhUb2tlbiA9IGRlY29kZShyZXN1bHQuZGF0YSlcclxuICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICB0eXBlOiBMT0dJTl9TVUNDRVNTLFxyXG4gICAgICAgICAgcmVzdWx0OiBhdXRoVG9rZW5cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZW1lbWJlciAmJiBhdXRoVG9rZW4pIHtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIEpTT04uc3RyaW5naWZ5KGF1dGhUb2tlbikpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdqc29ud2VidG9rZW49OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgVVRDOyBwYXRoPS87J1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXV0aFRva2VuXHJcbiAgICAgIH0pXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoKSB7XHJcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJylcclxuICBkb2N1bWVudC5jb29raWUgPSAnanNvbndlYnRva2VuPTsgZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIFVUQzsgcGF0aD0vOydcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogTE9HT1VULFxyXG4gICAgYXV0aFRva2VuOiBudWxsXHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWR1eC9tb2R1bGVzL2F1dGguanMiLCJpbXBvcnQgSG9tZSBmcm9tICdjb21wb25lbnRzL2hvbWUuanN4J1xyXG5cclxuaW1wb3J0IENyZWF0ZVBlcnNvbiBmcm9tICdjb250YWluZXJzL3BlcnNvbi9jcmVhdGUuanN4J1xyXG5pbXBvcnQgU2VhcmNoUGVyc29uIGZyb20gJ2NvbnRhaW5lcnMvcGVyc29uL3NlYXJjaC5qc3gnXHJcbmltcG9ydCBQcm9maWxlIGZyb20gJ2NvbnRhaW5lcnMvcGVyc29uL3Byb2ZpbGUuanN4J1xyXG5pbXBvcnQgKiBhcyBwZXJzb25BY3Rpb25zIGZyb20gJ3JlZHV4L21vZHVsZXMvcGVyc29uJ1xyXG5cclxuaW1wb3J0IExvZ2luIGZyb20gJ2NvbnRhaW5lcnMvbG9naW4nXHJcbmltcG9ydCAqIGFzIGF1dGhBY3Rpb25zIGZyb20gJ3JlZHV4L21vZHVsZXMvYXV0aCdcclxuXHJcbmltcG9ydCBDcmVhdGVQb3N0IGZyb20gJ2NvbnRhaW5lcnMvcG9zdC9jcmVhdGUuanN4J1xyXG5pbXBvcnQgUG9zdExpc3QgZnJvbSAnY29udGFpbmVycy9wb3N0L2xpc3QuanN4J1xyXG5pbXBvcnQgUG9zdCBmcm9tICdjb250YWluZXJzL3Bvc3QvY29udGVudC5qc3gnXHJcbmltcG9ydCAqIGFzIHBvc3RBY3Rpb25zIGZyb20gJ3JlZHV4L21vZHVsZXMvcG9zdCdcclxuXHJcblxyXG4vLyBwYXRoOiDot6/nlLHlnLDlnYBcclxuLy8gbmFtZTog5qCH562+5pi+56S65ZCN56ew77yM5Li656m65pe277yM5LiN5ZyoaGVhZGVy5Lit5pi+56S6XHJcbi8vIGNvbXBvbmVudDog5a+55bqU57uE5bu6XHJcbi8vIGlzQWRtaW46IOS7hUFkbWlu5Y+v5Lul6K6/6ZeuXHJcbi8vIGhpZGVXaGVuTG9naW46IOeZu+W9leS5i+WQjumakOiXj1xyXG4vLyBtYXBTdGF0ZVRvUHJvcHM6IOi/lOWbnuS4gOS4quWHveaVsO+8iOWPguaVsHsgbG9jYXRpb24sIG1hdGNoLCBoaXN0b3J5IH3vvInvvIzkuLpjb25uZWN05Ye95pWw55qE56ys5LiA5Y+C5pWwXHJcblxyXG5jb25zdCByb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJy8nLFxyXG4gICAgbmFtZTogJ0hvbWUnLFxyXG4gICAgZXhhY3Q6IHRydWUsXHJcbiAgICBjb21wb25lbnQ6IEhvbWVcclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvY3JlYXRlLXBlcnNvbicsXHJcbiAgICBuYW1lOiAnQ3JlYXRlIFBlcnNvbicsXHJcbiAgICBjb21wb25lbnQ6IENyZWF0ZVBlcnNvbixcclxuICAgIG1hcFN0YXRlVG9Qcm9wczogcm91dGVQcm9wcyA9PiBzdGF0ZSA9PiAoe1xyXG4gICAgICByZXN1bHQ6IHN0YXRlLnBlcnNvbi5hZGRSZXN1bHQsXHJcbiAgICAgIGF1dGhUb2tlbjogc3RhdGUuYXV0aC51c2VyXHJcbiAgICB9KSxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wczogcm91dGVQcm9wcyA9PiAoe1xyXG4gICAgICBhZGRQZXJzb246IHBlcnNvbkFjdGlvbnNbJ2FkZFBlcnNvbiddXHJcbiAgICB9KVxyXG4gIH0sIHtcclxuICAgIHBhdGg6ICcvc2VhcmNoLXBlcnNvbicsXHJcbiAgICBuYW1lOiAnU2VhcmNoIFBlcnNvbicsXHJcbiAgICBjb21wb25lbnQ6IFNlYXJjaFBlcnNvbixcclxuICAgIG1hcFN0YXRlVG9Qcm9wczogcm91dGVQcm9wcyA9PiBzdGF0ZSA9PiAoe1xyXG4gICAgICByZXN1bHQ6IHN0YXRlLnBlcnNvbi5zZWFyY2hSZXN1bHRcclxuICAgIH0pLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzOiByb3V0ZVByb3BzID0+ICh7XHJcbiAgICAgIHNlYXJjaFBlcnNvbjogcGVyc29uQWN0aW9uc1snc2VhcmNoUGVyc29uJ11cclxuICAgIH0pXHJcbiAgfSwge1xyXG4gICAgcGF0aDogJy9sb2dpbicsXHJcbiAgICBjb21wb25lbnQ6IExvZ2luLFxyXG4gICAgaGlkZVdoZW5Mb2dpbjogdHJ1ZSxcclxuICAgIG1hcFN0YXRlVG9Qcm9wczogcm91dGVQcm9wcyA9PiBzdGF0ZSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgbG9jYXRpb24gfSA9IHJvdXRlUHJvcHNcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBhdXRoVG9rZW46IHN0YXRlLmF1dGgudWVyLFxyXG4gICAgICAgIGxvY2F0aW9uXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHM6IHJvdXRlUHJvcHMgPT4gKHtcclxuICAgICAgbG9naW46IGF1dGhBY3Rpb25zWydsb2dpbiddXHJcbiAgICB9KVxyXG4gIH0sIHtcclxuICAgIHBhdGg6ICcvcHJvZmlsZS86aWQnLFxyXG4gICAgY29tcG9uZW50OiBQcm9maWxlLFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzOiByb3V0ZVByb3BzID0+IHN0YXRlID0+IHtcclxuICAgICAgY29uc3QgeyBtYXRjaDogeyBwYXJhbXM6IHsgaWQgfSB9IH0gPSByb3V0ZVByb3BzXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6ICtpZCxcclxuICAgICAgICBhdXRoVG9rZW46IHN0YXRlLmF1dGgudXNlcixcclxuICAgICAgICBwcm9maWxlOiBzdGF0ZS5wZXJzb24ucHJvZmlsZVtpZF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wczogcm91dGVQcm9wcyA9PiAoe1xyXG4gICAgICBmZXRjaFByb2ZpbGU6IHBlcnNvbkFjdGlvbnNbJ2ZldGNoUHJvZmlsZSddLFxyXG4gICAgICBsb2dvdXQ6IGF1dGhBY3Rpb25zWydsb2dvdXQnXVxyXG4gICAgfSlcclxuICB9LCB7XHJcbiAgICBwYXRoOiAnL3Bvc3QvOmlkJyxcclxuICAgIGNvbXBvbmVudDogUG9zdCxcclxuICAgIG1hcFN0YXRlVG9Qcm9wczogcm91dGVQcm9wcyA9PiBzdGF0ZSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgbWF0Y2g6IHsgcGFyYW1zOiB7IGlkIH0gfSB9ID0gcm91dGVQcm9wc1xyXG4gICAgICBjb25zdCBwb3N0ID0gc3RhdGUucG9zdC5wb3N0c1tpZF0gfHwgeyBpZDogK2lkIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBhdXRoVG9rZW46IHN0YXRlLmF1dGgudXNlcixcclxuICAgICAgICBwb3N0XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHM6IHJvdXRlUHJvcHMgPT4gKHtcclxuICAgICAgZmV0Y2hQb3N0OiBwb3N0QWN0aW9uc1snZmV0Y2hQb3N0J11cclxuICAgIH0pLFxyXG4gICAgb25OYXZpZ2F0ZTogcG9zdEFjdGlvbnNbJ2ZldGNoUG9zdCddXHJcbiAgfSwge1xyXG4gICAgcGF0aDogJy9jcmVhdGUtcG9zdCcsXHJcbiAgICBjb21wb25lbnQ6IENyZWF0ZVBvc3QsXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHM6IHJvdXRlUHJvcHMgPT4gc3RhdGUgPT4gKHtcclxuICAgICAgYXV0aFRva2VuOiBzdGF0ZS5hdXRoLnVzZXIsXHJcbiAgICAgIHJlc3VsdDogc3RhdGUucG9zdC5hZGRSZXN1bHRcclxuICAgIH0pLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzOiByb3V0ZVByb3BzID0+ICh7XHJcbiAgICAgIGFkZFBvc3Q6IHBvc3RBY3Rpb25zWydhZGRQb3N0J11cclxuICAgIH0pXHJcbiAgfSwge1xyXG4gICAgcGF0aDogJy9wb3N0LWxpc3QnLFxyXG4gICAgY29tcG9uZW50OiBQb3N0TGlzdCxcclxuICAgIG5hbWU6ICdQb3N0IExpc3QnLFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzOiByb3V0ZVByb3BzID0+IHN0YXRlID0+ICh7XHJcbiAgICAgIGxpc3Q6IHN0YXRlLnBvc3QubGlzdFxyXG4gICAgfSksXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHM6IHJvdXRlUHJvcHMgPT4gKHtcclxuICAgICAgZmV0Y2hQb3N0TGlzdDogcG9zdEFjdGlvbnNbJ2ZldGNoUG9zdExpc3QnXVxyXG4gICAgfSksXHJcbiAgICBvbk5hdmlnYXRlOiBwb3N0QWN0aW9uc1snZmV0Y2hQb3N0TGlzdCddXHJcbiAgfVxyXG5dXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlc1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm91dGVzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibG9kYXNoXCJcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBtYWtlRXhlY3V0YWJsZVNjaGVtYSwgYWRkRXJyb3JMb2dnaW5nVG9TY2hlbWEgfSA9IHJlcXVpcmUoJ2dyYXBocWwtdG9vbHMnKVxyXG5cclxuY29uc3QgeyBEQiB9ID0gcmVxdWlyZSgnLi9kYicpXHJcbi8vIGNvbnN0IHsgcmVzb2x2ZUZvckFkbWluIH0gPSByZXF1aXJlKCcuL2F1dGgnKVxyXG5cclxuY29uc3Qgc2NoZW1hID0gYFxyXG4gICMgVGhpcyBpcyBhIHBlcnNvblxyXG4gIHR5cGUgUGVyc29uIHtcclxuICAgIGlkOiBJbnQhXHJcbiAgICAjIOaYvuekuuWQjeensFxyXG4gICAgbmFtZTogU3RyaW5nIVxyXG4gICAgIyDpgq7nrrFcclxuICAgIGVtYWlsOiBTdHJpbmchXHJcbiAgICAjIOaYr+WQpuaYr+euoeeQhuWRmFxyXG4gICAgaXNBZG1pbjogQm9vbGVhblxyXG4gICAgIyDmiYDlj5HooajnmoTmlofnq6BcclxuICAgIHBvc3RzOiBbUG9zdF1cclxuICB9XHJcblxyXG4gICMgUGVyc29uIGNyZWF0aW9uIG1lc3NhZ2VcclxuICB0eXBlIFBlcnNvbkNyZWF0aW9uIHtcclxuICAgIG1lc3NhZ2U6IFN0cmluZ1xyXG4gICAgY3JlYXRlZDogQm9vbGVhbiFcclxuICB9XHJcblxyXG4gICMgVGhpcyBpcyBhIHBvc3RcclxuICB0eXBlIFBvc3Qge1xyXG4gICAgaWQ6IEludFxyXG4gICAgdGl0bGU6IFN0cmluZ1xyXG4gICAgY29udGVudDogU3RyaW5nXHJcbiAgICAjIOaYr+WQpuWFrOW8gFxyXG4gICAgb3V0d2FyZDogQm9vbGVhblxyXG4gICAgIyDliJvlu7rogIVcclxuICAgIHBlcnNvbjogUGVyc29uXHJcbiAgICAjIOWFgeiuuOafpeeci+eahOS6ulxyXG4gICAgcmVjZWl2ZXJzOiBbSW50XVxyXG4gIH1cclxuXHJcbiAgIyBwb3N0IGNyZWF0aW9uIG1lc3NhZ2VcclxuICB0eXBlIFBvc3RDcmVhdGlvbiB7XHJcbiAgICBtZXNzYWdlOiBTdHJpbmdcclxuICAgIGlkOiBJbnRcclxuICB9XHJcblxyXG4gICMgVGhpcyBpcyByb290IHF1ZXJ5XHJcbiAgdHlwZSBRdWVyeSB7XHJcbiAgICBwZW9wbGUoaWQ6IEludCwgZW1haWw6IFN0cmluZyk6IFtQZXJzb25dXHJcbiAgICBwb3N0cyhpZDogSW50LCB0aXRsZTogU3RyaW5nKTogW1Bvc3RdXHJcbiAgfVxyXG5cclxuXHJcbiAgIyBGdW5jdGlvbnMgdG8gY3JlYXRlIHN0dWZmXHJcbiAgdHlwZSBNdXRhdGlvbiB7XHJcbiAgICAjIEFkZCBhIHBlcnNvblxyXG4gICAgYWRkUGVyc29uIChuYW1lOiBTdHJpbmchLCBlbWFpbDogU3RyaW5nISwgcGFzc3dvcmQ6IFN0cmluZyEpOiBQZXJzb25DcmVhdGlvblxyXG5cclxuICAgICMgQWRkIGEgcG9zdFxyXG4gICAgYWRkUG9zdCAodGl0bGU6IFN0cmluZyEsIGNvbnRlbnQ6IFN0cmluZyEsIG91dHdhcmQ6IEJvb2xlYW4pOiBQb3N0Q3JlYXRpb25cclxuICB9XHJcbiAgc2NoZW1hIHtcclxuICAgIHF1ZXJ5OiBRdWVyeVxyXG4gICAgbXV0YXRpb246IE11dGF0aW9uXHJcbiAgfVxyXG5gXHJcblxyXG5jb25zdCByZXNvbHZlRnVuY3Rpb25zID0ge1xyXG4gIFBlcnNvbjoge1xyXG4gICAgcG9zdHMocGVyc29uLCBhcmdzLCBjb250ZXh0ID0ge30pIHtcclxuICAgICAgLy8gcmV0dXJuIHBlcnNvbi5nZXRQb3N0cygpXHJcbiAgICAgIGNvbnN0IHdoZXJlID0gKGNvbnRleHQuYXV0aFRva2VuICYmIHBlcnNvbi5pZCA9PT0gY29udGV4dC5hdXRoVG9rZW4uaWQpID8gbnVsbCA6IHsgb3V0d2FyZDogdHJ1ZSB9XHJcbiAgICAgIHJldHVybiBwZXJzb24uZ2V0UG9zdHMoeyB3aGVyZSB9KS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGFcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIFBvc3Q6IHtcclxuICAgIHBlcnNvbihwb3N0KSB7XHJcbiAgICAgIHJldHVybiBwb3N0LmdldFBlcnNvbigpXHJcbiAgICB9LFxyXG4gICAgY29udGVudChwb3N0LCBhcmdzLCBjb250ZXh0ID0ge30pIHtcclxuICAgICAgY29uc3QgdXNlcklkID0gY29udGV4dC5hdXRoVG9rZW4gPyBjb250ZXh0LmF1dGhUb2tlbi5pZCA6IG51bGxcclxuICAgICAgaWYgKCFwb3N0Lm91dHdhcmQgJiYgKHVzZXJJZCAhPT0gcG9zdC5wZXJzb25JZCAmJiBwb3N0LnJlY2VpdmVycy5pbmRleE9mKHVzZXJJZCkgPCAwKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHBvc3QuY29udGVudFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgUXVlcnk6IHtcclxuICAgIGFzeW5jIHBlb3BsZShfLCB7IGlkLCBlbWFpbCB9KSB7XHJcbiAgICAgIGxldCBhcmdzID0ge31cclxuICAgICAgaWYgKGlkIHx8IGlkID09PSAwKSBhcmdzLmlkID0gaWRcclxuICAgICAgaWYgKGVtYWlsKSBhcmdzLmVtYWlsID0gZW1haWxcclxuICAgICAgY29uc3QgcGVvcGxlID0gYXdhaXQgREIubW9kZWwoJ3BlcnNvbicpLmZpbmRBbGwoe1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHsgZXhjbHVkZTogWydwYXNzd29yZCddIH0sXHJcbiAgICAgICAgd2hlcmU6IGFyZ3NcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuIHBlb3BsZVxyXG4gICAgfSxcclxuICAgIHBvc3RzKF8sIHsgaWQsIHRpdGxlIH0sIGNvbnRleHQgPSB7fSkge1xyXG4gICAgICBsZXQgYXJncyA9IHt9XHJcbiAgICAgIGlmIChpZCB8fCBpZCA9PT0gMCkge1xyXG4gICAgICAgIGFyZ3MgPSB7IGlkIH1cclxuICAgICAgfSBlbHNlIGlmICh0aXRsZSkge1xyXG4gICAgICAgIGFyZ3MgPSB7IHRpdGxlIH1cclxuICAgICAgfSBlbHNlIGlmIChjb250ZXh0LmF1dGhUb2tlbikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oYXJncywge1xyXG4gICAgICAgICAgJG9yOiBbXHJcbiAgICAgICAgICAgIHsgcGVyc29uSWQ6IGNvbnRleHQuYXV0aFRva2VuLmlkIH0sXHJcbiAgICAgICAgICAgIHsgcmVjZWl2ZXJzOiB7ICRjb250YWluZWQ6IFtjb250ZXh0LmF1dGhUb2tlbi5pZF0gfSB9LFxyXG4gICAgICAgICAgICB7IG91dHdhcmQ6IHRydWUgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihhcmdzLCB7IG91dHdhcmQ6IHRydWUgfSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gREIubW9kZWwoJ3Bvc3QnKS5maW5kQWxsKHsgd2hlcmU6IGFyZ3MgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIE11dGF0aW9uOiB7XHJcbiAgICBhZGRQZXJzb24oXywgYXJncykge1xyXG4gICAgICByZXR1cm4gREIubW9kZWwoJ3BlcnNvbicpLmNyZWF0ZShhcmdzKVxyXG4gICAgICAgIC50aGVuKCgpID0+ICh7IGNyZWF0ZWQ6IHRydWUgfSkpXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxyXG4gICAgICAgICAgICBjcmVhdGVkOiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYWRkUG9zdChfLCBhcmdzLCBjb250ZXh0ID0ge30pIHtcclxuICAgICAgaWYgKCFjb250ZXh0LmF1dGhUb2tlbikge1xyXG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1VuYXV0aG9yaXplZCcpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIERCLm1vZGVsKCdwb3N0JylcclxuICAgICAgICAuY3JlYXRlKE9iamVjdC5hc3NpZ24oe30sIGFyZ3MsIHtcclxuICAgICAgICAgIHBlcnNvbklkOiBjb250ZXh0LmF1dGhUb2tlbi5pZFxyXG4gICAgICAgIH0pKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5jb25zdCBleGVjdXRhYmxlU2NoZW1hID0gbWFrZUV4ZWN1dGFibGVTY2hlbWEoe1xyXG4gIHR5cGVEZWZzOiBzY2hlbWEsXHJcbiAgcmVzb2x2ZXJzOiByZXNvbHZlRnVuY3Rpb25zXHJcbn0pXHJcbmFkZEVycm9yTG9nZ2luZ1RvU2NoZW1hKGV4ZWN1dGFibGVTY2hlbWEsIHsgbG9nOiBlID0+IGNvbnNvbGUuZXJyb3IoZS5zdGFjaykgfSlcclxubW9kdWxlLmV4cG9ydHMgPSBleGVjdXRhYmxlU2NoZW1hXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9zY2hlbWEuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IExpbmssIHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xyXG5cclxuY29uc3QgRm9yYmlkZGVuID0gKHsgaGlzdG9yeSwgbG9jYXRpb246IHsgcGF0aG5hbWUgfSB9KSA9PiAoXHJcbiAgPGRpdiBzdHlsZT17e21hcmdpblRvcDogJzIwcHgnfX0+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8aDI+NDAzIH4gRm9yYmlkZGVuPC9oMj5cclxuICAgICAgPExpbmsgdG89e3tcclxuICAgICAgICBwYXRobmFtZTogJy9sb2dpbicsXHJcbiAgICAgICAgc3RhdGU6IHsgZnJvbTogeyBwYXRobmFtZSB9IH1cclxuICAgICAgfX0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1sZyBidG4tc3VjY2Vzc1wiPkxPR0lOIFRPIFZJRVc8L0xpbms+XHJcbiAgICAgIDxidXR0b24gb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICBpZiAoaGlzdG9yeS5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICBoaXN0b3J5LnB1c2goJy8nKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoaXN0b3J5LmdvQmFjaygpXHJcbiAgICAgICAgfVxyXG4gICAgICB9fSB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1sZyBidG4tbGlua1wiPkJhY2s8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKEZvcmJpZGRlbilcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvNDAzLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXHJcblxyXG5jb25zdCBOb3RGb3VuZCA9ICh7IGhpc3RvcnkgfSkgPT4gKFxyXG4gIDxkaXYgc3R5bGU9e3ttYXJnaW5Ub3A6ICcyMHB4J319PlxyXG4gICAgPGRpdj5cclxuICAgICAgPGgyPjQwNCB+IE5PVCBGT1VORDwvaDI+XHJcbiAgICAgIDxidXR0b24gb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICBpZiAoaGlzdG9yeS5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICBoaXN0b3J5LnB1c2goJy8nKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoaXN0b3J5LmdvQmFjaygpXHJcbiAgICAgICAgfVxyXG4gICAgICB9fSB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1sZyBidG4tbGlua1wiPkJhY2s8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKE5vdEZvdW5kKVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy80MDQuanN4IiwiY29uc3QgeyBncmFwaFFMSGVscGVyIH0gPSBwcm9jZXNzLmVudi5CUk9XU0VSID8gcmVxdWlyZSgndXRpbHMvY2xpZW50LWdyYXBocWwtaGVscGVyJykgOiByZXF1aXJlKCd1dGlscy9zZXJ2ZXItZ3JhcGhxbC1oZWxwZXInKVxyXG5cclxuY29uc3QgQUREID0gJ2J1cm5pbmcvcGVyc29uL0FERCdcclxuY29uc3QgREVMRVRFID0gJ2J1cm5pbmcvcGVyc29uL0RFTEVURSdcclxuY29uc3QgU0VBUkNIID0gJ2J1cm5pbmcvcGVyc29uL1NFQVJDSCdcclxuY29uc3QgUFJPRklMRSA9ICdidXJuaW5nL3BlcnNvbi9QUk9GSUxFJ1xyXG5cclxuY29uc3QgaW5pdFN0YXRlID0ge1xyXG4gIHByb2ZpbGU6IHt9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlID0gaW5pdFN0YXRlLCBhY3Rpb24gPSB7fSkgPT4ge1xyXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgIGNhc2UgQUREOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGFkZFJlc3VsdDogYWN0aW9uLnJlc3VsdFxyXG4gICAgICB9XHJcbiAgICBjYXNlIFNFQVJDSDpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBzZWFyY2hSZXN1bHQ6IGFjdGlvbi5yZXN1bHRcclxuICAgICAgfVxyXG4gICAgY2FzZSBERUxFVEU6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZGVsZXRlUmVzdWx0OiBhY3Rpb24ucmVzdWx0XHJcbiAgICAgIH1cclxuICAgIGNhc2UgUFJPRklMRTpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBwcm9maWxlOiB7XHJcbiAgICAgICAgICAuLi5zdGF0ZS5wcm9maWxlLFxyXG4gICAgICAgICAgW2FjdGlvbi5yZXN1bHQuaWRdOiBhY3Rpb24ucmVzdWx0XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gc3RhdGVcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFBlcnNvbihwZXJzb24pIHtcclxuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgbXV0YXRpb24gPSBgXHJcbiAgICAgIG11dGF0aW9uIEFkZFBlcnNvbigkbmFtZTogU3RyaW5nISwgJGVtYWlsOiBTdHJpbmchLCAkcGFzc3dvcmQ6IFN0cmluZyEpe1xyXG4gICAgICAgIGFkZFBlcnNvbihuYW1lOiAkbmFtZSwgZW1haWw6ICRlbWFpbCwgcGFzc3dvcmQ6ICRwYXNzd29yZCl7XHJcbiAgICAgICAgICBtZXNzYWdlXHJcbiAgICAgICAgICBjcmVhdGVkXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBgXHJcbiAgICBjb25zdCB7IGF1dGhUb2tlbiB9ID0gZ2V0U3RhdGUoKVxyXG4gICAgcmV0dXJuIGdyYXBoUUxIZWxwZXIobXV0YXRpb24sIHBlcnNvbiwgeyBhdXRoVG9rZW4gfSlcclxuICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBBREQsIHJlc3VsdDogZGF0YS5hZGRQZXJzb24gfSlcclxuICAgICAgICByZXR1cm4gZGF0YS5hZGRQZXJzb25cclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFBlcnNvbihwZXJzb24pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgY29uc3QgcXVlcnkgPSBgXHJcbiAgICAgIHF1ZXJ5IFBlb3BsZSgkaWQ6IEludCwgJGVtYWlsOiBTdHJpbmcpIHtcclxuICAgICAgICBwZW9wbGUoaWQ6ICRpZCwgZW1haWw6ICRlbWFpbCkge1xyXG4gICAgICAgICAgaWRcclxuICAgICAgICAgIG5hbWVcclxuICAgICAgICAgIGVtYWlsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBgXHJcbiAgICByZXR1cm4gZ3JhcGhRTEhlbHBlcihxdWVyeSwgcGVyc29uKVxyXG4gICAgICAudGhlbihkYXRhID0+IGRhdGEucGVvcGxlKVxyXG4gICAgICAudGhlbihwZW9wbGUgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogU0VBUkNILCByZXN1bHQ6IHBlb3BsZSB9KVxyXG4gICAgICAgIHJldHVybiBwZW9wbGVcclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoUHJvZmlsZShwZXJzb24pIHtcclxuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgeyBhdXRoVG9rZW4gfSA9IGdldFN0YXRlKClcclxuICAgIGNvbnN0IHF1ZXJ5ID0gYFxyXG4gICAgICBxdWVyeSBQZW9wbGUoJGlkOiBJbnQsICRlbWFpbDogU3RyaW5nKSB7XHJcbiAgICAgICAgcGVvcGxlKGlkOiAkaWQsIGVtYWlsOiAkZW1haWwpIHtcclxuICAgICAgICAgIGlkXHJcbiAgICAgICAgICBuYW1lXHJcbiAgICAgICAgICBlbWFpbFxyXG4gICAgICAgICAgcG9zdHMge1xyXG4gICAgICAgICAgICBpZFxyXG4gICAgICAgICAgICB0aXRsZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgYFxyXG4gICAgcmV0dXJuIGdyYXBoUUxIZWxwZXIocXVlcnksIHBlcnNvbiwgeyBhdXRoVG9rZW4gfSlcclxuICAgICAgLnRoZW4oZGF0YSA9PiBkYXRhLnBlb3BsZSlcclxuICAgICAgLnRoZW4ocGVvcGxlID0+IHtcclxuICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICB0eXBlOiBQUk9GSUxFLFxyXG4gICAgICAgICAgcmVzdWx0OiBwZW9wbGVbMF0gfHwgcGVyc29uXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcGVvcGxlXHJcbiAgICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVkdXgvbW9kdWxlcy9wZXJzb24uanMiLCJjb25zdCB7IGdyYXBoUUxIZWxwZXIgfSA9IHByb2Nlc3MuZW52LkJST1dTRVIgPyByZXF1aXJlKCd1dGlscy9jbGllbnQtZ3JhcGhxbC1oZWxwZXInKSA6IHJlcXVpcmUoJ3V0aWxzL3NlcnZlci1ncmFwaHFsLWhlbHBlcicpXHJcblxyXG5jb25zdCBBREQgPSAnYnVybmluZy9wb3N0L0FERCdcclxuY29uc3QgTE9BRCA9ICdidXJuaW5nL3Bvc3QvTE9BRCdcclxuY29uc3QgTElTVCA9ICdidXJuaW5nL3Bvc3QvTElTVCdcclxuY29uc3QgREVMRVRFID0gJ2J1cm5pbmcvcG9zdC9ERUxFVEUnXHJcbmNvbnN0IFNFQVJDSCA9ICdidXJuaW5nL3Bvc3QvU0VBUkNIJ1xyXG5cclxuY29uc3QgaW5pdFN0YXRlID0ge1xyXG4gIGxpc3Q6IFtdLFxyXG4gIHBvc3RzOiB7fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSA9IGluaXRTdGF0ZSwgYWN0aW9uID0ge30pID0+IHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIEFERDpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBhZGRSZXN1bHQ6IGFjdGlvbi5yZXN1bHRcclxuICAgICAgfVxyXG4gICAgY2FzZSBMT0FEOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIHBvc3RzOiB7XHJcbiAgICAgICAgICAuLi5zdGF0ZS5wb3N0cyxcclxuICAgICAgICAgIFthY3Rpb24ucmVzdWx0LmlkXTogYWN0aW9uLnJlc3VsdFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgY2FzZSBMSVNUOlxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGxpc3Q6IGFjdGlvbi5yZXN1bHRcclxuICAgICAgfVxyXG4gICAgY2FzZSBERUxFVEU6XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgcG9zdHM6IHtcclxuICAgICAgICAgIC4uLnN0YXRlLnBvc3RzLFxyXG4gICAgICAgICAgW2FjdGlvbi5yZXN1bHQuaWRdOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBjYXNlIFNFQVJDSDpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBzZWFyY2hSZXN1bHQ6IGFjdGlvbi5yZXN1bHRcclxuICAgICAgfVxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkUG9zdChwb3N0KSB7XHJcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgIGNvbnN0IG11dGF0aW9uID0gYFxyXG4gICAgICBtdXRhdGlvbiBBZGRQb3N0KCR0aXRsZTogU3RyaW5nISwgJGNvbnRlbnQ6IFN0cmluZyEsICRvdXR3YXJkOiBCb29sZWFuKSB7XHJcbiAgICAgICAgYWRkUG9zdCh0aXRsZTogJHRpdGxlLCBjb250ZW50OiAkY29udGVudCwgb3V0d2FyZDogJG91dHdhcmQpIHtcclxuICAgICAgICAgIGlkXHJcbiAgICAgICAgICBtZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBgXHJcbiAgICByZXR1cm4gZ3JhcGhRTEhlbHBlcihtdXRhdGlvbiwgcG9zdClcclxuICAgICAgLnRoZW4oZGF0YSA9PiBkYXRhLmFkZFBvc3QpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBBREQsIHJlc3VsdCB9KVxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFBvc3QoeyBpZCwgdGl0bGUgfSkge1xyXG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICBjb25zdCBxdWVyeSA9IGBcclxuICAgICAgcXVlcnkgUG9zdHNJbmZvKCRpZDogSW50LCAkdGl0bGU6IFN0cmluZykge1xyXG4gICAgICAgIHBvc3RzKGlkOiAkaWQsIHRpdGxlOiAkdGl0bGUpIHtcclxuICAgICAgICAgIGlkXHJcbiAgICAgICAgICB0aXRsZVxyXG4gICAgICAgICAgb3V0d2FyZFxyXG4gICAgICAgICAgY29udGVudFxyXG4gICAgICAgICAgcGVyc29uIHtcclxuICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgbmFtZVxyXG4gICAgICAgICAgICBlbWFpbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgYFxyXG4gICAgY29uc3QgeyBhdXRoVG9rZW4gfSA9IGdldFN0YXRlKClcclxuICAgIHJldHVybiBncmFwaFFMSGVscGVyKHF1ZXJ5LCB7IGlkLCB0aXRsZSB9LCB7IGF1dGhUb2tlbiB9KVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LnBvc3RzKVxyXG4gICAgICAudGhlbihwb3N0cyA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9zdCA9IChwb3N0cyAmJiBwb3N0c1swXSkgPyBwb3N0c1swXSA6IG51bGxcclxuICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICB0eXBlOiBMT0FELFxyXG4gICAgICAgICAgcmVzdWx0OiBwb3N0XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcG9zdFxyXG4gICAgICB9KVxyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hQb3N0TGlzdCgpIHtcclxuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgcXVlcnkgPSBgXHJcbiAgICAgIHF1ZXJ5IHtcclxuICAgICAgICBwb3N0cyB7XHJcbiAgICAgICAgICBpZFxyXG4gICAgICAgICAgdGl0bGVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIGBcclxuICAgIGNvbnN0IHsgYXV0aFRva2VuIH0gPSBnZXRTdGF0ZSgpXHJcbiAgICByZXR1cm4gZ3JhcGhRTEhlbHBlcihxdWVyeSwgbnVsbCwgeyBhdXRoVG9rZW4gfSlcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5wb3N0cylcclxuICAgICAgLnRoZW4ocG9zdHMgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICAgIHR5cGU6IExJU1QsXHJcbiAgICAgICAgICByZXN1bHQ6IHBvc3RzXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcG9zdHNcclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlZHV4L21vZHVsZXMvcG9zdC5qcyIsImltcG9ydCB7IGdyYXBocWwgfSBmcm9tICdncmFwaHFsJ1xyXG5pbXBvcnQgc2NoZW1hIGZyb20gJy4uLy4uL3NlcnZlci9zY2hlbWEnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ3JhcGhRTEhlbHBlcihxdWVyeSwgdmFyaWFibGVzLCBjb250ZXh0ID0ge30pIHtcclxuICByZXR1cm4gZ3JhcGhxbChzY2hlbWEsIHF1ZXJ5LCB7fSwgY29udGV4dCwgdmFyaWFibGVzKVxyXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0LmVycm9ycykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3JzWzBdLm1lc3NhZ2UpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhXHJcbiAgICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9zZXJ2ZXItZ3JhcGhxbC1oZWxwZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJsdWViaXJkXCJcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUm91dGVyIGZyb20gJ2tvYS1yb3V0ZXInXHJcblxyXG5pbXBvcnQgbG9naW4gZnJvbSAnLi9sb2dpbidcclxuaW1wb3J0IGdyYXBocWwgZnJvbSAnLi9ncmFwaHFsJ1xyXG5pbXBvcnQgdW5pdmVyc2FsIGZyb20gJy4vdW5pdmVyc2FsJ1xyXG5cclxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpXHJcblxyXG5yb3V0ZXIuZ2V0KCcvZmF2aWNvbi5pY28nLCAoY3R4KSA9PiB7XHJcbiAgY3R4LnJlZGlyZWN0KCdodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9mYXZpY29uLmljbycpXHJcbn0pXHJcblxyXG5yb3V0ZXJcclxuICAudXNlKGxvZ2luLnJvdXRlcygpKVxyXG4gIC51c2UoZ3JhcGhxbC5yb3V0ZXMoKSlcclxuICAudXNlKHVuaXZlcnNhbC5yb3V0ZXMoKSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcm91dGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJrb2FcIlxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWJvZHlwYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJrb2EtYm9keXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2Etand0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwia29hLWp3dFwiXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgS29hIGZyb20gJ2tvYSdcclxuaW1wb3J0IGtvYUpXVCBmcm9tICdrb2Etand0J1xyXG5pbXBvcnQga29hQm9keSBmcm9tICdrb2EtYm9keXBhcnNlcidcclxuaW1wb3J0IHsgdGltZXMgfSBmcm9tICdsb2Rhc2gnXHJcblxyXG5jb25zdCByb3V0ZXIgPSByZXF1aXJlKCcuL3JvdXRlcycpXHJcbmNvbnN0IHsgREIsIFBlcnNvbiB9ID0gcmVxdWlyZSgnLi9kYicpXHJcbmNvbnN0IGFwcCA9IG5ldyBLb2EoKVxyXG5hcHBcclxuICAudXNlKGtvYUJvZHkoKSlcclxuICAudXNlKGtvYUpXVCh7XHJcbiAgICBjb29raWU6ICdqc29ud2VidG9rZW4nLFxyXG4gICAgc2VjcmV0OiAnTkVURUFTRScsXHJcbiAgICBwYXNzdGhyb3VnaDogdHJ1ZVxyXG4gIH0pKVxyXG4gIC51c2Uocm91dGVyLnJvdXRlcygpKVxyXG4gIC51c2Uocm91dGVyLmFsbG93ZWRNZXRob2RzKCkpXHJcbiAgLy8gQWx3YXlzIHJldHVybiB0aGUgbWFpbiBpbmRleC5odG1sLCBzbyByZWFjdC1yb3V0ZXIgcmVuZGVyIHRoZSByb3V0ZSBpbiB0aGUgY2xpZW50XHJcblxyXG5cclxuLy8gcm91dGVyLmdldCgnKicsIGFzeW5jIChjdHgsIG5leHQpID0+IHtcclxuLy8gICBpZiAoY3R4LnBhdGguZW5kc1dpdGgoJ2dyYXBoaXFsJykpIHtcclxuLy8gICAgIGF3YWl0IG5leHQoKVxyXG4vLyAgIH0gZWxzZSB7XHJcbi8vICAgICBhd2FpdCBzZW5kKGN0eCwgJ3B1YmxpYy9pbmRleC5odG1sJylcclxuLy8gICB9XHJcbi8vIH0pXHJcblxyXG5cclxuYXBwLmxpc3RlbigzMDAwLCAnMC4wLjAuMCcsICgpID0+IGNvbnNvbGUubG9nKCdOb3cgYnJvd3NlciB0byBsb2NhbGhvc3Q6MzAwMC9ncmFwaHFsJykpXHJcblxyXG5EQi5zeW5jKHsgZm9yY2U6IHRydWUgfSkudGhlbigoKSA9PiB7XHJcbiAgdGltZXMoMTAsIChpKSA9PiB7XHJcbiAgICBQZXJzb24uY3JlYXRlKHtcclxuICAgICAgbmFtZTogJ3liZHVhbicgKyBpLFxyXG4gICAgICBlbWFpbDogJ2R5YicgKyBpICsgJ0BnbWFpbC5jb20nLFxyXG4gICAgICBwYXNzd29yZDogJzEyMzQ1NicsXHJcbiAgICAgIGlzQWRtaW46IGkgPT09IDBcclxuICAgIH0pLnRoZW4oKHBlcnNvbikgPT4ge1xyXG4gICAgICByZXR1cm4gcGVyc29uLmNyZWF0ZVBvc3Qoe1xyXG4gICAgICAgIHRpdGxlOiBgU2FtcGxlIHRpdGxlIGJ5ICR7cGVyc29uLm5hbWV9YCxcclxuICAgICAgICBjb250ZW50OiBgVGhpcyBpcyBhIHNhbXBsZSBhcnRpY2xlYCxcclxuICAgICAgICBvdXR3YXJkOiBpICUgMiA9PT0gMCxcclxuICAgICAgICByZWNlaXZlcnM6IFsxXVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KVxyXG59KVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvYXBwLmpzIiwiY29uc3QgUm91dGVyID0gcmVxdWlyZSgna29hLXJvdXRlcicpXHJcbmNvbnN0IHsgZ3JhcGhxbEtvYSwgZ3JhcGhpcWxLb2EgfSA9IHJlcXVpcmUoJ2dyYXBocWwtc2VydmVyLWtvYScpXHJcbmNvbnN0IHNjaGVtYSA9IHJlcXVpcmUoJy4uL3NjaGVtYScpXHJcblxyXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKClcclxuXHJcbnJvdXRlci5wb3N0KCcvZ3JhcGhxbCcsIGdyYXBocWxLb2EoKGN0eCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBzY2hlbWEsXHJcbiAgICBjb250ZXh0OiB7XHJcbiAgICAgIGF1dGhUb2tlbjogY3R4LnN0YXRlLnVzZXJcclxuICAgIH0sXHJcbiAgICBkZWJ1ZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCdcclxuICB9XHJcbn0pKVxyXG5yb3V0ZXIuZ2V0KCcvZ3JhcGhpcWwnLCBncmFwaGlxbEtvYSh7IGVuZHBvaW50VVJMOiAnL2dyYXBocWwnIH0pKVxyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2dyYXBocWwuanMiLCJjb25zdCBSb3V0ZXIgPSByZXF1aXJlKCdrb2Etcm91dGVyJylcclxuY29uc3QgeyBEQiB9ID0gcmVxdWlyZSgnLi4vZGInKVxyXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKClcclxuY29uc3QgeyBzaWduIH0gPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKVxyXG5cclxucm91dGVyLnBvc3QoJy9sb2dpbicsIGFzeW5jIChjdHgpID0+IHtcclxuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gY3R4LnJlcXVlc3QuYm9keVxyXG4gIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XHJcbiAgICBjdHguYm9keSA9ICcnXHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgY29uc3QgcGVyc29uID0gYXdhaXQgREIubW9kZWwoJ3BlcnNvbicpLmZpbmQoeyB3aGVyZTogeyBlbWFpbCwgcGFzc3dvcmQgfSB9KVxyXG4gIGlmIChwZXJzb24pIHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgc2lnbih7IGlkOiBwZXJzb24uaWQsIGVtYWlsLCBuYW1lOiBwZXJzb24ubmFtZSwgaXNBZG1pbjogcGVyc29uLmlzQWRtaW4gfSwgJ05FVEVBU0UnLCB7IGV4cGlyZXNJbjogJzcgZGF5cycgfSlcclxuICAgIGN0eC5ib2R5ID0gdG9rZW5cclxuICAgIGN0eC5jb29raWVzLnNldCgnanNvbndlYnRva2VuJywgdG9rZW4sIHtcclxuICAgICAgbWF4QWdlOiAxMDAwICogNjAgKiA2MCAqIDI0ICogNyxcclxuICAgICAgb3ZlcndyaXRlOiB0cnVlLFxyXG4gICAgICBodHRwT25seTogZmFsc2VcclxuICAgIH0pXHJcbiAgfSBlbHNlIHtcclxuICAgIGN0eC5ib2R5ID0gJydcclxuICB9XHJcbn0pXHJcbm1vZHVsZS5leHBvcnRzID0gcm91dGVyXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvbG9naW4uanMiLCJpbXBvcnQgZnMgZnJvbSAnZnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IFJvdXRlciBmcm9tICdrb2Etcm91dGVyJ1xyXG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICdibHVlYmlyZCdcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuaW1wb3J0IHsgU3RhdGljUm91dGVyLCBtYXRjaFBhdGggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xyXG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInXHJcblxyXG5pbXBvcnQgQXBwIGZyb20gJ2NvbnRhaW5lcnMvQXBwJ1xyXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAncmVkdXgvc3RvcmUnXHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnc3JjL3JvdXRlcydcclxuXHJcbmNvbnN0IHJlYWRGaWxlID0gcHJvbWlzaWZ5KGZzLnJlYWRGaWxlKVxyXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKClcclxuXHJcbnJvdXRlci5nZXQoJy8nLCBhc3luYyAoY3R4KSA9PiB7XHJcbiAgY29uc3QgZmlsZVBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4nLCAncHVibGljJywgJ2luZGV4Lmh0bWwnKVxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBodG1sID0gYXdhaXQgcmVhZEZpbGUoZmlsZVBhdGgsICd1dGY4JylcclxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICBjdHguYm9keSA9IGh0bWwucmVwbGFjZSgne3tTU1J9fScsICcnKS5yZXBsYWNlKCd7e1NUQVRFfX0nLCAne30nKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IGNvbnRleHQgPSB7fVxyXG4gICAgY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZSh7XHJcbiAgICAgIGF1dGg6IHtcclxuICAgICAgICB1c2VyOiBjdHguc3RhdGUudXNlclxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgbGV0IG1hdGNoID0gbnVsbFxyXG4gICAgY29uc3QgbWF0Y2hlZFJvdXRlID0gcm91dGVzLmZpbmQoKHJvdXRlKSA9PiB7XHJcbiAgICAgIG1hdGNoID0gbWF0Y2hQYXRoKGN0eC5yZXEudXJsLCByb3V0ZSlcclxuICAgICAgcmV0dXJuIG1hdGNoXHJcbiAgICB9KVxyXG4gICAgaWYgKG1hdGNoZWRSb3V0ZSAmJiBtYXRjaGVkUm91dGUub25OYXZpZ2F0ZSAmJiB0eXBlb2YgbWF0Y2hlZFJvdXRlLm9uTmF2aWdhdGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgYXdhaXQgc3RvcmUuZGlzcGF0Y2gobWF0Y2hlZFJvdXRlLm9uTmF2aWdhdGUobWF0Y2gucGFyYW1zKSlcclxuICAgIH1cclxuICAgIGNvbnN0IG1hcmt1cCA9IHJlbmRlclRvU3RyaW5nKFxyXG4gICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgICAgICA8U3RhdGljUm91dGVyXHJcbiAgICAgICAgICBsb2NhdGlvbj17Y3R4LnJlcS51cmx9XHJcbiAgICAgICAgICBjb250ZXh0PXtjb250ZXh0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxBcHAgbG9jYXRpb249e3sgcGF0aG5hbWU6IGN0eC5yZXEudXJsIH19IC8+XHJcbiAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XHJcbiAgICAgIDwvUHJvdmlkZXI+XHJcbiAgICApXHJcbiAgICBpZiAoY29udGV4dC51cmwpIHtcclxuICAgICAgY3R4LnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB3ZSdyZSBnb29kLCBzZW5kIHRoZSByZXNwb25zZVxyXG4gICAgICBjb25zdCBwcmVsb2FkU3RhdGUgPSBKU09OLnN0cmluZ2lmeShzdG9yZS5nZXRTdGF0ZSgpKVxyXG4gICAgICBjdHguYm9keSA9IGh0bWxcclxuICAgICAgICAucmVwbGFjZSgne3tTU1J9fScsIG1hcmt1cClcclxuICAgICAgICAucmVwbGFjZSgne3tTVEFURX19JywgcHJlbG9hZFN0YXRlLnJlcGxhY2UoLzwvZywgJ1xcXFx1MDAzYycpKVxyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnIpXHJcbiAgICBjdHguYm9keSA9IGVyci50b1N0cmluZygpXHJcbiAgICBjdHguc3RhdHVzID0gNDA0XHJcbiAgfVxyXG59KVxyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3Nzci5qcyIsImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxyXG5jb25zdCB7IHJlc29sdmUgfSA9IHJlcXVpcmUoJ3BhdGgnKVxyXG5cclxuY29uc3QgUm91dGVyID0gcmVxdWlyZSgna29hLXJvdXRlcicpXHJcbmNvbnN0IHsgcHJvbWlzaWZ5IH0gPSByZXF1aXJlKCdibHVlYmlyZCcpXHJcblxyXG5sZXQgcm91dGVyID0gbnVsbFxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcclxuICByb3V0ZXIgPSByZXF1aXJlKCcuL3NzcicpXHJcbn0gZWxzZSB7XHJcbiAgcm91dGVyID0gbmV3IFJvdXRlcigpXHJcbiAgY29uc3QgcmVhZEZpbGUgPSBwcm9taXNpZnkoZnMucmVhZEZpbGUpXHJcbiAgY29uc3QgZmlsZVBhdGggPSByZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uJywgJ3B1YmxpYycsICdpbmRleC5odG1sJylcclxuXHJcbiAgcm91dGVyLmdldCgnLycsIGFzeW5jIChjdHgpID0+IHtcclxuICAgIGNvbnN0IGh0bWwgPSBhd2FpdCByZWFkRmlsZShmaWxlUGF0aCwgJ3V0ZjgnKVxyXG4gICAgY3R4LmJvZHkgPSBodG1sLnJlcGxhY2UoJ3t7U1RBVEV9fScsICd7fScpLnJlcGxhY2UoJ3t7U1NSfX0nLCAnJylcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy91bml2ZXJzYWwuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcblxyXG5jb25zdCBIb21lID0gKCkgPT4gKFxyXG4gIDxkaXYgY2xhc3NOYW1lPVwianVtYm90cm9uXCI+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG4gICAgICA8aDEgY2xhc3NOYW1lPVwiZGlzcGxheS0zXCI+SGVsbG8sIHdvcmxkITwvaDE+XHJcbiAgICAgIDxwPlRoaXMgaXMgYSB0ZW1wbGF0ZSBmb3IgYSBzaW1wbGUgbWFya2V0aW5nIG9yIGluZm9ybWF0aW9uYWwgd2Vic2l0ZS4gSXQgaW5jbHVkZXMgYSBsYXJnZSBjYWxsb3V0IGNhbGxlZCBhIGp1bWJvdHJvbiBhbmQgdGhyZWUgc3VwcG9ydGluZyBwaWVjZXMgb2YgY29udGVudC4gVXNlIGl0IGFzIGEgc3RhcnRpbmcgcG9pbnQgdG8gY3JlYXRlIHNvbWV0aGluZyBtb3JlIHVuaXF1ZS48L3A+XHJcbiAgICAgIDxwPjxhIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIiBocmVmPVwiI1wiIHJvbGU9XCJidXR0b25cIj5MZWFybiBtb3JlIMK7PC9hPjwvcD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb21lXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2hvbWUuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcblxyXG4vLyBpbXBvcnQgb25seVVwZGF0ZUZvcktleXMgZnJvbSAncmVjb21wb3NlL29ubHlVcGRhdGVGb3JLZXlzJ1xyXG5pbXBvcnQge1xyXG4gIFJvdXRlLFxyXG4gIFN3aXRjaFxyXG59IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXHJcbi8vIGltcG9ydCBDU1NUcmFuc2l0aW9uR3JvdXAgZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cC9DU1NUcmFuc2l0aW9uR3JvdXAnXHJcbi8vIDxDU1NUcmFuc2l0aW9uR3JvdXBcclxuLy8gICB0cmFuc2l0aW9uTmFtZT1cImZhZGVcIlxyXG4vLyAgIHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9ezYwMH1cclxuLy8gICB0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXs2MDB9ID5cclxuLy8gPC9DU1NUcmFuc2l0aW9uR3JvdXA+XHJcblxyXG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnY29tcG9uZW50cy80MDQuanN4J1xyXG5pbXBvcnQgcm91dGVzIGZyb20gJy4uLy4uL3JvdXRlcydcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9oZWFkZXInXHJcbi8vIGltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucydcclxuXHJcbi8vIGltcG9ydCAnLi9hcHAuY3NzJ1xyXG5jb25zdCBBcHAgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxIZWFkZXIgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgZy1jb250YWluZXJcIj5cclxuICAgICAgICA8U3dpdGNoPlxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICByb3V0ZXMubWFwKChyb3V0ZSwgaSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxSb3V0ZSBleGFjdCBrZXk9e2l9IHBhdGg9e3JvdXRlLnBhdGh9IHJlbmRlcj17KHJvdXRlUHJvcHMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHJvdXRlLm1hcFN0YXRlVG9Qcm9wcyA/IHJvdXRlLm1hcFN0YXRlVG9Qcm9wcyhyb3V0ZVByb3BzKSA6IG51bGxcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHJvdXRlLm1hcERpc3BhdGNoVG9Qcm9wcyA/IHJvdXRlLm1hcERpc3BhdGNoVG9Qcm9wcyhyb3V0ZVByb3BzKSA6IG51bGxcclxuICAgICAgICAgICAgICAgIGNvbnN0IENvbm5lY3RvciA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKHJvdXRlLmNvbXBvbmVudClcclxuICAgICAgICAgICAgICAgIHJldHVybiA8Q29ubmVjdG9yIC8+XHJcbiAgICAgICAgICAgICAgfX0gLz5cclxuICAgICAgICAgICAgKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDxSb3V0ZSBjb21wb25lbnQ9e05vdEZvdW5kfSAvPlxyXG4gICAgICAgIDwvU3dpdGNoPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwXHJcbi8vIGV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGUgPT4gKHsgYXV0aFRva2VuOiBzdGF0ZS5hdXRoVG9rZW4gfSkpKEFwcClcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRhaW5lcnMvQXBwL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG4vLyBpbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xyXG5pbXBvcnQgeyBMaW5rLCBOYXZMaW5rLCB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuaW1wb3J0IHsgY29tcG9zZSB9IGZyb20gJ3JlY29tcG9zZSdcclxuaW1wb3J0IHJvdXRlcyBmcm9tICcuLi8uLi9yb3V0ZXMnXHJcblxyXG5jb25zdCBIZWFkZXIgPSAoeyBhdXRoVG9rZW4gfSkgPT4gKFxyXG4gIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci10b2dnbGVhYmxlLW1kIG5hdmJhci1pbnZlcnNlIGJnLXByaW1hcnlcIj5cclxuICAgIDx1bCBjbGFzc05hbWU9XCJuYXZiYXItbmF2IG1yLWF1dG9cIj5cclxuICAgICAge1xyXG4gICAgICAgIHJvdXRlcy5tYXAoKHJvdXRlKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXJvdXRlLm5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHsvKi8vIOS7heeuoeeQhuWRmOWPiuacqueZu+W9leaXtuaYvuekulxyXG4gICAgICAgICAgaWYgKGF1dGhUb2tlbiAmJiAhYXV0aFRva2VuLmlzQWRtaW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIOeZu+W9leaXtumakOiXj1xyXG4gICAgICAgICAgaWYgKHJvdXRlLmhpZGVXaGVuTG9naW4gJiYgYXV0aFRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgICB9Ki99XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIiBrZXk9e3JvdXRlLm5hbWV9PlxyXG4gICAgICAgICAgICAgIDxOYXZMaW5rIGV4YWN0IGFjdGl2ZUNsYXNzTmFtZT1cImFjdGl2ZVwiIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgdG89e3JvdXRlLnBhdGh9Pntyb3V0ZS5uYW1lfTwvTmF2TGluaz5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgIClcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICA8L3VsPlxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJteS01IG15LWxnLTBcIj5cclxuICAgICAgPExpbmsgdG89XCIvY3JlYXRlLXBvc3RcIiBjbGFzc05hbWU9XCJidG4gYnRuLW91dGxpbmUtc3VjY2VzcyBtci0yIG15LTIgbXktc20tMlwiPisgUE9TVDwvTGluaz5cclxuICAgICAge1xyXG4gICAgICAgICFhdXRoVG9rZW5cclxuICAgICAgICA/IDxMaW5rIHRvPVwiL2xvZ2luXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBteS0yIG15LXNtLTJcIj5MT0dJTjwvTGluaz5cclxuICAgICAgICA6IDxMaW5rIHRvPXsnL3Byb2ZpbGUvJyArIGF1dGhUb2tlbi5pZH0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBtbC0yIG15LXNtLTJcIj5QUk9GSUxFPC9MaW5rPlxyXG4gICAgICB9XHJcbiAgICA8L2Rpdj5cclxuICA8L25hdj5cclxuKVxyXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlKHdpdGhSb3V0ZXIsIGNvbm5lY3Qoc3RhdGUgPT4gKHsgYXV0aFRva2VuOiBzdGF0ZS5hdXRoLnVzZXIgfSkpKShIZWFkZXIpXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250YWluZXJzL2hlYWRlci9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5pbXBvcnQgeyBsb2dpbiB9IGZyb20gJ3JlZHV4L21vZHVsZXMvYXV0aCdcclxuXHJcbmNsYXNzIExvZ2luIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgbG9naW4gPSBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBlbWFpbCA9IHRoaXMuZW1haWwudmFsdWVcclxuICAgIGNvbnN0IHBhc3N3b3JkID0gdGhpcy5wYXNzd29yZC52YWx1ZVxyXG4gICAgY29uc3QgcmVtZW1iZXIgPSB0aGlzLnJlbWVtYmVyLmNoZWNrZWRcclxuICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSByZXR1cm5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucHJvcHMubG9naW4oeyBlbWFpbCwgcGFzc3dvcmQgfSwgcmVtZW1iZXIpXHJcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpXHJcbiAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICB0aGlzLmVtYWlsLnZhbHVlID0gJydcclxuICAgICAgdGhpcy5wYXNzd29yZC52YWx1ZSA9ICcnXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgYXV0aFRva2VuLCBsb2NhdGlvbiB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3QgZnJvbSA9IGxvY2F0aW9uLnN0YXRlID8gbG9jYXRpb24uc3RhdGUuZnJvbSA6IHsgcGF0aG5hbWU6ICcvJyB9XHJcblxyXG4gICAgaWYgKGF1dGhUb2tlbikge1xyXG4gICAgICByZXR1cm4gPFJlZGlyZWN0IHRvPXtmcm9tfSAvPlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGZvcm0+XHJcbiAgICAgICAgPGgyPlNpZ24gSW48L2gyPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbC1mb3JtLWxhYmVsIGNvbC1mb3JtLWxhYmVsLWxnXCIgaHRtbEZvcj1cInBlcnNvbkVtYWlsXCI+RW1haWw6PC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLWxnXCIgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy5lbWFpbCA9IGlucHV0IH19IGlkPVwicGVyc29uRW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb2wtZm9ybS1sYWJlbCBjb2wtZm9ybS1sYWJlbC1sZ1wiIGh0bWxGb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkOjwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1sZ1wiIHJlZj17KGlucHV0KSA9PiB7IHRoaXMucGFzc3dvcmQgPSBpbnB1dCB9fSBpZD1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWNoZWNrXCI+XHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1jaGVjay1sYWJlbFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgZGVmYXVsdENoZWNrZWQgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy5yZW1lbWJlciA9IGlucHV0IH19IGNsYXNzTmFtZT1cImZvcm0tY2hlY2staW5wdXRcIiAvPlxyXG4gICAgICAgICAgICAmbmJzcDtSZW1lbWJlciBtZSBpbiA3IGRheXNcclxuICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLWxnIGJ0bi1ibG9ja1wiIG9uQ2xpY2s9e3RoaXMubG9naW59PlNpZ24gSW48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7XHJcbiAgICAgICAgICBhdXRoVG9rZW4gPT09IGZhbHNlICYmIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIgcm9sZT1cImFsZXJ0XCI+XHJcbiAgICAgICAgICAgIDxzdHJvbmc+RmFpbGVkITwvc3Ryb25nPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gIHN0YXRlID0+ICh7IGF1dGhUb2tlbjogc3RhdGUuYXV0aC51c2VyIH0pLFxyXG4gIHsgbG9naW4gfVxyXG4pKExvZ2luKVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGFpbmVycy9sb2dpbi9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuaW1wb3J0IEZvYmlkZGVuIGZyb20gJ2NvbXBvbmVudHMvNDAzLmpzeCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZVBlcnNvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcmVzdWx0LCBhZGRQZXJzb24sIGF1dGhUb2tlbiB9ID0gdGhpcy5wcm9wc1xyXG4gICAgLy8g5aaC5p6c5bey55m75b2V77yM5L2G5LiN5piv566h55CG5ZGY77yM5YiZ5o+Q56S65rKh5pyJ5p2D6ZmQXHJcbiAgICBpZiAoYXV0aFRva2VuICYmICFhdXRoVG9rZW4uaXNBZG1pbikge1xyXG4gICAgICByZXR1cm4gPEZvYmlkZGVuIC8+XHJcbiAgICB9XHJcbiAgICAvLyDmnKrnmbvlvZXvvIzot7PovazliLDnmbvlvZXpobVcclxuICAgIGlmICghYXV0aFRva2VuKSB7XHJcbiAgICAgIHJldHVybiA8UmVkaXJlY3QgdG89e3tcclxuICAgICAgICBwYXRobmFtZTogJy9sb2dpbicsXHJcbiAgICAgICAgc3RhdGU6IHtcclxuICAgICAgICAgIGZyb206IHsgcGF0aG5hbWU6ICcvY3JlYXRlLXBlcnNvbicgfVxyXG4gICAgICAgIH1cclxuICAgICAgfX0gLz5cclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxmb3JtPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJwZXJzb25OYW1lXCI+UGVyc29uIE5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy5uYW1lID0gaW5wdXQgfX0gaWQ9XCJwZXJzb25OYW1lXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy5wYXNzd29yZCA9IGlucHV0IH19IGlkPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGVyc29uRW1haWxcIj5FbWFpbDwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImVtYWlsXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy5lbWFpbCA9IGlucHV0IH19IGlkPVwicGVyc29uRW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgcm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9mZnNldC1zbS0yIGNvbC1zbS0xMFwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLm5hbWUudmFsdWVcclxuICAgICAgICAgICAgICBjb25zdCBlbWFpbCA9IHRoaXMuZW1haWwudmFsdWVcclxuICAgICAgICAgICAgICBjb25zdCBwYXNzd29yZCA9IHRoaXMucGFzc3dvcmQudmFsdWVcclxuICAgICAgICAgICAgICBpZiAoIW5hbWUgfHwgIWVtYWlsIHx8ICFwYXNzd29yZCkgcmV0dXJuXHJcbiAgICAgICAgICAgICAgYWRkUGVyc29uKHsgbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0pXHJcbiAgICAgICAgICAgICAgdGhpcy5uYW1lLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICB0aGlzLmVtYWlsLnZhbHVlID0gJydcclxuICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkLnZhbHVlID0gJydcclxuICAgICAgICAgICAgfX0+U2lnbiBVcDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgKFxyXG4gICAgICAgICAgICByZXN1bHQuY3JlYXRlZFxyXG4gICAgICAgICAgICA/IDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtc3VjY2Vzc1wiIHJvbGU9XCJhbGVydFwiPlxyXG4gICAgICAgICAgICAgIDxzdHJvbmc+V2VsbCBkb25lITwvc3Ryb25nPiBZb3Ugc3VjY2Vzc2Z1bGx5IGNyZWF0ZSBhIHBlcnNvbi5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDogPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1kYW5nZXJcIiByb2xlPVwiYWxlcnRcIj5cclxuICAgICAgICAgICAgICA8c3Ryb25nPkVycm9yITwvc3Ryb25nPiB7cmVzdWx0Lm1lc3NhZ2V9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgPC9mb3JtPlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGFpbmVycy9wZXJzb24vY3JlYXRlLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9maWxlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBjb25zdCB7IGlkLCBmZXRjaFByb2ZpbGUsIHByb2ZpbGUgfSA9IHRoaXMucHJvcHNcclxuICAgIGlmICghcHJvZmlsZSkge1xyXG4gICAgICBmZXRjaFByb2ZpbGUoeyBpZCB9KVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGlkLCBhdXRoVG9rZW4sIHByb2ZpbGUsIGxvZ291dCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgaWYgKCFwcm9maWxlIHx8ICFwcm9maWxlLm5hbWUpIHtcclxuICAgICAgcmV0dXJuIDxkaXY+Tm8gcGVyc29uPC9kaXY+XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxmb3JtPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHJvd1wiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29sLTJcIiBodG1sRm9yPVwiaWRcIj5JRDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEwXCIgaWQ9XCJpZFwiPntwcm9maWxlLmlkfTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgcm93XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb2wtMlwiIGh0bWxGb3I9XCJuYW1lXCI+bmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEwXCIgaWQ9XCJuYW1lXCI+e3Byb2ZpbGUubmFtZX08L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHJvd1wiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29sLTJcIiBodG1sRm9yPVwiZW1haWxcIj5lbWFpbDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTEwXCIgaWQ9XCJlbWFpbFwiPntwcm9maWxlLmVtYWlsfTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgcm93XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb2wtMlwiIGh0bWxGb3I9XCJwb3N0c1wiPnBvc3RzPC9sYWJlbD5cclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImNvbC0xMFwiPlxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2ZpbGUucG9zdHMgJiYgcHJvZmlsZS5wb3N0cy5tYXAoKHBvc3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e3Bvc3QuaWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPXsnL3Bvc3QvJyArIHBvc3QuaWR9IGNsYXNzTmFtZT1cImJ0biBidG4tbGlua1wiPntwb3N0LnRpdGxlfTwvTGluaz5cclxuICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGF1dGhUb2tlbiAmJiBhdXRoVG9rZW4uaWQgPT09IGlkICYmIDxidXR0b24gb25DbGljaz17bG9nb3V0fSB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgYnRuLWxnIGJ0bi1ibG9ja1wiPkxPR09VVDwvYnV0dG9uPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250YWluZXJzL3BlcnNvbi9wcm9maWxlLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFBlcnNvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHNlYXJjaCA9IChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IGRhdGEgPSB7fVxyXG4gICAgaWYgKCt0aGlzLmlkLnZhbHVlKSB7XHJcbiAgICAgIGRhdGFbJ2lkJ10gPSArdGhpcy5pZC52YWx1ZVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubmFtZS52YWx1ZSkge1xyXG4gICAgICBkYXRhWyduYW1lJ10gPSB0aGlzLm5hbWUudmFsdWVcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmVtYWlsLnZhbHVlKSB7XHJcbiAgICAgIGRhdGFbJ2VtYWlsJ10gPSB0aGlzLmVtYWlsLnZhbHVlXHJcbiAgICB9XHJcbiAgICB0aGlzLnByb3BzLnNlYXJjaFBlcnNvbihkYXRhKVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Zm9ybT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiaWRcIj5JRDwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiByZWY9eyhpbnB1dCkgPT4geyB0aGlzLmlkID0gaW5wdXQgfX0gaWQ9XCJpZFwiIHBsYWNlaG9sZGVyPVwiSURcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJwZXJzb25OYW1lXCI+UGVyc29uIE5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZGlzYWJsZWQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy5uYW1lID0gaW5wdXQgfX0gaWQ9XCJwZXJzb25OYW1lXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZW1haWxcIj5FbWFpbDwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiByZWY9eyhpbnB1dCkgPT4geyB0aGlzLmVtYWlsID0gaW5wdXQgfX0gaWQ9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWxcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCByb3dcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2Zmc2V0LXNtLTIgY29sLXNtLTEwXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1vdXRsaW5lLXN1Y2Nlc3MgbXktMiBteS1zbS0wXCIgdHlwZT1cInN1Ym1pdFwiIG9uQ2xpY2s9e3RoaXMuc2VhcmNofT5TZWFyY2g8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRoaXMucHJvcHMucmVzdWx0ICYmIChcclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImJvcmRlclwiPlxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucmVzdWx0Lm1hcChwID0+IChcclxuICAgICAgICAgICAgICAgICAgPGxpIGtleT17cC5pZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6IHtwLmlkfSBuYW1lOiB7cC5uYW1lfSBlbWFpbDoge3AuZW1haWx9PGJyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgUE9TVDoge3AucG9zdH1cclxuICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgPC9mb3JtPlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGFpbmVycy9wZXJzb24vc2VhcmNoLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IE5vdEZvdW5kIGZyb20gJ2NvbXBvbmVudHMvNDA0LmpzeCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IHsgcG9zdCwgZmV0Y2hQb3N0IH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCB7IGlkLCBjb250ZW50IH0gPSBwb3N0IHx8IHt9XHJcbiAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgZmV0Y2hQb3N0KHsgaWQ6ICtpZCB9KVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBvc3QsIGF1dGhUb2tlbiB9ID0gdGhpcy5wcm9wc1xyXG4gICAgY29uc3QgeyB0aXRsZSwgb3V0d2FyZCwgcGVyc29uIH0gPSAocG9zdCB8fCB7fSlcclxuICAgIGNvbnN0IHsgaWQsIG5hbWUsIGVtYWlsIH0gPSAocGVyc29uIHx8IHt9KVxyXG4gICAgbGV0IGNvbnRlbnQgPSBwb3N0LmNvbnRlbnRcclxuICAgIC8vIOaWh+eroOaLpeacieiAhSAmJiDliqDovb3ov4fmlbDmja4gJiYg5LuN54S25rKh5pyJ5YaF5a65XHJcbiAgICBpZiAoYXV0aFRva2VuICYmIGF1dGhUb2tlbi5pZCA9PT0gaWQgJiYgIWNvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIDxOb3RGb3VuZCAvPlxyXG4gICAgfVxyXG4gICAgLy8g5LiN5piv5YWs5byA55qEICYmIOS4jeaYr+aWh+eroOaLpeacieiAhVxyXG4gICAgaWYgKCFvdXR3YXJkICYmICFjb250ZW50KSB7XHJcbiAgICAgIGNvbnRlbnQgPSAnY29udGVudCBpcyBub3QgdmlzaWFibGUnXHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMj57dGl0bGV9PC9oMj5cclxuICAgICAgICA8aDQ+e25hbWV9IHtlbWFpbH08L2g0PlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICB7Y29udGVudCB8fCAnbG9hZGluZy4uLid9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRhaW5lcnMvcG9zdC9jb250ZW50LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgUmVkaXJlY3QgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xyXG5cclxuaW1wb3J0IEZvYmlkZGVuIGZyb20gJ2NvbXBvbmVudHMvNDAzLmpzeCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZVBvc3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGFkZFBvc3QsIGF1dGhUb2tlbiwgcmVzdWx0IH0gPSB0aGlzLnByb3BzXHJcbiAgICAvLyDlpoLmnpzlt7LnmbvlvZXvvIzkvYbkuI3mmK/nrqHnkIblkZjvvIzliJnmj5DnpLrmsqHmnInmnYPpmZBcclxuICAgIGlmIChhdXRoVG9rZW4gJiYgIWF1dGhUb2tlbi5pc0FkbWluKSB7XHJcbiAgICAgIHJldHVybiA8Rm9iaWRkZW4gLz5cclxuICAgIH1cclxuICAgIC8vIOacqueZu+W9le+8jOi3s+i9rOWIsOeZu+W9lemhtVxyXG4gICAgaWYgKCFhdXRoVG9rZW4pIHtcclxuICAgICAgcmV0dXJuIDxSZWRpcmVjdCB0bz17e1xyXG4gICAgICAgIHBhdGhuYW1lOiAnL2xvZ2luJyxcclxuICAgICAgICBzdGF0ZToge1xyXG4gICAgICAgICAgZnJvbTogeyBwYXRobmFtZTogJy9jcmVhdGUtcG9zdCcgfVxyXG4gICAgICAgIH1cclxuICAgICAgfX0gLz5cclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxmb3JtPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJ0aXRsZVwiPlRpdGxlPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJlZj17KGlucHV0KSA9PiB7IHRoaXMudGl0bGUgPSBpbnB1dCB9fSBpZD1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCJUaXRsZVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNvbnRlbnRcIj5Db250ZW50PC9sYWJlbD5cclxuICAgICAgICAgIDx0ZXh0YXJlYSB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJlZj17KGlucHV0KSA9PiB7IHRoaXMuY29udGVudCA9IGlucHV0IH19IGlkPVwiY29udGVudFwiIHBsYWNlaG9sZGVyPVwiQ29udGVudFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByZWY9eyhpbnB1dCkgPT4geyB0aGlzLm91dHdhcmQgPSBpbnB1dCB9fSAvPiBQdWJsaWMgPHNtYWxsIGNsYXNzTmFtZT1cImZvcm0tdGV4dCB0ZXh0LW11dGVkXCI+Q2hlY2tlZCBjYW4gYmUgYWNjZXNzZWQgYnkgb3RoZXJzLjwvc21hbGw+XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCByb3dcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEwXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBidG4tbGdcIiBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy50aXRsZS52YWx1ZVxyXG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQudmFsdWVcclxuICAgICAgICAgICAgICBjb25zdCBvdXR3YXJkID0gdGhpcy5vdXR3YXJkLmNoZWNrZWRcclxuICAgICAgICAgICAgICBpZiAoIXRpdGxlIHx8ICFjb250ZW50KSByZXR1cm5cclxuICAgICAgICAgICAgICBhZGRQb3N0KHsgdGl0bGUsIGNvbnRlbnQsIG91dHdhcmQgfSlcclxuICAgICAgICAgICAgfX0+QWRkPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLWxnIG1sLTJcIiBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICB9fT5SZXNldDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgey8qe1xyXG4gICAgICAgICAgcmVzdWx0ICE9PSBudWxsICYmIChcclxuICAgICAgICAgICAgcmVzdWx0LmNyZWF0ZWRcclxuICAgICAgICAgICAgPyA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3NcIiByb2xlPVwiYWxlcnRcIj5cclxuICAgICAgICAgICAgICA8c3Ryb25nPldlbGwgZG9uZSE8L3N0cm9uZz4gWW91IHN1Y2Nlc3NmdWxseSBjcmVhdGUgYSBwZXJzb24uXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA6IDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIgcm9sZT1cImFsZXJ0XCI+XHJcbiAgICAgICAgICAgICAgPHN0cm9uZz5FcnJvciE8L3N0cm9uZz4ge3Jlc3VsdC5tZXNzYWdlfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIClcclxuICAgICAgICB9Ki99XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIClcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRhaW5lcnMvcG9zdC9jcmVhdGUuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3RMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IHsgZmV0Y2hQb3N0TGlzdCwgbGlzdCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgaWYgKCFsaXN0IHx8ICFsaXN0Lmxlbmd0aCkge1xyXG4gICAgICBmZXRjaFBvc3RMaXN0KClcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzXHJcbiAgICBpZiAoIWxpc3QgfHwgIWxpc3QubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiA8ZGl2PmxvYWRpbmcuLi4uPC9kaXY+XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWw+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbGlzdC5tYXAocG9zdCA9PiAoXHJcbiAgICAgICAgICAgIDxsaSBrZXk9e3Bvc3QuaWR9PjxMaW5rIHRvPXt7XHJcbiAgICAgICAgICAgICAgcGF0aG5hbWU6ICcvcG9zdC8nICsgcG9zdC5pZCxcclxuICAgICAgICAgICAgICBzdGF0ZTogeyBwb3N0IH1cclxuICAgICAgICAgICAgfX0+e3Bvc3QudGl0bGV9PC9MaW5rPjwvbGk+XHJcbiAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgICAgPC91bD5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250YWluZXJzL3Bvc3QvbGlzdC5qc3giLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCdcclxuaW1wb3J0IGF1dGggZnJvbSAnLi9tb2R1bGVzL2F1dGgnXHJcbmltcG9ydCBwb3N0IGZyb20gJy4vbW9kdWxlcy9wb3N0J1xyXG5pbXBvcnQgcGVyc29uIGZyb20gJy4vbW9kdWxlcy9wZXJzb24nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xyXG4gIGF1dGgsXHJcbiAgcG9zdCxcclxuICBwZXJzb25cclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlZHV4L3JlZHVjZXJzLmpzIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4J1xyXG5pbXBvcnQgeyBjb21wb3NlV2l0aERldlRvb2xzIH0gZnJvbSAncmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uJ1xyXG5pbXBvcnQgcmVkdWNlciBmcm9tICcuL3JlZHVjZXJzJ1xyXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShpbml0aWFsU3RhdGUgPSB7fSkge1xyXG4gIHJldHVybiBjcmVhdGVTdG9yZShcclxuICAgIHJlZHVjZXIsXHJcbiAgICBpbml0aWFsU3RhdGUsXHJcbiAgICBjb21wb3NlV2l0aERldlRvb2xzKFxyXG4gICAgICBhcHBseU1pZGRsZXdhcmUodGh1bmspXHJcbiAgICApXHJcbiAgKVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZWR1eC9zdG9yZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmFrZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmYWtlclwiXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZ3JhcGhxbFwiXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsLXNlcnZlci1rb2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJncmFwaHFsLXNlcnZlci1rb2FcIlxuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC10b29sc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImdyYXBocWwtdG9vbHNcIlxuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwianNvbndlYnRva2VuXCJcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImp3dC1kZWNvZGVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqd3QtZGVjb2RlXCJcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCJcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlY29tcG9zZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlY29tcG9zZVwiXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIlxuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtdGh1bmtcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIlxuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==