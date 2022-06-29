const fs = require('fs');
const path = require('path');

let dir = process.argv[2];
let x = process.argv[3];

//console.log(path.dirname(process.argv[1]));

  fs.readdir(dir, (err,data) =>{
   if(err){ throw new Error;
   }
   else {
   let listFiles = data;
   //console.log(listFiles);
   listFiles.forEach(el => {
       if(path.extname(el) == `.${x}`){
             console.log(el);
       }
   })
}
  });
