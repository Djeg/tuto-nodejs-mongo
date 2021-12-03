import mongo from 'mongodb'
import * as Schema from './schemas.js'

/**
 * Contient toutes les routes concernant les catégories
 */
export default async function (app) {
  /**
   * Route permettant de créer une catégorie
   */
  app.post(
    '/categories',
    {
      schema: {
        body: Schema.newCategorySchema,
        response: { 201: Schema.categorySchema },
      },
    },
    async (request, reply) => {
      const result = await app.db
        .collection('categories')
        .insertOne(request.body)

      reply.code(201)

      return app.db.collection('categories').findOne({ _id: result.insertedId })
    },
  )

  /**
   * Route permettant de lister les catégories
   */
  app.get(
    '/categories',
    {
      schema: { response: { 200: Schema.categoryCollectionSchema } },
    },
    async () => {
      return app.db.collection('categories').find().toArray()
    },
  )

  /**
   * Route permettant de modifier une catégorie
   */
  app.put(
    '/categories/:id',
    {
      schema: {
        body: Schema.newCategorySchema,
        response: { 200: Schema.categorySchema },
      },
    },
    async (request, reply) => {
      const id = mongo.ObjectId(request.params.id)

      const category = await app.db
        .collection('categories')
        .findOne({ _id: id })

      if (!category) {
        reply.code(404)

        return { message: 'No category' }
      }

      await app.db
        .collection('categories')
        .updateOne({ _id: id }, { $set: { ...category, ...request.body } })

      return app.db.collection('categories').findOne({ _id: id })
    },
  )

  /**
   * Route permettant de supprimer une catégorie
   */
  app.delete(
    '/categories/:id',
    {
      schema: { reponse: { 200: Schema.categorySchema } },
    },
    async (request, reply) => {
      const id = mongo.ObjectId(request.params.id)

      const category = await app.db.collection('categories').findOne({
        _id: id,
      })

      if (!category) {
        reply.code(404)

        return { message: 'No category' }
      }

      await app.db.collection('categories').deleteOne({ _id: id })

      return category
    },
  )
}
