const mongodb = require('mongodb')

module.exports = async (app) => {
  // Récupére les catégories
  app.get('/categories', async () => {
    // Récupération de toutes les categories
    const categories = await app.db.collection('categories').find().toArray()

    return categories
  })

  app.patch('/categories/:id', async (request) => {
    // Je peux récupérer l'id en faisant :
    request.params.id
  })

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
