const mongodb = require('mongodb')

module.exports = async (app) => {
  // Récupére les articles
  app.get('/articles', async () => {
    // Récupération des articles de la collection articles
    const articles = await app.db.collection('articles').find().toArray()

    // On retourne la liste des articles
    return articles
  })

  // Modification d'un article par son _id
  app.patch(
    '/articles/:id',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            content: {
              type: 'string',
            },
          },
        },
      },
    },
    async (request) => {
      await app.db
        .collection('articles')
        .updateOne(
          { _id: mongodb.ObjectId(request.params.id) },
          { $set: request.body }
        )

      return app.db.collection('articles').findOne({
        _id: mongodb.ObjectId(request.params.id),
      })
    }
  )

  // Création d'un article
  app.post(
    '/articles',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'description', 'content'],
          properties: {
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            content: {
              type: 'string',
            },
          },
        },
      },
    },
    async (request, reply) => {
      // Nous récupérons l'article depuis le corps de la requête
      const article = request.body

      // enregistrement de l'article dans la base de données
      const result = await app.db.collection('articles').insertOne(article)

      // Récupération de l'article enregistré en base de données
      const insertedArticle = await app.db.collection('articles').findOne({
        _id: mongodb.ObjectId(result.insertedId),
      })

      // Nous spécifions un code HTTP 201 Created
      reply.code(201)

      // Nous retournons l'article nouvellement créé
      return insertedArticle
    }
  )
}
