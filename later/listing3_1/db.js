const sqlite3 = require("sqlite3").verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);    //连接到一个数据库文件

db.serialize(() => {
    const sql = `create table if not exists articles 
    (id integer primary key, title, content TEXT)`;
    db.run(sql);    // 如果还没有，创建一个"articles"表
});

class Article {
    static all(cb) {
        db.all('select * from articles', cb);   //获取所有的文章
    }

    static find(id, cb) {
        db.get('select * from articles where id = ?', id, cb)   //选择一片指定的文章
    }

    static cretae(data, cb) {
        const sql = 'insert into articles(title, content) values (?, ?)';   //问号表示参数
        db.run(sql, data.title, data.content, cb);
    }

    static delete(id, cb){
        if(!id) return cb(new Error("please provide an id"));
        db.run('delete from articles where id = ?', id, cb);
    }
}


module.exports = db;
module.exports.Article = Article;
