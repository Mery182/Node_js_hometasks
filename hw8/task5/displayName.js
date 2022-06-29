let express = require('express'); // express
let router = require('express').Router();
let storage = require('./simpleStorage');
router.use(express.static('views'));

router.get('/displayName', function(request,response) {
  let login = storage.getValue();
  response.render ('displayName',
     {
       pageTitle: "Добро пожаловать!",
       userName: login
     });
  });
module.exports = router;