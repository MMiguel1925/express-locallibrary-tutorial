var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('resposta com conteúdo');
});

router.get('/cool', function(req, res, next){
  res.send('resposta ao cool - GREAT COOL');
})

module.exports = router;