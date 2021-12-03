import fp from 'fastify-plugin'
import BookModel from './model.js'
import bookRoutes from './routes.js'

/**
 * Contient le plugin de notre domaine (books)
 */
export default async function books(app) {
  app.decorate('books', new BookModel(app.db, 'books'))
  app.register(bookRoutes)
}
