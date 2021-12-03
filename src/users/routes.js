import S from 'fluent-json-schema'
import { NewUser, User, Credential } from './schemas.js'

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

  /**
   * Création d'un token pour un utilisateur
   */
  app.post(
    '/users/token',
    {
      schema: {
        body: Credential,
        response: { 201: S.object().prop('token', S.string().required()) },
      },
    },
    async (request, reply) => {
      const user = await app.users.getByEmail(request.body.email)

      if (!app.users.isPasswordValid(user, request.body.password)) {
        reply.code(400)

        return { message: 'Invalid password' }
      }

      /**
       * Crypte le contenue ({ id: user.id }) et transforme
       * le tout en JWT
       */
      const token = app.jwt.sign({ id: user.id })

      return { token }
    },
  )
}
