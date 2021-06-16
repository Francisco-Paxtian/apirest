'use strict'

var express = require('express');
var articleController = require('../controllers/article');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.get('/dato_curso', articleController.dato_curso);
router.get('/testing', articleController.testing);

//article rute 
router.post('/save', articleController.save);
router.get('/articles/:last?', articleController.get_articles);
router.get('/article/:id', articleController.get_article);
router.put('/article/:id', articleController.update_article);// put para actulizar
router.delete('/article/:id', articleController.delete);// delte para actulizar
router.post('/upload-image/:id', upload.single('File0'), articleController.upload_image);

router.get('/search/:search', articleController.search);

module.exports = router;