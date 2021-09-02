const mongodb = require('mongodb')

module.exports = async (app) => {
  // Récupére les catégories
  app.get('/categories', async () => {
    // Récupération de toutes les categories
    const categories = await app.db.collection('categories').find().toArray()

    return categories
  })

  // On modifie une catégorie
  app.patch(
    '/categories/:id',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title'],
          properties: {
            title: {
              type: 'string',
            },
          },
        },
      },
    },
    async (request) => {
      const result = await app.db
        .collection('categories')
        .updateOne(
          { _id: mongodb.ObjectId(request.params.id) },
          { $set: request.body }
        )

      const category = await app.db.collection('categories').findOne({
        _id: mongodb.ObjectId(request.params.id),
      })

      return category
    }
  )

  // Création d'une catégorie
  app.post(
    '/categories',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
          },
          required: ['title'],
        },
      },
    },
    async (request, reply) => {
      const category = request.body

      // On insére la catégorie
      const result = await app.db.collection('categories').insertOne(category)

      // On récupére la catégorie qui vient d'être enregistré
      const insertedCategory = await app.db.collection('categories').findOne({
        _id: mongodb.ObjectId(result.insertedId),
      })

      // Changement du status code pour être 201
      reply.code(201)
      // Ajouter un header http
      reply.header('Inserted-Id', result.insertedId)

      return insertedCategory
    }
  )
}
