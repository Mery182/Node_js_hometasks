const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8080;

// array start
const votings = [

    {

        question: "Какую общую оценку сайту http://profi.ifmo.ru/ Вы бы поставили?",

        answers: [

            {
                title: "отлично",
                number_of_votes: 10
            },

            {
                title: "хорошо",
                number_of_votes: 8
            },

            {
                title: "удовлетворительно",
                number_of_votes: 2
            },

            {
                title: "неудовлетворительно",
                number_of_votes: 4
            }

        ]

    },

    {

        question: "Принесло ли Вам пользу посещение сайта http://profi.ifmo.ru/, достигли ли Вы своих целей?",

        answers: [

            {
                title: "да",
                number_of_votes: 12
            },

            {
                title: "нет",
                number_of_votes: 3
            },

            {
                title: "частично",
                number_of_votes: 6
            },

            {
                title: "затрудняюсь ответить",
                number_of_votes: 1
            }

        ]

    },

    {

        question: "Готовы ли Вы воспользоваться этим сайтом http://profi.ifmo.ru/ в будущем?",

        answers: [

            {
                title: "да",
                number_of_votes: 4
            },

            {
                title: "нет",
                number_of_votes: 3
            },

            {
                title: "скорее да",
                number_of_votes: 7
            },

            {
                title: "скорее нет",
                number_of_votes: 2
            }

        ]

    },

];

// array end


http.createServer((request, response) => {
    console.log(request.method, request.url);
    if (request.method == 'GET' && request.url == '/') {
        fs.readFile('index.html', 'utf-8', ((error, data) => {
            if (error) {
                console.log('Ошибка получения файлы index');
                response.statusCode = 500;
                response.end();
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.end(data);
            }
        }))
    } else if (request.method == 'GET' && request.url.endsWith('.css')) {
        let pathname_css = request.url;
        pathname_css = path.basename(pathname_css);
        console.log(pathname_css);
        fs.readFile(pathname_css, 'utf-8', ((error, data_style) => {
            if (error) {
                console.log('Ошибка получения файла css');
                response.statusCode = 500;
                response.end();
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/css',
                });
                response.end(data_style);
            }
        }))
    } else if (request.method == 'GET' && request.url == '/questionArray') {
        response.statusCode = 200;
        response.writeHead(200, {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
        });
        let x = JSON.stringify(votings);
        response.end(x);

    } else if (request.method == 'POST' && request.url == '/vote') { // получаем данные с формы
        let strData = '';
        request.on('data', (chunk) => { // вешается слушатель на событие типо как addeventListenet
            strData += chunk;

        });


        request.on('end', () => { //  
            console.log(JSON.parse(strData));
            let newInfo = JSON.parse(strData);
            console.log(newInfo.quest);
            votings.forEach(el => {
                if (el.question === newInfo.quest) {
                    el.answers.forEach(item => {
                        if (item.title == newInfo.title) {
                            //  console.log(item.number_of_votes);
                            item.number_of_votes += 1;
                            //   console.log(item.number_of_votes);
                        }
                    })

                }
            });
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                // 'Access-Control-Allow-Origin': '*'
            });
            //  console.log(`${strData}`);
            response.statusCode = 200;
            response.end(`${strData}`);
        });
    }

}).listen(port, () => {
    console.log('Сервер готов к работе');
});