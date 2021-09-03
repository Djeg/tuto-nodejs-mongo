// On importe la librairie dotenv, qui nous permet
// de lire le fichier de configuration ".env"
const dotenv = require('dotenv')

// On demande à dotenv de lire notre fichier ".env"
dotenv.config()

/**
 * Exo Authentification
 * 1. Installer le plugin "fastify-jwt" (npm install fastify-jwt)
 * 2. Dans index.js, nous importons (avec require) le plugin fastify-jwt
 * 3. Dans index.js, nous enregistrons le plugin:
 *    app.register(fastifyJwt, { secret: 'clefs secrete' })
 * 4. Dans routes/users.js, créer la route POST /users/token qui recoie
 *    dans le body les données suivante :
 *    { email: string, password: string }
 * 5. Récupérer l'utilisateur qui correspond à l'email et au mot de passe
 *    (gérer le cas ou les données ne sont pas correct)
 * 6. Retourner l'objet JSON suivant :
 *    { token: app.jwt.sign(user) }
 * 7. Tester avec le fichier request.http
 */

// On importe la librairie fastify
const fastify = require('fastify')
// On importe la librairie mongodb
const mongodb = require('mongodb')
// On importe le plugin fastify-jwt
const fastifyJwt = require('fastify-jwt')
// On importe le plugin routes/home
const home = require('./routes/home')
// On importe le plugin routes/categories
const categories = require('./routes/categories')
// On importe le plugin routes/articles
const articles = require('./routes/articles')
// On importe le plugin routes/users
const users = require('./routes/users')

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
  app.register(fastifyJwt, { secret: 'secret' })
  app.register(home)
  app.register(categories)
  app.register(articles)
  app.register(users)

  // On lance le serveur sur le port 8080
  app.listen(process.env.PORT, process.env.HOST)
}

main()
