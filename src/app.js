import fastify from 'fastify'
import mongo from 'mongodb'
import fp from 'fastify-plugin'
import fastifySwagger from 'fastify-swagger'
import fastifyJwt from 'fastify-jwt'
import fastifyCors from 'fastify-cors'
import articleSchema from './schemas/articles.js'
import categorySchema from './schemas/categories.js'
import userSchema from './schemas/users.js'
import articleRoute from './routes/articles.js'
import categoryRoute from './routes/categories.js'
import userRoute from './routes/users.js'
import homeRoute from './routes/index.js'

export const build = async (logger = true) => {
  // On créé une application
  const app = fastify({ logger: logger })

  // On include fastify-swagger qui génére une documentation
  // dapi
  app.register(fastifySwagger, {
    routePrefix: '/doc',
    exposeRoute: true,
    openapi: {
      info: {
        title: 'Mon Blog',
        description: 'testing the fastify  blog api',
        version: '0.1.0',
      },
      servers: [
        {
          url: 'http://localhost:4545',
        },
      ],
    },
  })

  // On inclue le plugin jwt, nous permettant de crypter/décrypter
  // des tokens d'authentification
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
  })

  // On inclue le plugin cors afin de gérer les requêtes CORS
  app.register(fastifyCors)

  // On inclue des plugins "routes" fastify.
  // Attention, pour définir des schémas sur l'intégralité de notre
  // application, il faut utiliser fatify-plugin
  app.register(fp(categorySchema))
  app.register(fp(articleSchema))
  app.register(fp(userSchema))
  app.register(homeRoute)
  app.register(categoryRoute)
  app.register(articleRoute)
  app.register(userRoute)

  // on se connecte à la base de données
  const db = await mongo.MongoClient.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  })

  // Nous obtenons la base de donnnées blog
  const blogBDD = db.db(process.env.MONGO_DB_NAME)

  // Nous décorons fastify en ajoutant
  // le mot clefs "db"  à la request de
  // toutes mes routes
  app.decorate('db', blogBDD)

  return app
}
