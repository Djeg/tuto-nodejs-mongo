import { build } from '../app.js'
import { authenticateUser } from '../utils/testUtil.js'

describe('An article', () => {
  let app

  beforeAll(async () => {
    app = await build(false)
  })

  afterAll(async () => {
    app.db.topology.close()
    await app.close()
  })

  it('creates an article using POST /articles', async () => {
    const token = await authenticateUser({
      email: 'test.article.create@mail.com',
      password: 'test',
      app,
    })

    const response = await app.inject({
      method: 'POST',
      url: '/articles',
      payload: {
        title: 'article test',
        description: 'Test',
        images: ['img.jpg'],
        author: {
          firstname: 'test author',
          lastname: 'test author',
        },
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toBe(201)

    const { title } = await response.json()

    expect(title).toBe('article test')
  })

  it('can list articles using GET /articles', async () => {
    const token = await authenticateUser({
      email: 'test.article.list@mail.com',
      password: 'test',
      app,
    })

    const response = await app.inject({
      method: 'GET',
      url: '/articles',
      headers: { authorization: `Bearer ${token}` },
    })

    expect(response.statusCode).toBe(200)

    const data = await response.json()

    expect(data.length).not.toBe(0)
  })

  it('can modify a category using the PATCH /categories', async () => {
    const token = await authenticateUser({
      email: 'test.article.modify@mail.com',
      password: 'test',
      app,
    })

    const newArticleResponse = await app.inject({
      method: 'POST',
      url: '/articles',
      payload: {
        title: 'article test',
        description: 'Test',
        images: ['img.jpg'],
        author: {
          firstname: 'test author',
          lastname: 'test author',
        },
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    const { _id } = await newArticleResponse.json()

    const response = await app.inject({
      method: 'PATCH',
      url: `/articles/${_id}`,
      headers: { authorization: `Bearer ${token}` },
      payload: { title: "Nouveau Titre de l'article" },
    })

    expect(response.statusCode).toBe(200)

    const { title } = await response.json()

    expect(title).toBe("Nouveau Titre de l'article")
  })

  it('can delete a category using the DELETE /categories/:id', async () => {
    const token = await authenticateUser({
      email: 'test.article.delete@mail.com',
      password: 'test',
      app,
    })

    const newArticleResponse = await app.inject({
      method: 'POST',
      url: '/articles',
      payload: {
        title: 'article test',
        description: 'Test',
        images: ['img.jpg'],
        author: {
          firstname: 'test author',
          lastname: 'test author',
        },
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    const { _id } = await newArticleResponse.json()

    const response = await app.inject({
      method: 'DELETE',
      url: `/articles/${_id}`,
      headers: { authorization: `Bearer ${token}` },
    })

    expect(response.statusCode).toBe(204)
  })
})
