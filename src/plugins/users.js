import mongo from 'mongodb'
import S from 'fluent-json-schema'
import { PaginationSchema, paginateCursor } from '../utils/pagination.js'

/**
 * Contient toutes les routes des utilisateurs
 */
export default async function usersPlugin(app) {
  /**
   * Récuparation des utilisateurs.
   */
  app.get(
    '/users',
    {
      schema: {
        tags: ['user'],
        querystring: PaginationSchema,
        response: {
          200: UserCollectionSchema,
        },
      },
    },
    async (request) =>
      paginateCursor({
        cursor: app.db.collection('users').find(),
        page: request.query.page,
        limit: request.query.limit,
      })
  )

  /**
   * Récupération d'un seul utilisateur
   */
  app.get(
    '/users/:id',
    {
      schema: {
        tags: ['user'],
        response: {
          200: UserSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const user = await app.db.collection('users').findOne({
          _id: mongo.ObjectId(request.params.id),
        })

        if (!user) throw Error()

        return user
      } catch (e) {
        reply.status(404)

        return { message: 'User not found' }
      }
    }
  )

  /**
   * Création d'un utilisateur
   */
  app.post(
    '/users',
    {
      schema: {
        tags: ['user'],
        body: NewUserSchema,
        response: {
          201: UserSchema,
        },
      },
    },
    async (request, reply) => {
      const result = await app.db.collection('users').insertOne(request.body)

      const user = await app.db.collection('users').findOne({
        _id: mongo.ObjectId(result.insertedId),
      })

      reply.status(201)

      return user
    }
  )

  /**
   * Mise à jour d'un utilisateur
   */
  app.patch(
    '/users/:id',
    {
      schema: {
        tags: ['user'],
        body: UpdateUserSchema,
        response: {
          200: UserSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const result = await app.db
          .collection('users')
          .updateOne(
            { _id: mongo.ObjectId(request.params.id) },
            { $set: request.body }
          )

        if (0 === result.modifiedCount) throw Error()

        const user = await app.db.collection('users').findOne({
          _id: mongo.ObjectId(request.params.id),
        })

        if (!user) throw Error()

        return user
      } catch (e) {
        reply.status(404)

        return { message: 'User not found' }
      }
    }
  )

  /**
   * Suppression d'un utilisateur
   */
  app.delete(
    '/users/:id',
    {
      schema: {
        tags: ['user'],
        response: {
          200: UserSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const user = await app.db.collection('users').findOne({
          _id: mongo.ObjectId(request.params.id),
        })

        if (!user) throw Error()

        await app.db.collection('users').deleteOne({
          _id: mongo.ObjectId(request.params.id),
        })

        return user
      } catch (e) {
        reply.status(404)

        return { message: 'User not found' }
      }
    }
  )
}

/**
 * Schéma d'un nouvel utilisateur
 */
export const NewUserSchema = S.object()
  .prop('email', S.string().required())
  .prop('firstname', S.string().required())
  .prop('lastname', S.string().required())
  .prop('password', S.string().required())
  .prop('role', S.string().required())
  .additionalProperties(false)

/**
 * Schéma de la mise à jour d'un utilisateur
 */
export const UpdateUserSchema = S.object()
  .prop('email', S.string())
  .prop('firstname', S.string())
  .prop('lastname', S.string())
  .prop('password', S.string())
  .prop('role', S.string())
  .additionalProperties(false)

/**
 * Schéma d'un utilisateur
 */
export const UserSchema = NewUserSchema.prop('_id', S.string().required())

/**
 * Une collection d'utilisateur
 */
export const UserCollectionSchema = S.array().items(UserSchema)
