// Un plugin fastify est un fichier javascript
// qui exporte une fonction asynchrone recevant
// l'application en premier paramètre
export default async (app) => {
  // Création d'une route GET sur le chemin "/"
  app.get('/', () => {
    console.log(app.db)

    return 'Bienvenue sur notre API'
  })
}
