const { graphQLHelper } = process.env.BROWSER ? require('utils/client-graphql-helper') : require('utils/server-graphql-helper')

const ADD = 'burning/post/ADD'
const LOAD = 'burning/post/LOAD'
const LIST = 'burning/post/LIST'
const DELETE = 'burning/post/DELETE'
const SEARCH = 'burning/post/SEARCH'

const initState = {
  list: [],
  posts: {}
}
export default (state = initState, action = {}) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        addResult: action.result
      }
    case LOAD:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.result.id]: action.result
        }
      }
    case LIST:
      return {
        ...state,
        list: action.result
      }
    case DELETE:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.result.id]: null
        }
      }
    case SEARCH:
      return {
        ...state,
        searchResult: action.result
      }
    default:
      return state
  }
}

export function addPost(post) {
  return (dispatch, getState) => {
    const mutation = `
      mutation AddPost($title: String!, $content: String!, $outward: Boolean) {
        addPost(title: $title, content: $content, outward: $outward) {
          id
          message
        }
      }
    `
    return graphQLHelper(mutation, post)
      .then(data => data.addPost)
      .then(result => {
        dispatch({ type: ADD, result })
        return result
      })
  }
}

export function fetchPost({ id, title }) {
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
    `
    const { authToken } = getState()
    return graphQLHelper(query, { id, title }, { authToken })
      .then(result => result.posts)
      .then(posts => {
        const post = (posts && posts[0]) ? posts[0] : null
        dispatch({
          type: LOAD,
          result: post
        })
        return post
      })
  }
}
export function fetchPostList() {
  return (dispatch, getState) => {
    const query = `
      query {
        posts {
          id
          title
        }
      }
    `
    const { authToken } = getState()
    return graphQLHelper(query, null, { authToken })
      .then(result => result.posts)
      .then(posts => {
        dispatch({
          type: LIST,
          result: posts
        })
        return posts
      })
  }
}
