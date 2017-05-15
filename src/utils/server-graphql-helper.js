import { graphql } from 'graphql'
import schema from '../../server/schema'

export function graphQLHelper(query, variables, context = {}) {
  return graphql(schema, query, {}, context, variables)
    .then((result) => {
      if (result.errors) {
        throw new Error(result.errors[0].message)
      }
      return result.data
    })
}
