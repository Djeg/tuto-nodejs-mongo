import mongo from 'mongodb'

export default (app, opts, done) => {
  const { db } = app

  app.get('/articles', async (request) => {
    await request.jwtVerify()
    // Nous récupérons la totalité des articles, que
    // nous formattons en un tableaux javascript
    const articles = await db.collection('articles').find().toArray()

    return articles
  })

  app.post(
    '/articles',
    {
      schema: {
        body: {
          $ref: 'article',
        },
      },
    },
    async (request, reply) => {
      await request.jwtVerify()
      // On récupére l'article envoyé depuis la requête
      const article = request.body
      // On récupére l'id du document enregistré en base
      // de données
      const { insertedId } = await db.collection('articles').insertOne(article)

      // On récupére l'article enregistré depuis la base de
      // données
      const insertedArticle = await db
        .collection('articles')
        .findOne({ _id: insertedId })

      // Nous ajoutons le code 201 Created afin de réspécter
      // le protocol HTTP
      reply.code(201)

      return insertedArticle
    }
  )

  app.patch(
    '/articles/:id',
    { schema: { body: { $ref: 'article_update' } } },
    async (request, reply) => {
      await request.jwtVerify()

      const id = request.params.id

      const result = await db
        .collection('articles')
        .updateOne({ _id: mongo.ObjectID(id) }, { $set: request.body })

      if (result.modifiedCount < 1) {
        reply.code(404)
        return 'Not found'
      }

      const article = await db.collection('articles').findOne({
        _id: mongo.ObjectId(id),
      })

      return article
    }
  )

  app.delete('/articles/:id', async (request, reply) => {
    await request.jwtVerify()

    const result = await db.collection('articles').deleteOne({
      _id: mongo.ObjectId(request.params.id),
    })

    if (result.deletedCount < 1) {
      reply.code(404)
      return 'Not Found'
    }

    reply.code(204)

    return null
  })

  done()
}
