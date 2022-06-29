let express = require('express'); //подключаем модуль express
let router = express.Router(); // С помощью класса express.Router можно создавать модульные, монтируемые обработчики маршрутов. 
let bodyParser = require('body-parser');
/*подключаем модуль для обработки содержимого тела
post запроса */

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
router.use(bodyParser.json())

router.all(
    '/',
    function (req, res, next) {
        console.log(req.method); // доступ к инфе с конкретного поля
        res.writeHead(200, {
            'Content-Type':'text/html;charset=utf-8' // чтобы 
        });
        res.write('Введенные данные:\n')
        res.end(JSON.stringify(req.body, null, 2))
       
    });



module.exports = router; //Экспортируем роутер из модуля