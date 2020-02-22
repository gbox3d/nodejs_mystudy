const esm_require = require("esm")(module/*, options*/)
const {printHello} = esm_require("./lib.js")

printHello();

//실행법 : node index.js 