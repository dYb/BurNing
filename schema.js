const { makeExecutableSchema } = require('graphql-tools')

const Db = require('./db')

const schema = `
  # This is a person
  type Person {
    id: Int
    name: String
    email: String
    posts: [Post]
  }

  # This is a post
  type Post {
    id: Int
    title: String
    content: String
    person: Person
  }

  # This is root query
  type Query {
    people(id: Int, email: String): [Person]
    posts(id: Int, title: String): [Post]
  }
  schema {
    query: Query
  }
`

const resolveFunctions = {
  Person: {
    posts(person) {
      return person.getPosts()
    }
  },
  Post: {
    person(post) {
      return post.getPerson()
    }
  },
  Query: {
    people(_, args) {
      return Db.model('person').findAll({ where: args })
    },
    posts(_, args) {
      return Db.model('post').findAll({ where: args })
    }
  }
}

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolveFunctions
})
