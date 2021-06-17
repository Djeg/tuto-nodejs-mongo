# Tuto Nodejs et mongo

Ce projet contient un tutorielle pour nodejs et
mongodb.

## Installation

Pour installer le projet suivez ces instructions :

### 1. Télécharger le projet sur votre machine

Pout le télécharger plusieurs choix:

- Git clone: `git clone https://github.com/Djeg/tuto-nodejs-mongo.git`
- [Téléchargement direct](https://github.com/Djeg/tuto-nodejs-mongo/archive/refs/heads/master.zip)

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
