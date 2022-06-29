// 1*****. Разработать свой граббер (парсер, веб паук), который умеет 
// парсить выбранный вами сайт и сохранять полезную информацию в виде файлов на сервере.
// Тематика парсера на ваш выбор: рецепты пирогов, тексты песен, телевизионная программа и т.п.

// 2***** Разработать сервер и свой встраиваемый компонент в
// html (виджет). Приветствуется
// предусмотреть возможность поддержки кросс доменных
// запросов от клиента.
// Тематика виджета любая: прогноз погоды, валюты,
// цитаты известных людей, анекдоты и т.п.

// ВНИМАНИЕ ВНИМАНИЕ - сайт с которого я парсила может не работать у некоторых провайдеров интернета ( у меня работает)

const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs/promises');
let app = express();
app.use(express.static('public'));



let list = [];
let list2 = [];
async function start() { // создаем асинхронную функцию
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.setViewport({ // ` регулировка размера экрана скриншота
  //   width: 640,
  //   height: 10080,
  //   deviceScaleFactor: 1,
  // });

  await page.goto('https://hdi.zetfix.online/serials/new_serial/'); // парсим список сериалов
  await page.screenshot({
    path: 'example.png',
    fullPage: true
  }); // делает сриншот всей страницы

  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.vi-in'))
    .map(el => ({
      name: el.querySelector('.vi-title').innerHTML.trim(), // название фильма
      link: el.querySelector('.vi-img').href.trim(), // ссылка на просмотр фильма
      img: el.querySelector('.vi-img img').src.trim()
      }))
     })
  list = names;  
  await fs.writeFile('data.txt', JSON.stringify(names)); 


  await page.goto('https://hdi.zetfix.online/films/new_films_2022/'); // парсим список фильмов
  const names2 = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.vi-in'))
    .map(el => ({
     name: el.querySelector('.vi-title').innerHTML.trim(), // название фильма
     link: el.querySelector('.vi-img').href.trim(), // ссылка на просмотр фильма
     img: el.querySelector('.vi-img img').src.trim()
     }))
    })
  list2 = names2;console.log(names2);

  await fs.writeFile('data2.txt', JSON.stringify(names2)); 
console.log( JSON.stringify(names2));
  const photos = await page.$$eval('.vi-in img', (imgs) => { // cкачиваем постеры на сервер
    return imgs.map(x => x.src)
  })
  for (const photo of photos) {
    const imagepape = await page.goto(photo)
    await fs.writeFile(photo.split('/').pop(), await imagepape.buffer())
  }

  await browser.close(); // закрываем браузер
}
start();

app.get('/list-serial', (req, res, next) => {
  return res.send(list)

});
app.get('/list-films', (req, res, next) => {
  return res.send(list2)
})


app.listen(8080, () => console.log('Сервер работает!'));