const { graphql } = require('graphql')
const { times } = require('lodash')
const schema = require('../server/schema')
const { DB, Person } = require('../server/db')

describe('Schema', () => {
  beforeAll(() => {
    return DB.sync({ force: true }).then(() => {
      return Promise.all(times(3, (i) => {
        return Person.create({
          name: 'name ' + i,
          email: 'dyb' + i + '@gmail.com',
          password: '123456',
          isAdmin: i === 0
        }).then((person) => {
          return person.createPost({
            title: `Sample title by ${person.name}`,
            content: `This is a sample article`,
            outward: i % 2 === 1,
            receivers: [2]
          })
        })
      }))
    })
  })
  it('should get specific user when id exists', async () => {
    const query = `
      query Q($id: Int, $email: String) {
        people(id: $id, email: $email) {
          id
        }
      }
    `
    const result = await graphql(schema, query, {}, {}, { id: 1 })
    expect(result.data).toBeTruthy()
    expect(result.data.people.length).toBe(1)
    // expect(result.data).toMatchSnapshot()
  })
  it('should get specific user when email exists', async () => {
    const query = `
      query Q($id: Int, $email: String) {
        people(id: $id, email: $email) {
          id
        }
      }
    `
    const result = await graphql(schema, query, {}, {}, { email: 'dyb0@gmail.com' })
    expect(result.data).toBeTruthy()
    expect(result.data.people.length).toBe(1)
    // expect(result.data).toMatchSnapshot()
  })
  it('should get empty posts when user is not logged in`', async () => {
    const query = `
      query Q {
        people {
          id
          posts {
            id
            content
          }
        }
      }
    `
    const result = await graphql(schema, query)
    expect(result.data).toBeTruthy()
    expect(result.data.people.length).toBe(3)
    expect(result.data.people.filter(person => person.posts.length).length).toBe(1)
    // expect(result.data).toMatchSnapshot()
  })
  it('should get content of post when outward is true', async () => {
    const query = `
      query Q {
        posts(id: 2) {
          content
        }
      }
    `
    const result = await graphql(schema, query)
    expect(result.data).toBeTruthy()
    expect(result.data.posts.length).toBe(1)
    expect(result.data.posts[0].content).toBeTruthy()
  })
  it('should not get content of post when user is not logged in', async () => {
    const query = `
      query Q($id: Int, $title: String) {
        posts(id: $id, title: $title) {
          content
        }
      }
    `
    const result = await graphql(schema, query, {}, {}, { id: 1 })
    expect(result.data).toBeTruthy()
    expect(result.data.posts[0].content).toBeFalsy()
  })
  it('should get content of post when user is logged in', async () => {
    const query = `
      query Q($id: Int, $title: String) {
        posts(id: $id, title: $title) {
          content
        }
      }
    `
    const result = await graphql(schema, query, {}, { user: { id: 1 } }, { id: 1 })
    expect(result.data).toBeTruthy()
    expect(result.data.posts.length).toBe(1)
    expect(result.data.posts[0].content).toBeTruthy()
  })
  it('should get all posts which are outward or belonged to logged user or recievers contain logged user', async () => {
    const query = `
      query Q {
        posts {
          id
        }
      }
    `
    const result = await graphql(schema, query, {}, { user: { id: 2 } })
    expect(result.data).toBeTruthy()
    expect(result.data.posts.length).toBe(3)
  })
  it('should get specific post when id exists', async () => {
    const query = `
      query Q($id: Int, $title: String) {
        posts(id: $id, title: $title) {
          id
        }
      }
    `
    const result = await graphql(schema, query, {}, {}, { id: 1 })
    expect(result.data).toBeTruthy()
    expect(result.data.posts.length).toBe(1)
    // expect(result.data).toMatchSnapshot()
  })
  it('should get specific post when title exists', async () => {
    const query = `
      query Q($id: Int, $title: String) {
        posts(id: $id, title: $title) {
          id
        }
      }
    `
    const result = await graphql(schema, query, {}, {}, { title: 'Sample title by name 0' })
    expect(result.data).toBeTruthy()
    expect(result.data.posts.length).toBe(1)
    // expect(result.data).toMatchSnapshot()
  })
  it('should not be able to add a post when user is not logged in', async () => {
    const query = `
      mutation M {
        addPost(title: "title", content: "content") {
          id
        }
      }
    `
    const result = await graphql(schema, query)
    expect(result.data).toBeTruthy()
    expect(result.errors[0].message).toBe('Unauthorized')
    expect(result.data.addPost).toBeFalsy()
  })
  it('should add a post when user is logged in', async () => {
    const query = `
      mutation M {
        addPost(title: "title", content: "content") {
          id
        }
      }
    `
    const result = await graphql(schema, query, {}, { user: { id: 1 } })
    expect(result.data).toBeTruthy()
    expect(result.data.addPost.id).toBeTruthy()
  })
  it('should not able to add a person when person`s email is repeated', async () => {
    const query = `
      mutation M {
        addPerson(name: "hehe", email: "dyb0@gmail.com", password: "123456") {
          message
          created
        }
      }
    `
    const result = await graphql(schema, query)
    expect(result.data).toBeTruthy()
    expect(result.data.addPerson.created).toBeFalsy()
  })
  it('should not able to add a person when person`s name is repeated', async () => {
    const query = `
      mutation M {
        addPerson(name: "name 0", email: "dyb3@gmail.com", password: "123456") {
          message
          created
        }
      }
    `
    const result = await graphql(schema, query)
    expect(result.data).toBeTruthy()
    expect(result.data.addPerson.created).toBeFalsy()
  })
  it('should add a person', async () => {
    const query = `
      mutation M {
        addPerson(name: "name 11", email: "dyb11@gmail.com", password: "123456") {
          message
          created
        }
      }
    `
    const result = await graphql(schema, query)
    expect(result.data).toBeTruthy()
    expect(result.data.addPerson.created).toBeTruthy()
  })
  afterAll(() => {
    return DB.sync({ force: true })
  })
})
