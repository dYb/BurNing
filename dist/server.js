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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Sequelize = __webpack_require__(46);
const { times } = __webpack_require__(6);
const Faker = __webpack_require__(34);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = __webpack_require__(19);

var _Home2 = _interopRequireDefault(_Home);

var _createPerson = __webpack_require__(20);

var _createPerson2 = _interopRequireDefault(_createPerson);

var _searchPerson = __webpack_require__(26);

var _searchPerson2 = _interopRequireDefault(_searchPerson);

var _createPost = __webpack_require__(21);

var _createPost2 = _interopRequireDefault(_createPost);

var _postList = __webpack_require__(23);

var _postList2 = _interopRequireDefault(_postList);

var _profile = __webpack_require__(25);

var _profile2 = _interopRequireDefault(_profile);

var _login = __webpack_require__(22);

var _login2 = _interopRequireDefault(_login);

var _post = __webpack_require__(24);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// path: 路由地址
// name: 标签显示名称，为空时，不在header中显示
// component: 对应组建
// isAdmin: 仅Admin可以访问
// hideWhenLogin: 登录之后隐藏
// props: 由mapStatetoProps转换
// actions: 由mapDispatchtoProps转换
// mapStateToProps: 返回一个函数（参数{ location, match, history }），为connect函数的第一参数

const routes = [{
  path: '/',
  name: 'Home',
  exact: true,
  component: _Home2.default
}, {
  path: '/create-person',
  component: _createPerson2.default,
  props: ['personCreationResult', 'authToken'],
  actions: ['addPerson']
}, {
  path: '/search-person',
  name: 'Search Person',
  component: _searchPerson2.default,
  props: ['searchedPerson'],
  actions: ['searchPerson']
}, {
  path: '/login',
  component: _login2.default,
  mapStateToProps: routeProps => state => {
    const { location } = routeProps;
    return {
      authToken: state.authToken,
      location
    };
  },
  actions: ['doLogin'],
  hideWhenLogin: true
}, {
  path: '/profile/:id',
  component: _profile2.default,
  mapStateToProps: routeProps => state => {
    const { match: { params: { id } } } = routeProps;
    return {
      id: +id,
      authToken: state.authToken,
      profile: state.profile && state.profile[id] ? state.profile[id] : null
    };
  },
  actions: ['fetchProfile', 'doLogout'],
  onNavigate: 'fetchProfile'
}, {
  path: '/post/:id',
  component: _post2.default,
  mapStateToProps: routeProps => state => {
    const { match: { params: { id } }, location } = routeProps;
    const { post } = location.state || { post: { id } };
    return {
      post: state.posts && state.posts[id] ? state.posts[id] : post,
      authToken: state.authToken,
      location
    };
  },
  actions: ['fetchPost'],
  onNavigate: 'fetchPost'
}, {
  path: '/create-post',
  component: _createPost2.default,
  props: ['authToken', 'postCreationResult'],
  actions: ['addPost']
}, {
  path: '/post-list',
  component: _postList2.default,
  name: 'Post List',
  props: ['postList'],
  actions: ['fetchPostList'],
  onNavigate: 'fetchPostList'
}];
exports.default = routes;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { makeExecutableSchema, addErrorLoggingToSchema } = __webpack_require__(38);

const { DB } = __webpack_require__(3);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FETCH_POST_LIST = exports.ADD_POST = exports.FETCH_POST = exports.FETCH_PROFILE = exports.SET_AUTH_TOKEN = exports.SEARCH_PERSON = exports.CREATE_PERSON = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addPerson = addPerson;
exports.searchPerson = searchPerson;
exports.doLogin = doLogin;
exports.doLogout = doLogout;
exports.fetchProfile = fetchProfile;
exports.fetchPost = fetchPost;
exports.addPost = addPost;
exports.fetchPostList = fetchPostList;

var _axios = __webpack_require__(32);

var _axios2 = _interopRequireDefault(_axios);

var _jwtDecode = __webpack_require__(40);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { graphQLHelper } =  false ? require('./utils/client-graphql-helper') : __webpack_require__(31);
console.log(false);

const CREATE_PERSON = exports.CREATE_PERSON = 'CREATE_PERSON';
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
      dispatch({ type: CREATE_PERSON, result: data.addPerson });
    });
    // .catch(err => {
    //   alert(err.message)
    // })
  };
}

