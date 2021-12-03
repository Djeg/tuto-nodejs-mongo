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

## Exo 5 : Créer un système de pagination et de recherche

1. Créer le schèma pour rechercher des livres (searchBookCriteriaSchema). Ce schèma
   doit contenir les champs suivant :

- limit (number)
- page (number)
- orderBy (enum, soit title, price, \_id)
- direction (enum, -1 décroissant, 1 croissant)
- title (string)
- minPrice (number)
- maxPrice (number)
- category (string)

2. Dans la route 'GET /books', ajouter le schema définie plus haut au `querystring`

3. Afin de limiter les résultat nous pouvons utiliser la fonction `limit` du curseur
   mongodb example :

   ```js
   // Pour récupérer une query string : request.query.limit
   const books = await app.db.collection('books').find().limit(10).toArray()
   ```

4. Définir une nouvelle variable d'environement `API_DEFAULT_COLLECTION_LIMIT` et lui
   la valeur `25`. Faire en sorte d'utilise la variable d'environement lorsqu'il n'y
   a pas de limite dans les query string

5. Afin de créer un système de page, nous pouvons utiliser la fonction `skip` du
   curseur mongodb example :

   ```js
   const books = await app.db
     .collection('books')
     .find()
     .limit(10)
     .skip(10)
     .toArray()
   ```

6. Afin de créer un système de triage des résultat, nous pouvons utiliser la fonction
   `sort` du curseur mongo example :

   ```js
   const books = await app.db
     .collection('books')
     .find()
     .sort({ title: -1 })
     .toArray()
   ```

7. Afin de faire un recherche par titre, il faut utiliser le "query operator" `$regex` :

```js
const books = await app.db
  .collection('books')
  .find({ title: { $regex: 'har' } })
```

8. Afin de rechercher par prix minimum et maximum, il faut utiliser les "query operator"
   suivant `$gte` (plus grand que ou égale), `$lte` (moins grand que ou égale), `$and` (et) :

```js
const books = await app.db.collection('books').find({ price: { $gte: 3.5 } })
const books = await app.db.collection('books').find({ price: { $lte: 10 } })
const books = await app.db
  .collection('books')
  .find({ price: { $and: { $gte: 2.5, $lte: 10 } } })
```

9. Faire la recheche par catégorie :

```js
const books = await app.db
  .collection('books')
  .find({ 'category.title': { $regex: 'test' } })
```

## Exo 6 : Creer un utilisateur

1. Créer les schémas (NewUser) et (User) avec les champs suivants :

- `email (string)`
- `password (string)`

2. Créer la route POST /users qui créé un utilisateur dans la base de données

(3. Trouver le moyen de crypter mot de passe)
