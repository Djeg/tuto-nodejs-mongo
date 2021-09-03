import * as mongodb from 'mongodb'

export default async (app) => {
  // Récupére les articles
  app.get('/articles', async () => {
    // Récupération des articles de la collection articles
    const articles = await app.db.collection('articles').find().toArray()
    // Ceci est un tableaux qui contiendra nos articles avec leurs
    // categories
    const data = []

    for (let article of articles) {
      // Si je na'ai pas de category ID je retourne
      // l'article tel quel
      if (!article.categoryId) {
        data.push(article)

        continue
      }

      try {
        // Nous récupérons la catégory de l'article
        const category = await app.db.collection('categories').findOne({
          _id: mongodb.ObjectId(article.categoryId),
        })

        // Si elle n'éxiste nous arrétons l'éxécution et
        // lancons le block "catch"
        if (!category) {
          throw Error()
        }

        // Ici, on rajoute la category à notre objet JSON d'article
        data.push({ ...article, category })
      } catch (e) {
        data.push(article)

        continue
      }
    }

    // On retourne la liste des articles
    return data
  })

  // Récuparation d'une seule catégorie
  app.get('/articles/:id', async (request, reply) => {
    try {
      const article = await app.db.collection('articles').findOne({
        _id: mongodb.ObjectId(request.params.id),
      })

      if (!article) {
        throw Error('The article does not exists')
      }

      return article
    } catch (error) {
      reply.code(404)

      return { error: error.message }
    }
  })

  // Suppression d'une catégorie
  app.delete('/articles/:id', async (request, reply) => {
    try {
      const article = await app.db.collection('articles').findOne({
        _id: mongodb.ObjectId(request.params.id),
      })

      if (!article) {
        throw Error('This article does not exists')
      }

      await app.db.collection('articles').deleteOne({
        _id: mongodb.ObjectId(request.params.id),
      })

      reply.code(205)

      return article
    } catch (error) {
      reply.code(404)

      return { error: error.message }
    }
  })

  // Modification d'un article par son _id
  app.patch(
    '/articles/:id',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            content: {
              type: 'string',
            },
          },
        },
      },
    },
    async (request) => {
      await app.db
        .collection('articles')
        .updateOne(
          { _id: mongodb.ObjectId(request.params.id) },
          { $set: request.body }
        )

      return app.db.collection('articles').findOne({
        _id: mongodb.ObjectId(request.params.id),
      })
    }
  )

  // Création d'un article
  app.post(
    '/articles',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'description', 'content'],
          properties: {
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            content: {
              type: 'string',
            },
            categoryId: {
              type: 'string',
            },
          },
        },
      },
    },
    async (request, reply) => {
      // Nous récupérons l'article depuis le corps de la requête
      const article = request.body

      // Nous testons si l'article est lié à une catégorie
      if (article.categoryId) {
        try {
          // Nous comptons le nombre de catégorie avec l'id spécifié
          const exists = await app.db.collection('categories').countDocuments({
            _id: mongodb.ObjectId(article.categoryId),
          })

          // si il n'y a pas de catégorie
          if (!exists) {
            throw Error('Category not found')
          }
        } catch (e) {
          reply.code(400)

          throw Error(e.message)
        }
      }

      // enregistrement de l'article dans la base de données
      const result = await app.db.collection('articles').insertOne(article)

      // Récupération de l'article enregistré en base de données
      const insertedArticle = await app.db.collection('articles').findOne({
        _id: mongodb.ObjectId(result.insertedId),
      })

      // Nous spécifions un code HTTP 201 Created
      reply.code(201)

      // Nous retournons l'article nouvellement créé
      return insertedArticle
    }
  )
}
