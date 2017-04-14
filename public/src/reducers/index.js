const INIT_STATE = {
  active: 0,
  newPerson: null,
  searchedPerson: null
}
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_TAB':
      return Object.assign({}, state, {
        active: action.active
      })
    case 'ADD_PERSON':
      return Object.assign({}, state, {
        newPerson: action.person
      })
    case 'SEARCH_PERSON':
      return Object.assign({}, state, {
        searchedPerson: action.person
      })
    default:
      return state
  }
}
