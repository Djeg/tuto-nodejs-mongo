// On importe la librairie fastify
const fastify = require('fastify')
// On importe la librairie mongodb
const mongodb = require('mongodb')

// Créer une application fastify.
// Une application fastify c'est ce qui vas contenir
// toutes nos routes
const app = fastify({ logger: true })

// Création d'une route GET sur le chemin "/"
app.get('/', async () => {
  // Se connécter à la base de données
  const connection = await mongodb.MongoClient.connect(
    'mongodb+srv://blog:blog@cluster0.78yvz.mongodb.net/blog?retryWrites=true&w=majority'
  )

  // On récupére toutes les données de la collection test de notre base de données
  // blog
  const data = await connection.db('blog').collection('test').find().toArray()

  return data
})

// Récupére les catégories
app.get('/categories', () => ['animale', 'nature', 'science', 'technologie'])

// Création d'une catégorie
app.post('/categories', () => ({ status: 200 }))

// Récupére les articles
app.get('/articles', () => [{ title: 'Mon premier article' }])

// Création d'un article
app.post('/articles', () => ({ status: 200 }))

// On lance le serveur sur le port 8080
app.listen(8080)
