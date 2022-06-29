
const eventsObj = {}; // объект
on('eat', stringData => { // вызываем функцию on 
    console.log('Первым: Я кушаю ' + stringData + '.');
});
on('eat', stringData => { // вызываем функцию on
    console.log('Вторым: Я кушаю ' + stringData + '.');
});

setTimeout(() => {
    emit('eat', 'бутерброд');
}, 3000);

setTimeout(() => {
    emit('eat', 'мясо');
}, 2000);

setTimeout(() => {
    emit('eat', 'яблочко');
}, 500);

function on(eventName, callback) { // The addListener() method
    //Инициализируем пустой массив обработчиков у регистрируемого события
    eventsObj[eventName] = eventsObj[eventName] || [];
    //Здесь нужно положить функцию обратного вызова в соответствующий массив
    //Здесь нужен ваш код
    eventsObj[eventName].push(callback);
    return eventsObj;
}

function emit(eventName, stringData) { 
    let x = eventsObj[eventName];
    x.forEach(element => {
        element(stringData);
    });  
}