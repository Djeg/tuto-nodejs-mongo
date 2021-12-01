import { bookCollectionSchema } from "../../schemas/book-schema.js"

/**
 * Ce plugin contient la route listant les livres
 */
export default async function listBook(app) {
  /**
   * 2. Créer une route GET /books qui retourne la collection suivante :
   * [
   *  { id: 1, title: "Harry Potter" },
   *  { id: 2, title: "Livre 2" },
   *  { id: 3, title: "Livre 3" },
   *  { id: 4, title: "Livre 4" },
   *  { id: 5, title: "Livre 5" },
   * ]
   * 4. Ajouter la possibilité avec la route GET /books de limiter
   *    le nombre résultat (ex: GET /books?limit=2 j'obtient que 2 livres).
   *    Vous pouvez vous aider de `request.query`
   */
  app.get('/books', {
    schema: {
      response: {
        200: bookCollectionSchema,
      }
    }
  }, async (request) => {
    const limit = parseInt(request.query.limit)

    const books = await app.db.collection('books').find().toArray()

    if (!limit) {
      return books
    }

    return books.slice(0, limit) // [ { id: "dfhsdlfhskfhsdfhsd",  } ]
  })
}