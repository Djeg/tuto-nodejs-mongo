const dotenv = require('dotenv')
dotenv.config()

const mongodb = require('mongodb')

async function main() {
  console.info('Connecting to mongodb ...')
  const connection = await mongodb.MongoClient.connect(process.env.MONGO_URL)
  console.info('DONE')
  const db = connection.db('blog')

  console.info('Creating indexes ...')
  await db.collection('users').createIndex({ email: 1 }, { unique: true })
  console.info('DONE')

  //  Ici je termine mon script
  process.exit(0)
}

main()
