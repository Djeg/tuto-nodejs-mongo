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

app.get('/categories', async (request) => {
  const categories = await request.db.collection('categories').find().toArray()

  return categories
})

app.post(
  '/categories',
  {
    schema: {
      body: {
        type: 'object',
        properties: {
          titre: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
        },
        required: ['titre'],
      },
    },
  },
  async (request, reply) => {
    const { insertedId } = await request.db
      .collection('categories')
      .insertOne(request.body)

    const category = await request.db.collection('categories').findOne({
      _id: insertedId,
    })

    reply.code(201)

    return category
  }
)

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

app.post('/articles', async (request, reply) => {
  // On récupére l'article envoyé depuis la requête
  const article = request.body
  // On récupére l'id du document enregistré en base
  // de données
  const { insertedId } = await request.db
    .collection('articles')
    .insertOne(article)

  // On récupére l'article enregistré depuis la base de
  // données
  const insertedArticle = await request.db
    .collection('articles')
    .findOne({ _id: insertedId })

  // Nous ajoutons le code 201 Created afin de réspécter
  // le protocol HTTP
  reply.code(201)

  return insertedArticle
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
