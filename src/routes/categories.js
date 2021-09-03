import * as mongodb from 'mongodb'

export default async (app) => {
  // Récupére les catégories
  app.get(
    '/categories',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            limit: {
              type: 'number',
            },
            skip: {
              type: 'number',
            },
          },
        },
      },
    },
    async (request) => {
      // Demande à ce que l'utilisateur soit authentifié
      await request.jwtVerify()

      // récupérer l'utilisateur ?
      console.log(request.user)

      // Récupération de toutes les categories
      const categories = await app.db
        .collection('categories')
        .find()
        .limit(request.query.limit ?? Number(process.env.DEFAULT_LIMIT))
        .skip(request.query.skip ?? 0)
        .toArray()

      return categories
    }
  )

  // Récuparation d'une seule catégorie
  app.get('/categories/:id', async (request, reply) => {
    try {
      const category = await app.db.collection('categories').findOne({
        _id: mongodb.ObjectId(request.params.id),
      })

      if (!category) {
        throw Error('The category does not exists')
      }

      return category
    } catch (error) {
      reply.code(404)

      return { error: error.message }
    }
  })

  // Suppression d'une catégorie
  app.delete('/categories/:id', async (request, reply) => {
    try {
      const category = await app.db.collection('categories').findOne({
        _id: mongodb.ObjectId(request.params.id),
      })

      if (!category) {
        throw Error('This category does not exists')
      }

      await app.db.collection('categories').deleteOne({
        _id: mongodb.ObjectId(request.params.id),
      })

      reply.code(205)

      return category
    } catch (error) {
      reply.code(404)

      return { error: error.message }
    }
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
