/*
Une promesse c'est un appel asynchrone. C'est à dire que c'est
un code qui s'éxécute en "parallel" d'autre code
*/

async function add(x, y) {
  return x + y
}

//async function main() {
//  const x = await add(3, 4) // Number
//
//  console.log(x)
//}

const main = async () => {
  const x = await add(3, 4) // Number

  console.log(x)
}

const main2 = () => add(3, 4).then(console.log)

main()

main2()
