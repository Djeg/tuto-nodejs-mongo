import mongo from 'mongodb'

/**
 * Contient toutes les routes des articles
 */
export default async function articlesPlugin(app) {
  /**
   * Récuparation des articles.
   */
  app.get('/articles', async () => {
    const articles = await app.db.collection('articles').find().toArray()

    return articles
  })

  /**
   * Récupération d'un seul article
   */
  app.get('/articles/:id', async (request) => {
    const id = request.params.id

    return {
      id: id,
      title: 'test',
    }
  })

  /**
   * Création d'un article
   */
  app.post('/articles', async (request, reply) => {
    const result = await app.db.collection('articles').insertOne(request.body)

    const article = await app.db.collection('articles').findOne({
      _id: mongo.ObjectId(result.insertedId),
    })

    reply.status(201)

    return article
  })
}
