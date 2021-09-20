# Le format JSON

JSON (JavaScript Object Notation) est un format
de données simple basé sur des objets
javascript.

## Un objet en javascript

En javascript il est possible de créer des objets
très facilements :

```js
const user = {
  id: 1,
  username: 'john',
  email: 'john@mail.com',
}
```

Il éxiste un format, compatible avec **n'importe quel
langage de programmation, n'importe quel promgramme**,
ce format c'est **JSON**.

```json
// user.json
{
  "id": 1,
  "username": "john",
  "email": "john@mail.com",
  "notes": [13, 1, 7, 9],
  "verified": true,
  "image": {
    "width": 100,
    "height": 150,
    "src": "https://lorempixel.com/100/150"
  }
}
```

Les seuls différence entre JSON et un objet javascript sont
les suivantes :

1. Toujours mettre des double quote `"` pour les clefs ainsi
   que les chaînes de caractère
2. Ne **jamais** mettre de virgule à la dernière clef
   d'un objet finale !
