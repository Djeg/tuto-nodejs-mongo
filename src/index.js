// On importe la librairie fastify
const fastify = require('fastify')
// On importe la librairie mongodb
const mongodb = require('mongodb')
// On importe le plugin routes/home
const home = require('./routes/home')
// On importe le plugin routes/categories
const categories = require('./routes/categories')

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

  /**
   * 1. Creer un plugin dans src/routes/articles.js
   * 2. Brancher le plugin dans src/index.js
   * 3. Couper / Coller et retoucher le code des routes:
   *    get /articles, post /articles
   */

  /**
   * 1. Créer une route PATCH /categories dans le plugin
   *    src/routes/categories
   * 2. Attaché un schéma pour mettre à jour une catégorie
   * 3. Mettre à jour la catégorie dans mongodb
   * 4. Tester la route avec le fichier request.http
   *
   * 5. Faire la même chose pour PATCH /articles
   */

  /**
   * 1. Créer les routes suivantes
   *    - GET /categories/:id
   *    - DELETE /categories/:id
   *    - GET /articles/:id
   *    - DELETE /articles/:id
   */

  // Récupére les articles
  app.get('/articles', async () => {
    // Récupération des articles de la collection articles
    const articles = await db.collection('articles').find().toArray()

    // On retourne la liste des articles
    return articles
  })

  // Création d'un article
  app.post(
    '/articles',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'description', 'content'],
          properties: {
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            content: {
              type: 'string',
            },
          },
        },
      },
    },
    async (request, reply) => {
      // Nous récupérons l'article depuis le corps de la requête
      const article = request.body

      // enregistrement de l'article dans la base de données
      const result = await db.collection('articles').insertOne(article)

      // Récupération de l'article enregistré en base de données
      const insertedArticle = await db.collection('articles').findOne({
        _id: mongodb.ObjectId(result.insertedId),
      })

      // Nous spécifions un code HTTP 201 Created
      reply.code(201)

      // Nous retournons l'article nouvellement créé
      return insertedArticle
    }
  )

  // On lance le serveur sur le port 8080
  app.listen(8080)
}

main()
