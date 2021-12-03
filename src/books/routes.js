import mongo from 'mongodb'
import * as Schema from './schemas.js'

/**
 * Contient toutes les routes concernant les livres
 */
export default async function bookRoutes(app) {
  /**
   * Créer un nouveau livre
   *
   * 1. Créer une route POST /books qui retourne une réponse
   *    avec le status code : 201 (il faut utiliser l'objet reply) et
   *    l'objet suivant : { id: 1, title: "Harry Potter" }
   */
  app.post(
    '/books',
    {
      schema: {
        tags: ['Book'],
        body: Schema.newBookSchema,
        response: {
          201: Schema.bookSchema,
        },
      },
    },
    async (request, reply) => {
      const livre = request.body

      const result = await app.db.collection('books').insertOne(livre)

      const book = await app.db.collection('books').findOne({
        _id: result.insertedId,
      })

      reply.code(201)

      return book
    },
  )

  /**
   * Liste des livres
   *
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
          200: Schema.bookCollectionSchema,
        },
        querystring: Schema.searchBookCriteriaSchema,
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

  /**
   * Affiche un livre
   *
   * 3. Créer une route GET /books/:id qui affiche le document
   *    livre avec l'id demandé en paramètre.
   */
  app.get(
    '/books/:id',
    {
      schema: {
        tags: ['Book'],
        response: {
          200: Schema.bookSchema,
        },
      },
    },
    async (request, reply) => {
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
    },
  )

  /**
   * Route qui permet de supprimer un livre
   */
  app.delete(
    '/books/:id',
    {
      schema: {
        tags: ['Book'],
        response: {
          200: Schema.bookSchema,
        },
      },
    },
    async (request, reply) => {
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
    },
  )

  /**
   * On définie la route de mise à jour d'un livre
   */
  app.patch(
    '/books/:id',
    {
      schema: {
        body: Schema.updateBookSchema,
        response: { 200: Schema.bookSchema },
      },
    },
    async (request, reply) => {
      const id = mongo.ObjectId(request.params.id)

      const book = await app.db.collection('books').findOne({
        _id: id,
      })

      if (!book) {
        reply.code(404)

        return { message: 'No book' }
      }

      await app.db
        .collection('books')
        .updateOne({ _id: id }, { $set: { ...book, ...request.body } })

      const updatedBook = await app.db.collection('books').findOne({
        _id: id,
      })

      return updatedBook
    },
  )
}
