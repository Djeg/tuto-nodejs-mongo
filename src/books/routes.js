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
      reply.code(201)

      return app.books.create(request.body)
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
      return app.books.search(request.query)
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
      const book = await app.books.get(request.params.id)

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
      return app.books.delete(request.params.id)
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
      return app.books.update(request.params.id, request.body)
    },
  )
}
