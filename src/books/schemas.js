/**
 * Nous importons la librairie JSON fluent schema
 */
import S from 'fluent-json-schema'
import { newCategorySchema } from '../categories/schemas.js'

/**
 * @module books/schemas
 *
 * Concerne les livres. C'est ici qu'on retrouve les composants
 * qui forme un livre ainsi que les objets nous permettant
 * de créer, lister, mettre à jour des livres.
 */

/**
 * Création du schéma d'un nouveau livre
 */
export const newBookSchema = S.object()
  /**
   * Définie le titre de notre schéma. C'est utilisé
   * qu'a des fins de documentation.
   */
  .title('NewBook')
  /**
   * Founie une description pour notre schéma. C'est utilisé
   * qu'a des fins de documentation.
   */
  .description('Correspond à un nouveau livre dans notre api')
  /**
   * On supprime la possibilité de rajouter des propriétés
   * additionelles à notre objet.
   */
  .additionalProperties(false)
  /**
   * On définie une propriété "title" de type string et requise
   */
  .prop('title', S.string().required())
  .prop('description', S.string().required())
  .prop('image', S.string().required())
  .prop('price', S.number().exclusiveMinimum(0).required())
  .prop('category', newCategorySchema)

/**
 * Création du schéma d'une mise à jour d'un livre
 */
export const updateBookSchema = S.object()
  .title('UpdateBook')
  .description("Correspond à une mise à jour d'un livre dans notre api")
  .prop('title', S.string())
  .prop('description', S.string())
  .prop('image', S.string())
  .prop('price', S.number().exclusiveMinimum(0))
  .prop('category', newCategorySchema)

/**
 * Création du schéma d'un livre
 */
export const bookSchema = newBookSchema
  .title('Book')
  .description("Un livre dans l'api")
  .prop('_id', S.string().required())

/**
 * Création du schéma d'une collection de livre
 */
export const bookCollectionSchema = S.array()
  .title('BookCollection')
  .description('Collection de livres')
  .items(bookSchema)

/**
 * Création du schéma de recherche de livres
 */
export const searchBookCriteriaSchema = S.object()
  .title('SearchBookCriteria')
  .description('Permet de rechercher des livres')
  .prop('limit', S.number().exclusiveMinimum(0))
  .prop('page', S.number().exclusiveMinimum(0))
  .prop('orderBy', S.enum(['title', 'price', '_id']))
  .prop('direction', S.enum(['ASC', 'DESC']))
  .prop('title', S.string())
  .prop('minPrice', S.number())
  .prop('maxPrice', S.number())
  .prop('category', S.string())
