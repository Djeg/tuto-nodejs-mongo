import S from 'fluent-json-schema'

/**
 * Schèma d'une nouvelle catégorie
 */
export const newCategorySchema = S.object()
  .title('NewCategory')
  .description('Nouvelle catégorie')
  .prop('title', S.string().required())

/**
 * Schèma d'une catégorie
 */
export const categorySchema = newCategorySchema
  .title('Category')
  .description('Une catégorie')
  .prop('_id', S.string().required())

/**
 * Schéma de la collection d'une catégorie
 */
export const categoryCollectionSchema = S.array()
  .title('CategoryCollection')
  .description('La liste des catégories')
  .items(categorySchema)