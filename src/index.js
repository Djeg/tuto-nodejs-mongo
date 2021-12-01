/**
 * Nous importons la librairie fastify
 */
import Fastify from 'fastify'
import createBook from './plugins/books/create-book.js'
import listBook from './plugins/books/list-books.js'
import getBook from './plugins/books/get-book.js'
import deleteBook from './plugins/books/delete-book.js'
import bookDecorator from './plugins/decorators/books.js'
import dbDecorator from './plugins/decorators/db.js'
import fp from 'fastify-plugin'
import swagger from 'fastify-swagger'


/**
 * Voici la fonction principale de notre programme
 */
async function main() {
  /**
   * Nous pouvons créer une application fastify
   */
  const app = Fastify({
    /* Ici nous spécifions des options.
    l'option logger nous permet de débugger notre
    serveur lorsque nous avons des erreurs */
    logger: true,
  })

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
    routePrefix: '/api/doc',
    /**
     * Active ou désactive la documentation
     */
    exposeRoute: true,
    /**
     * Configuration de l'interface de documentation
     */
    swagger: {
      /**
       * Information générale sur notre api
       */
      info: {
        title: 'LibShop',
        description: 'Api pour l\'application libshop',
      },
      /**
       * Définition des séctions de la documentation
       */
      tags: [
        { name: 'Book', description: 'Concerne toutes les opérations sur les livres' },
      ],
      /**
       * Le host de notre api
       */
      host: 'localhost:3030',
      /**
       * Le protocole utilisé
       */
      schemes: ['http'],
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
  app.register(createBook)
  app.register(listBook)
  app.register(getBook)
  app.register(deleteBook)

  /**
   * Nous pouvons démarer un server logique sur
   * notre machine
   */
  app.listen(
    /* Le port */ 3030,
    /* l'adresse de la machine, ici notre machine */ 'localhost',
    /* Une fonction qui se lance, un fois le server demarré */ (error) => {
      if (error) {
        console.error(error)

        return
      }

      console.log(
        "Le server est disponible sur l'adresse : http://localhost:3030",
      )
    },
  )
}

/**
 * Nous appelons fonction principale qui démarre notre application
 */
main()