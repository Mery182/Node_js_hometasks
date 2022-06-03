'use strict';

const http = require('http');
const fs = require('fs');


http.createServer((request, response) => {
 //   if (request.method == 'GET' && request.url == '/') {
        fs.readFile('data.txt', 'utf-8', (error, data) => {
            if(error) throw error; // ошибка чтения файла, если есть
            console.log(data); // смотрим содрежимое файлы
            let arr = data.split(' ');         
             console.log(arr);
             let sortD=[];
             let sortDegree=[];
             arr.forEach(el =>{
             if(el % 2 === 0){
                 sortD.push(el);
             };
             if(el**=3){
                 sortDegree.push(el);
             };
             })
             console.log(sortD);
             console.log(sortDegree);


fs.writeFile('out-1.txt', sortD.join(' '), function(error){
    if(error) throw error; // ошибка чтения файла, если есть
    console.log(`Данные в первый файл успешно записаны записать файл`);
 });
 fs.writeFile('out-2.txt', sortDegree.join(' '), function(error){
    if(error) throw error; // ошибка чтения файла, если есть
    console.log(`Данные во второй файл успешно записаны записать файл`);
 });
         });


  //  }
}).listen(8080, () => {
    console.log('Cервер готов!')
});