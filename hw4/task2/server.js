'use strict'

const http = require('http');
const fs = require('fs');
const url = require('url');
const { text } = require('stream/consumers');


http.createServer((req, res) => { // создаем сервер
	let urlRequest = url.parse(req.url, true);
	console.log(urlRequest.pathname);

	if (req.method == 'GET' && req.url == '/') { // если это стартовая страница, то
		fs.readFile('index.html', 'utf-8', (err, data) => { // прочитаем файл
			if (err) {
				res.statusCode = 500;
				return res.end();
			}
			res.writeHead(200, {
				'Content-Type': 'text/html',
				'Access-Control-Allow-Origin': '*'

			});
			res.end(data); // отобразили страницу в index.html
		});
	}
else if (req.method == 'GET' && req.url == '/main.css') { 
		fs.readFile('main.css', 'utf-8', (err, css) => { // прочитаем файл
			if (err) {
				res.statusCode = 500;
				return res.end();
			}
			res.writeHead(200, {
				'Content-Type': 'text/css',
				'Access-Control-Allow-Origin': '*'
			});
			res.end(css); // отобразили страницу в index.html
		})
	} 
	else if (req.method == 'GET' && req.url.startsWith('/images')) { 
		console.log(`Смотрим файл из папки : ${req.url}`);
		let x = req.url;
		 x.slice(1);
	     let pathname = x;
		console.log(`Готовый URL: ${x.slice(1)}`);
		fs.readFile(`${x.slice(1)}`, 'utf-8', (err, img) => { // прочитаем файл
			if (err) {
				res.statusCode = 500;
				return res.end();
			}
			res.writeHead(200, {
				'Content-Type': 'image/png',
				'Access-Control-Allow-Origin': '*'
			});
			res.end(img); // отобразили 
		})
	} 
	else if (req.method == 'GET' && req.url.startsWith('/files')) {
		console.log(`Смотрим файл из папки : ${req.url}`);
		let x = req.url;
		 x.slice(1);
	     let pathname = x;
		console.log(`Готовый URL: ${x.slice(1)}`);
	 fs.readFile(`${x.slice(1)}`, 'utf-8', (err, data2) => {
			if (err) {
				console.log('Ошибка на сервере')
				res.statusCode = 500;
				return res.end();
			} 
				res.writeHead(200, {
					'Content-Type': 'application/json',
					 'Access-Control-Allow-Origin': '*'
				});	
			res.end(data2); // отдаем этот файл
		})
	}
}).listen(8080, () => {
	console.log('Сервер готов');
})