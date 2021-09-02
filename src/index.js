// On importe la librairie dotenv, qui nous permet
// de lire le fichier de configuration ".env"
const dotenv = require('dotenv')

// On demande à dotenv de lire notre fichier ".env"
dotenv.config()

// On importe la librairie fastify
const fastify = require('fastify')
// On importe la librairie mongodb
const mongodb = require('mongodb')
// On importe le plugin routes/home
const home = require('./routes/home')
// On importe le plugin routes/categories
const categories = require('./routes/categories')
// On importe le plugin routes/articles
const articles = require('./routes/articles')

async function main() {
  // Créer une application fastify.
  // Une application fastify c'est ce qui vas contenir
  // toutes nos routes
  const app = fastify({ logger: true })

  // Se connécter au cluster
  const connection = await mongodb.MongoClient.connect(process.env.MONGO_URL)

  // On récupére la base de données (Cette fonction N'EST PAS ASYNCHRONE)
  const db = connection.db('blog')

  // La décoration permet de rendre accessible
  // n'importe valeur en utilisant directement
  // l'application.
  // Ici, app.db retourneras toujours la base de données
  app.decorate('db', db)

  // On connécte le plugin grace à la fonction "register"
  // routes home à l'application
  app.register(home)
  app.register(categories)
  app.register(articles)

  /**
   * 1. Créer les routes suivantes
   *    - GET /categories/:id
   *    - DELETE /categories/:id
   *    - GET /articles/:id
   *    - DELETE /articles/:id
   */

  // On lance le serveur sur le port 8080
  app.listen(8080)
}

main()
