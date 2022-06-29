const fs = require('fs');

let text = fs.readFileSync(process.argv[2]); 
let x = text.toString().split('\n').length-1;
console.log(x);
