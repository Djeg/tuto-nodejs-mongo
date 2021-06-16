module.exports = (app, opts, done) => {
  const { db } = app

  app.get('/categories', async (request) => {
    await request.jwtVerify()

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
      await request.jwtVerify()

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
