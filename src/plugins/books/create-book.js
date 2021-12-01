import mongo from 'mongodb'
import { newBookSchema } from '../../schemas/book-schema.js'

/**
 * En fastify un plugin c'est une fonction asynchrone
 * qui recoit en premier paramètre l'application fastify et
 * en second paramètres des options si nescessaire
 */
export default async function createBook(app) {
  /**
   * 1. Créer une route POST /books qui retourne une réponse
   *    avec le status code : 201 (il faut utiliser l'objet reply) et
   *    l'objet suivant : { id: 1, title: "Harry Potter" }
   */
  app.post('/books', {
    schema: {
      body: newBookSchema,
    }
  }, async (request, reply) => {
    const livre = request.body

    const result = await app.db.collection('books').insertOne(livre)

    const book = await app.db.collection('books').findOne({
      _id: result.insertedId,
    })

    return book
  })
}