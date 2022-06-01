'use strict';

const http = require('http');
http.createServer((request,response) => {
   console.log("HTTP works!"); // вывод в консоли
   response.writeHead(404, {'Content-Type':'text/html'});
   response.write(
      `<style>
   body{
       height: 100vh;
       margin: 0;
       display: flex;
       flex-direction:column;
       justify-content:center;
       align-items: center;
       font-family: Arial, Helvetica, sans-serif;
   }
   h1 {
       font-size: 200px;
       text-align: center;
       margin-bottom:0;
     
   }
</style>
<h1>404</h1><br>
<h4>ERROR</h4>`
);
   response.end();
}).listen(8080);


