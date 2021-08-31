# Tuto Nodejs et mongo

Ce projet contient un tutorielle pour nodejs et
mongodb.

## Suivre la formation

Vous pouvez retrouver le support de la formation
juste ici : https://slides.com/davidjegat-1/nodejs-mongodb/fullscreen

Vous pouvez aussi suivre ainsi que copier coller
le code durant toute la formation sur ce lien :
https://github1s.com/Djeg/tuto-nodejs-mongo

## Les prérequis

Afin de suivre la formation et d'avoir tout les outils
nescessaire il vous faut d'abord les prérequis suivant :

- Un terminal comme [Git Bash](https://gitforwindows.org/)
- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB Compass](https://www.mongodb.com/fr-fr/products/compass)
- Ainsi que MongoDB, pour cela soit directement via
  le service cloud [MongoDB Atlas](https://www.mongodb.com/fr-fr/cloud/atlas) ou bien en [l'installant sur
  votre machine](https://www.mongodb.com/try/download/community)
- Un éditeur de code, [VSCode est fortement conseillé](https://code.visualstudio.com/)
- Les extensions suivante sont conseillé pour VSCode :
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [DotENV](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
  - [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## Installation

Pour installer le projet suivez ces instructions :

### 1. Télécharger le projet sur votre machine

Pout le télécharger plusieurs choix:

- Git clone: `git clone https://github.com/Djeg/tuto-nodejs-mongo.git`
- [Téléchargement direct](https://github.com/Djeg/tuto-nodejs-mongo/archive/refs/heads/main.zip)

### 2. Installer le projet

Se rendre avec un terminal dans le répertoire du projet
et lancer la commande: `npm install`

### 3. Configurer le projet

Copier coller le fichier `.env.dist` en `.env` et éditer
les valeurs configurations si besoin.

### 4. Démarrer le serveur

Depuis le répertoire du projet, dans un terminal, éxécuter
la commande : `npm start`

## Exercices

### 1. Créer les routes de bases

#### Exo1

1. Dans le fichier src/index.js, créer une route
   `GET /categories` qui retourne le tableaux suivant:
   `['animale', 'nature', 'science', 'technologie']`
2. Vous pouvez tester la router `GET /categories` en
   utilisant le fichier `request.http`

#### Exo2

1. Dans le fichier src/index.js, créer une route
   `POST /categories` qui accépte une `request` et
   affiche dans la console le titre de la category
   et retourne l'objet suivant `{ "status": 200 }`
2. Vous pouvez utiliser le fichier `request.http`
   afin de tester la requète

#### Exo3

1. Dans le fichier src/index.js, créer une route
   `GET /articles` qui retourne le tableaux suivant:
   `[ { "title": "Mon premier article" } ]`
2. Vous pouvez tester la route `GET /articles` en
   utilisant le fichier `request.http`

#### Exo4

1. Dans le fichier src/index.js, créer une route
   `POST /articles` qui accépte une `request` et
   affiche dans la console le titre de l'article
   et retourne l'objet suivant `{ "status": 200 }`
2. Vous pouvez utiliser le fichier `request.http`
   afin de tester la requète

### 1. Insérer et récupérer des categories

#### Exo1

1. Dans le fichier src/index.js, dans la route
   `GET /categories`, utiliser la base de données
   pour récupérer toutes les categories et les
   retourner
2. Vous pouvez tester en utilisant le fichier
   `request.http`

#### Exo2

1. Dans le fichier src/index.js, dans la route
   `POST /categories`, utiliser la base de données
   pour insérer la catégorie envoyée dans la requête.
   Ensuite nous récupérons la catégories nouvellement
   enregistré dans la BDD et nous le retournons
2. Vous pouvez tester en utilisant le fichier
   `request.http`

### 3. Schématiser les articles

1. Dans le fichier src/index.js, dans la route
   `POST /articles`, ajouter un schema au body de
   notre request qui respécte les caractéristiques
   suivantes :

```
*title: string
*description: string
*images: [ string ]
shortDescription: string
*author:
  *firstname: string
  *lastname: string
```

### 4. Les utilisateurs

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

### 5. Authentification

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

### 6. Tester les utilisateurs

1. Dans le fichier `src/__tests__/users.test.js`, ajouter un test qui
   authentifie un utilisateur et s'assure de recevoir un token
1. Dans le fichier `src/__tests__/users.test.js`, ajouter un test qui
   test la liste des utilisateurs et qu'elle ne soit pas vide

### 7. Ajout de configuration

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

### 8. Ajouter la modification et la suppression

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
