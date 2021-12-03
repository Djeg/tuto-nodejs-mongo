/**
 * Nous importons la librairie fastify
 */
import Fastify from 'fastify'
import books from './books/index.js'
import categories from './categories/index.js'
import users from './users/index.js'
import swagger from './lib/swagger.js'
import cors from './lib/cors.js'
import mongodb from './lib/mongodb.js'
import fp from 'fastify-plugin'
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
   * Nous enregistrons les plugins éxtérieur à notre
   * domaine
   */
  app.register(fp(cors))
  app.register(fp(swagger))
  app.register(fp(mongodb))

  /**
   * Nous enregistrons les plugin domain
   */
  app.register(fp(books))
  app.register(fp(categories))
  app.register(fp(users))

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
