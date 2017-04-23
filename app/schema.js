const { makeExecutableSchema, addErrorLoggingToSchema } = require('graphql-tools')

const Db = require('./db')
// const { resolveForAdmin } = require('./auth')

const schema = `
  # This is a person
  type Person {
    id: Int
    # 显示名称
    name: String
    # 邮箱
    email: String
    password: String
    # 是否是管理员
    isAdmin: Boolean
    # 属下
    subordinates: [Person]
    # 上司
    boss: Person
    # 所发表的文章
    posts: [Post]
  }

  # Person creation message
  type PersonCreation {
    message: String
    created: Boolean!
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


  # Functions to create stuff
  type Mutation {
    # Add a person
    addPerson (name: String!, email: String!, password: String!): PersonCreation
  }
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolveFunctions = {
  Person: {
    posts(person, args, context) {
      return (context.user && person.email === context.user.email)
        ? person.getPosts()
        : null
    },
    password() {
      return null
    }
  },
  Post: {
    person(post) {
      return post.getPerson()
    }
  },
  Query: {
    async people(_, args) {
      const people = await Db.model('person').findAll({ where: args })
      return people
    },
    posts(_, args) {
      return Db.model('post').findAll({ where: args })
    }
  },
  Mutation: {
    addPerson(_, args, context) {
      if (!context.user || !context.user.isAdmin) {
        throw new Error('Unauthorized')
      }
      return Db.model('person')
        .findOne({where: { name: args.name }})
        .then((person) => {
          if (person) {
            throw new Error('User exists')
          }
          return Db.model('person').create(args)
        })
        .then(() => ({ created: true }))
        .catch((err) => {
          return {
            message: err.message,
            created: false
          }
        })
    }
  }
}
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolveFunctions
})
addErrorLoggingToSchema(executableSchema, { log: e => console.error(e.stack) })
module.exports = executableSchema
