const express = require('express');
const app = express();
const article = [{ title: 'Express'}];

app.set('port', process.env.PORT || 3000);

app.get('/articles', (req, res, next) => {  //获取所有的文章
    res.send(article);
});

app.post('/articles', (req, res, next) => { //创建一篇文章
    res.send("OK")
});

app.get('/articles/:id', (req, res, next) => {  //获取指定文章
    const id = req.params.id;
    console.log('Deleting:', id);
    res.send(articles[id]);
});

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('deleting: ', id);
    delete articles[id];
    res.send({ message: 'Deleted' });
})

app.listen(app.get('port') , () => {
    console.log('App started on port', app.get('port'));
});

module.exports = app;
