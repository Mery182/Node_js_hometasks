let express = require('express'); //подключаем модуль express
let app = express();//создаем приложение express
let bodyParser = require('body-parser'); /*подключаем модуль для обработки содержимого тела
post запроса */

//2. Приложение обрабатывает поля ввода и формирует из вводимых данных JSON строку

app.use(bodyParser.urlencoded({ extended: false })); /*регистрируем модуль для обработки */
app.use(express.static('public')); /* статический сервер, для отдачи контента из папки public */
//Формируем обработчик post запроса на адрес http://localhost:80/somepath

app.post('/somepath', (req, res, next) => {
console.log(req.body.name); // доступ к инфе с конкретного поля
console.log('Параметры POST запроса: ' + JSON.stringify(req.body));
res.send(JSON.stringify(req.body)); //Отправляем присланные параметры обратно клиенту
});

app.listen(80); //Настраиваем express приложение слушать запросы на 80 порту

