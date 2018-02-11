var express = require('express');
var router = express.Router();
var auth = require('../controllers/AuthController');
var vino = require('../controllers/WineController');
var cellar = require('../controllers/CellarController');

//auth routes
router.get('/', auth.home);

router.get('/register', auth.register);

router.post('/register', auth.doRegister);

router.get('/login', auth.login);

router.post('/login', auth.doLogin);

router.get('/logout', auth.logout);

//wines routes
router.get('/wines', vino.wines);

router.get('/addWine', vino.addWine);

router.post('/addWine', vino.doAddWine);

//cellar routes
router.get('/addToCellar/:wine_id', cellar.addToCellar);

router.get('/cellar', cellar.getCellar);


module.exports = router;
