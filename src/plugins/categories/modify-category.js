import mongo from 'mongodb'
import {
  categorySchema,
  newCategorySchema,
} from '../../schemas/category-schema.js'

/**
 * Ajout du plugin de modification d'une categorie
 */
export default async function modifyCategory(app) {
  /**
   * Route permettant de modifier une catégorie
   */
  app.put(
    '/categories/:id',
    {
      schema: {
        body: newCategorySchema,
        response: { 200: categorySchema },
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
}
