import mongo from 'mongodb'
import S from 'fluent-json-schema'
import { PaginationSchema, paginateCursor } from '../utils/pagination.js'
import { retrieveOne, create, update, remove } from '../utils/crud.js'

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
        tags: ['article'],
        querystring: PaginationSchema,
        response: {
          200: ArticleCollectionSchema,
        },
      },
    },
    async (request) =>
      paginateCursor({
        cursor: app.db.collection('articles').find(),
        page: request.query.page,
        limit: request.query.limit,
      })
  )

  /**
   * Récupération d'un seul article
   */
  app.get(
    '/articles/:id',
    {
      schema: {
        tags: ['article'],
        response: {
          200: ArticleSchema,
        },
      },
    },
    async (request, reply) =>
      retrieveOne({
        collection: app.db.collection('articles'),
        id: request.params.id,
        errorMessage: 'Article not found',
        reply,
      })
  )

  /**
   * Création d'un article
   */
  app.post(
    '/articles',
    {
      schema: {
        tags: ['article'],
        body: NewArticleSchema,
        response: {
          201: ArticleSchema,
        },
      },
    },
    async (request, reply) => {
      await request.jwtVerify()

      return create({
        collection: app.db.collection('articles'),
        data: request.body,
        reply,
      })
    }
  )

  /**
   * Mise à jour d'un article
   */
  app.patch(
    '/articles/:id',
    {
      schema: {
        tags: ['article'],
        body: UpdateArticleSchema,
        response: {
          200: ArticleSchema,
        },
      },
    },
    async (request, reply) =>
      update({
        collection: app.db.collection('articles'),
        id: request.params.id,
        data: request.body,
        errorMessage: 'Article not found',
        reply,
      })
  )

  /**
   * Suppression d'un article
   */
  app.delete(
    '/articles/:id',
    {
      schema: {
        tags: ['article'],
        response: {
          200: ArticleSchema,
        },
      },
    },
    async (request, reply) =>
      remove({
        collection: app.db.collection('articles'),
        id: request.params.id,
        errorMessage: 'Article not found',
        reply,
      })
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
 * Schéma d'un article à mettre à jour
 */
export const UpdateArticleSchema = S.object()
  .prop('title', S.string())
  .prop('description', S.string())
  .prop('content', S.string())
  .additionalProperties(false)

/**
 * Schéma d'un article
 */
export const ArticleSchema = NewArticleSchema.prop('_id', S.string().required())

/**
 * Une collection d'article
 */
export const ArticleCollectionSchema = S.array().items(ArticleSchema)
