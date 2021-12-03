/**
 * Nous importons la librairie fastify
 */
import Fastify from 'fastify'
import books from './books/routes.js'
import categories from './categories/routes.js'
import bookDecorator from './plugins/decorators/books.js'
import dbDecorator from './plugins/decorators/db.js'
import fp from 'fastify-plugin'
import cors from 'fastify-cors'
import swagger from 'fastify-swagger'
import { config } from 'dotenv'

/**
 * Voici la fonction principale de notre programme
 */
async function main() {
  /**
   * Charge les variables d'environment du fichier .env et
   * les places dans process.env
   */
  config()

  // pour accéder à une variable d'environment
  // process.env.MONGO_URL

  /**
   * Nous pouvons créer une application fastify
   */
  const app = Fastify({
    /* Ici nous spécifions des options.
    l'option logger nous permet de débugger notre
    serveur lorsque nous avons des erreurs */
    logger: process.env.NODE_ENV !== 'production',
  })

  /**
   * Enregistrement du plugin fastify-cors pour désactivé
   * la sécurité des navigateurs et application mobile
   */
  app.register(cors)

  /**
   * Enregistrement du plugin fastify swagger.
   *
   * !ATTENTION! Le plugin doit être déclaré avant nos
   * routes !
   */
  app.register(swagger, {
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

  /**
   * Nous incluons en premier les plugins
   * decorators.
   *
   * !Attention! si nous souhaitons décorer TOUT les plugins
   * (et pas uniquement le plugin decotaror). Il faut
   * installer et utiliser 'fastify-plugin'
   */
  app.register(fp(bookDecorator))
  app.register(fp(dbDecorator))

  /**
   * Nous enregistrons le plugin "createBook" dans
   * notre application :
   */
  app.register(books)
  app.register(categories)

  /**
   * Nous pouvons démarer un server logique sur
   * notre machine
   */
  app.listen(
    /* Le port */ process.env.PORT,
    /* l'adresse de la machine, ici notre machine */ process.env.HOST,
    /* Une fonction qui se lance, un fois le server demarré */ error => {
      if (error) {
        console.error(error)

        return
      }

      console.log(
        `Le server est disponible sur l'adresse : ${process.env.SCHEME}://${process.env.HOST}:${process.env.PORT}`,
      )
    },
  )
}

/**
 * Nous appelons fonction principale qui démarre notre application
 */
main()
