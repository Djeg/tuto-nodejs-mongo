import mongo from 'mongodb'

/**
 * Définie le model de base pour tout les modèles
 * de notre domaine
 */
export default class BaseModel {
  constructor(db, collection) {
    this.db = db
    this.collection = collection
  }

  /**
   * Permet de créer un document dans la collection
   * de notre modèle
   */
  async create(document) {
    const result = await this.db.collection(this.collection).insertOne(document)

    return this.db.collection(this.collection).findOne({
      _id: result.insertedId,
    })
  }

  /**
   * Permet de récupér un document par son id
   */
  async get(id) {
    return this.db.collection(this.collection).findOne({
      /**
       * Nous devons convertir l'id (string) en object ID !
       */
      _id: mongo.ObjectId(id),
    })
  }

  /**
   * Permet de supprimer un document par son id
   */
  async delete(id) {
    const objectId = mongo.ObjectId(id)

    const document = await this.db.collection(this.collection).findOne({
      _id: objectId,
    })

    if (!document) {
      throw new Error(
        `Unable to find the document in the collection ${this.collection} with id ${id}`,
      )
    }

    await this.db.collection(this.collection).deleteOne({
      _id: objectId,
    })

    return document
  }

  /**
   * Permet de mettre à jour un document par son id
   */
  async update(id, updateDocument) {
    const objectId = mongo.ObjectId(id)

    const document = await this.db.collection(this.collection).findOne({
      _id: objectId,
    })

    if (!document) {
      throw new Error(
        `Unable to find the document in the collection ${this.collection} with id ${id}`,
      )
    }

    await this.db
      .collection(this.collection)
      .updateOne(
        { _id: objectId },
        { $set: { ...document, ...updateDocument } },
      )

    return this.db.collection(this.collection).findOne({
      _id: objectId,
    })
  }
}
