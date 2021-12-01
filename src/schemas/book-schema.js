/**
 * Nous importons la librairie JSON fluent schema
 */
import S from 'fluent-json-schema'

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


/**
 * Création du schéma d'un livre
 */
export const bookSchema = newBookSchema
  .title('Book')
  .description('Un livre dans l\'api')
  .prop('_id', S.string().required())

/**
 * Création du schéma d'une collection de livre
 */
export const bookCollectionSchema = S.array()
  .title('BookCollection')
  .description('Collection de livres')
  .items(bookSchema)