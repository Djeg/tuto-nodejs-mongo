import { categoryCollectionSchema } from '../../schemas/category-schema.js'

/**
 * Plugin permettant de lister les catégories
 */
export default async function (app) {
  /**
   * Route permettant de lister les catégories
   */
  app.get(
    '/categories',
    {
      schema: { response: { 200: categoryCollectionSchema } },
    },
    async () => {
      return app.db.collection('categories').find().toArray()
    },
  )
}
