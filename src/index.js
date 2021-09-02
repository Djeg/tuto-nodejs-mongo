// On importe la librairie fastify
const fastify = require('fastify')
// On importe la librairie mongodb
const mongodb = require('mongodb')
// On importe le plugin routes/home
const home = require('./routes/home')
// On importe le plugin routes/categories
const categories = require('./routes/categories')
// On importe le plugin routes/articles
const articles = require('./routes/articles')

async function main() {
  // Créer une application fastify.
  // Une application fastify c'est ce qui vas contenir
  // toutes nos routes
  const app = fastify({ logger: true })

  // Se connécter au cluster
  const connection = await mongodb.MongoClient.connect(
    'mongodb+srv://blog:blog@cluster0.78yvz.mongodb.net/blog?retryWrites=true&w=majority'
  )

  // On récupére la base de données (Cette fonction N'EST PAS ASYNCHRONE)
  const db = connection.db('blog')

  // La décoration permet de rendre accessible
  // n'importe valeur en utilisant directement
  // l'application.
  // Ici, app.db retourneras toujours la base de données
  app.decorate('db', db)

  // On connécte le plugin grace à la fonction "register"
  // routes home à l'application
  app.register(home)
  app.register(categories)
  app.register(articles)

  /**
   * 1. Créer une route PATCH /categories/:id dans le plugin
   *    src/routes/categories
   *    (Vous pouvez récupérer l'id dans votre
   *    route grace à request.params.id)
   * 2. Attaché un schéma pour mettre à jour une catégorie
   * 3. Mettre à jour la catégorie dans mongodb
   * 4. Tester la route avec le fichier request.http
   *
   * 5. Faire la même chose pour PATCH /articles/:id
   */

  /**
   * 1. Créer les routes suivantes
   *    - GET /categories/:id
   *    - DELETE /categories/:id
   *    - GET /articles/:id
   *    - DELETE /articles/:id
   */

  // On lance le serveur sur le port 8080
  app.listen(8080)
}

main()
