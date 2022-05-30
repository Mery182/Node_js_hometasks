'use srtict';

// 1. Требуется реализовать декоратор с параметрами pause,
// который откладывает выполнение функции на указанное
// количество секунд 

function paused(func, sec) { 
    return setTimeout(func, sec);
}
function func() {
    console.log('Функция выполниться с задержкой в 2 секунды!');
}
paused(func, 2);

// 2*. Требуется реализовать декоратор с параметрами returnObject,
// который в случае, если функция возвращает массив, подменяет
// его объектом. Имена задаются в параметрах декоратора. 
// не понимаю условий задачи - 



//Массив с курсами

let coursec = [
    { name: 'Courses in England', prices: [0, 100] },   
    { name: 'Courses in Germany', prices: [500, null] },  
    { name: 'Courses in Italy', prices: [100, 200] }, 
    { name: 'Courses in Russia', prices: [null, 400] },    
    { name: 'Courses in China', prices: [50, 250] },   
    { name: 'Courses in USA', prices: [200, null] },   
    { name: 'Courses in Kazakhstan', prices: [56, 324] },  
    { name: 'Courses in France', prices: [null, null] },
    ];
   
    //Фильтра по массивам  
    let requiredRange1 = [null, 100];
    let requiredRange2 = [100, 350]; 
    let requiredRange3 = [200, null];
    

    function requiredRange(arr, range){
        let from = range[0]; // стартовое число диапазона
        let to = range[1]; // конечное число диапазона
        let filter =[];
        let nullArr = [];
      arr.forEach(element => {
        if (element.prices[0] == null && element.prices[1] == null && from == null && to == null ){
            filter.push(element);
             console.log(filter);
        } 
        if (element.prices[0] == null && element.prices[1] !== null && element.prices[1] <= to){
            filter.push(element);
            console.log(filter);
            }
        if (element.prices[1] != null && element.prices[0] != null && element.prices[0] >= from && element.prices[1] <= to){
          filter.push(element);
          console.log(filter);
          }  
            if (element.prices[0] !== null && element.prices[0] <= from && element.prices[1] == null ){
                filter.push(element);
                console.log(filter);
                }
      });

    }
    requiredRange(coursec, requiredRange1);




    