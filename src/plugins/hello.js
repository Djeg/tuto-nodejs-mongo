/**
 * Nous exportons un plugin. Un plugin est
 * une fonction asynchrone qui reçoit l'application
 * fastify
 */
export default async function helloPlugin(app) {
  /**
   * Nous définissons la route hello
   */
  app.get('/hello', async () => {
    return 'Hello tout le monde, comment allez-vous ?'
  })
}
