import { graphql } from 'graphql'
import schema from '../../server/schema'

export const graphQLHelper = (query, variables) => {
  return graphql(schema, query, variables)
    .then((result) => {
      if (result.errors) {
        throw new Error(result.errors[0].message)
      }
      return result.data
    })
}
