// Require la librairie fastify
const fastify = require('fastify')
// On inclue la librairie mongo
const mongo = require('mongodb')

// On créé une application
const app = fastify({ logger: true })

// On lui attache « la route » (le path, l'URI, chemin)  suivi
// d'une callback en utilisant la fonction « get »

app.get('/', () => {
  return 'Hello World'
})

app.get('/categories', () => {
  return ['animale', 'nature', 'science', 'technologie']
})

app.post('/categories', (request, reply) => {
  reply.code(201)
  reply.header('X-Powered-By', 'fastify')

  console.warn(request.body.description)

  return { status: 200 }
})

app.get('/articles', async (request) => {
  // Grâce à la décoration, nous pouvons accéder
  // à la base de données en utilisant :
  // this.db
  const db = request.db

  // Nous récupérons la totalité des articles, que
  // nous formattons en un tableaux javascript
  const articles = await db.collection('articles').find().toArray()

  return articles
})

app.post('/articles', (request) => {
  console.warn(request.body.title)

  return { status: 200 }
})

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