function _searchPerson({ id, email = '' }, authToken = {}) {
  const query = ` 
    query PeopleInfo($id: Int, $email: String) {
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
  return graphQLHelper(query, { id, email }, { authToken }).then(data => {
    return data;
  }).then(data => data.people);
}

const SEARCH_PERSON = exports.SEARCH_PERSON = 'SEARCH_PERSON';
function searchPerson({ id, email }) {
  return dispatch => {
    return _searchPerson({ id, email }).then(people => dispatch({ type: SEARCH_PERSON, people }));
    // .catch(err => {
    //   alert(err.message)
    // })
  };
}

const SET_AUTH_TOKEN = exports.SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
function doLogin(person, remember) {
  return dispatch => {
    return _axios2.default.post('/login', _extends({}, person)).then(result => {
      if (!result.data) {
        dispatch({
          type: SET_AUTH_TOKEN,
          authToken: false
        });
        return Promise.resolve(false);
      }
      const authToken = (0, _jwtDecode2.default)(result.data);
      dispatch({
        type: SET_AUTH_TOKEN,
        authToken
      });
      if (remember && authToken) {
        localStorage.setItem('token', JSON.stringify(authToken));
      } else {
        document.cookie = 'jsonwebtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
      return result;
    });
  };
}

function doLogout() {
  localStorage.removeItem('token');
  document.cookie = 'jsonwebtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  return {
    type: SET_AUTH_TOKEN,
    authToken: null
  };
}

const FETCH_PROFILE = exports.FETCH_PROFILE = 'FETCH_PROFILE';
function fetchProfile({ id }) {
  return (dispatch, getState) => {
    const { authToken } = getState();
    return _searchPerson({ id: +id }, { authToken }).then(people => {
      const person = people && people.length ? people[0] : { id };
      dispatch({
        type: FETCH_PROFILE,
        person
      });
      return person;
    });
  };
}

const FETCH_POST = exports.FETCH_POST = 'FETCH_POST';
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
    return graphQLHelper(query, { id, title }, { authToken }).then(result => result.posts).then(posts => posts && posts[0] && dispatch({
      type: FETCH_POST,
      post: posts[0]
    }));
  };
}

const ADD_POST = exports.ADD_POST = 'ADD_POST';
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
    return graphQLHelper(mutation, post).then(data => dispatch({ type: ADD_POST, result: data.addPost }));
  };
}

const FETCH_POST_LIST = exports.FETCH_POST_LIST = 'FETCH_POST_LIST';
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
    return graphQLHelper(query, null, { authToken }).then(result => result.posts).then(posts => posts && dispatch({
      type: FETCH_POST_LIST,
      posts
    }));
  };
}

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


const Router = __webpack_require__(2);

const graphql = __webpack_require__(16);
const login = __webpack_require__(17);
const ssr = __webpack_require__(18);

const router = new Router();

router.get('/favicon.ico', ctx => {
  ctx.redirect('https://facebook.github.io/react/favicon.ico');
});

router.use(graphql.routes()).use(login.routes()).use(ssr.routes());

module.exports = router;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("koa-jwt");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Koa = __webpack_require__(12);
const koaJWT = __webpack_require__(14);
const koaBody = __webpack_require__(13);
const { times } = __webpack_require__(6);

const router = __webpack_require__(11);
const { DB, Person } = __webpack_require__(3);
const app = new Koa();
app.use(koaBody()).use(koaJWT({
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
  times(10, i => {
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Router = __webpack_require__(2);
const { graphqlKoa, graphiqlKoa } = __webpack_require__(37);
const schema = __webpack_require__(7);

const router = new Router();

router.post('/graphql', graphqlKoa(ctx => {
  return {
    schema,
    context: {
      authToken: ctx.state.user
    },
    debug: __webpack_require__.i({"BROWSER":false}).NODE_ENV === 'development'
  };
}));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
module.exports = router;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Router = __webpack_require__(2);
const { DB } = __webpack_require__(3);
const router = new Router();
const { sign } = __webpack_require__(39);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

const fs = __webpack_require__(35);
const path = __webpack_require__(41);
const React = __webpack_require__(0);
const Router = __webpack_require__(2);
const { promisify } = __webpack_require__(33);
const { Provider } = __webpack_require__(5);
const { StaticRouter, matchPath } = __webpack_require__(1);
const { renderToString } = __webpack_require__(42);

const actions = __webpack_require__(8);
const { default: App } = __webpack_require__(27);
const { default: configureStore } = __webpack_require__(30);
const { default: routes } = __webpack_require__(4);

const readFile = promisify(fs.readFile);
const router = new Router();

router.get('/', async ctx => {
  const filePath = path.resolve(__dirname, '../..', 'public', 'index.html');
  try {
    const html = await readFile(filePath, 'utf8');
    const context = {};
    const store = configureStore({
      authToken: ctx.state.user
    });
    let match = null;
    const matchedRoute = routes.find(route => {
      match = matchPath(ctx.req.url, route);
      return match;
    });
    if (matchedRoute && matchedRoute.onNavigate && typeof actions[matchedRoute.onNavigate] === 'function') {
      await store.dispatch(actions[matchedRoute.onNavigate](match.params));
    }
    const markup = renderToString(React.createElement(
      Provider,
      { store: store },
      React.createElement(
        StaticRouter,
        {
          location: ctx.req.url,
          context: context
        },
        React.createElement(App, { location: { pathname: ctx.req.url } })
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ = __webpack_require__(9);

var _2 = _interopRequireDefault(_);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreatePerson extends _react2.default.PureComponent {
  render() {
    const result = this.props.personCreationResult;
    const { addPerson, authToken } = this.props;
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ = __webpack_require__(9);

var _2 = _interopRequireDefault(_);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreatePost extends _react2.default.PureComponent {
  render() {
    const result = this.props.postCreationResult;
    const { addPost, authToken } = this.props;
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

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
      const result = await this.props.doLogin({ email, password }, remember);
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
exports.default = Login;

/***/ }),
/* 23 */
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
    const { fetchPostList, postList } = this.props;
    if (!postList || !postList.length) {
      fetchPostList();
    }
  }
  render() {
    const { postList } = this.props;
    if (!postList || !postList.length) {
      return _react2.default.createElement(
        'div',
        null,
        'loading....'
      );
    }
    return _react2.default.createElement(
      'ul',
      null,
      postList.map(post => _react2.default.createElement(
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
/* 24 */
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
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = { loaded: false }, _temp;
  }

  componentDidMount() {
    const { post, fetchPost } = this.props;
    const { id, content } = post || {};
    if (!content) {
      fetchPost({ id: +id }).then(() => {
        this.setState({
          loaded: true
        });
      });
    }
  }
  render() {
    const { post, authToken } = this.props;
    const { title, outward, person } = post || {};
    const { id, name, email } = person || {};
    let content = post.content;
    // 文章拥有者 && 加载过数据 && 仍然没有内容
    if (authToken && authToken.id === id && this.state.loaded && !content) {
      return _react2.default.createElement(_2.default, null);
    }
    // 不是公开的 && 不是文章拥有者
    if (!outward && !content && this.state.loaded) {
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
/* 25 */
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
    const { id, authToken, profile, doLogout } = this.props;
    if (!profile) {
      return null;
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
          { onClick: doLogout, type: 'button', className: 'btn btn-danger btn-lg btn-block' },
          'LOGOUT'
        )
      )
    );
  }
}
exports.default = Profile;

/***/ }),
/* 26 */
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
    console.log('search');
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
      this.props.searchedPerson && _react2.default.createElement(
        'ul',
        { className: 'border' },
        this.props.searchedPerson.map(p => _react2.default.createElement(
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(1);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

var _header = __webpack_require__(28);

var _header2 = _interopRequireDefault(_header);

var _ = __webpack_require__(10);

var _2 = _interopRequireDefault(_);

var _actions = __webpack_require__(8);

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './app.css'

// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
// <CSSTransitionGroup
//   transitionName="fade"
//   transitionEnterTimeout={600}
//   transitionLeaveTimeout={600} >
// </CSSTransitionGroup>

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
            const mapStateToProps = route.mapStateToProps && route.mapStateToProps(routeProps) || (state => {
              if (!route.props) return {};
              const props = route.props.reduce((acc, curr) => {
                return Object.assign({}, acc, {
                  [curr]: state[curr]
                });
              }, {});
              return props;
            });
            const actionCreators = !route.actions ? null : route.actions.reduce((acc, curr) => {
              return Object.assign({}, acc, {
                [curr]: actions[curr]
              });
            }, {});
            const Connector = (0, _reactRedux.connect)(mapStateToProps, actionCreators)(route.component);
            return _react2.default.createElement(Connector, null);
          } })),
        _react2.default.createElement(_reactRouterDom.Route, { component: _2.default })
      )
    )
  );
};
// import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
exports.default = App;
// export default connect(state => ({ authToken: state.authToken }))(App)

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(1);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { withRouter } from 'react-router'
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
      // 仅管理员及未登录时显示
      if (authToken && !authToken.isAdmin) {
        return null;
      }
      // 登录时隐藏
      if (route.hideWhenLogin && authToken) {
        return null;
      }
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

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(state => ({ authToken: state.authToken }))(Header));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const INIT_STATE = {
  personCreationResult: null,
  searchedPerson: null,
  authToken: null,
  profile: {},
  posts: {}
};

exports.default = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'CREATE_PERSON':
      return Object.assign({}, state, {
        personCreationResult: action.result
      });
    case 'SEARCH_PERSON':
      return Object.assign({}, state, {
        searchedPerson: action.people
      });
    case 'SET_AUTH_TOKEN':
      return Object.assign({}, state, {
        authToken: action.authToken
      });
    case 'FETCH_PROFILE':
      const profile = Object.assign({}, state.profile, {
        [action.person.id]: action.person
      });
      return Object.assign({}, state, { profile });
    case 'FETCH_POST':
      const posts = Object.assign({}, state.posts, {
        [action.post.id]: action.post
      });
      return Object.assign({}, state, { posts });
    case 'FETCH_POST_LIST':
      return Object.assign({}, state, {
        postList: action.posts
      });
    case 'ADD_POST':
      return Object.assign({}, state, {
        postCreationResult: action.result
      });
    default:
      return state;
  }
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = __webpack_require__(43);

var _reduxDevtoolsExtension = __webpack_require__(44);

var _reducers = __webpack_require__(29);

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxThunk = __webpack_require__(45);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(initialState = {}) {
  return (0, _redux.createStore)(_reducers2.default, initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk2.default)));
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphQLHelper = graphQLHelper;

var _graphql = __webpack_require__(36);

var _schema = __webpack_require__(7);

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
/* 32 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("faker");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("graphql-server-koa");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzIxMDBhNjA3MDA0ODBjMWQzZmIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia29hLXJvdXRlclwiIiwid2VicGFjazovLy8uL3NlcnZlci9kYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NjaGVtYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy80MDMuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzQwNC5qc3giLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2FcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtYm9keXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImtvYS1qd3RcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvYXBwLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZ3JhcGhxbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2xvZ2luLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvc3NyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0hvbWUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NyZWF0ZS1wZXJzb24uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NyZWF0ZS1wb3N0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sb2dpbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcG9zdC1saXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wb3N0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9maWxlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zZWFyY2gtcGVyc29uLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9BcHAuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL2hlYWRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHVjZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvc2VydmVyLWdyYXBocWwtaGVscGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmx1ZWJpcmRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmYWtlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ3JhcGhxbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdyYXBocWwtc2VydmVyLWtvYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdyYXBocWwtdG9vbHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqd3QtZGVjb2RlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LWRldnRvb2xzLWV4dGVuc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXRodW5rXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplXCIiXSwibmFtZXMiOlsiU2VxdWVsaXplIiwicmVxdWlyZSIsInRpbWVzIiwiRmFrZXIiLCJBUlJBWSIsIklOVEVHRVIiLCJTVFJJTkciLCJCT09MRUFOIiwiQ29ubiIsImRpYWxlY3QiLCJQZXJzb24iLCJkZWZpbmUiLCJuYW1lIiwidHlwZSIsImFsbG93TnVsbCIsInVuaXF1ZSIsImVtYWlsIiwidmFsaWRhdGUiLCJpc0VtYWlsIiwicGFzc3dvcmQiLCJpc0FkbWluIiwiZGVmYXVsdFZhbHVlIiwiUG9zdCIsInRpdGxlIiwiY29udGVudCIsIm91dHdhcmQiLCJyZWNlaXZlcnMiLCJoYXNNYW55IiwiYmVsb25nc1RvIiwibW9kdWxlIiwiZXhwb3J0cyIsIkRCIiwicm91dGVzIiwicGF0aCIsImV4YWN0IiwiY29tcG9uZW50IiwicHJvcHMiLCJhY3Rpb25zIiwibWFwU3RhdGVUb1Byb3BzIiwicm91dGVQcm9wcyIsInN0YXRlIiwibG9jYXRpb24iLCJhdXRoVG9rZW4iLCJoaWRlV2hlbkxvZ2luIiwibWF0Y2giLCJwYXJhbXMiLCJpZCIsInByb2ZpbGUiLCJvbk5hdmlnYXRlIiwicG9zdCIsInBvc3RzIiwibWFrZUV4ZWN1dGFibGVTY2hlbWEiLCJhZGRFcnJvckxvZ2dpbmdUb1NjaGVtYSIsInNjaGVtYSIsInJlc29sdmVGdW5jdGlvbnMiLCJwZXJzb24iLCJhcmdzIiwiY29udGV4dCIsIndoZXJlIiwiZ2V0UG9zdHMiLCJ0aGVuIiwiZGF0YSIsImdldFBlcnNvbiIsInVzZXJJZCIsInBlcnNvbklkIiwiaW5kZXhPZiIsIlF1ZXJ5IiwicGVvcGxlIiwiXyIsIm1vZGVsIiwiZmluZEFsbCIsImF0dHJpYnV0ZXMiLCJleGNsdWRlIiwiT2JqZWN0IiwiYXNzaWduIiwiJG9yIiwiJGNvbnRhaW5lZCIsIk11dGF0aW9uIiwiYWRkUGVyc29uIiwiY3JlYXRlIiwiY3JlYXRlZCIsImNhdGNoIiwiZXJyIiwibWVzc2FnZSIsImFkZFBvc3QiLCJFcnJvciIsImV4ZWN1dGFibGVTY2hlbWEiLCJ0eXBlRGVmcyIsInJlc29sdmVycyIsImxvZyIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFjayIsInNlYXJjaFBlcnNvbiIsImRvTG9naW4iLCJkb0xvZ291dCIsImZldGNoUHJvZmlsZSIsImZldGNoUG9zdCIsImZldGNoUG9zdExpc3QiLCJncmFwaFFMSGVscGVyIiwiQ1JFQVRFX1BFUlNPTiIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJtdXRhdGlvbiIsInJlc3VsdCIsIl9zZWFyY2hQZXJzb24iLCJxdWVyeSIsIlNFQVJDSF9QRVJTT04iLCJTRVRfQVVUSF9UT0tFTiIsInJlbWVtYmVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImRvY3VtZW50IiwiY29va2llIiwicmVtb3ZlSXRlbSIsIkZFVENIX1BST0ZJTEUiLCJsZW5ndGgiLCJGRVRDSF9QT1NUIiwiQUREX1BPU1QiLCJGRVRDSF9QT1NUX0xJU1QiLCJGb3JiaWRkZW4iLCJoaXN0b3J5IiwicGF0aG5hbWUiLCJtYXJnaW5Ub3AiLCJmcm9tIiwicHVzaCIsImdvQmFjayIsIk5vdEZvdW5kIiwiUm91dGVyIiwiZ3JhcGhxbCIsImxvZ2luIiwic3NyIiwicm91dGVyIiwiZ2V0IiwiY3R4IiwicmVkaXJlY3QiLCJ1c2UiLCJLb2EiLCJrb2FKV1QiLCJrb2FCb2R5IiwiYXBwIiwic2VjcmV0IiwicGFzc3Rocm91Z2giLCJhbGxvd2VkTWV0aG9kcyIsImxpc3RlbiIsInN5bmMiLCJmb3JjZSIsImkiLCJjcmVhdGVQb3N0IiwiZ3JhcGhxbEtvYSIsImdyYXBoaXFsS29hIiwidXNlciIsImRlYnVnIiwiTk9ERV9FTlYiLCJlbmRwb2ludFVSTCIsInNpZ24iLCJyZXF1ZXN0IiwiYm9keSIsImZpbmQiLCJ0b2tlbiIsImV4cGlyZXNJbiIsImNvb2tpZXMiLCJzZXQiLCJtYXhBZ2UiLCJvdmVyd3JpdGUiLCJodHRwT25seSIsImZzIiwiUmVhY3QiLCJwcm9taXNpZnkiLCJQcm92aWRlciIsIlN0YXRpY1JvdXRlciIsIm1hdGNoUGF0aCIsInJlbmRlclRvU3RyaW5nIiwiZGVmYXVsdCIsIkFwcCIsImNvbmZpZ3VyZVN0b3JlIiwicmVhZEZpbGUiLCJmaWxlUGF0aCIsIl9fZGlybmFtZSIsImh0bWwiLCJzdG9yZSIsIm1hdGNoZWRSb3V0ZSIsInJvdXRlIiwicmVxIiwidXJsIiwibWFya3VwIiwicHJlbG9hZFN0YXRlIiwicmVwbGFjZSIsInRvU3RyaW5nIiwic3RhdHVzIiwiSG9tZSIsIkNyZWF0ZVBlcnNvbiIsIlB1cmVDb21wb25lbnQiLCJyZW5kZXIiLCJwZXJzb25DcmVhdGlvblJlc3VsdCIsImlucHV0IiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsIkNyZWF0ZVBvc3QiLCJwb3N0Q3JlYXRpb25SZXN1bHQiLCJjaGVja2VkIiwiTG9naW4iLCJQb3N0TGlzdCIsIkNvbXBvbmVudCIsImNvbXBvbmVudERpZE1vdW50IiwicG9zdExpc3QiLCJtYXAiLCJsb2FkZWQiLCJzZXRTdGF0ZSIsIlByb2ZpbGUiLCJTZWFyY2hQZXJzb24iLCJzZWFyY2giLCJzZWFyY2hlZFBlcnNvbiIsInAiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwiYWN0aW9uQ3JlYXRvcnMiLCJDb25uZWN0b3IiLCJIZWFkZXIiLCJJTklUX1NUQVRFIiwiYWN0aW9uIiwiaW5pdGlhbFN0YXRlIiwidmFyaWFibGVzIiwiZXJyb3JzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Es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UUNWZWhJLGEsR0FBQUEsYTs7QUFIaEI7O0FBQ0E7Ozs7OztBQUVPLFNBQVNBLGFBQVQsQ0FBdUJPLEtBQXZCLEVBQThCMEgsU0FBOUIsRUFBeUM1SyxVQUFVLEVBQW5ELEVBQXVEO0FBQzVELFNBQU8sd0NBQWdCa0QsS0FBaEIsRUFBdUIsRUFBdkIsRUFBMkJsRCxPQUEzQixFQUFvQzRLLFNBQXBDLEVBQ0p6SyxJQURJLENBQ0U2QyxNQUFELElBQVk7QUFDaEIsUUFBSUEsT0FBTzZILE1BQVgsRUFBbUI7QUFDakIsWUFBTSxJQUFJakosS0FBSixDQUFVb0IsT0FBTzZILE1BQVAsQ0FBYyxDQUFkLEVBQWlCbkosT0FBM0IsQ0FBTjtBQUNEO0FBQ0QsV0FBT3NCLE9BQU81QyxJQUFkO0FBQ0QsR0FOSSxDQUFQO0FBT0QsQzs7Ozs7O0FDWEQsa0M7Ozs7OztBQ0FBLHFDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEsK0I7Ozs7OztBQ0FBLG9DOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsMEM7Ozs7OztBQ0FBLHlDOzs7Ozs7QUNBQSx1Qzs7Ozs7O0FDQUEsaUM7Ozs7OztBQ0FBLDZDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEscUQ7Ozs7OztBQ0FBLHdDOzs7Ozs7QUNBQSxzQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzIxMDBhNjA3MDA0ODBjMWQzZmIiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2Etcm91dGVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwia29hLXJvdXRlclwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpXHJcbmNvbnN0IHsgdGltZXMgfSA9IHJlcXVpcmUoJ2xvZGFzaCcpXHJcbmNvbnN0IEZha2VyID0gcmVxdWlyZSgnZmFrZXInKVxyXG5cclxuY29uc3QgeyBBUlJBWSwgSU5URUdFUiwgU1RSSU5HLCBCT09MRUFOIH0gPSBTZXF1ZWxpemVcclxuXHJcbi8vIGNvbnN0IENvbm4gPSBuZXcgU2VxdWVsaXplKCdwb3N0Z3JlczovL3VxZ2ZwZXF2OmZRMlVmTWhQVVdOZWZkcUJvNk1MMnY3SlRJS2N5OWh4QHFkamp0bmt2LmRiLmVsZXBoYW50c3FsLmNvbTo1NDMyL3VxZ2ZwZXF2JylcclxuY29uc3QgQ29ubiA9IG5ldyBTZXF1ZWxpemUoJ3Bvc3RncmVzJywgJ3Bvc3RncmVzJywgJ3liZHVhbicsIHsgZGlhbGVjdDogJ3Bvc3RncmVzJyB9KVxyXG5cclxuY29uc3QgUGVyc29uID0gQ29ubi5kZWZpbmUoJ3BlcnNvbicsIHtcclxuICBuYW1lOiB7XHJcbiAgICB0eXBlOiBTVFJJTkcsXHJcbiAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgdW5pcXVlOiB0cnVlXHJcbiAgfSxcclxuICBlbWFpbDoge1xyXG4gICAgdHlwZTogU1RSSU5HLFxyXG4gICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgIHVuaXF1ZTogdHJ1ZSxcclxuICAgIHZhbGlkYXRlOiB7XHJcbiAgICAgIGlzRW1haWw6IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHBhc3N3b3JkOiB7XHJcbiAgICB0eXBlOiBTVFJJTkcsXHJcbiAgICBhbGxvd051bGw6IGZhbHNlXHJcbiAgfSxcclxuICBpc0FkbWluOiB7XHJcbiAgICB0eXBlOiBCT09MRUFOLFxyXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IFBvc3QgPSBDb25uLmRlZmluZSgncG9zdCcsIHtcclxuICB0aXRsZToge1xyXG4gICAgdHlwZTogU1RSSU5HLFxyXG4gICAgYWxsb3dOdWxsOiBmYWxzZVxyXG4gIH0sXHJcbiAgY29udGVudDoge1xyXG4gICAgdHlwZTogU1RSSU5HLFxyXG4gICAgYWxsb3dOdWxsOiBmYWxzZVxyXG4gIH0sXHJcbiAgb3V0d2FyZDoge1xyXG4gICAgdHlwZTogQk9PTEVBTixcclxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2VcclxuICB9LFxyXG4gIHJlY2VpdmVyczoge1xyXG4gICAgdHlwZTogQVJSQVkoSU5URUdFUiksXHJcbiAgICBkZWZhdWx0VmFsdWU6IFtdXHJcbiAgfVxyXG59KVxyXG5cclxuUGVyc29uLmhhc01hbnkoUG9zdClcclxuUG9zdC5iZWxvbmdzVG8oUGVyc29uKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgREI6IENvbm4sXHJcbiAgUGVyc29uLFxyXG4gIFBvc3RcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvZGIuanMiLCJpbXBvcnQgSG9tZSBmcm9tICcuL2NvbXBvbmVudHMvSG9tZS5qc3gnXHJcbmltcG9ydCBDcmVhdGVQZXJzb24gZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZS1wZXJzb24uanN4J1xyXG5pbXBvcnQgU2VhcmNoUGVyc29uIGZyb20gJy4vY29tcG9uZW50cy9zZWFyY2gtcGVyc29uLmpzeCdcclxuaW1wb3J0IENyZWF0ZVBvc3QgZnJvbSAnLi9jb21wb25lbnRzL2NyZWF0ZS1wb3N0LmpzeCdcclxuaW1wb3J0IFBvc3RMaXN0IGZyb20gJy4vY29tcG9uZW50cy9wb3N0LWxpc3QuanN4J1xyXG5pbXBvcnQgUHJvZmlsZSBmcm9tICcuL2NvbXBvbmVudHMvcHJvZmlsZS5qc3gnXHJcbmltcG9ydCBMb2dpbiBmcm9tICcuL2NvbXBvbmVudHMvbG9naW4uanN4J1xyXG5pbXBvcnQgUG9zdCBmcm9tICcuL2NvbXBvbmVudHMvcG9zdC5qc3gnXHJcblxyXG4vLyBwYXRoOiDot6/nlLHlnLDlnYBcclxuLy8gbmFtZTog5qCH562+5pi+56S65ZCN56ew77yM5Li656m65pe277yM5LiN5ZyoaGVhZGVy5Lit5pi+56S6XHJcbi8vIGNvbXBvbmVudDog5a+55bqU57uE5bu6XHJcbi8vIGlzQWRtaW46IOS7hUFkbWlu5Y+v5Lul6K6/6ZeuXHJcbi8vIGhpZGVXaGVuTG9naW46IOeZu+W9leS5i+WQjumakOiXj1xyXG4vLyBwcm9wczog55SxbWFwU3RhdGV0b1Byb3Bz6L2s5o2iXHJcbi8vIGFjdGlvbnM6IOeUsW1hcERpc3BhdGNodG9Qcm9wc+i9rOaNolxyXG4vLyBtYXBTdGF0ZVRvUHJvcHM6IOi/lOWbnuS4gOS4quWHveaVsO+8iOWPguaVsHsgbG9jYXRpb24sIG1hdGNoLCBoaXN0b3J5IH3vvInvvIzkuLpjb25uZWN05Ye95pWw55qE56ys5LiA5Y+C5pWwXHJcblxyXG5jb25zdCByb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJy8nLFxyXG4gICAgbmFtZTogJ0hvbWUnLFxyXG4gICAgZXhhY3Q6IHRydWUsXHJcbiAgICBjb21wb25lbnQ6IEhvbWVcclxuICB9LFxyXG4gIHtcclxuICAgIHBhdGg6ICcvY3JlYXRlLXBlcnNvbicsXHJcbiAgICBjb21wb25lbnQ6IENyZWF0ZVBlcnNvbixcclxuICAgIHByb3BzOiBbJ3BlcnNvbkNyZWF0aW9uUmVzdWx0JywgJ2F1dGhUb2tlbiddLFxyXG4gICAgYWN0aW9uczogWydhZGRQZXJzb24nXVxyXG4gIH0sIHtcclxuICAgIHBhdGg6ICcvc2VhcmNoLXBlcnNvbicsXHJcbiAgICBuYW1lOiAnU2VhcmNoIFBlcnNvbicsXHJcbiAgICBjb21wb25lbnQ6IFNlYXJjaFBlcnNvbixcclxuICAgIHByb3BzOiBbJ3NlYXJjaGVkUGVyc29uJ10sXHJcbiAgICBhY3Rpb25zOiBbJ3NlYXJjaFBlcnNvbiddXHJcbiAgfSwge1xyXG4gICAgcGF0aDogJy9sb2dpbicsXHJcbiAgICBjb21wb25lbnQ6IExvZ2luLFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzOiByb3V0ZVByb3BzID0+IHN0YXRlID0+IHtcclxuICAgICAgY29uc3QgeyBsb2NhdGlvbiB9ID0gcm91dGVQcm9wc1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGF1dGhUb2tlbjogc3RhdGUuYXV0aFRva2VuLFxyXG4gICAgICAgIGxvY2F0aW9uXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhY3Rpb25zOiBbJ2RvTG9naW4nXSxcclxuICAgIGhpZGVXaGVuTG9naW46IHRydWVcclxuICB9LCB7XHJcbiAgICBwYXRoOiAnL3Byb2ZpbGUvOmlkJyxcclxuICAgIGNvbXBvbmVudDogUHJvZmlsZSxcclxuICAgIG1hcFN0YXRlVG9Qcm9wczogcm91dGVQcm9wcyA9PiBzdGF0ZSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgbWF0Y2g6IHsgcGFyYW1zOiB7IGlkIH0gfSB9ID0gcm91dGVQcm9wc1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiAraWQsXHJcbiAgICAgICAgYXV0aFRva2VuOiBzdGF0ZS5hdXRoVG9rZW4sXHJcbiAgICAgICAgcHJvZmlsZTogKHN0YXRlLnByb2ZpbGUgJiYgc3RhdGUucHJvZmlsZVtpZF0pID8gc3RhdGUucHJvZmlsZVtpZF0gOiBudWxsXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhY3Rpb25zOiBbJ2ZldGNoUHJvZmlsZScsICdkb0xvZ291dCddLFxyXG4gICAgb25OYXZpZ2F0ZTogJ2ZldGNoUHJvZmlsZSdcclxuICB9LCB7XHJcbiAgICBwYXRoOiAnL3Bvc3QvOmlkJyxcclxuICAgIGNvbXBvbmVudDogUG9zdCxcclxuICAgIG1hcFN0YXRlVG9Qcm9wczogcm91dGVQcm9wcyA9PiBzdGF0ZSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgbWF0Y2g6IHsgcGFyYW1zOiB7IGlkIH0gfSwgbG9jYXRpb24gfSA9IHJvdXRlUHJvcHNcclxuICAgICAgY29uc3QgeyBwb3N0IH0gPSBsb2NhdGlvbi5zdGF0ZSB8fCB7IHBvc3Q6IHsgaWQgfSB9XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcG9zdDogKHN0YXRlLnBvc3RzICYmIHN0YXRlLnBvc3RzW2lkXSkgPyBzdGF0ZS5wb3N0c1tpZF0gOiBwb3N0LFxyXG4gICAgICAgIGF1dGhUb2tlbjogc3RhdGUuYXV0aFRva2VuLFxyXG4gICAgICAgIGxvY2F0aW9uXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhY3Rpb25zOiBbJ2ZldGNoUG9zdCddLFxyXG4gICAgb25OYXZpZ2F0ZTogJ2ZldGNoUG9zdCdcclxuICB9LCB7XHJcbiAgICBwYXRoOiAnL2NyZWF0ZS1wb3N0JyxcclxuICAgIGNvbXBvbmVudDogQ3JlYXRlUG9zdCxcclxuICAgIHByb3BzOiBbJ2F1dGhUb2tlbicsICdwb3N0Q3JlYXRpb25SZXN1bHQnXSxcclxuICAgIGFjdGlvbnM6IFsnYWRkUG9zdCddXHJcbiAgfSwge1xyXG4gICAgcGF0aDogJy9wb3N0LWxpc3QnLFxyXG4gICAgY29tcG9uZW50OiBQb3N0TGlzdCxcclxuICAgIG5hbWU6ICdQb3N0IExpc3QnLFxyXG4gICAgcHJvcHM6IFsncG9zdExpc3QnXSxcclxuICAgIGFjdGlvbnM6IFsnZmV0Y2hQb3N0TGlzdCddLFxyXG4gICAgb25OYXZpZ2F0ZTogJ2ZldGNoUG9zdExpc3QnXHJcbiAgfVxyXG5dXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlc1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm91dGVzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImxvZGFzaFwiXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgbWFrZUV4ZWN1dGFibGVTY2hlbWEsIGFkZEVycm9yTG9nZ2luZ1RvU2NoZW1hIH0gPSByZXF1aXJlKCdncmFwaHFsLXRvb2xzJylcclxuXHJcbmNvbnN0IHsgREIgfSA9IHJlcXVpcmUoJy4vZGInKVxyXG4vLyBjb25zdCB7IHJlc29sdmVGb3JBZG1pbiB9ID0gcmVxdWlyZSgnLi9hdXRoJylcclxuXHJcbmNvbnN0IHNjaGVtYSA9IGBcclxuICAjIFRoaXMgaXMgYSBwZXJzb25cclxuICB0eXBlIFBlcnNvbiB7XHJcbiAgICBpZDogSW50IVxyXG4gICAgIyDmmL7npLrlkI3np7BcclxuICAgIG5hbWU6IFN0cmluZyFcclxuICAgICMg6YKu566xXHJcbiAgICBlbWFpbDogU3RyaW5nIVxyXG4gICAgIyDmmK/lkKbmmK/nrqHnkIblkZhcclxuICAgIGlzQWRtaW46IEJvb2xlYW5cclxuICAgICMg5omA5Y+R6KGo55qE5paH56ugXHJcbiAgICBwb3N0czogW1Bvc3RdXHJcbiAgfVxyXG5cclxuICAjIFBlcnNvbiBjcmVhdGlvbiBtZXNzYWdlXHJcbiAgdHlwZSBQZXJzb25DcmVhdGlvbiB7XHJcbiAgICBtZXNzYWdlOiBTdHJpbmdcclxuICAgIGNyZWF0ZWQ6IEJvb2xlYW4hXHJcbiAgfVxyXG5cclxuICAjIFRoaXMgaXMgYSBwb3N0XHJcbiAgdHlwZSBQb3N0IHtcclxuICAgIGlkOiBJbnRcclxuICAgIHRpdGxlOiBTdHJpbmdcclxuICAgIGNvbnRlbnQ6IFN0cmluZ1xyXG4gICAgIyDmmK/lkKblhazlvIBcclxuICAgIG91dHdhcmQ6IEJvb2xlYW5cclxuICAgICMg5Yib5bu66ICFXHJcbiAgICBwZXJzb246IFBlcnNvblxyXG4gICAgIyDlhYHorrjmn6XnnIvnmoTkurpcclxuICAgIHJlY2VpdmVyczogW0ludF1cclxuICB9XHJcblxyXG4gICMgcG9zdCBjcmVhdGlvbiBtZXNzYWdlXHJcbiAgdHlwZSBQb3N0Q3JlYXRpb24ge1xyXG4gICAgbWVzc2FnZTogU3RyaW5nXHJcbiAgICBpZDogSW50XHJcbiAgfVxyXG5cclxuICAjIFRoaXMgaXMgcm9vdCBxdWVyeVxyXG4gIHR5cGUgUXVlcnkge1xyXG4gICAgcGVvcGxlKGlkOiBJbnQsIGVtYWlsOiBTdHJpbmcpOiBbUGVyc29uXVxyXG4gICAgcG9zdHMoaWQ6IEludCwgdGl0bGU6IFN0cmluZyk6IFtQb3N0XVxyXG4gIH1cclxuXHJcblxyXG4gICMgRnVuY3Rpb25zIHRvIGNyZWF0ZSBzdHVmZlxyXG4gIHR5cGUgTXV0YXRpb24ge1xyXG4gICAgIyBBZGQgYSBwZXJzb25cclxuICAgIGFkZFBlcnNvbiAobmFtZTogU3RyaW5nISwgZW1haWw6IFN0cmluZyEsIHBhc3N3b3JkOiBTdHJpbmchKTogUGVyc29uQ3JlYXRpb25cclxuXHJcbiAgICAjIEFkZCBhIHBvc3RcclxuICAgIGFkZFBvc3QgKHRpdGxlOiBTdHJpbmchLCBjb250ZW50OiBTdHJpbmchLCBvdXR3YXJkOiBCb29sZWFuKTogUG9zdENyZWF0aW9uXHJcbiAgfVxyXG4gIHNjaGVtYSB7XHJcbiAgICBxdWVyeTogUXVlcnlcclxuICAgIG11dGF0aW9uOiBNdXRhdGlvblxyXG4gIH1cclxuYFxyXG5cclxuY29uc3QgcmVzb2x2ZUZ1bmN0aW9ucyA9IHtcclxuICBQZXJzb246IHtcclxuICAgIHBvc3RzKHBlcnNvbiwgYXJncywgY29udGV4dCA9IHt9KSB7XHJcbiAgICAgIC8vIHJldHVybiBwZXJzb24uZ2V0UG9zdHMoKVxyXG4gICAgICBjb25zdCB3aGVyZSA9IChjb250ZXh0LmF1dGhUb2tlbiAmJiBwZXJzb24uaWQgPT09IGNvbnRleHQuYXV0aFRva2VuLmlkKSA/IG51bGwgOiB7IG91dHdhcmQ6IHRydWUgfVxyXG4gICAgICByZXR1cm4gcGVyc29uLmdldFBvc3RzKHsgd2hlcmUgfSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBQb3N0OiB7XHJcbiAgICBwZXJzb24ocG9zdCkge1xyXG4gICAgICByZXR1cm4gcG9zdC5nZXRQZXJzb24oKVxyXG4gICAgfSxcclxuICAgIGNvbnRlbnQocG9zdCwgYXJncywgY29udGV4dCA9IHt9KSB7XHJcbiAgICAgIGNvbnN0IHVzZXJJZCA9IGNvbnRleHQuYXV0aFRva2VuID8gY29udGV4dC5hdXRoVG9rZW4uaWQgOiBudWxsXHJcbiAgICAgIGlmICghcG9zdC5vdXR3YXJkICYmICh1c2VySWQgIT09IHBvc3QucGVyc29uSWQgJiYgcG9zdC5yZWNlaXZlcnMuaW5kZXhPZih1c2VySWQpIDwgMCkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBwb3N0LmNvbnRlbnRcclxuICAgIH1cclxuICB9LFxyXG4gIFF1ZXJ5OiB7XHJcbiAgICBhc3luYyBwZW9wbGUoXywgeyBpZCwgZW1haWwgfSkge1xyXG4gICAgICBsZXQgYXJncyA9IHt9XHJcbiAgICAgIGlmIChpZCB8fCBpZCA9PT0gMCkgYXJncy5pZCA9IGlkXHJcbiAgICAgIGlmIChlbWFpbCkgYXJncy5lbWFpbCA9IGVtYWlsXHJcbiAgICAgIGNvbnN0IHBlb3BsZSA9IGF3YWl0IERCLm1vZGVsKCdwZXJzb24nKS5maW5kQWxsKHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7IGV4Y2x1ZGU6IFsncGFzc3dvcmQnXSB9LFxyXG4gICAgICAgIHdoZXJlOiBhcmdzXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBwZW9wbGVcclxuICAgIH0sXHJcbiAgICBwb3N0cyhfLCB7IGlkLCB0aXRsZSB9LCBjb250ZXh0ID0ge30pIHtcclxuICAgICAgbGV0IGFyZ3MgPSB7fVxyXG4gICAgICBpZiAoaWQgfHwgaWQgPT09IDApIHtcclxuICAgICAgICBhcmdzID0geyBpZCB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGl0bGUpIHtcclxuICAgICAgICBhcmdzID0geyB0aXRsZSB9XHJcbiAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5hdXRoVG9rZW4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKGFyZ3MsIHtcclxuICAgICAgICAgICRvcjogW1xyXG4gICAgICAgICAgICB7IHBlcnNvbklkOiBjb250ZXh0LmF1dGhUb2tlbi5pZCB9LFxyXG4gICAgICAgICAgICB7IHJlY2VpdmVyczogeyAkY29udGFpbmVkOiBbY29udGV4dC5hdXRoVG9rZW4uaWRdIH0gfSxcclxuICAgICAgICAgICAgeyBvdXR3YXJkOiB0cnVlIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oYXJncywgeyBvdXR3YXJkOiB0cnVlIH0pXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIERCLm1vZGVsKCdwb3N0JykuZmluZEFsbCh7IHdoZXJlOiBhcmdzIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBNdXRhdGlvbjoge1xyXG4gICAgYWRkUGVyc29uKF8sIGFyZ3MpIHtcclxuICAgICAgcmV0dXJuIERCLm1vZGVsKCdwZXJzb24nKS5jcmVhdGUoYXJncylcclxuICAgICAgICAudGhlbigoKSA9PiAoeyBjcmVhdGVkOiB0cnVlIH0pKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSxcclxuICAgICAgICAgICAgY3JlYXRlZDogZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFkZFBvc3QoXywgYXJncywgY29udGV4dCA9IHt9KSB7XHJcbiAgICAgIGlmICghY29udGV4dC5hdXRoVG9rZW4pIHtcclxuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdVbmF1dGhvcml6ZWQnKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBEQi5tb2RlbCgncG9zdCcpXHJcbiAgICAgICAgLmNyZWF0ZShPYmplY3QuYXNzaWduKHt9LCBhcmdzLCB7XHJcbiAgICAgICAgICBwZXJzb25JZDogY29udGV4dC5hdXRoVG9rZW4uaWRcclxuICAgICAgICB9KSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuY29uc3QgZXhlY3V0YWJsZVNjaGVtYSA9IG1ha2VFeGVjdXRhYmxlU2NoZW1hKHtcclxuICB0eXBlRGVmczogc2NoZW1hLFxyXG4gIHJlc29sdmVyczogcmVzb2x2ZUZ1bmN0aW9uc1xyXG59KVxyXG5hZGRFcnJvckxvZ2dpbmdUb1NjaGVtYShleGVjdXRhYmxlU2NoZW1hLCB7IGxvZzogZSA9PiBjb25zb2xlLmVycm9yKGUuc3RhY2spIH0pXHJcbm1vZHVsZS5leHBvcnRzID0gZXhlY3V0YWJsZVNjaGVtYVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvc2NoZW1hLmpzIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xyXG5pbXBvcnQgZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnXHJcbmNvbnN0IHsgZ3JhcGhRTEhlbHBlciB9ID0gcHJvY2Vzcy5lbnYuQlJPV1NFUiA/IHJlcXVpcmUoJy4vdXRpbHMvY2xpZW50LWdyYXBocWwtaGVscGVyJykgOiByZXF1aXJlKCcuL3V0aWxzL3NlcnZlci1ncmFwaHFsLWhlbHBlcicpXHJcbmNvbnNvbGUubG9nKHByb2Nlc3MuZW52LkJST1dTRVIpXHJcblxyXG5leHBvcnQgY29uc3QgQ1JFQVRFX1BFUlNPTiA9ICdDUkVBVEVfUEVSU09OJ1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkUGVyc29uKHBlcnNvbikge1xyXG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICBjb25zdCBtdXRhdGlvbiA9IGAgXHJcbiAgICAgIG11dGF0aW9uIEFkZFBlcnNvbigkbmFtZTogU3RyaW5nISwgJGVtYWlsOiBTdHJpbmchLCAkcGFzc3dvcmQ6IFN0cmluZyEpe1xyXG4gICAgICAgIGFkZFBlcnNvbihuYW1lOiAkbmFtZSwgZW1haWw6ICRlbWFpbCwgcGFzc3dvcmQ6ICRwYXNzd29yZCl7XHJcbiAgICAgICAgICBtZXNzYWdlXHJcbiAgICAgICAgICBjcmVhdGVkXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBgXHJcbiAgICBjb25zdCB7IGF1dGhUb2tlbiB9ID0gZ2V0U3RhdGUoKVxyXG4gICAgcmV0dXJuIGdyYXBoUUxIZWxwZXIobXV0YXRpb24sIHBlcnNvbiwgeyBhdXRoVG9rZW4gfSlcclxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IENSRUFURV9QRVJTT04sIHJlc3VsdDogZGF0YS5hZGRQZXJzb24gfSlcclxuICAgICAgfSlcclxuICAgICAgLy8gLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIC8vICAgYWxlcnQoZXJyLm1lc3NhZ2UpXHJcbiAgICAgIC8vIH0pXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfc2VhcmNoUGVyc29uKHsgaWQsIGVtYWlsID0gJycgfSwgYXV0aFRva2VuID0ge30pIHtcclxuICBjb25zdCBxdWVyeSA9IGAgXHJcbiAgICBxdWVyeSBQZW9wbGVJbmZvKCRpZDogSW50LCAkZW1haWw6IFN0cmluZykge1xyXG4gICAgICBwZW9wbGUoaWQ6ICRpZCwgZW1haWw6ICRlbWFpbCkge1xyXG4gICAgICAgIGlkXHJcbiAgICAgICAgbmFtZVxyXG4gICAgICAgIGVtYWlsXHJcbiAgICAgICAgcG9zdHMge1xyXG4gICAgICAgICAgaWRcclxuICAgICAgICAgIHRpdGxlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgYFxyXG4gIHJldHVybiBncmFwaFFMSGVscGVyKHF1ZXJ5LCB7IGlkLCBlbWFpbCB9LCB7IGF1dGhUb2tlbiB9KVxyXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0pXHJcbiAgICAudGhlbihkYXRhID0+IGRhdGEucGVvcGxlKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgU0VBUkNIX1BFUlNPTiA9ICdTRUFSQ0hfUEVSU09OJ1xyXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUGVyc29uKHsgaWQsIGVtYWlsIH0pIHtcclxuICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICByZXR1cm4gX3NlYXJjaFBlcnNvbih7IGlkLCBlbWFpbCB9KVxyXG4gICAgICAudGhlbihwZW9wbGUgPT4gZGlzcGF0Y2goeyB0eXBlOiBTRUFSQ0hfUEVSU09OLCBwZW9wbGUgfSkpXHJcbiAgICAgIC8vIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAvLyAgIGFsZXJ0KGVyci5tZXNzYWdlKVxyXG4gICAgICAvLyB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFNFVF9BVVRIX1RPS0VOID0gJ1NFVF9BVVRIX1RPS0VOJ1xyXG5leHBvcnQgZnVuY3Rpb24gZG9Mb2dpbihwZXJzb24sIHJlbWVtYmVyKSB7XHJcbiAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgcmV0dXJuIGF4aW9zLnBvc3QoJy9sb2dpbicsIHsgLi4ucGVyc29uIH0pXHJcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmICghcmVzdWx0LmRhdGEpIHtcclxuICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICB0eXBlOiBTRVRfQVVUSF9UT0tFTixcclxuICAgICAgICAgIGF1dGhUb2tlbjogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYXV0aFRva2VuID0gZGVjb2RlKHJlc3VsdC5kYXRhKVxyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogU0VUX0FVVEhfVE9LRU4sXHJcbiAgICAgICAgYXV0aFRva2VuXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZW1lbWJlciAmJiBhdXRoVG9rZW4pIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBKU09OLnN0cmluZ2lmeShhdXRoVG9rZW4pKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdqc29ud2VidG9rZW49OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgVVRDOyBwYXRoPS87J1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9Mb2dvdXQoKSB7XHJcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJylcclxuICBkb2N1bWVudC5jb29raWUgPSAnanNvbndlYnRva2VuPTsgZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIFVUQzsgcGF0aD0vOydcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogU0VUX0FVVEhfVE9LRU4sXHJcbiAgICBhdXRoVG9rZW46IG51bGxcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBGRVRDSF9QUk9GSUxFID0gJ0ZFVENIX1BST0ZJTEUnXHJcbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoeyBpZCB9KSB7XHJcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgIGNvbnN0IHsgYXV0aFRva2VuIH0gPSBnZXRTdGF0ZSgpXHJcbiAgICByZXR1cm4gX3NlYXJjaFBlcnNvbih7IGlkOiAraWQgfSwgeyBhdXRoVG9rZW4gfSlcclxuICAgICAgLnRoZW4oKHBlb3BsZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBlcnNvbiA9IChwZW9wbGUgJiYgcGVvcGxlLmxlbmd0aCkgPyBwZW9wbGVbMF0gOiB7IGlkIH1cclxuICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICB0eXBlOiBGRVRDSF9QUk9GSUxFLFxyXG4gICAgICAgICAgcGVyc29uXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcGVyc29uXHJcbiAgICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgRkVUQ0hfUE9TVCA9ICdGRVRDSF9QT1NUJ1xyXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hQb3N0KHsgaWQsIHRpdGxlIH0pIHtcclxuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgcXVlcnkgPSBgXHJcbiAgICAgIHF1ZXJ5IFBvc3RzSW5mbygkaWQ6IEludCwgJHRpdGxlOiBTdHJpbmcpIHtcclxuICAgICAgICBwb3N0cyhpZDogJGlkLCB0aXRsZTogJHRpdGxlKSB7XHJcbiAgICAgICAgICBpZFxyXG4gICAgICAgICAgdGl0bGVcclxuICAgICAgICAgIG91dHdhcmRcclxuICAgICAgICAgIGNvbnRlbnRcclxuICAgICAgICAgIHBlcnNvbiB7XHJcbiAgICAgICAgICAgIGlkXHJcbiAgICAgICAgICAgIG5hbWVcclxuICAgICAgICAgICAgZW1haWxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIGBcclxuICAgIGNvbnN0IHsgYXV0aFRva2VuIH0gPSBnZXRTdGF0ZSgpXHJcbiAgICByZXR1cm4gZ3JhcGhRTEhlbHBlcihxdWVyeSwgeyBpZCwgdGl0bGUgfSwgeyBhdXRoVG9rZW4gfSlcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5wb3N0cylcclxuICAgICAgLnRoZW4ocG9zdHMgPT4gcG9zdHMgJiYgcG9zdHNbMF0gJiYgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IEZFVENIX1BPU1QsXHJcbiAgICAgICAgcG9zdDogcG9zdHNbMF1cclxuICAgICAgfSkpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQUREX1BPU1QgPSAnQUREX1BPU1QnXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRQb3N0KHBvc3QpIHtcclxuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgbXV0YXRpb24gPSBgXHJcbiAgICAgIG11dGF0aW9uIEFkZFBvc3QoJHRpdGxlOiBTdHJpbmchLCAkY29udGVudDogU3RyaW5nISwgJG91dHdhcmQ6IEJvb2xlYW4pIHtcclxuICAgICAgICBhZGRQb3N0KHRpdGxlOiAkdGl0bGUsIGNvbnRlbnQ6ICRjb250ZW50LCBvdXR3YXJkOiAkb3V0d2FyZCkge1xyXG4gICAgICAgICAgaWRcclxuICAgICAgICAgIG1lc3NhZ2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIGBcclxuICAgIHJldHVybiBncmFwaFFMSGVscGVyKG11dGF0aW9uLCBwb3N0KVxyXG4gICAgICAudGhlbihkYXRhID0+IGRpc3BhdGNoKHsgdHlwZTogQUREX1BPU1QsIHJlc3VsdDogZGF0YS5hZGRQb3N0IH0pKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEZFVENIX1BPU1RfTElTVCA9ICdGRVRDSF9QT1NUX0xJU1QnXHJcbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFBvc3RMaXN0KCkge1xyXG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcbiAgICBjb25zdCBxdWVyeSA9IGBcclxuICAgICAgcXVlcnkge1xyXG4gICAgICAgIHBvc3RzIHtcclxuICAgICAgICAgIGlkXHJcbiAgICAgICAgICB0aXRsZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgYFxyXG4gICAgY29uc3QgeyBhdXRoVG9rZW4gfSA9IGdldFN0YXRlKClcclxuICAgIHJldHVybiBncmFwaFFMSGVscGVyKHF1ZXJ5LCBudWxsLCB7IGF1dGhUb2tlbiB9KVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LnBvc3RzKVxyXG4gICAgICAudGhlbihwb3N0cyA9PiBwb3N0cyAmJiBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogRkVUQ0hfUE9TVF9MSVNULFxyXG4gICAgICAgIHBvc3RzXHJcbiAgICAgIH0pKVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWN0aW9ucy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgTGluaywgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXHJcblxyXG5jb25zdCBGb3JiaWRkZW4gPSAoeyBoaXN0b3J5LCBsb2NhdGlvbjogeyBwYXRobmFtZSB9IH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7bWFyZ2luVG9wOiAnMjBweCd9fT5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxoMj40MDMgfiBGb3JiaWRkZW48L2gyPlxyXG4gICAgICA8TGluayB0bz17e1xyXG4gICAgICAgIHBhdGhuYW1lOiAnL2xvZ2luJyxcclxuICAgICAgICBzdGF0ZTogeyBmcm9tOiB7IHBhdGhuYW1lIH0gfVxyXG4gICAgICB9fSBjbGFzc05hbWU9XCJidG4gYnRuLWxnIGJ0bi1zdWNjZXNzXCI+TE9HSU4gVE8gVklFVzwvTGluaz5cclxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgIGlmIChoaXN0b3J5Lmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgIGhpc3RvcnkucHVzaCgnLycpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGhpc3RvcnkuZ29CYWNrKClcclxuICAgICAgICB9XHJcbiAgICAgIH19IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWxnIGJ0bi1saW5rXCI+QmFjazwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoRm9yYmlkZGVuKVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy80MDMuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuXHJcbmNvbnN0IE5vdEZvdW5kID0gKHsgaGlzdG9yeSB9KSA9PiAoXHJcbiAgPGRpdiBzdHlsZT17e21hcmdpblRvcDogJzIwcHgnfX0+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8aDI+NDA0IH4gTk9UIEZPVU5EPC9oMj5cclxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgIGlmIChoaXN0b3J5Lmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgIGhpc3RvcnkucHVzaCgnLycpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGhpc3RvcnkuZ29CYWNrKClcclxuICAgICAgICB9XHJcbiAgICAgIH19IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWxnIGJ0bi1saW5rXCI+QmFjazwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoTm90Rm91bmQpXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzLzQwNC5qc3giLCJjb25zdCBSb3V0ZXIgPSByZXF1aXJlKCdrb2Etcm91dGVyJylcclxuXHJcbmNvbnN0IGdyYXBocWwgPSByZXF1aXJlKCcuL2dyYXBocWwnKVxyXG5jb25zdCBsb2dpbiA9IHJlcXVpcmUoJy4vbG9naW4nKVxyXG5jb25zdCBzc3IgPSByZXF1aXJlKCcuL3NzcicpXHJcblxyXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKClcclxuXHJcbnJvdXRlci5nZXQoJy9mYXZpY29uLmljbycsIChjdHgpID0+IHtcclxuICBjdHgucmVkaXJlY3QoJ2h0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2Zhdmljb24uaWNvJylcclxufSlcclxuXHJcbnJvdXRlclxyXG4gIC51c2UoZ3JhcGhxbC5yb3V0ZXMoKSlcclxuICAudXNlKGxvZ2luLnJvdXRlcygpKVxyXG4gIC51c2Uoc3NyLnJvdXRlcygpKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImtvYVwiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtYm9keXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImtvYS1ib2R5cGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYS1qd3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJrb2Etand0XCJcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IEtvYSA9IHJlcXVpcmUoJ2tvYScpXHJcbmNvbnN0IGtvYUpXVCA9IHJlcXVpcmUoJ2tvYS1qd3QnKVxyXG5jb25zdCBrb2FCb2R5ID0gcmVxdWlyZSgna29hLWJvZHlwYXJzZXInKVxyXG5jb25zdCB7IHRpbWVzIH0gPSByZXF1aXJlKCdsb2Rhc2gnKVxyXG5cclxuY29uc3Qgcm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXMnKVxyXG5jb25zdCB7IERCLCBQZXJzb24gfSA9IHJlcXVpcmUoJy4vZGInKVxyXG5jb25zdCBhcHAgPSBuZXcgS29hKClcclxuYXBwXHJcbiAgLnVzZShrb2FCb2R5KCkpXHJcbiAgLnVzZShrb2FKV1Qoe1xyXG4gICAgY29va2llOiAnanNvbndlYnRva2VuJyxcclxuICAgIHNlY3JldDogJ05FVEVBU0UnLFxyXG4gICAgcGFzc3Rocm91Z2g6IHRydWVcclxuICB9KSlcclxuICAudXNlKHJvdXRlci5yb3V0ZXMoKSlcclxuICAudXNlKHJvdXRlci5hbGxvd2VkTWV0aG9kcygpKVxyXG4gIC8vIEFsd2F5cyByZXR1cm4gdGhlIG1haW4gaW5kZXguaHRtbCwgc28gcmVhY3Qtcm91dGVyIHJlbmRlciB0aGUgcm91dGUgaW4gdGhlIGNsaWVudFxyXG5cclxuXHJcbi8vIHJvdXRlci5nZXQoJyonLCBhc3luYyAoY3R4LCBuZXh0KSA9PiB7XHJcbi8vICAgaWYgKGN0eC5wYXRoLmVuZHNXaXRoKCdncmFwaGlxbCcpKSB7XHJcbi8vICAgICBhd2FpdCBuZXh0KClcclxuLy8gICB9IGVsc2Uge1xyXG4vLyAgICAgYXdhaXQgc2VuZChjdHgsICdwdWJsaWMvaW5kZXguaHRtbCcpXHJcbi8vICAgfVxyXG4vLyB9KVxyXG5cclxuXHJcbmFwcC5saXN0ZW4oMzAwMCwgJzAuMC4wLjAnLCAoKSA9PiBjb25zb2xlLmxvZygnTm93IGJyb3dzZXIgdG8gbG9jYWxob3N0OjMwMDAvZ3JhcGhxbCcpKVxyXG5cclxuREIuc3luYyh7IGZvcmNlOiB0cnVlIH0pLnRoZW4oKCkgPT4ge1xyXG4gIHRpbWVzKDEwLCAoaSkgPT4ge1xyXG4gICAgUGVyc29uLmNyZWF0ZSh7XHJcbiAgICAgIG5hbWU6ICd5YmR1YW4nICsgaSxcclxuICAgICAgZW1haWw6ICdkeWInICsgaSArICdAZ21haWwuY29tJyxcclxuICAgICAgcGFzc3dvcmQ6ICcxMjM0NTYnLFxyXG4gICAgICBpc0FkbWluOiBpID09PSAwXHJcbiAgICB9KS50aGVuKChwZXJzb24pID0+IHtcclxuICAgICAgcmV0dXJuIHBlcnNvbi5jcmVhdGVQb3N0KHtcclxuICAgICAgICB0aXRsZTogYFNhbXBsZSB0aXRsZSBieSAke3BlcnNvbi5uYW1lfWAsXHJcbiAgICAgICAgY29udGVudDogYFRoaXMgaXMgYSBzYW1wbGUgYXJ0aWNsZWAsXHJcbiAgICAgICAgb3V0d2FyZDogaSAlIDIgPT09IDAsXHJcbiAgICAgICAgcmVjZWl2ZXJzOiBbMV1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSlcclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2FwcC5qcyIsImNvbnN0IFJvdXRlciA9IHJlcXVpcmUoJ2tvYS1yb3V0ZXInKVxyXG5jb25zdCB7IGdyYXBocWxLb2EsIGdyYXBoaXFsS29hIH0gPSByZXF1aXJlKCdncmFwaHFsLXNlcnZlci1rb2EnKVxyXG5jb25zdCBzY2hlbWEgPSByZXF1aXJlKCcuLi9zY2hlbWEnKVxyXG5cclxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpXHJcblxyXG5yb3V0ZXIucG9zdCgnL2dyYXBocWwnLCBncmFwaHFsS29hKChjdHgpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgc2NoZW1hLFxyXG4gICAgY29udGV4dDoge1xyXG4gICAgICBhdXRoVG9rZW46IGN0eC5zdGF0ZS51c2VyXHJcbiAgICB9LFxyXG4gICAgZGVidWc6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnXHJcbiAgfVxyXG59KSlcclxucm91dGVyLmdldCgnL2dyYXBoaXFsJywgZ3JhcGhpcWxLb2EoeyBlbmRwb2ludFVSTDogJy9ncmFwaHFsJyB9KSlcclxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9ncmFwaHFsLmpzIiwiY29uc3QgUm91dGVyID0gcmVxdWlyZSgna29hLXJvdXRlcicpXHJcbmNvbnN0IHsgREIgfSA9IHJlcXVpcmUoJy4uL2RiJylcclxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpXHJcbmNvbnN0IHsgc2lnbiB9ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJylcclxuXHJcbnJvdXRlci5wb3N0KCcvbG9naW4nLCBhc3luYyAoY3R4KSA9PiB7XHJcbiAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IGN0eC5yZXF1ZXN0LmJvZHlcclxuICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkge1xyXG4gICAgY3R4LmJvZHkgPSAnJ1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIGNvbnN0IHBlcnNvbiA9IGF3YWl0IERCLm1vZGVsKCdwZXJzb24nKS5maW5kKHsgd2hlcmU6IHsgZW1haWwsIHBhc3N3b3JkIH0gfSlcclxuICBpZiAocGVyc29uKSB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IHNpZ24oeyBpZDogcGVyc29uLmlkLCBlbWFpbCwgbmFtZTogcGVyc29uLm5hbWUsIGlzQWRtaW46IHBlcnNvbi5pc0FkbWluIH0sICdORVRFQVNFJywgeyBleHBpcmVzSW46ICc3IGRheXMnIH0pXHJcbiAgICBjdHguYm9keSA9IHRva2VuXHJcbiAgICBjdHguY29va2llcy5zZXQoJ2pzb253ZWJ0b2tlbicsIHRva2VuLCB7XHJcbiAgICAgIG1heEFnZTogMTAwMCAqIDYwICogNjAgKiAyNCAqIDcsXHJcbiAgICAgIG92ZXJ3cml0ZTogdHJ1ZSxcclxuICAgICAgaHR0cE9ubHk6IGZhbHNlXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjdHguYm9keSA9ICcnXHJcbiAgfVxyXG59KVxyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2xvZ2luLmpzIiwiY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcbmNvbnN0IFJvdXRlciA9IHJlcXVpcmUoJ2tvYS1yb3V0ZXInKVxyXG5jb25zdCB7IHByb21pc2lmeSB9ID0gcmVxdWlyZSgnYmx1ZWJpcmQnKVxyXG5jb25zdCB7IFByb3ZpZGVyIH0gPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpXHJcbmNvbnN0IHsgU3RhdGljUm91dGVyLCBtYXRjaFBhdGggfSA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlci1kb20nKVxyXG5jb25zdCB7IHJlbmRlclRvU3RyaW5nIH0gPSByZXF1aXJlKCdyZWFjdC1kb20vc2VydmVyJylcclxuXHJcbmNvbnN0IGFjdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9zcmMvYWN0aW9ucycpXHJcbmNvbnN0IHsgZGVmYXVsdDogQXBwIH0gPSByZXF1aXJlKCcuLi8uLi9zcmMvY29udGFpbmVycy9BcHAnKVxyXG5jb25zdCB7IGRlZmF1bHQ6IGNvbmZpZ3VyZVN0b3JlIH0gPSByZXF1aXJlKCcuLi8uLi9zcmMvc3RvcmUnKVxyXG5jb25zdCB7IGRlZmF1bHQ6IHJvdXRlcyB9ID0gcmVxdWlyZSgnLi4vLi4vc3JjL3JvdXRlcycpXHJcblxyXG5jb25zdCByZWFkRmlsZSA9IHByb21pc2lmeShmcy5yZWFkRmlsZSlcclxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcigpXHJcblxyXG5yb3V0ZXIuZ2V0KCcvJywgYXN5bmMgKGN0eCkgPT4ge1xyXG4gIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uJywgJ3B1YmxpYycsICdpbmRleC5odG1sJylcclxuICB0cnkge1xyXG4gICAgY29uc3QgaHRtbCA9IGF3YWl0IHJlYWRGaWxlKGZpbGVQYXRoLCAndXRmOCcpXHJcbiAgICBjb25zdCBjb250ZXh0ID0ge31cclxuICAgIGNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoe1xyXG4gICAgICBhdXRoVG9rZW46IGN0eC5zdGF0ZS51c2VyXHJcbiAgICB9KVxyXG4gICAgbGV0IG1hdGNoID0gbnVsbFxyXG4gICAgY29uc3QgbWF0Y2hlZFJvdXRlID0gcm91dGVzLmZpbmQoKHJvdXRlKSA9PiB7XHJcbiAgICAgIG1hdGNoID0gbWF0Y2hQYXRoKGN0eC5yZXEudXJsLCByb3V0ZSlcclxuICAgICAgcmV0dXJuIG1hdGNoXHJcbiAgICB9KVxyXG4gICAgaWYgKG1hdGNoZWRSb3V0ZSAmJiBtYXRjaGVkUm91dGUub25OYXZpZ2F0ZSAmJiB0eXBlb2YgYWN0aW9uc1ttYXRjaGVkUm91dGUub25OYXZpZ2F0ZV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgYXdhaXQgc3RvcmUuZGlzcGF0Y2goYWN0aW9uc1ttYXRjaGVkUm91dGUub25OYXZpZ2F0ZV0obWF0Y2gucGFyYW1zKSlcclxuICAgIH1cclxuICAgIGNvbnN0IG1hcmt1cCA9IHJlbmRlclRvU3RyaW5nKFxyXG4gICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgICAgICA8U3RhdGljUm91dGVyXHJcbiAgICAgICAgICBsb2NhdGlvbj17Y3R4LnJlcS51cmx9XHJcbiAgICAgICAgICBjb250ZXh0PXtjb250ZXh0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxBcHAgbG9jYXRpb249e3sgcGF0aG5hbWU6IGN0eC5yZXEudXJsIH19IC8+XHJcbiAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XHJcbiAgICAgIDwvUHJvdmlkZXI+XHJcbiAgICApXHJcbiAgICBpZiAoY29udGV4dC51cmwpIHtcclxuICAgICAgY3R4LnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB3ZSdyZSBnb29kLCBzZW5kIHRoZSByZXNwb25zZVxyXG4gICAgICBjb25zdCBwcmVsb2FkU3RhdGUgPSBKU09OLnN0cmluZ2lmeShzdG9yZS5nZXRTdGF0ZSgpKVxyXG4gICAgICBjdHguYm9keSA9IGh0bWxcclxuICAgICAgICAucmVwbGFjZSgne3tTU1J9fScsIG1hcmt1cClcclxuICAgICAgICAucmVwbGFjZSgne3tTVEFURX19JywgcHJlbG9hZFN0YXRlLnJlcGxhY2UoLzwvZywgJ1xcXFx1MDAzYycpKVxyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnIpXHJcbiAgICBjdHguYm9keSA9IGVyci50b1N0cmluZygpXHJcbiAgICBjdHguc3RhdHVzID0gNDA0XHJcbiAgfVxyXG59KVxyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlclxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3Nzci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmNvbnN0IEhvbWUgPSAoKSA9PiAoXHJcbiAgPGRpdiBjbGFzc05hbWU9XCJqdW1ib3Ryb25cIj5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgIDxoMSBjbGFzc05hbWU9XCJkaXNwbGF5LTNcIj5IZWxsbywgd29ybGQhPC9oMT5cclxuICAgICAgPHA+VGhpcyBpcyBhIHRlbXBsYXRlIGZvciBhIHNpbXBsZSBtYXJrZXRpbmcgb3IgaW5mb3JtYXRpb25hbCB3ZWJzaXRlLiBJdCBpbmNsdWRlcyBhIGxhcmdlIGNhbGxvdXQgY2FsbGVkIGEganVtYm90cm9uIGFuZCB0aHJlZSBzdXBwb3J0aW5nIHBpZWNlcyBvZiBjb250ZW50LiBVc2UgaXQgYXMgYSBzdGFydGluZyBwb2ludCB0byBjcmVhdGUgc29tZXRoaW5nIG1vcmUgdW5pcXVlLjwvcD5cclxuICAgICAgPHA+PGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1sZ1wiIGhyZWY9XCIjXCIgcm9sZT1cImJ1dHRvblwiPkxlYXJuIG1vcmUgwrs8L2E+PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvbWVcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvSG9tZS5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBGb2JpZGRlbiBmcm9tICcuLzQwMy5qc3gnXHJcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZVBlcnNvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucHJvcHMucGVyc29uQ3JlYXRpb25SZXN1bHRcclxuICAgIGNvbnN0IHsgYWRkUGVyc29uLCBhdXRoVG9rZW4gfSA9IHRoaXMucHJvcHNcclxuICAgIC8vIOWmguaenOW3sueZu+W9le+8jOS9huS4jeaYr+euoeeQhuWRmO+8jOWImeaPkOekuuayoeacieadg+mZkFxyXG4gICAgaWYgKGF1dGhUb2tlbiAmJiAhYXV0aFRva2VuLmlzQWRtaW4pIHtcclxuICAgICAgcmV0dXJuIDxGb2JpZGRlbiAvPlxyXG4gICAgfVxyXG4gICAgLy8g5pyq55m75b2V77yM6Lez6L2s5Yiw55m75b2V6aG1XHJcbiAgICBpZiAoIWF1dGhUb2tlbikge1xyXG4gICAgICByZXR1cm4gPFJlZGlyZWN0IHRvPXt7XHJcbiAgICAgICAgcGF0aG5hbWU6ICcvbG9naW4nLFxyXG4gICAgICAgIHN0YXRlOiB7XHJcbiAgICAgICAgICBmcm9tOiB7IHBhdGhuYW1lOiAnL2NyZWF0ZS1wZXJzb24nIH1cclxuICAgICAgICB9XHJcbiAgICAgIH19IC8+XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Zm9ybT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGVyc29uTmFtZVwiPlBlcnNvbiBOYW1lPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJlZj17KGlucHV0KSA9PiB7IHRoaXMubmFtZSA9IGlucHV0IH19IGlkPVwicGVyc29uTmFtZVwiIHBsYWNlaG9sZGVyPVwiTmFtZVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJlZj17KGlucHV0KSA9PiB7IHRoaXMucGFzc3dvcmQgPSBpbnB1dCB9fSBpZD1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInBlcnNvbkVtYWlsXCI+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJlZj17KGlucHV0KSA9PiB7IHRoaXMuZW1haWwgPSBpbnB1dCB9fSBpZD1cInBlcnNvbkVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvZmZzZXQtc20tMiBjb2wtc20tMTBcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5uYW1lLnZhbHVlXHJcbiAgICAgICAgICAgICAgY29uc3QgZW1haWwgPSB0aGlzLmVtYWlsLnZhbHVlXHJcbiAgICAgICAgICAgICAgY29uc3QgcGFzc3dvcmQgPSB0aGlzLnBhc3N3b3JkLnZhbHVlXHJcbiAgICAgICAgICAgICAgaWYgKCFuYW1lIHx8ICFlbWFpbCB8fCAhcGFzc3dvcmQpIHJldHVyblxyXG4gICAgICAgICAgICAgIGFkZFBlcnNvbih7IG5hbWUsIGVtYWlsLCBwYXNzd29yZCB9KVxyXG4gICAgICAgICAgICAgIHRoaXMubmFtZS52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgdGhpcy5lbWFpbC52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZC52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgIH19PlNpZ24gVXA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHJlc3VsdCAhPT0gdW5kZWZpbmVkICYmIChcclxuICAgICAgICAgICAgcmVzdWx0LmNyZWF0ZWRcclxuICAgICAgICAgICAgPyA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3NcIiByb2xlPVwiYWxlcnRcIj5cclxuICAgICAgICAgICAgICA8c3Ryb25nPldlbGwgZG9uZSE8L3N0cm9uZz4gWW91IHN1Y2Nlc3NmdWxseSBjcmVhdGUgYSBwZXJzb24uXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA6IDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIgcm9sZT1cImFsZXJ0XCI+XHJcbiAgICAgICAgICAgICAgPHN0cm9uZz5FcnJvciE8L3N0cm9uZz4ge3Jlc3VsdC5tZXNzYWdlfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIClcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvY3JlYXRlLXBlcnNvbi5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBGb2JpZGRlbiBmcm9tICcuLzQwMy5qc3gnXHJcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZVBvc3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnByb3BzLnBvc3RDcmVhdGlvblJlc3VsdFxyXG4gICAgY29uc3QgeyBhZGRQb3N0LCBhdXRoVG9rZW4gfSA9IHRoaXMucHJvcHNcclxuICAgIC8vIOWmguaenOW3sueZu+W9le+8jOS9huS4jeaYr+euoeeQhuWRmO+8jOWImeaPkOekuuayoeacieadg+mZkFxyXG4gICAgaWYgKGF1dGhUb2tlbiAmJiAhYXV0aFRva2VuLmlzQWRtaW4pIHtcclxuICAgICAgcmV0dXJuIDxGb2JpZGRlbiAvPlxyXG4gICAgfVxyXG4gICAgLy8g5pyq55m75b2V77yM6Lez6L2s5Yiw55m75b2V6aG1XHJcbiAgICBpZiAoIWF1dGhUb2tlbikge1xyXG4gICAgICByZXR1cm4gPFJlZGlyZWN0IHRvPXt7XHJcbiAgICAgICAgcGF0aG5hbWU6ICcvbG9naW4nLFxyXG4gICAgICAgIHN0YXRlOiB7XHJcbiAgICAgICAgICBmcm9tOiB7IHBhdGhuYW1lOiAnL2NyZWF0ZS1wb3N0JyB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9fSAvPlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGZvcm0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInRpdGxlXCI+VGl0bGU8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy50aXRsZSA9IGlucHV0IH19IGlkPVwidGl0bGVcIiBwbGFjZWhvbGRlcj1cIlRpdGxlXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiY29udGVudFwiPkNvbnRlbnQ8L2xhYmVsPlxyXG4gICAgICAgICAgPHRleHRhcmVhIHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy5jb250ZW50ID0gaW5wdXQgfX0gaWQ9XCJjb250ZW50XCIgcGxhY2Vob2xkZXI9XCJDb250ZW50XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHJlZj17KGlucHV0KSA9PiB7IHRoaXMub3V0d2FyZCA9IGlucHV0IH19IC8+IFB1YmxpYyA8c21hbGwgY2xhc3NOYW1lPVwiZm9ybS10ZXh0IHRleHQtbXV0ZWRcIj5DaGVja2VkIGNhbiBiZSBhY2Nlc3NlZCBieSBvdGhlcnMuPC9zbWFsbD5cclxuICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTBcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bi1sZ1wiIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLnRpdGxlLnZhbHVlXHJcbiAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudC52YWx1ZVxyXG4gICAgICAgICAgICAgIGNvbnN0IG91dHdhcmQgPSB0aGlzLm91dHdhcmQuY2hlY2tlZFxyXG4gICAgICAgICAgICAgIGlmICghdGl0bGUgfHwgIWNvbnRlbnQpIHJldHVyblxyXG4gICAgICAgICAgICAgIGFkZFBvc3QoeyB0aXRsZSwgY29udGVudCwgb3V0d2FyZCB9KVxyXG4gICAgICAgICAgICB9fT5BZGQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVzZXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tbGcgbWwtMlwiIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgIH19PlJlc2V0PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7Lyp7XHJcbiAgICAgICAgICByZXN1bHQgIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgICByZXN1bHQuY3JlYXRlZFxyXG4gICAgICAgICAgICA/IDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtc3VjY2Vzc1wiIHJvbGU9XCJhbGVydFwiPlxyXG4gICAgICAgICAgICAgIDxzdHJvbmc+V2VsbCBkb25lITwvc3Ryb25nPiBZb3Ugc3VjY2Vzc2Z1bGx5IGNyZWF0ZSBhIHBlcnNvbi5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDogPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1kYW5nZXJcIiByb2xlPVwiYWxlcnRcIj5cclxuICAgICAgICAgICAgICA8c3Ryb25nPkVycm9yITwvc3Ryb25nPiB7cmVzdWx0Lm1lc3NhZ2V9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0qL31cclxuICAgICAgPC9mb3JtPlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9jcmVhdGUtcG9zdC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgbG9naW4gPSBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBlbWFpbCA9IHRoaXMuZW1haWwudmFsdWVcclxuICAgIGNvbnN0IHBhc3N3b3JkID0gdGhpcy5wYXNzd29yZC52YWx1ZVxyXG4gICAgY29uc3QgcmVtZW1iZXIgPSB0aGlzLnJlbWVtYmVyLmNoZWNrZWRcclxuICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSByZXR1cm5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucHJvcHMuZG9Mb2dpbih7IGVtYWlsLCBwYXNzd29yZCB9LCByZW1lbWJlcilcclxuICAgIGNvbnNvbGUubG9nKHJlc3VsdClcclxuICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgIHRoaXMuZW1haWwudmFsdWUgPSAnJ1xyXG4gICAgICB0aGlzLnBhc3N3b3JkLnZhbHVlID0gJydcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBhdXRoVG9rZW4sIGxvY2F0aW9uIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCBmcm9tID0gbG9jYXRpb24uc3RhdGUgPyBsb2NhdGlvbi5zdGF0ZS5mcm9tIDogeyBwYXRobmFtZTogJy8nIH1cclxuXHJcbiAgICBpZiAoYXV0aFRva2VuKSB7XHJcbiAgICAgIHJldHVybiA8UmVkaXJlY3QgdG89e2Zyb219IC8+XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Zm9ybT5cclxuICAgICAgICA8aDI+U2lnbiBJbjwvaDI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29sLWZvcm0tbGFiZWwgY29sLWZvcm0tbGFiZWwtbGdcIiBodG1sRm9yPVwicGVyc29uRW1haWxcIj5FbWFpbDo8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtbGdcIiByZWY9eyhpbnB1dCkgPT4geyB0aGlzLmVtYWlsID0gaW5wdXQgfX0gaWQ9XCJwZXJzb25FbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWxcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbC1mb3JtLWxhYmVsIGNvbC1mb3JtLWxhYmVsLWxnXCIgaHRtbEZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ6PC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLWxnXCIgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy5wYXNzd29yZCA9IGlucHV0IH19IGlkPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tY2hlY2tcIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWNoZWNrLWxhYmVsXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBkZWZhdWx0Q2hlY2tlZCByZWY9eyhpbnB1dCkgPT4geyB0aGlzLnJlbWVtYmVyID0gaW5wdXQgfX0gY2xhc3NOYW1lPVwiZm9ybS1jaGVjay1pbnB1dFwiIC8+XHJcbiAgICAgICAgICAgICZuYnNwO1JlbWVtYmVyIG1lIGluIDcgZGF5c1xyXG4gICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBidG4tbGcgYnRuLWJsb2NrXCIgb25DbGljaz17dGhpcy5sb2dpbn0+U2lnbiBJbjwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGF1dGhUb2tlbiA9PT0gZmFsc2UgJiYgPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1kYW5nZXJcIiByb2xlPVwiYWxlcnRcIj5cclxuICAgICAgICAgICAgPHN0cm9uZz5GYWlsZWQhPC9zdHJvbmc+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIClcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbG9naW4uanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3RMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IHsgZmV0Y2hQb3N0TGlzdCwgcG9zdExpc3QgfSA9IHRoaXMucHJvcHNcclxuICAgIGlmICghcG9zdExpc3QgfHwgIXBvc3RMaXN0Lmxlbmd0aCkge1xyXG4gICAgICBmZXRjaFBvc3RMaXN0KClcclxuICAgIH1cclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBwb3N0TGlzdCB9ID0gdGhpcy5wcm9wc1xyXG4gICAgaWYgKCFwb3N0TGlzdCB8fCAhcG9zdExpc3QubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiA8ZGl2PmxvYWRpbmcuLi4uPC9kaXY+XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWw+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcG9zdExpc3QubWFwKHBvc3QgPT4gKFxyXG4gICAgICAgICAgICA8bGkga2V5PXtwb3N0LmlkfT48TGluayB0bz17e1xyXG4gICAgICAgICAgICAgIHBhdGhuYW1lOiAnL3Bvc3QvJyArIHBvc3QuaWQsXHJcbiAgICAgICAgICAgICAgc3RhdGU6IHsgcG9zdCB9XHJcbiAgICAgICAgICAgIH19Pntwb3N0LnRpdGxlfTwvTGluaz48L2xpPlxyXG4gICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICAgIDwvdWw+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9wb3N0LWxpc3QuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnLi80MDQuanN4J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHN0YXRlID0geyBsb2FkZWQ6IGZhbHNlIH1cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IHsgcG9zdCwgZmV0Y2hQb3N0IH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCB7IGlkLCBjb250ZW50IH0gPSBwb3N0IHx8IHt9XHJcbiAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgZmV0Y2hQb3N0KHsgaWQ6ICtpZCB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgIGxvYWRlZDogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcG9zdCwgYXV0aFRva2VuIH0gPSB0aGlzLnByb3BzXHJcbiAgICBjb25zdCB7IHRpdGxlLCBvdXR3YXJkLCBwZXJzb24gfSA9IChwb3N0IHx8IHt9KVxyXG4gICAgY29uc3QgeyBpZCwgbmFtZSwgZW1haWwgfSA9IChwZXJzb24gfHwge30pXHJcbiAgICBsZXQgY29udGVudCA9IHBvc3QuY29udGVudFxyXG4gICAgLy8g5paH56ug5oul5pyJ6ICFICYmIOWKoOi9vei/h+aVsOaNriAmJiDku43nhLbmsqHmnInlhoXlrrlcclxuICAgIGlmIChhdXRoVG9rZW4gJiYgYXV0aFRva2VuLmlkID09PSBpZCAmJiB0aGlzLnN0YXRlLmxvYWRlZCAmJiAhY29udGVudCkge1xyXG4gICAgICByZXR1cm4gPE5vdEZvdW5kIC8+XHJcbiAgICB9XHJcbiAgICAvLyDkuI3mmK/lhazlvIDnmoQgJiYg5LiN5piv5paH56ug5oul5pyJ6ICFXHJcbiAgICBpZiAoIW91dHdhcmQgJiYgIWNvbnRlbnQgJiYgdGhpcy5zdGF0ZS5sb2FkZWQpIHtcclxuICAgICAgY29udGVudCA9ICdjb250ZW50IGlzIG5vdCB2aXNpYWJsZSdcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgyPnt0aXRsZX08L2gyPlxyXG4gICAgICAgIDxoND57bmFtZX0ge2VtYWlsfTwvaDQ+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIHtjb250ZW50IHx8ICdsb2FkaW5nLi4uJ31cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL3Bvc3QuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBSZWRpcmVjdCwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9maWxlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBjb25zdCB7IGlkLCBmZXRjaFByb2ZpbGUsIHByb2ZpbGUgfSA9IHRoaXMucHJvcHNcclxuICAgIGlmICghcHJvZmlsZSkge1xyXG4gICAgICBmZXRjaFByb2ZpbGUoeyBpZCB9KVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGlkLCBhdXRoVG9rZW4sIHByb2ZpbGUsIGRvTG9nb3V0IH0gPSB0aGlzLnByb3BzXHJcbiAgICBpZiAoIXByb2ZpbGUpIHtcclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgcm93XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb2wtMlwiIGh0bWxGb3I9XCJpZFwiPklEPC9sYWJlbD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTBcIiBpZD1cImlkXCI+e3Byb2ZpbGUuaWR9PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCByb3dcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbC0yXCIgaHRtbEZvcj1cIm5hbWVcIj5uYW1lPC9sYWJlbD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTBcIiBpZD1cIm5hbWVcIj57cHJvZmlsZS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgcm93XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb2wtMlwiIGh0bWxGb3I9XCJlbWFpbFwiPmVtYWlsPC9sYWJlbD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtMTBcIiBpZD1cImVtYWlsXCI+e3Byb2ZpbGUuZW1haWx9PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCByb3dcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbC0yXCIgaHRtbEZvcj1cInBvc3RzXCI+cG9zdHM8L2xhYmVsPlxyXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiY29sLTEwXCI+XHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZmlsZS5wb3N0cyAmJiBwcm9maWxlLnBvc3RzLm1hcCgocG9zdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17cG9zdC5pZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmsgdG89eycvcG9zdC8nICsgcG9zdC5pZH0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1saW5rXCI+e3Bvc3QudGl0bGV9PC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYXV0aFRva2VuICYmIGF1dGhUb2tlbi5pZCA9PT0gaWQgJiYgPGJ1dHRvbiBvbkNsaWNrPXtkb0xvZ291dH0gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIGJ0bi1sZyBidG4tYmxvY2tcIj5MT0dPVVQ8L2J1dHRvbj5cclxuICAgICAgICAgIH1cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9wcm9maWxlLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFBlcnNvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHNlYXJjaCA9IChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IGRhdGEgPSB7fVxyXG4gICAgaWYgKCt0aGlzLmlkLnZhbHVlKSB7XHJcbiAgICAgIGRhdGFbJ2lkJ10gPSArdGhpcy5pZC52YWx1ZVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubmFtZS52YWx1ZSkge1xyXG4gICAgICBkYXRhWyduYW1lJ10gPSB0aGlzLm5hbWUudmFsdWVcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmVtYWlsLnZhbHVlKSB7XHJcbiAgICAgIGRhdGFbJ2VtYWlsJ10gPSB0aGlzLmVtYWlsLnZhbHVlXHJcbiAgICB9XHJcbiAgICB0aGlzLnByb3BzLnNlYXJjaFBlcnNvbihkYXRhKVxyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnc2VhcmNoJylcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxmb3JtPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJpZFwiPklEPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJlZj17KGlucHV0KSA9PiB7IHRoaXMuaWQgPSBpbnB1dCB9fSBpZD1cImlkXCIgcGxhY2Vob2xkZXI9XCJJRFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInBlcnNvbk5hbWVcIj5QZXJzb24gTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBkaXNhYmxlZCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiByZWY9eyhpbnB1dCkgPT4geyB0aGlzLm5hbWUgPSBpbnB1dCB9fSBpZD1cInBlcnNvbk5hbWVcIiBwbGFjZWhvbGRlcj1cIk5hbWVcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJlZj17KGlucHV0KSA9PiB7IHRoaXMuZW1haWwgPSBpbnB1dCB9fSBpZD1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvZmZzZXQtc20tMiBjb2wtc20tMTBcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLW91dGxpbmUtc3VjY2VzcyBteS0yIG15LXNtLTBcIiB0eXBlPVwic3VibWl0XCIgb25DbGljaz17dGhpcy5zZWFyY2h9PlNlYXJjaDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZWFyY2hlZFBlcnNvbiAmJiAoXHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJib3JkZXJcIj5cclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNlYXJjaGVkUGVyc29uLm1hcChwID0+IChcclxuICAgICAgICAgICAgICAgICAgPGxpIGtleT17cC5pZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6IHtwLmlkfSBuYW1lOiB7cC5uYW1lfSBlbWFpbDoge3AuZW1haWx9PGJyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgUE9TVDoge3AucG9zdH1cclxuICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgPC9mb3JtPlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9zZWFyY2gtcGVyc29uLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG4vLyBpbXBvcnQgb25seVVwZGF0ZUZvcktleXMgZnJvbSAncmVjb21wb3NlL29ubHlVcGRhdGVGb3JLZXlzJ1xyXG5pbXBvcnQge1xyXG4gIFJvdXRlLFxyXG4gIFN3aXRjaFxyXG59IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXHJcbi8vIGltcG9ydCBDU1NUcmFuc2l0aW9uR3JvdXAgZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cC9DU1NUcmFuc2l0aW9uR3JvdXAnXHJcbi8vIDxDU1NUcmFuc2l0aW9uR3JvdXBcclxuLy8gICB0cmFuc2l0aW9uTmFtZT1cImZhZGVcIlxyXG4vLyAgIHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9ezYwMH1cclxuLy8gICB0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXs2MDB9ID5cclxuLy8gPC9DU1NUcmFuc2l0aW9uR3JvdXA+XHJcblxyXG5pbXBvcnQgcm91dGVzIGZyb20gJy4uL3JvdXRlcydcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2hlYWRlci5qc3gnXHJcbmltcG9ydCBOb3RGb3VuZCBmcm9tICcuLi9jb21wb25lbnRzLzQwNC5qc3gnXHJcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucydcclxuXHJcbi8vIGltcG9ydCAnLi9hcHAuY3NzJ1xyXG5cclxuY29uc3QgQXBwID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8SGVhZGVyIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGctY29udGFpbmVyXCI+XHJcbiAgICAgICAgPFN3aXRjaD5cclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcm91dGVzLm1hcCgocm91dGUsIGkpID0+IChcclxuICAgICAgICAgICAgICA8Um91dGUgZXhhY3Qga2V5PXtpfSBwYXRoPXtyb3V0ZS5wYXRofSByZW5kZXI9eyhyb3V0ZVByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAocm91dGUubWFwU3RhdGVUb1Byb3BzICYmIHJvdXRlLm1hcFN0YXRlVG9Qcm9wcyhyb3V0ZVByb3BzKSkgfHwgKChzdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoIXJvdXRlLnByb3BzKSByZXR1cm4ge31cclxuICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcHMgPSByb3V0ZS5wcm9wcy5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBhY2MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgIFtjdXJyXTogc3RhdGVbY3Vycl1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uQ3JlYXRvcnMgPSAhcm91dGUuYWN0aW9ucyA/IG51bGwgOiByb3V0ZS5hY3Rpb25zLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBhY2MsIHtcclxuICAgICAgICAgICAgICAgICAgICBbY3Vycl06IGFjdGlvbnNbY3Vycl1cclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgICAgICAgICAgY29uc3QgQ29ubmVjdG9yID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIGFjdGlvbkNyZWF0b3JzKShyb3V0ZS5jb21wb25lbnQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPENvbm5lY3RvciAvPlxyXG4gICAgICAgICAgICAgIH19IC8+XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICA8Um91dGUgY29tcG9uZW50PXtOb3RGb3VuZH0gLz5cclxuICAgICAgICA8L1N3aXRjaD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxyXG4vLyBleHBvcnQgZGVmYXVsdCBjb25uZWN0KHN0YXRlID0+ICh7IGF1dGhUb2tlbjogc3RhdGUuYXV0aFRva2VuIH0pKShBcHApXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250YWluZXJzL0FwcC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcclxuLy8gaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcidcclxuaW1wb3J0IHsgTGluaywgTmF2TGluaywgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi4vcm91dGVzLmpzJ1xyXG5cclxuY29uc3QgSGVhZGVyID0gKHsgYXV0aFRva2VuIH0pID0+IChcclxuICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItdG9nZ2xlYWJsZS1tZCBuYXZiYXItaW52ZXJzZSBiZy1wcmltYXJ5XCI+XHJcbiAgICA8dWwgY2xhc3NOYW1lPVwibmF2YmFyLW5hdiBtci1hdXRvXCI+XHJcbiAgICAgIHtcclxuICAgICAgICByb3V0ZXMubWFwKChyb3V0ZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFyb3V0ZS5uYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyDku4XnrqHnkIblkZjlj4rmnKrnmbvlvZXml7bmmL7npLpcclxuICAgICAgICAgIGlmIChhdXRoVG9rZW4gJiYgIWF1dGhUb2tlbi5pc0FkbWluKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyDnmbvlvZXml7bpmpDol49cclxuICAgICAgICAgIGlmIChyb3V0ZS5oaWRlV2hlbkxvZ2luICYmIGF1dGhUb2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCIga2V5PXtyb3V0ZS5uYW1lfT5cclxuICAgICAgICAgICAgICA8TmF2TGluayBleGFjdCBhY3RpdmVDbGFzc05hbWU9XCJhY3RpdmVcIiBjbGFzc05hbWU9XCJuYXYtbGlua1wiIHRvPXtyb3V0ZS5wYXRofT57cm91dGUubmFtZX08L05hdkxpbms+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgPC91bD5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibXktNSBteS1sZy0wXCI+XHJcbiAgICAgIDxMaW5rIHRvPVwiL2NyZWF0ZS1wb3N0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1vdXRsaW5lLXN1Y2Nlc3MgbXItMiBteS0yIG15LXNtLTJcIj4rIFBPU1Q8L0xpbms+XHJcbiAgICAgIHtcclxuICAgICAgICAhYXV0aFRva2VuXHJcbiAgICAgICAgPyA8TGluayB0bz1cIi9sb2dpblwiIGNsYXNzTmFtZT1cImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgbXktMiBteS1zbS0yXCI+TE9HSU48L0xpbms+XHJcbiAgICAgICAgOiA8TGluayB0bz17Jy9wcm9maWxlLycgKyBhdXRoVG9rZW4uaWR9IGNsYXNzTmFtZT1cImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnkgbWwtMiBteS1zbS0yXCI+UFJPRklMRTwvTGluaz5cclxuICAgICAgfVxyXG4gICAgPC9kaXY+XHJcbiAgPC9uYXY+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoY29ubmVjdChzdGF0ZSA9PiAoeyBhdXRoVG9rZW46IHN0YXRlLmF1dGhUb2tlbiB9KSkoSGVhZGVyKSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRhaW5lcnMvaGVhZGVyLmpzeCIsImNvbnN0IElOSVRfU1RBVEUgPSB7XHJcbiAgcGVyc29uQ3JlYXRpb25SZXN1bHQ6IG51bGwsXHJcbiAgc2VhcmNoZWRQZXJzb246IG51bGwsXHJcbiAgYXV0aFRva2VuOiBudWxsLFxyXG4gIHByb2ZpbGU6IHt9LFxyXG4gIHBvc3RzOiB7fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSA9IElOSVRfU1RBVEUsIGFjdGlvbikgPT4ge1xyXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgIGNhc2UgJ0NSRUFURV9QRVJTT04nOlxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICBwZXJzb25DcmVhdGlvblJlc3VsdDogYWN0aW9uLnJlc3VsdFxyXG4gICAgICB9KVxyXG4gICAgY2FzZSAnU0VBUkNIX1BFUlNPTic6XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgIHNlYXJjaGVkUGVyc29uOiBhY3Rpb24ucGVvcGxlXHJcbiAgICAgIH0pXHJcbiAgICBjYXNlICdTRVRfQVVUSF9UT0tFTic6XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgIGF1dGhUb2tlbjogYWN0aW9uLmF1dGhUb2tlblxyXG4gICAgICB9KVxyXG4gICAgY2FzZSAnRkVUQ0hfUFJPRklMRSc6XHJcbiAgICAgIGNvbnN0IHByb2ZpbGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5wcm9maWxlLCB7XHJcbiAgICAgICAgW2FjdGlvbi5wZXJzb24uaWRdOiBhY3Rpb24ucGVyc29uXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBwcm9maWxlIH0pXHJcbiAgICBjYXNlICdGRVRDSF9QT1NUJzpcclxuICAgICAgY29uc3QgcG9zdHMgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5wb3N0cywge1xyXG4gICAgICAgIFthY3Rpb24ucG9zdC5pZF06IGFjdGlvbi5wb3N0XHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBwb3N0cyB9KVxyXG4gICAgY2FzZSAnRkVUQ0hfUE9TVF9MSVNUJzpcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgcG9zdExpc3Q6IGFjdGlvbi5wb3N0c1xyXG4gICAgICB9KVxyXG4gICAgY2FzZSAnQUREX1BPU1QnOlxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICBwb3N0Q3JlYXRpb25SZXN1bHQ6IGFjdGlvbi5yZXN1bHRcclxuICAgICAgfSlcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVkdWNlcnMuanMiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnXHJcbmltcG9ydCB7IGNvbXBvc2VXaXRoRGV2VG9vbHMgfSBmcm9tICdyZWR1eC1kZXZ0b29scy1leHRlbnNpb24nXHJcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4vcmVkdWNlcnMnXHJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGluaXRpYWxTdGF0ZSA9IHt9KSB7XHJcbiAgcmV0dXJuIGNyZWF0ZVN0b3JlKFxyXG4gICAgcmVkdWNlcixcclxuICAgIGluaXRpYWxTdGF0ZSxcclxuICAgIGNvbXBvc2VXaXRoRGV2VG9vbHMoXHJcbiAgICAgIGFwcGx5TWlkZGxld2FyZSh0aHVuaylcclxuICAgIClcclxuICApXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0b3JlLmpzIiwiaW1wb3J0IHsgZ3JhcGhxbCB9IGZyb20gJ2dyYXBocWwnXHJcbmltcG9ydCBzY2hlbWEgZnJvbSAnLi4vLi4vc2VydmVyL3NjaGVtYSdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBncmFwaFFMSGVscGVyKHF1ZXJ5LCB2YXJpYWJsZXMsIGNvbnRleHQgPSB7fSkge1xyXG4gIHJldHVybiBncmFwaHFsKHNjaGVtYSwgcXVlcnksIHt9LCBjb250ZXh0LCB2YXJpYWJsZXMpXHJcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQuZXJyb3JzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJvcnNbMF0ubWVzc2FnZSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0LmRhdGFcclxuICAgIH0pXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL3NlcnZlci1ncmFwaHFsLWhlbHBlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmx1ZWJpcmRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJibHVlYmlyZFwiXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmYWtlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZha2VyXCJcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImdyYXBocWxcIlxuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC1zZXJ2ZXIta29hXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZ3JhcGhxbC1zZXJ2ZXIta29hXCJcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdyYXBocWwtdG9vbHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJncmFwaHFsLXRvb2xzXCJcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImpzb253ZWJ0b2tlblwiXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqd3QtZGVjb2RlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiand0LWRlY29kZVwiXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWRldnRvb2xzLWV4dGVuc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LWRldnRvb2xzLWV4dGVuc2lvblwiXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4LXRodW5rXCJcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNlcXVlbGl6ZVwiXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9