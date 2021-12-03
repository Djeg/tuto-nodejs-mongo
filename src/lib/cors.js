import fastifyCors from 'fastify-cors'

/**
 * Contient de plugin CORS permettant à une application
 * web de faire des requêtes sur notre api
 */
export default async function cors(app) {
  /**
   * Enregistrement du plugin fastify-cors pour désactivé
   * la sécurité des navigateurs et application mobile
   */
  app.register(fastifyCors)
}
