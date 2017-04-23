const INIT_STATE = {
  personCreationResult: null,
  searchedPerson: null,
  authToken: null
}
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'ADD_PERSON':
      return Object.assign({}, state, {
        personCreationResult: action.result
      })
    case 'SEARCH_PERSON':
      return Object.assign({}, state, {
        searchedPerson: action.person
      })
    case 'LOGIN':
      return Object.assign({}, state, {
        authToken: action.authToken
      })
    default:
      return state
  }
}
