# 1. Créer les routes de bases

## Exo1

1. Dans le fichier src/index.js, créer une route
   `GET /categories` qui retourne le tableaux suivant:
   `['animale', 'nature', 'science', 'technologie']`
2. Vous pouvez tester la route `GET /categories` en
   utilisant le fichier `request.http`

## Exo2

1. Dans le fichier src/index.js, créer une route
   `POST /categories` qui accépte une `request` et
   affiche dans la console le titre de la category
   et retourne l'objet suivant `{ "status": 200 }`
2. Vous pouvez utiliser le fichier `request.http`
   afin de tester la requète

## Exo3

1. Dans le fichier src/index.js, créer une route
   `GET /articles` qui retourne le tableaux suivant:
   `[ { "title": "Mon premier article" } ]`
2. Vous pouvez tester la route `GET /articles` en
   utilisant le fichier `request.http`

## Exo4

1. Dans le fichier src/index.js, créer une route
   `POST /articles` qui accépte une `request` et
   affiche dans la console le titre de l'article
   et retourne l'objet suivant `{ "status": 200 }`
2. Vous pouvez utiliser le fichier `request.http`
   afin de tester la requète

# 1. Insérer et récupérer des articles

## Exo1

1. Dans le fichier src/index.js, dans la route
   `GET /articles`, utiliser la base de données
   pour récupérer tout les articles puis les retourner
2. Vous pouvez tester en utilisant le fichier
   `request.http`

## Exo1.2

1. Dans le fichier src/index.js, dans la route
   `POST /articles`, utiliser la base de données
   pour enregistrer un article avec les données
   suivante : `titre: string, description: string, content: string`
2. Récupérer depuis la base de données l'article tout juste
   inséré
3. Retourner l'article
4. Vous pouvez tester en utilisant le fichier
   `request.http`

## Exo2

1. Dans le fichier src/index.js, dans la route
   `GET /categories`, utiliser la base de données
   pour récupérer et retourner toutes les catégories
   de la collection `categories`
2. Vous pouvez tester en utilisant le fichier
   `request.http`

## Exo3

1. Dans le fichier src/index.js, dans la route
   `GET /articles`, utiliser la base de données
   pour récupérer et retourner toutes les articles
   de la collection `articles`
2. Vous pouvez tester en utilisant le fichier
   `request.http`

## 3. Réorganiser l'application

## Exo 1 - Créer le plugin des articles

