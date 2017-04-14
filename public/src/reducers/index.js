
export default (state = { active: 0 }, action) => {
  switch (action.type) {
    case 'CHANGE_TAB':
      return Object.assign({}, state, {
        active: action.active
      })
    default: 
      return state
  }
}