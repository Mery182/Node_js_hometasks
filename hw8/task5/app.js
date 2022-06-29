let express = require('express'); // express
let mustacheExpress = require('mustache-express'); // шаблонизатор

let bodyParser = require('body-parser'); // для обработки формы
let enterNameRoute = require('./enterName'); // роутер
let displayNameRoute = require('./displayName'); //роутер
let app = express();

app.engine('mustache', mustacheExpress());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');


app.use(bodyParser.urlencoded( {extended : true} ) );

app.use(express.static('views')); //читаем файлы
app.use(express.static('public')); //читаем файлы

app.use('/', enterNameRoute);  
app.use('/', displayNameRoute);


app.listen(3000,function() {
    console.log("Сервер работает!");
});
