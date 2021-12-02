import {
  categorySchema,
  newCategorySchema,
} from '../../schemas/category-schema.js'

/**
 * Plugin qui créé une catégorie
 */
export default async function createCategory(app) {
  /**
   * Route permettant de créer une catégorie
   */
  app.post(
    '/categories',
    {
      schema: { body: newCategorySchema, response: { 201: categorySchema } },
    },
    async (request, reply) => {
      const result = await app.db
        .collection('categories')
        .insertOne(request.body)

      reply.code(201)

      return app.db.collection('categories').findOne({ _id: result.insertedId })
    },
  )
}
