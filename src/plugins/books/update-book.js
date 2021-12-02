import mongo from 'mongodb'
import { updateBookSchema, bookSchema } from '../../schemas/book-schema.js'

/**
 * Création du plugin de mise à jour d'un livre
 */
export default async function updateBook(app) {
  /**
   * On définie la route de mise à jour d'un livre
   */
  app.patch('/books/:id', {
    schema: { body: updateBookSchema, response: { 200: bookSchema } }
  }, async (request, reply) => {
    const id = mongo.ObjectId(request.params.id)

    const book = await app.db.collection('books').findOne({
      _id: id,
    })

    if (!book) {
      reply.code(404)

      return { message: 'No book' }
    }

    await app.db.collection('books').updateOne(
      { _id: id },
      { $set: { ...book, ...request.body } },
    )

    const updatedBook = await app.db.collection('books').findOne({
      _id: id
    })

    return updatedBook
  })
}