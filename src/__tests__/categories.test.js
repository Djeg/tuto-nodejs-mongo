import { build } from '../app.js'
import { authenticateUser } from '../utils/testUtil'

describe('A category', () => {
  let app

  beforeAll(async () => {
    app = await build()
  })

  afterAll(async () => {
    app.db.topology.close()
    await app.close()
  })

  it('can create a category using the POST /categories', async () => {
    const token = await authenticateUser({
      email: 'test.category1@mail.com',
      password: 'test',
      app,
    })

    const response = await app.inject({
      method: 'POST',
      url: '/categories',
      payload: {
        titre: 'Test',
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toBe(201)

    const { titre } = await response.json()

    expect(titre).toBe('Test')
  })

  it('can lists categories using the GET /categories', async () => {
    const token = await authenticateUser({
      email: 'test.category.list@mail.com',
      password: 'test',
      app,
    })

    const response = await app.inject({
      method: 'GET',
      url: '/categories',
      headers: { authorization: `Bearer ${token}` },
    })

    expect(response.statusCode).toBe(200)

    const data = await response.json()

    expect(data.length).not.toBe(0)
  })

  it('can modify a category using the PATCH /categories', async () => {
    const token = await authenticateUser({
      email: 'test.category.modify@mail.com',
      password: 'test',
      app,
    })

    const newCategoryResponse = await app.inject({
      method: 'POST',
      url: '/categories',
      payload: {
        titre: 'Test 2',
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    const { _id } = await newCategoryResponse.json()

    const response = await app.inject({
      method: 'PATCH',
      url: `/categories/${_id}`,
      headers: { authorization: `Bearer ${token}` },
      payload: { titre: 'Nouveau Titre' },
    })

    expect(response.statusCode).toBe(200)

    const { titre } = await response.json()

    expect(titre).toBe('Nouveau Titre')
  })
})
