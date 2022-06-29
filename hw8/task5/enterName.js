let express = require('express'); // express
let router = require('express').Router();
let storage = require('./simpleStorage');
router.use(express.static('views'));

router.get('/', function(request,response) {
  response.render ('enterName', {pageTitle: "Введите свои данные для входа"});
});


router.post('/form_input', function (request, response) {
  console.log(request.body);
  
  storage.setValue(request.body.login);
  response.redirect('/displayName');
});
module.exports = router;