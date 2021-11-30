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
  app.post('/books', (request, reply) => {
    reply.code(201)

    return {
      id: 1,
      title: 'Harry Potter',
    }
  })
}