import { graphQLHelper } from '../utils'

const SEARCH_PERSON = 'SEARCH_PERSON'
export function searchPerson({ id, email }) {
  return (dispatch, getState) => {
    const { authToken } = getState()
    _searchPerson({ id, email, authToken })
      .then(people => dispatch({ type: SEARCH_PERSON, people }))
  }
}
export default (state = { searchedPerson: null }, action) => {
  switch (action.type) {
    case SEARCH_PERSON:
      return Object.assign({}, state, {
        searchedPerson: action.people
      })
    default:
      return state
  }
}
function _searchPerson({ id, email, authToken }) {
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
  `
  return graphQLHelper(query, { id, email }, authToken)
    .then((data) => {
      return data
    })
    .then(data => data.people)
}
