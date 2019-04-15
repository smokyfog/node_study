const express = require('express');
const app = express();
const articles = [{ title: 'Express'}];
const bodyParser = require("body-parser");
const Article = require('./db').Article;    //加载数据库模块


app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json()); //支持编码为JSON的请求消息体
app.use(bodyParser.urlencoded({extended:true}));    //支持编码为表单的请求消息体

app.get('/articles', (req, res, err) => {  //获取所有的文章
    Article.all((err, articles) => {
        if (err) return next(err);
        res.send(articles);
    })
});

app.get('/articles/:id', (req, res, next) => {  //获取指定文章
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if(err) return next(err);
        res.send(article);
    })
});

app.post('/articles', (req, res, next) => { //创建一篇文章
    const article = {title: req.body.title};
    articles.push(article)
    res.send(article);
});

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('deleting: ', id);
    Article.delete(id, (err) => {
        if(err) return next(err);
        res.send({message: 'Deleted' });
    });
});

app.listen(app.get('port') , () => {
    console.log('App started on port', app.get('port'));
});

module.exports = app;
