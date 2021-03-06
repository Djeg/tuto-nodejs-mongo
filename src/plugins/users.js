import mongo from 'mongodb'
import crypto from 'crypto'
import S from 'fluent-json-schema'
import { PaginationSchema, paginateCursor } from '../utils/pagination.js'
import { retrieveOne, create, update, remove } from '../utils/crud.js'

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
    async (request, reply) =>
      retrieveOne({
        collection: app.db.collection('users'),
        id: request.params.id,
        reply,
        errorMessage: 'User not found',
      })
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
    async (request, reply) =>
      create({
        collection: app.db.collection('users'),
        data: {
          ...request.body,
          password: crypto
            .createHmac('sha256', 'secret')
            .update(request.body.password)
            .digest('hex'),
        },
        reply,
      })
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
    async (request, reply) =>
      update({
        collection: app.db.collection('users'),
        id: request.params.id,
        data: request.body,
        errorMessage: 'User not found',
        reply,
      })
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
    async (request, reply) =>
      remove({
        collection: app.db.collection('users'),
        id: request.params.id,
        errorMessage: 'User not found',
        reply,
      })
  )

  /**
   * Création d'un token d'authorization
   */
  app.post(
    '/users/token',
    {
      schema: {
        tags: ['user'],
        body: UserCredentialSchema,
      },
    },
    async (request, reply) => {
      try {
        const user = await app.db.collection('users').findOne({
          email: request.body.email,
          password: crypto
            .createHmac('sha256', 'secret')
            .update(request.body.password)
            .digest('hex'),
        })

        if (!user) throw Error()

        const token = app.jwt.sign(user)

        return { token }
      } catch (e) {
        reply.status(400)

        return { message: 'Invalid password and/or email' }
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

/**
 * Contient les information de connexion d'un utilisateur
 */
export const UserCredentialSchema = S.object()
  .prop('email', S.string().required())
  .prop('password', S.string().required())
  .additionalProperties(false)
