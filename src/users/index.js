import UserModel from './model.js'
import userRoutes from './routes.js'

/**
 * Connécte notre domain "user" à fastify
 */
export default async function users(app) {
  app.decorate('users', new UserModel(app.db, 'users'))
  app.register(userRoutes)
}
