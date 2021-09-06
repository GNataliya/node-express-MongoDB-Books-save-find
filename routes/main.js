const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const router = express.Router();

const sendArticles = require('../controllers/mainControlFunctions.js');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('main', {title: 'articles' });
});

router.post('/server',  async (req, res) => { 
  const getData = await sendArticles.findArticles();
  res.json(getData);
});

router.post('/form', upload.none(), async (req, res) => {
  const articleNew  =  sendArticles.saveArticle(req.body);    
  res.json(articleNew)
});


router.post('/find', upload.none(), async (req, res) => {
  const { articleTitle } = req.body;          // выводим имя для поиска из обьекта
  const titles = await sendArticles.findInfoInArticle(articleTitle);
  res.json(titles);
});


router.post('/change', upload.none(), async (req, res) => {
  const { articleTitle } = req.body;
  const { text } = req.body;
  const updateText = await sendArticles.updateText(articleTitle, text);
  
  res.json(updateText);
});




module.exports = router;
