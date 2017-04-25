const Sequelize = require('sequelize')
const { times } = require('lodash')
const Faker = require('faker')

const { STRING, BOOLEAN } = Sequelize

// const Conn = new Sequelize('postgres://uqgfpeqv:fQ2UfMhPUWNefdqBo6ML2v7JTIKcy9hx@qdjjtnkv.db.elephantsql.com:5432/uqgfpeqv')
const Conn = new Sequelize('postgres', 'postgres', 'ybduan', { dialect: 'postgres' })

const Person = Conn.define('person', {
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
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
  }
})

Person.hasMany(Post)
Post.belongsTo(Person)

Conn.sync({ force: true }).then(() => {
  Person.create({
    name: 'ybduan',
    email: 'duanyubin2012@gmail.com',
    password: '123456',
    isAdmin: true
  }).then((person) => {
    return person.createPost({
      title: `Sample title by ${person.name}`,
      content: `This is a sample article`,
      outward: false
    })
  })
  times(10, (i) => {
    Person.create({
      name: 'name ' + i,
      email: 'dyb' + i + '@gmail.com',
      password: '123456',
      isAdmin: false
    }).then((person) => {
      return person.createPost({
        title: `Sample title by ${person.name}`,
        content: `This is a sample article`,
        outward: i % 2
      })
    })
  })
})

module.exports = Conn
