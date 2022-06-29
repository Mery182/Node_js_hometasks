const express = require('express');
let app = express();
const route = require('./routes/form.js');


app.use(express.static('public')); /* статический сервер, для отдачи контента из папки public */


app.use('/form_input', route); /*регистрируем роут, все url начинающиеся с /info будут
передаваться в обработку в этот роут*/
app.listen(8080,()=>{
    console.log(' Cервер работает!');
});