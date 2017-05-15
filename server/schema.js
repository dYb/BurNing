const { makeExecutableSchema, addErrorLoggingToSchema } = require('graphql-tools')

const { DB } = require('./db')
// const { resolveForAdmin } = require('./auth')

const schema = `
  # This is a person
  type Person {
    id: Int!
    # 显示名称
    name: String!
    # 邮箱
    email: String!
    # 是否是管理员
    isAdmin: Boolean
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
    # 是否公开
    outward: Boolean
    # 创建者
    person: Person
    # 允许查看的人
    receivers: [Int]
  }

  # post creation message
  type PostCreation {
    message: String
    id: Int
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

    # Add a post
    addPost (title: String!, content: String!, outward: Boolean): PostCreation
  }
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolveFunctions = {
  Person: {
    posts(person, args, context = {}) {
      // return person.getPosts()
      const where = (context.authToken && person.id === context.authToken.id) ? null : { outward: true }
      return person.getPosts({ where }).then((data) => {
        return data
      })
    }
  },
  Post: {
    person(post) {
      return post.getPerson()
    },
    content(post, args, context = {}) {
      const userId = context.authToken ? context.authToken.id : null
      if (!post.outward && (userId !== post.personId && post.receivers.indexOf(userId) < 0)) {
        return null
      }
      return post.content
    }
  },
  Query: {
    async people(_, { id, email }) {
      let args = {}
      if (id || id === 0) args.id = id
      if (email) args.email = email
      const people = await DB.model('person').findAll({
        attributes: { exclude: ['password'] },
        where: args
      })
      return people
    },
    posts(_, { id, title }, context = {}) {
      let args = {}
      if (id || id === 0) {
        args = { id }
      } else if (title) {
        args = { title }
      } else if (context.authToken) {
        Object.assign(args, {
          $or: [
            { personId: context.authToken.id },
            { receivers: { $contained: [context.authToken.id] } },
            { outward: true }
          ]
        })
      } else {
        Object.assign(args, { outward: true })
      }
      return DB.model('post').findAll({ where: args })
    }
  },
  Mutation: {
    addPerson(_, args) {
      return DB.model('person').create(args)
        .then(() => ({ created: true }))
        .catch((err) => {
          return {
            message: err.message,
            created: false
          }
        })
    },
    addPost(_, args, context = {}) {
      if (!context.authToken) {
        return new Error('Unauthorized')
      }
      return DB.model('post')
        .create(Object.assign({}, args, {
          personId: context.authToken.id
        }))
    }
  }
}
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolveFunctions
})
addErrorLoggingToSchema(executableSchema, { log: e => console.error(e.stack) })
module.exports = executableSchema
