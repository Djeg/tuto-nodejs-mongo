export default (app, opts, done) => {
  const { db } = app

  app.get('/categories/:id', async (request) => {
    // ici nous le paramètre de route "id" qui a était spécifié
    // dans l'url de notre requête.
    console.log(request.params.id)

    // Pour mettre à jour un document depuis mongo:
    // await app.collection('categories').updateOne(
    //   { _id: '2KHFKSKZKHF76' },
    //   { $set: { titre: 'Nouveau titre' } }
    // )

    return 'ok'
  })

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
