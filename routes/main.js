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
  //console.log(getData)
  res.json(getData);
});

router.post('/form', upload.none(), async (req, res) => {
  //console.log(req.body)
  
  const articleNew  =  sendArticles.saveArticle(req.body);     //сохранение в базу работает!!!!!!!!!!!!

  // const selectArticles = await sendArticles.selectName( 'name -_id' );
  //console.log('names', selectArticles)

  //res.json(selectArticles);
  res.json(articleNew)
  //res.json({ status: 'ok' });
});


router.post('/find', upload.none(), async (req, res) => {
  //console.log(req.body)
  
  const { articleTitle } = req.body;          // выводим имя для поиска из обьекта
  const titles = await sendArticles.findInfoInArticle(articleTitle);
  //console.log(titles)                       // поиск документа (строки) по имени, работает !!!!!

  res.json(titles);
});


router.post('/change', upload.none(), async (req, res) => {
  //console.log(req.body)
  
  const { articleTitle } = req.body;
  const { text } = req.body;
  const updateText = await sendArticles.updateText(articleTitle, text);
  
  res.json(updateText);
  //res.json({ status: 'ok' })
});




module.exports = router;
