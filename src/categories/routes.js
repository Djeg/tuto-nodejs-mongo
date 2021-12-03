import mongo from 'mongodb'
import * as Schema from './schemas.js'

/**
 * Contient toutes les routes concernant les catégories
 */
export default async function categoryRoutes(app) {
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
      reply.code(201)

      return app.categories.create(request.body)
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
    async request => {
      return app.categories.update(request.params.id, request.body)
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
    async request => {
      return app.categories.delete(request.params.id)
    },
  )
}
