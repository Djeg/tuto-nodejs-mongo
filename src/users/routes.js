import { NewUser, User } from './schemas.js'

/**
 * Plugin contenant les routes pour les utilisateurs
 */
export default async function userRoutes(app) {
  /**
   * Route de création d'un utilisateur
   */
  app.post(
    '/users',
    {
      schema: {
        body: NewUser,
        response: { 201: User },
      },
    },
    async (request, reply) => {
      reply.code(201)

      console.warn(request.body)

      return app.users.create(request.body)
    },
  )
}
