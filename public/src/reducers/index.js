
export default (state = { active: 0, newPerson: null }, action) => {
  switch (action.type) {
    case 'CHANGE_TAB':
      return Object.assign({}, state, {
        active: action.active
      })
    case 'ADD_PERSON': 
      return Object.assign({}, state, {
        newPerson: action.person
      })
    default: 
      return state
  }
}