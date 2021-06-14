// 1. Récupérer le code depuis GitHub (ne pas oublier
// npm install pour installer les node_modules)
// 2. Installer les extensions

// Require la librairie fastify
const fastify = require('fastify')

// On créé une application
const app = fastify({ logger: true })

// On lui attache « la route » (le path, l'URI, chemin)  suivi
// d'une callback en utilisant la fonction « get »
app.get('/', () => {
  return 'Hello World'
})

app.post('/articles', (request) => {
  console.warn(request.body)

  return 'Hello World !!!!!'
})

// Créer une route GET /categories qui retourne
// le tableaux suivant :
// [ 'Animaux', 'Technologie', 'Nature' ]

// Créer un route POST / categories qui affiche
// dans la console le titre de la category et retourne
// l'objet suivant :
// { status: 200 }

const start = async () => {
  await app.listen(4545)
}

start()
