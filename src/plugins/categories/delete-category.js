import mongo from 'mongodb'
import { categorySchema } from '../../schemas/category-schema.js'

/**
 * Plugin permettant de supprimer une catégorie
 */
export default async function deleteCategory(app) {
  /**
   * Route permettant de supprimer une catégorie
   */
  app.delete(
    '/categories/:id',
    {
      schema: { reponse: { 200: categorySchema } },
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
