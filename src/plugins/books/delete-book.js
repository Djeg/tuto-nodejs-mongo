import mongo from 'mongodb'
import { bookSchema } from '../../schemas/book-schema.js'

/**
 * Création du plugin de suppression d'un livre
 */
export default async function deleteBook(app) {
  /**
   * Route qui permet de supprimer un livre
   */
  app.delete('/books/:id', {
    schema: {
      response: {
        200: bookSchema
      }
    }
  }, async (request, reply) => {
    const id = mongo.ObjectId(request.params.id)

    const book = await app.db.collection('books').findOne({
      _id: id,
    })

    if (!book) {
      reply.code(404)

      return { message: 'No book' }
    }

    await app.db.collection('books').deleteOne({
      _id: id,
    })

    return book
  })
}