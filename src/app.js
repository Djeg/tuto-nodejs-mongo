const fastify = require('fastify')
const mongo = require('mongodb')
const fp = require('fastify-plugin')

module.exports.build = async (logger = true) => {
  // On créé une application
  const app = fastify({ logger: logger })

  // On include fastify-swagger qui génére une documentation
  // dapi
  app.register(require('fastify-swagger'), {
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
  app.register(require('fastify-jwt'), {
    secret: 'test',
  })

  // On inclue le plugin cors afin de gérer les requêtes CORS
  app.register(require('fastify-cors'))

  // On inclue des plugins "routes" fastify.
  // Attention, pour définir des schémas sur l'intégralité de notre
  // application, il faut utiliser fatify-plugin
  app.register(fp(require('./schemas/categories')))
  app.register(fp(require('./schemas/articles')))
  app.register(fp(require('./schemas/users')))
  app.register(require('./routes/index'))
  app.register(require('./routes/categories'))
  app.register(require('./routes/articles'))
  app.register(require('./routes/users'))

  // on se connecte à la base de données
  const db = await mongo.MongoClient.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  })

  // Nous obtenons la base de donnnées blog
  const blogBDD = db.db('blog')

  // Nous décorons fastify en ajoutant
  // le mot clefs "db"  à la request de
  // toutes mes routes
  app.decorate('db', blogBDD)

  return app
}
