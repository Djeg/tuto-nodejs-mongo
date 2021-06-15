// Require la librairie fastify
const fastify = require('fastify')
// On inclue la librairie mongo
const mongo = require('mongodb')

// On créé une application
const app = fastify({ logger: true })

// On lui attache « la route » (le path, l'URI, chemin)  suivi
// d'une callback en utilisant la fonction « get »
app.register(require('./routes/index'))
app.register(require('./routes/categories'))
app.register(require('./routes/articles'))

const start = async () => {
  // on se connecte à la base de données
  const db = await mongo.MongoClient.connect(
    'mongodb+srv://test:test@cluster0.suzgw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )

  // Nous obtenons la base de donnnées blog
  const blogBDD = db.db('blog')

  // Nous décorons fastify en ajoutant
  // le mot clefs "db"  à la request de
  // toutes mes routes
  app.decorateRequest('db', blogBDD)

  // On démarre l'application
  await app.listen(4545)
}

start()
