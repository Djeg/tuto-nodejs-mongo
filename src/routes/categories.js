module.exports = (app, opts, done) => {
  app.get('/categories', async (request) => {
    const categories = await request.db
      .collection('categories')
      .find()
      .toArray()

    return categories
  })

  app.post(
    '/categories',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            titre: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
          },
          required: ['titre'],
        },
      },
    },
    async (request, reply) => {
      const { insertedId } = await request.db
        .collection('categories')
        .insertOne(request.body)

      const category = await request.db.collection('categories').findOne({
        _id: insertedId,
      })

      reply.code(201)

      return category
    }
  )

  done()
}
