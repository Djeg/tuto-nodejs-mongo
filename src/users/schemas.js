import S from 'fluent-json-schema'

/**
 * Schéma d'un nouvelle utilisateur
 */
export const NewUser = S.object()
  .title('NewUser')
  .description('Définie un nouvelle utilisateur')
  .prop('email', S.string().required())
  .prop('password', S.string().required())

/**
 * Schéma d'un utilisateur
 */
export const User = NewUser.prop('_id', S.string().required())

/**
 * Schéma des crédentielles utilisé pour se connécter
 */
export const Credential = S.object()
  .title('Credental')
  .description('Contient les informations nescessaire pour se connécter')
  .prop('email', S.string().required())
  .prop('password', S.string().required())
