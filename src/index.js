/**
 * Nous importons la librairie fastify
 */
import Fastify from 'fastify'
import createBook from './plugins/books/create-book.js'
import listBook from './plugins/books/list-books.js'
import getBook from './plugins/books/get-book.js'
import bookDecorator from './plugins/decorators/books.js'
import dbDecorator from './plugins/decorators/db.js'
import fp from 'fastify-plugin'


/**
 * Exercices :
 * 
 * 1. Utiliser la base de données dans le plugin 'src/plugins/books/create-book.js'.
 *    Pour cela vous pouvez récupérer le contenu de la requête en
 *    utilisant "request.body" et ensuite l'enregistré dans la base
 *    de données, Pour terminer retourner le document nouvellement
 *    inséré dans la base de données
 * 
 * 2. Utiliser la base de données dans le plugin 'src/plugins/books/list-books.js'.
 * 
 * 3. Créer un plugin 'src/plugins/books/delete-book.js' qui créer une
 *    route DELETE /books/:id et supprime le livre avec l'id
 *    spécifié
 */


/**
 * Voici la fonction principale de notre programme
 */
async function main() {
  /**
   * Nous pouvons créer une application fastify
   */
  const app = Fastify({
    /* Ici nous spécifions des options.
    l'option logger nous permet de débugger notre
    serveur lorsque nous avons des erreurs */
    logger: true,
  })

  /**
   * Nous incluons en premier les plugins
   * decorators.
   * 
   * !Attention! si nous souhaitons décorer TOUT les plugins
   * (et pas uniquement le plugin decotaror). Il faut
   * installer et utiliser 'fastify-plugin'
   */
  app.register(fp(bookDecorator))
  app.register(fp(dbDecorator))

  /**
   * Nous enregistrons le plugin "createBook" dans
   * notre application :
   */
  app.register(createBook)
  app.register(listBook)
  app.register(getBook)

  /**
   * Nous pouvons démarer un server logique sur
   * notre machine
   */
  app.listen(
    /* Le port */ 3030,
    /* l'adresse de la machine, ici notre machine */ 'localhost',
    /* Une fonction qui se lance, un fois le server demarré */ () => {
      console.log(
        "Le server est disponible sur l'adresse : http://localhost:3030",
      )
    },
  )
}

/**
 * Nous appelons fonction principale qui démarre notre application
 */
main()