const { build } = require('./../app')

describe('A user', () => {
  it('can be created with POST /users', async () => {
    const app = await build()

    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        email: 'test@mail.com',
        password: 'test',
        firstname: 'test',
        lastname: 'test',
      },
    })

    expect(response.statusCode).toBe(201)

    const data = await response.json()

    expect(data).toMatchObject({
      _id: expect.any(String),
      email: 'test@mail.com',
      password: expect.any(String),
      firstname: 'test',
      lastname: 'test',
    })
  })
})
