// On importe la librairie dotenv, qui nous permet
// de lire le fichier de configuration ".env"
const dotenv = require('dotenv')

// On demande à dotenv de lire notre fichier ".env"
dotenv.config()

/**
 * 1. Créer un plugin dans src/routes/users.js
 * 2. Dans ce plugin ajouter la route : POST /users
 *    elle accepte l'objet suivant :
 *      { "email": "string", "password": "string" }
 *    Elle enregistre l'utilisatut dans la base de données
 *    mongo à l'intérieur de la collection 'users'
 * 3. Brancher le plugin dans src/index.js
 * 4. Tester la route POST /users dans le fichier request.http
 *
 *
 * Exo 2
 * 1. Créer la route GET /users
 */

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
  app.register(require('fastify-swagger'), {
    routePrefix: '/api/doc',
    exposeRoute: true,
    openApi: {
      servers: [
        {
          url: 'http://localhost:8080',
        },
      ],
    },
  })
  app.register(home)
  app.register(categories)
  app.register(articles)

  // On lance le serveur sur le port 8080
  app.listen(process.env.PORT, process.env.HOST)
}

main()
