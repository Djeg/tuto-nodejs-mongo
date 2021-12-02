import {
  bookCollectionSchema,
  searchBookCriteriaSchema,
} from '../../schemas/book-schema.js'

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
  app.get(
    '/books',
    {
      schema: {
        tags: ['Book'],
        response: {
          200: bookCollectionSchema,
        },
        querystring: searchBookCriteriaSchema,
      },
    },
    async request => {
      let filters = {}
      const page = parseInt(request.query.page) || 1
      const orderBy = request.query.orderBy || 'title'
      const direction = request.query.direction || 'DESC'
      const limit =
        request.query.limit ||
        parseInt(process.env.API_DEFAULT_COLLECTION_LIMIT)

      if (request.query.title) {
        filters = { ...filters, title: { $regex: request.query.title } }
      }

      if (request.query.minPrice) {
        filters = { ...filters, price: { $gte: request.query.minPrice } }
      }

      if (request.query.maxPrice) {
        if (request.query.minPrice) {
          filters = {
            ...filters,
            price: {
              $gte: request.query.minPrice,
              $lte: request.query.maxPrice,
            },
          }
        } else {
          filters = {
            ...filters,
            price: { $lte: request.query.maxPrice },
          }
        }
      }

      if (request.query.category) {
        filters = {
          ...filters,
          'category.title': { $regex: request.query.category },
        }
      }

      const books = await app.db
        .collection('books')
        .find(filters)
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ [orderBy]: 'ASC' === direction ? 1 : -1 })
        .toArray()

      return books
    },
  )
}
