import mongo from 'mongodb'
import S from 'fluent-json-schema'

/**
 * Contient toutes les routes des articles
 */
export default async function articlesPlugin(app) {
  /**
   * Récuparation des articles.
   */
  app.get(
    '/articles',
    {
      schema: {
        response: {
          200: ArticleCollectionSchema,
        },
      },
    },
    async () => {
      const articles = await app.db.collection('articles').find().toArray()

      return articles
    }
  )

  /**
   * Récupération d'un seul article
   */
  app.get(
    '/articles/:id',
    {
      schema: {
        response: {
          200: ArticleSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const article = await app.db.collection('articles').findOne({
          _id: mongo.ObjectId(request.params.id),
        })

        return article
      } catch (e) {
        reply.status(404)

        return { message: 'Article not found' }
      }
    }
  )

  /**
   * Création d'un article
   */
  app.post(
    '/articles',
    {
      schema: {
        body: NewArticleSchema,
        response: {
          201: ArticleSchema,
        },
      },
    },
    async (request, reply) => {
      const result = await app.db.collection('articles').insertOne(request.body)

      const article = await app.db.collection('articles').findOne({
        _id: mongo.ObjectId(result.insertedId),
      })

      reply.status(201)

      return article
    }
  )
}

/**
 * Schéma d'un nouvel article
 */
export const NewArticleSchema = S.object()
  .prop('title', S.string().required())
  .prop('description', S.string().required())
  .prop('content', S.string().required())
  .additionalProperties(false)

/**
 * Schéma d'un article
 */
export const ArticleSchema = NewArticleSchema.prop('_id', S.string().required())

/**
 * Une collection d'article
 */
export const ArticleCollectionSchema = S.array().items(ArticleSchema)