// Require la librairie fastify
const fastify = require('fastify')
const fp = require('fastify-plugin')
// On inclue la librairie mongo
const mongo = require('mongodb')

const start = async () => {
  // On créé une application
  const app = fastify({ logger: true })

  // On inclue des plugins "routes" fastify.
  // Attention, pour définir des schémas sur l'intégralité de notre
  // application, il faut utiliser fatify-plugin
  app.register(fp(require('./schemas/categories')))
  app.register(fp(require('./schemas/articles')))
  app.register(require('./routes/index'))
  app.register(require('./routes/categories'))
  app.register(require('./routes/articles'))

  // on se connecte à la base de données
  const db = await mongo.MongoClient.connect(
    'mongodb+srv://test:test@cluster0.suzgw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )

  // Nous obtenons la base de donnnées blog
  const blogBDD = db.db('blog')

  // Nous décorons fastify en ajoutant
  // le mot clefs "db"  à la request de
  // toutes mes routes
  app.decorate('db', blogBDD)

  // On démarre l'application
  await app.listen(4545)
}

start()
