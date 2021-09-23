import mongo from 'mongodb'
import S from 'fluent-json-schema'

/**
 * Un plugin qui contient toutes les routes
 * de la resource categories
 */
export default async function categoriesPlugin(app) {
  /**
   * Récupération des categories.
   */
  app.get(
    '/categories',
    {
      schema: {
        response: {
          200: CategoryCollectionSchema,
        },
      },
    },
    async () => {
      /**
       * Ici nous récupérons l'ensemble des catégories
       * dans un tableaux
       */
      const categories = await app.db.collection('categories').find().toArray()

      return categories
    }
  )

  /**
   * Création d'une category
   */
  app.post(
    '/categories',
    {
      schema: {
        response: {
          201: CategorySchema,
        },
        body: NewCategorySchema,
      },
    },
    async (request, reply) => {
      /**
       * Ici on insére une catégorie dans mongodb
       *
       * result ici est un InsertOneResult, un objet
       * qui contient 2 propriétés:
       * - acknownledged : Un boolean, true si l'insertion c'est
       *   bien passé, false sinon
       * - insertedId : L'ID généré par mongodb pour notre category
       */
      const result = await app.db
        .collection('categories')
        .insertOne(request.body)

      /**
       * On récupére la catégorie qui vient d'être inséré
       */
      const category = await app.db.collection('categories').findOne({
        _id: mongo.ObjectId(result.insertedId),
      })

      reply.status(201)

      /**
       * On renvoie la category dans la réponse http
       */
      return category
    }
  )

  /**
   * Modification d'une catégorie
   */
  app.patch(
    '/categories/:id',
    {
      schema: {
        body: NewCategorySchema,
        response: {
          200: CategorySchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const result = await app.db
          .collection('categories')
          .updateOne(
            { _id: mongo.ObjectId(request.params.id) },
            { $set: request.body }
          )

        if (0 === result.modifiedCount) {
          throw Error()
        }

        const category = await app.db.collection('categories').findOne({
          _id: mongo.ObjectId(request.params.id),
        })

        return category
      } catch (e) {
        reply.status(404)

        return { message: 'Category not found' }
      }
    }
  )
}

/**
 * Création d'un schema pour les nouvelles catégorie
 */
export const NewCategorySchema = S.object()
  .prop('title', S.string().required())
  .additionalProperties(false)

/**
 * Création d'un schéma pour les catégorie
 */
export const CategorySchema = NewCategorySchema.prop(
  '_id',
  S.string().required()
)

/**
 * Création d'un schema pour une collection de catégory
 */
export const CategoryCollectionSchema = S.array().items(CategorySchema)
