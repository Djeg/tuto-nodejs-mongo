// Ancienne syntax pour importer une librairie js :
// const fastify = require('fastify')

/**
 * On importe la librairie fastify et mongodb
 */
import dotenv from 'dotenv'
import fastify from 'fastify'
import mongo from 'mongodb'
import helloPlugin from './plugins/hello.js'
import categoriesPlugin from './plugins/categories.js'
import articlesPlugin from './plugins/articles.js'

/**
 * Lis la configuration dans le fichier
 * .env
 */
dotenv.config()

/**
 * On créé une fonction de démarrage asynchrone afin
 * de pouvoir utiliser le mot clefs await
 */
async function start() {
  /**
   * Nous nous connéctons au cluster mongodb
   * (à la machine qui contient mongodb)
   */
  console.log(process.env.MONGO_URL)
  const client = await mongo.MongoClient.connect(process.env.MONGO_URL)

  /**
   * Nous récupérons une référence vers une base de données
   */
  const db = client.db('blog')

  /**
   * Création d'une application fastify qui nous
   * permet de démarrer un (logical) server http
   */
  const app = fastify({
    // Cette option permet d'afficher dans la console
    // ce qui se produit sur le server. Comme par
    // éxemple une erreur.
    logger: true,
  })

  /**
   * Nous "décorons" notre applicatiion:
   * Nous ajoutons à l'intérieur de notre application,
   * une propriété "db" attaché à la constante db.
   *
   * Graçe à cette décoration, nos plugins peuvent
   * accéder à la DB très simplement : app.db
   */
  app.decorate('db', db)

  /**
   * Branchement du plugin hello, categories, articles
   */
  app.register(helloPlugin)
  app.register(categoriesPlugin)
  app.register(articlesPlugin)

  console.log('Démarrage du server sur le port 9090')
  /**
   * On démarre le server sur le port 9090. app.listen
   * démarre un programme qui ne finie jamais et écoute
   * les requêtes sur le port 9090
   */
  await app.listen(9090)
}

/**
 * On lance la fonction de démarrage
 */
start()
