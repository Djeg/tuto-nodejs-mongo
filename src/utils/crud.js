import mongo from 'mongodb'

/**
 * Récupartion d'une seul resource
 */
export async function retrieveOne({
  collection,
  id,
  reply,
  errorMessage = 'Resource not found',
}) {
  try {
    const resource = await collection.findOne({
      _id: mongo.ObjectId(id),
    })

    return resource
  } catch (e) {
    reply.status(404)

    return { message: errorMessage }
  }
}

/**
 * Création d'une resource
 */
export async function create({ collection, reply, data }) {
  const result = await collection.insertOne(data)

  const resource = await collection.findOne({
    _id: mongo.ObjectId(result.insertedId),
  })

  reply.status(201)

  return resource
}

/**
 * Mise à jour d'une resource
 */
export async function update({
  collection,
  id,
  reply,
  data,
  errorMessage = 'Resource not found',
}) {
  try {
    const result = await collection.updateOne(
      { _id: mongo.ObjectId(id) },
      { $set: data }
    )

    if (0 === result.modifiedCount) throw Error()

    const resource = await collection.findOne({
      _id: mongo.ObjectId(id),
    })

    if (!resource) throw Error()

    return resource
  } catch (e) {
    reply.status(404)

    return { message: errorMessage }
  }
}

/**
 * Suppression d'une resource
 */
export async function remove({
  collection,
  id,
  reply,
  errorMessage = 'Resource not found',
}) {
  try {
    const resource = await collection.findOne({
      _id: mongo.ObjectId(id),
    })

    if (!resource) throw Error()

    await collection.deleteOne({
      _id: mongo.ObjectId(id),
    })

    return resource
  } catch (e) {
    reply.status(404)

    return { message: errorMessage }
  }
}
