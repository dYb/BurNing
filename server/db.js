const Sequelize = require('sequelize')
const { times } = require('lodash')
const Faker = require('faker')

const { ARRAY, INTEGER, STRING, BOOLEAN } = Sequelize

// const Conn = new Sequelize('postgres://uqgfpeqv:fQ2UfMhPUWNefdqBo6ML2v7JTIKcy9hx@qdjjtnkv.db.elephantsql.com:5432/uqgfpeqv')
const Conn = new Sequelize('postgres', 'postgres', 'ybduan', { dialect: 'postgres' })

const Person = Conn.define('person', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: STRING,
    allowNull: false
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false
  }
})

const Post = Conn.define('post', {
  title: {
    type: STRING,
    allowNull: false
  },
  content: {
    type: STRING,
    allowNull: false
  },
  outward: {
    type: BOOLEAN,
    defaultValue: false
  },
  receivers: {
    type: ARRAY(INTEGER),
    defaultValue: []
  }
})

Person.hasMany(Post)
Post.belongsTo(Person)

module.exports = {
  DB: Conn,
  Person,
  Post
}
