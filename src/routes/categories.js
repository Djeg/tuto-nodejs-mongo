module.exports = (app, opts, done) => {
  const { db } = app

  app.get('/categories', async () => {
    const categories = await db.collection('categories').find().toArray()

    return categories
  })

  app.post(
    '/categories',
    {
      schema: {
        body: { $ref: 'category' },
      },
    },
    async (request, reply) => {
      const { insertedId } = await db
        .collection('categories')
        .insertOne(request.body)

      const category = await db.collection('categories').findOne({
        _id: insertedId,
      })

      reply.code(201)

      return category
    }
  )

  done()
}
