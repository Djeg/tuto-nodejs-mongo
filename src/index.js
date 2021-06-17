// On inclue la librairie dotenv qui nous permet
// de lire le fichier `.env` qui contient la configuration
const dotenv = require('dotenv')
const { build } = require('./app')
// Nous lisons le fichier .env
dotenv.config()

const start = async () => {
  const app = await build()

  // On démarre l'application
  await app.listen(4545)
}

start()
