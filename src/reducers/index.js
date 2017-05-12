const INIT_STATE = {
  personCreationResult: null,
  searchedPerson: null,
  authToken: null,
  profile: {},
  posts: {}
}
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'ADD_PERSON':
      return Object.assign({}, state, {
        personCreationResult: action.result
      })
    case 'SEARCH_PERSON':
      return Object.assign({}, state, {
        searchedPerson: action.people
      })
    case 'SET_AUTH_TOKEN':
      return Object.assign({}, state, {
        authToken: action.authToken
      })
    case 'FETCH_PROFILE':
      const profile = Object.assign({}, state.profile, {
        [action.person.id]: action.person
      })
      return Object.assign({}, state, { profile })
    case 'FETCH_POST':
      const posts = Object.assign({}, state.posts, {
        [action.post.id]: action.post
      })
      return Object.assign({}, state, { posts })
    case 'FETCH_POST_LIST':
      return Object.assign({}, state, {
        postList: action.posts
      })
    case 'ADD_POST':
      return Object.assign({}, state, {
        postCreationResult: action.result
      })
    default:
      return state
  }
}
