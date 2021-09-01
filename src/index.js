// On importe la librairie fastify
const fastify = require('fastify')
// On importe la librairie mongodb
const mongodb = require('mongodb')

async function main() {
  // Créer une application fastify.
  // Une application fastify c'est ce qui vas contenir
  // toutes nos routes
  const app = fastify({ logger: true })

  // Se connécter au cluster
  const connection = await mongodb.MongoClient.connect(
    'mongodb+srv://blog:blog@cluster0.78yvz.mongodb.net/blog?retryWrites=true&w=majority'
  )

  // On récupére la base de données (Cette fonction N'EST PAS ASYNCHRONE)
  const db = connection.db('blog')

  // Création d'une route GET sur le chemin "/"
  app.get('/', async () => {
    // On récupére toutes les données de la collection test de notre base de données
    // blog
    const data = await db.collection('test').find().toArray()

    return data
  })

  // Récupére les catégories
  app.get('/categories', () => ['animale', 'nature', 'science', 'technologie'])

  // Création d'une catégorie
  app.post('/categories', async (request, reply) => {
    const category = request.body

    // On insére la catégorie
    const result = await db.collection('categories').insertOne(category)

    // On récupére la catégorie qui vient d'être enregistré
    const insertedCategory = await db.collection('categories').findOne({
      _id: mongodb.ObjectId(result.insertedId),
    })

    // Changement du status code pour être 201
    reply.code(201)
    // Ajouter un header http
    reply.header('Inserted-Id', result.insertedId)

    return insertedCategory
  })

  // Récupére les articles
  app.get('/articles', () => [{ title: 'Mon premier article' }])

  // Création d'un article
  app.post('/articles', () => ({ status: 200 }))

  // On lance le serveur sur le port 8080
  app.listen(8080)
}

main()
