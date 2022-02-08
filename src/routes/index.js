var express = require('express');
var router = express.Router();

const {index, detail, level, paginador, create, remove, search} = require('../controllers/Apicontrollers');

/* GET home page. */
router.get('/cardsDigimon', index);
router.get('/card/:id', detail);
router.get('/Level/:level', level);
router.get('/paginador', paginador);
router.post('/cardsDigimon', create);
router.delete('/card/:id', remove);
router.get('/cards/search', search);

module.exports = router;


