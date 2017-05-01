import axios from 'axios'

export const graphQLHelper = (query, variables, authToken) => {
  return axios({
    method: 'post',
    url: '/graphql',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken ? authToken.token : ''}`
    },
    data: {
      query,
      variables
    }
  })
  .then(result => result.data)
  .then((result) => {
    if (result.errors) {
      throw new Error(result.errors[0].message)
    }
    return result.data
  })
}
