module.exports = (app, opts, done) => {
  const { db } = app

  app.get('/articles', async (request) => {
    // Nous récupérons la totalité des articles, que
    // nous formattons en un tableaux javascript
    const articles = await db.collection('articles').find().toArray()

    return articles
  })

  app.post(
    '/articles',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'description', 'images', 'author'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            images: {
              type: 'array',
              items: { type: 'string' },
            },
            author: {
              type: 'object',
              required: ['firstname', 'lastname'],
              properties: {
                firstname: { type: 'string' },
                lastname: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      // On récupére l'article envoyé depuis la requête
      const article = request.body
      // On récupére l'id du document enregistré en base
      // de données
      const { insertedId } = await db.collection('articles').insertOne(article)

      // On récupére l'article enregistré depuis la base de
      // données
      const insertedArticle = await db
        .collection('articles')
        .findOne({ _id: insertedId })

      // Nous ajoutons le code 201 Created afin de réspécter
      // le protocol HTTP
      reply.code(201)

      return insertedArticle
    }
  )

  done()
}