1. Créer le fichier `src/plugins/articles.js'
2. Couper / Colle tout le code concernant les articles
   dans le fichier `src/plugins/articles.js`
3. Retoucher le code pour ne plus utiliser
   `await db` mais `await app.db` !
4. Importer le plugins articles dans `src/index.js`
5. Enregistrer le plugin graçe à `app.register(<nomDuPlugin>)`
6. Tester graçe au fichier `request.http`

## Exo 2 - Schématiser les articles

1. Dans le fichier `src/plugins/articles.js` créer le schéma
   `NewArticleSchema` de la forme suivante :

   | nom du champ | type   | required |
   | ------------ | ------ | -------- |
   | title        | string | oui      |
   | description  | string | oui      |
   | content      | string | oui      |

2. Attacher le schéma sur le body de la route `POST /articles`
3. Créer le schéma `ArticleSchema` qui utilise `NewArticleSchema`
   et qui rajoute les champs suivant

   | nom du champs | type   | required |
   | ------------- | ------ | -------- |
   | `_id`         | string | oui      |

4. Attacher le schéma à la réponse 201 de la route `POST /articles`
5. Tester graçe au fichier `request.http`

## Exo 3 - Mise à jour d'une catégorie

1. Dans le fichier `src/plugins/categories.js` ajouter la route
   `PATCH /categories/:id`
2. Attacher le schéma `NewCategory` au body de cette route
3. Attacher le schéma `Category` à la réponse 200 de cette route
4. Récupérer la catégorie avec l'id spécifié en paramètre (`request.params.id`).
   Optionel: Vous pouvez retourner une réponse 404 si la catégorie n'éxiste pas.
5. Changer le titre de la catégorie graçe à `await app.db.collection('categories').updateOne()`.
   (vous pouvez vous aider ici: https://slides.com/davidjegat-1/nodejs-mongodb/fullscreen#/30)
6. Récupérer la catégorie mise à jour grace à `findOne`
7. Retourner la catégorie
8. Tester graçe au fichier `request.http`

## Exo 4 - Suppression d'une catégorie

1. Dans le fichier `src/plugins/categories.js` ajouter la route
   `DELETE /categories/:id`
2. Attacher le schéma `Category` à la réponse 200 de cette route
3. Récupérer la catégorie avec l'id spécifié en paramètre (`request.params.id`).
   Optionel: Vous pouvez retourner une réponse 404 si la catégorie n'éxiste pas.
4. Supprimer la catégorie graçe à `await app.db.collection('categories').deleteOne()`.
   (vous pouvez vous aider ici: https://slides.com/davidjegat-1/nodejs-mongodb/fullscreen#/31)
5. Retourner la catégorie supprimé
6. Tester graçe au fichier `request.http`

## Exo 5 - Mise à jour d'un article

1. Dans le fichier `src/plugins/articles.js` ajouter la route
   `PATCH /articles/:id`
2. Créer et attacher le schéma `UpdateArticle` au body de cette route
3. Attacher le schéma `Article` à la réponse 200 de cette route
4. Récupérer l'article avec l'id spécifié en paramètre (`request.params.id`).
   Optionel: Vous pouvez retourner une réponse 404 si l'article n'éxiste pas.
5. Changer les champs de l'article graçe à `await app.db.collection('articles').updateOne()`.
   (vous pouvez vous aider ici: https://slides.com/davidjegat-1/nodejs-mongodb/fullscreen#/30)
6. Récupérer l'article mis à jour grace à `findOne`
7. Retourner l'article
8. Tester graçe au fichier `request.http`

## Exo 6 - Supprimer un article

1. Dans le fichier `src/plugins/articles.js` ajouter la route
   `DELETE /articles/:id`
2. Attacher le schéma `Article` à la réponse 200 de cette route
3. Récupérer l'article avec l'id spécifié en paramètre (`request.params.id`).
   Optionel: Vous pouvez retourner une réponse 404 si l'article n'éxiste pas.
4. Supprimer l'article graçe à `await app.db.collection('articles').deleteOne()`.
   (vous pouvez vous aider ici: https://slides.com/davidjegat-1/nodejs-mongodb/fullscreen#/31)
5. Retourner l'article supprimé
6. Tester graçe au fichier `request.http`

## 4. Les utilisateurs

1. Créer un fichier `src/schemas/user.js`, ajouter un schema
   avec les champs suivant:

```
*email: string
*password: string
firstname: string
lastname: string
image: string
```

2. Importer ce schemas depuis notre `src/index.js`
3. Créer un fichier `src/routes/user.js` et ajouter une route
   `POST /users` qui accèpte un user dans le body de la request
   et enregistre l'utilisateur en base de données
4. Ajouter une route `GET /users` qui retourne tout les utilisateurs
   en base de données
5. Importer `src/routes/user.js` dans `src/index.js`
6. Vous pouvez tester `POST /users` et `GET /users` dans le fichier
   `request.http`

## 5. Authentification

1. Créer un schéma dans `src/schema/users.js` que nous appelerons
   "credential" et qui est de forme suivante :

```
*email: string
*password: string
```

2. Ajoute une route `POST /authenticate` dans `src/routes/users.js`. Dans
   cette route, nous récupérons l'utilisateur avec l'email et le mot de passe
   renseigné dans le body de request (pour la vérification du mot de passe
   vous devrez probablement utiliser le module crypto ...).
3. Nous générons un token grace à `app.jwt.sign(user)`
4. Nous retournons l'objet suivant: `{ "token": "<token>"}`

## 6. Tester les utilisateurs

1. Dans le fichier `src/__tests__/users.test.js`, ajouter un test qui
   authentifie un utilisateur et s'assure de recevoir un token
1. Dans le fichier `src/__tests__/users.test.js`, ajouter un test qui
   test la liste des utilisateurs et qu'elle ne soit pas vide

## 7. Ajout de configuration

1. Ajouter dans le fichier `.env.dist` (ainsi que votre fichier `.env`) les
   valeurs suivantes:

```
JWT_SECRET=secretDuJwt
PORT=4545
HOST=localhost
```

2. Modifier le fichier `src/app.js` pour utiliser la variable: `process.env.JWT_SECRET`

3. Modifier dans le fichier `src/index.js` la fonction `app.listen` et lui
   spécifier 2 paramètres : `process.env.PORT`, `process.env.HOST`

## 8. Ajouter la modification et la suppression

1. Ajouter dans le fichier `src/schemas/categories.js` un nouveau
   schema 'category_update' de la même forme que category mais sans
   aucun champs requis

2. Ajouter dans le fichier `src/schemas/articles.js` un nouveau
   schema 'article_update' de la même forme que article mais sans
   aucun champs requis

3. Ajouter dans le fichier `src/routes/categories.js` une route pour
   `PATCH /categories/:id`. Cette route doit récupérer la category avec l'identifiant
   donné puis mettre à jour la category avec les données de
   la requête. Une fois l'opération terminé, retourner la nouvelle catégory
   enregistré en base de données (cette route doit être accessible uniquement
   au utilisateur authentifié)

4. Ajouter dans le fichier `src/routes/categories.js` une route pour
   `DELETE /categories/:id`. Cette route doit récupérer la category avec l'identifiant
   donné puis la supprimer. Pour la supprimer utiliser `app.collection('..').deleteOne({ _id: 'dflksdhfkdhf' })`. Une fois la catégory supprimé, retourner
   le status code 204 ainsi qu'une valeur `null` (cette route doit être accessible uniquement
   au utilisateur authentifié)

5. Ajouter dans le fichier `src/routes/articles.js` une route pour
   `PATCH /articles/:id`. Cette route doit récupérer l'article avec l'identifiant
   donné puis mettre à jour l'article avec les données de
   la requête. Une fois l'opération terminé, retourner le nouvel article
   enregistré en base de données (cette route doit être accessible uniquement
   au utilisateur authentifié)

6. Ajouter dans le fichier `src/routes/articles.js` une route pour
   `DELETE /articles/:id`. Cette route doit récupérer l'article avec l'identifiant
   donné puis le supprimer. Pour le supprimer utiliser `app.collection('..').deleteOne({ _id: 'dflksdhfkdhf' })`. Une fois l'article supprimé, retourner
   le status code 204 ainsi qu'une valeur `null` (cette route doit être accessible uniquement
   au utilisateur authentifié)
