import fp from 'fastify-plugin'
import CategoryModel from './model.js'
import categoryRoutes from './routes.js'

/**
 * Plugin qui contient la configuration de notre domaine
 * catégories
 */
export default async function categories(app) {
  app.decorate('categories', new CategoryModel(app.db, 'categories'))
  app.register(categoryRoutes)
}
