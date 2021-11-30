/**
 * Contient la décoration de notre application
 * avec les livres
 */
export default async function (app) {
  /**
   * Nous décorons l'application avec les livres
   */
  app.decorate('books', [
    { id: 1, title: "Harry Potter" },
    { id: 2, title: "Livre 2" },
    { id: 3, title: "Livre 3" },
    { id: 4, title: "Livre 4" },
    { id: 5, title: "Livre 5" },
  ])
}