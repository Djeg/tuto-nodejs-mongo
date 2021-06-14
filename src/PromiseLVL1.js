/*
Un promesse c'est une valeur qui ne s'initialize
pas tout de suite mais en parallèl d'autre valeur
ou qui prend plus de temps
*/

const firstname = 'John' // string
const notes = [13, 14, 18, 9] // Array<number>

const getFirstname2 = () => {
  const firstname2 = new Promise((resolve) => {
    // Promise<string>
    setTimeout(() => resolve('Jade'), 1000)
  })

  return firstname2
}

const start = async () => {
  console.log(firstname)

  console.log('ON attend Jade ...')

  const name = await getFirstname2()

  console.log(name)
}

start()
