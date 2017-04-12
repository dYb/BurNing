const Sequelize = require('sequelize')
const { times } = require('lodash')
const Faker = require('faker')

const { STRING, DATE } = Sequelize

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
  date: {
    type: DATE
  }
})

Person.hasMany(Post)
Post.belongsTo(Person)

Conn.sync({ force: true }).then(() => {
  times(10, () => Person.create({
    name: Faker.name.firstName(),
    email: Faker.internet.email()
  }).then((person) => {
    return person.createPost({
      title: `Sample title by ${person.name}`,
      content: `This is a sample article`
    })
  }))
})

module.exports = Conn
