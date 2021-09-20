// Ancienne syntax pour importer une librairie js :
// const fastify = require('fastify')
import fastify from 'fastify'

async function start() {
  /**
   * Création d'une application fastify qui nous
   * permet de démarrer un (logical) server http
   */
  const app = fastify({
    // Cette option permet d'afficher dans la console
    // ce qui se produit sur le server. Comme par
    // éxemple un erreur.
    logger: true,
  })

  console.log('Démarrage du server sur le port 9090')

  /**
   * On démarre le server sur le port 9090. app.listen
   * démarre un programme qui ne finie jamais et écoute
   * les requêtes sur le port 9090
   */
  await app.listen(9090)
}

start()
