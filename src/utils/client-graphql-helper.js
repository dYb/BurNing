import axios from 'axios'

export function graphQLHelper(query, variables) {
  return axios({
    method: 'post',
    url: '/graphql',
    headers: {
      'Content-Type': 'application/json'
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
