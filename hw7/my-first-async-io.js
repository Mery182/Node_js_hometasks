const fs = require('fs');

let file = process.argv[2];
function addOne(f) {
    fs.readFile(f, (err, data) => {
        if( err) throw new Error;
        else {
        let x = data.toString().split('\n').length-1;
        return console.log(x);
        }
    })
  }
  
  addOne(file);
  
  