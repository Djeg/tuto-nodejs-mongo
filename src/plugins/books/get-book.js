import { books } from '../../books.js'

export default async function getBook(app) {
  /**
   * 3. Créer une route GET /books/:id qui affiche le document
   *    livre avec l'id demandé en paramètre.
   */
  app.get('/books/:id', (request, reply) => {
    const id = parseInt(request.params.id)

    let book = books.find(book => book.id === id)

    if (!book) {
      reply.code(404)

      return { message: 'No book' }
    }

    return book
  })
}