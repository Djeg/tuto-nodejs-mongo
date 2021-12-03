import fastifySwagger from 'fastify-swagger'

/**
 * Configure swagger qui fournit une documentation
 * complète de l'API
 */
export default async function swagger(app) {
  /**
   * Enregistrement du plugin fastify swagger.
   *
   * !ATTENTION! Le plugin doit être déclaré avant nos
   * routes !
   */
  app.register(fastifySwagger, {
    /**
     * Définie la route qui nous permet d'accéder
     * à la documentation de l'api
     */
    routePrefix: process.env.API_DOC_URL,
    /**
     * Active ou désactive la documentation
     */
    exposeRoute: process.env.API_DOC === 'true',
    /**
     * Configuration de l'interface de documentation
     */
    swagger: {
      /**
       * Information générale sur notre api
       */
      info: {
        title: 'LibShop',
        description: "Api pour l'application libshop",
      },
      /**
       * Définition des séctions de la documentation
       */
      tags: [
        {
          name: 'Book',
          description: 'Concerne toutes les opérations sur les livres',
        },
      ],
      /**
       * Le host de notre api
       */
      host: `${process.env.HOST}:${process.env.PORT}`,
      /**
       * Le protocole utilisé
       */
      schemes: [process.env.SCHEME],
      /**
       * Ce que retourne notre api, ici du json
       */
      produces: ['application/json'],
      /**
       * Ce que reçois notre api, ici du json
       */
      consumes: ['application/json'],
    },
  })
}
