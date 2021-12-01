import mongo from 'mongodb'
import { bookSchema } from '../../schemas/book-schema.js'

export default async function getBook(app) {
  /**
   * 3. Créer une route GET /books/:id qui affiche le document
   *    livre avec l'id demandé en paramètre.
   */
  app.get('/books/:id', {
    schema: {
      response: {
        200: bookSchema
      }
    }
  }, async (request, reply) => {
    /**
     * Nous récupérons le paramètre id de notre route.
     * Attention c'est une chaine de caractères
     */
    const id = request.params.id

    /**
     * Nous récupérons le livre correspondant à l'id
     * envoyer en paramètre en utilisant la "db"
     * décoré dans 'src/decorators/db.js'
     */
    const book = await app.db.collection('books').findOne({
      /**
       * Nous devons convertir l'id (string) en object ID !
       */
      _id: mongo.ObjectId(id),
    })

    /**
     * Si il n'y a pas de livre nous retournons une erreur
     * 404
     */
    if (!book) {
      reply.code(404)

      return { message: 'Book not found' }
    }

    /**
     * Finalement lorsque tout vas bien, nous retournons
     * le livre
     */
    return book
  })
}