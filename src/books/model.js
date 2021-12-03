import BaseModel from '../lib/base-model.js'

/**
 * Création du model pour les livres
 */
export default class BookModel extends BaseModel {
  /**
   * Recherche des livres en envoyant des critéres de recherche
   */
  async search(criteria) {
    let filters = {}
    const page = parseInt(criteria.page) || 1
    const orderBy = criteria.orderBy || 'title'
    const direction = criteria.direction || 'DESC'
    const limit =
      criteria.limit || parseInt(process.env.API_DEFAULT_COLLECTION_LIMIT)

    if (criteria.title) {
      filters = { ...filters, title: { $regex: criteria.title } }
    }

    if (criteria.minPrice) {
      filters = { ...filters, price: { $gte: criteria.minPrice } }
    }

    if (criteria.maxPrice) {
      if (criteria.minPrice) {
        filters = {
          ...filters,
          price: {
            $gte: criteria.minPrice,
            $lte: criteria.maxPrice,
          },
        }
      } else {
        filters = {
          ...filters,
          price: { $lte: criteria.maxPrice },
        }
      }
    }

    if (criteria.category) {
      filters = {
        ...filters,
        'category.title': { $regex: criteria.category },
      }
    }

    return this.db
      .collection(this.collection)
      .find(filters)
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ [orderBy]: 'ASC' === direction ? 1 : -1 })
      .toArray()
  }
}
