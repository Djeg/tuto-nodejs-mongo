import S from 'fluent-json-schema'

/**
 * Schéma d'une pagination
 */
export const PaginationSchema = S.object()
  .prop('page', S.number())
  .prop('limit', S.number())

/**
 * Paginate a collection
 */
export async function paginateCursor({
  cursor,
  page = 1,
  limit = Number(process.env.DEFAULT_PAGINATION_LIMIT),
}) {
  const offset = (page - 1) * limit

  const result = await cursor.limit(limit).skip(offset).toArray()

  return result
}
