import fastifyJWT from 'fastify-jwt'

/**
 * Configure le plugin fastify jwt
 */
export default async function jwt(app) {
  /**
   * Enregistre le plugin fastify jwt dans notre application
   */
  app.register(fastifyJWT, {
    secret: process.env.API_SECRET,
  })
}
