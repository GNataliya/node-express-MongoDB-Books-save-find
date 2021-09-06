require('../bin/runners/db');
const axios = require('axios');
const articleModel = require('../models/article.js'); 

const saveArticle = async (data) => {
    const article = new articleModel;
    article.name = data.articleTitle;
    article.topic = data.topic;
    article.text = data.text;
    article.author = data.author; 
    const articleNew = await article.save();
    //console.log(articleNew)
}

const findInfoInArticle = async (val) => {
    //const docs = await articleModel.find({ }).select(val);
    //const docs = await articleModel.find({ }, val );
    const docs = await articleModel.find({ name: val });
    return docs;
};

// const updateText = async (articleName, newText) => {
//     const docs = await articleModel.findOneAndUpdate({ name: articleName }, { text: newText });
//     //const updatedocs = await article.save();
//     //console.log(docs);
// };

module.exports = {
    saveArticle,
    findInfoInArticle,
    //updateText
};