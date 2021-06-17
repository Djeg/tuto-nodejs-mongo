const { build } = require('./../app')

describe('A user', () => {
  let app

  beforeAll(async () => {
    app = await build(false)
  })

  afterAll(async () => {
    app.db.topology.close()
    await app.close()
  })

  it('can be created with POST /users', async () => {
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

  it('can be authenticated with POST /authenticate', async () => {
    await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        email: 'test2@mail.com',
        password: 'test2',
        firstname: 'test2',
        lastname: 'test2',
      },
    })

    const response = await app.inject({
      method: 'POST',
      url: '/authenticate',
      payload: {
        email: 'test2@mail.com',
        password: 'test2',
      },
    })

    const { token } = await response.json()

    expect(token).toBeDefined()
  })

  it('lists users using GET /users', async () => {
    await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        email: 'test3@mail.com',
        password: 'test3',
        firstname: 'test3',
        lastname: 'test3',
      },
    })

    const tokenResponse = await app.inject({
      method: 'POST',
      url: '/authenticate',
      payload: {
        email: 'test3@mail.com',
        password: 'test3',
      },
    })

    const { token } = await tokenResponse.json()

    const response = await app.inject({
      method: 'GET',
      url: '/users',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    const users = await response.json()

    expect(response.statusCode).toBe(200)

    expect(users.length).not.toBe(0)
    expect(Object.keys(users[0])).toContain('email')
  })
})
