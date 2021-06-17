import mongo from 'mongodb'

export default (app, opts, done) => {
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

  app.patch(
    '/categories/:id',
    { schema: { body: { $ref: 'category_update' } } },
    async (request, reply) => {
      await request.jwtVerify()

      const id = request.params.id

      const result = await db
        .collection('categories')
        .updateOne({ _id: mongo.ObjectID(id) }, { $set: request.body })

      if (result.modifiedCount < 1) {
        reply.code(404)
        return 'Not found'
      }

      const category = await db.collection('categories').findOne({
        _id: mongo.ObjectId(id),
      })

      return category
    }
  )

  app.delete('/categories/:id', async (request, reply) => {
    await request.jwtVerify()

    const result = await db.collection('categories').deleteOne({
      _id: mongo.ObjectId(request.params.id),
    })

    if (result.deletedCount < 1) {
      reply.send(404)
      return 'Not Found'
    }

    reply.code(204)

    return null
  })

  done()
}
