// On importe la librairie dotenv, qui nous permet
// de lire le fichier de configuration ".env"
import dotenv from 'dotenv'

// On demande à dotenv de lire notre fichier ".env"
dotenv.config()

// On importe la librairie fastify
import fastify from 'fastify'
// On importe la librairie mongodb
import * as mongodb from 'mongodb'
// On importe le plugin fastify-jwt
import fastifyJwt from 'fastify-jwt'
// On importe le plugin fastify swagger pour générer
// automatiquement une documentation de l'api
import fastifySwagger from 'fastify-swagger'
// On importe le plugin routes/home
import home from './routes/home.js'
// On importe le plugin routes/categories
import categories from './routes/categories.js'
// On importe le plugin routes/articles
import articles from './routes/articles.js'
// On importe le plugin routes/users
import users from './routes/users.js'

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
  app.register(fastifySwagger, {
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

  app.addHook('onRequest', async (request, reply) => {
    if (/^\/users/.test(request.url) || /^\/api\/doc/.test(request.url)) {
      return
    }

    try {
      await request.jwtVerify()
    } catch (e) {
      reply.code(401)

      reply.send({ message: 'You must be authenticated' })
    }
  })

  // On lance le serveur sur le port 8080
  app.listen(process.env.PORT, process.env.HOST)
}

main()
