const axios = require('axios')
require('../app/server.js')

describe('Schema', () => {
  test('Query people', async () => {
    await axios.post('/graphql', {
      query: `
        query PeopleInfo() {
          people() {
            id
            name
            email
          }
        }
      `
    }).then((result) => {
      expect(result.data.people).length.toBe(10)
    })
  })
})
