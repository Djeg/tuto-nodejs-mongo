// Ancienne syntax pour importer une librairie js :
// const fastify = require('fastify')

/**
 * On importe la librairie fastify et mongodb
 */
import fastify from 'fastify'
import mongo from 'mongodb'
import S from 'fluent-json-schema'

/**
 * On créé une fonction de démarrage asynchrone afin
 * de pouvoir utiliser le mot clefs await
 */
async function start() {
  /**
   * Nous nous connéctons au cluster mongodb
   * (à la machine qui contient mongodb)
   */
  const client = await mongo.MongoClient.connect(
    'mongodb+srv://blog:blog@cluster0.odhgb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )

  /**
   * Nous récupérons une référence vers une base de données
   */
  const db = client.db('blog')

  /**
   * Création d'une application fastify qui nous
   * permet de démarrer un (logical) server http
   */
  const app = fastify({
    // Cette option permet d'afficher dans la console
    // ce qui se produit sur le server. Comme par
    // éxemple une erreur.
    logger: true,
  })

  /**
   * On route de test, pour dire bonjour
   */
  app.get('/hello', async (/*request*/) => {
    //request.body.title
    return 'Hello tout le monde'
  })

  /**
   * On route de test, pour retourner un utilisateur
   */
  app.get('/user', async () => {
    return {
      id: 1,
      username: 'john',
      email: 'john@mail.com',
    }
  })

  /**
   * Création d'un schema pour les nouvelles catégorie
   */
  const newCategorySchema = S.object()
    .prop('title', S.string().required())
    .additionalProperties(false)

  /**
   * Création d'un schéma pour les catégorie
   */
  const categorySchema = newCategorySchema.prop('_id', S.string().required())

  /**
   * Récupération des categories.
   */
  app.get('/categories', async () => {
    /**
     * Ici nous récupérons l'ensemble des catégories
     * dans un tableaux
     */
    const categories = await db.collection('categories').find().toArray()

    return categories
  })

  /**
   * Création d'une category
   */
  app.post(
    '/categories',
    {
      schema: {
        response: {
          201: categorySchema,
        },
        body: newCategorySchema,
      },
    },
    async (request, reply) => {
      /**
       * Ici on insére une catégorie dans mongodb
       *
       * result ici est un InsertOneResult, un objet
       * qui contient 2 propriétés:
       * - acknownledged : Un boolean, true si l'insertion c'est
       *   bien passé, false sinon
       * - insertedId : L'ID généré par mongodb pour notre category
       */
      const result = await db.collection('categories').insertOne(request.body)

      /**
       * On récupére la catégorie qui vient d'être inséré
       */
      const category = await db.collection('categories').findOne({
        _id: mongo.ObjectId(result.insertedId),
      })

      reply.status(201)

      /**
       * On renvoie la category dans la réponse http
       */
      return category
    }
  )

  /**
   * Récuparation des articles.
   */
  app.get('/articles', async () => {
    const articles = await db.collection('articles').find().toArray()

    return articles
  })

  /**
   * Récupération d'un seul article
   */
  app.get('/articles/:id', async (request) => {
    const id = request.params.id

    return {
      id: id,
      title: 'test',
    }
  })

  /**
   * Création d'un article
   */
  app.post('/articles', async (request) => {
    const result = await db.collection('articles').insertOne(request.body)

    const article = await db.collection('articles').findOne({
      _id: mongo.ObjectId(result.insertedId),
    })

    return article
  })

  console.log('Démarrage du server sur le port 9090')
  /**
   * On démarre le server sur le port 9090. app.listen
   * démarre un programme qui ne finie jamais et écoute
   * les requêtes sur le port 9090
   */
  await app.listen(9090)
}

/**
 * On lance la fonction de démarrage
 */
start()
