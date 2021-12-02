# Exercices

## Exo 1 : Créer la route pour modifier un livre

1. Créer le plugin `src/plugins/books/patch-book.js`
2. Créer à l'intérieur du plugin la route : `PATCH /book/:id`
3. Récupérer le livre depuis la base de données `app.db.findOne`
4. Si le livre n'éxiste pas, retourner une erreur 404
5. Modifier le livre avec les champs reçu depuis le body de la request
6. N'oublier pas d'ajouter les schèmas
7. Brancher votre plugin dans le fichier `src/index.js`
8. Tester la route soit avec swagger, soit avec le fichier `request.http`

## Exo 2 : Créer une catégorie

1. Ajouter la possibilité de créer une nouvelle catégorie
   qui doit réspécter le schéma suivant :

```
title: string
```

## Exo 3 : Modifier, afficher et supprimer une catégorie

1. Ajouter un plugin et une route pour afficher une catégorie
   graçe à son ID
2. Ajouter un plugin et une route pour modifier une catégorie
   graçe à son ID
3. Ajouter un plugin et une route pour supprimer une catégorie
4. Ajouter un plugin et une route pour lister les catégories

## Exo 4 : Lier les catégories au livres

1. Dans la route `POST /books` ajouter la possibilité de lui lier
   une catégorie :

```
{
  title: 'Mon livre',
  description: 'Ma Description',
  price: 10.2,
  image: 'dfhsdlfhsfkdshfh',
  category: {
    title: 'Ma catégorie',
  },
}
```

2. Modifier les routes `GET /books/:id`, `DELETE /books/:id`, `PATCH /books/:id` ainsi
   que `GET /books` afin que les livres contienne la categorie
