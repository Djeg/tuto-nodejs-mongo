import { test as nimporteQuoi, add } from './new-module-2.js'
import * as module2 from './new-module-2.js'

import nimporteQuoi2 from './new-module-2.js'

console.log(nimporteQuoi)
console.log(add(3, 4))

console.log(module2.test)
console.log(module2.add(3, 4))

console.log(nimporteQuoi2)
