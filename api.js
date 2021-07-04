const express = require('express')
const cors = require('cors')
const app = express()
const utils = require('./utils/utils.js')
const hot = require("./utils/hot.js")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/* 中间件 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

/* 连接数据库 */
utils.connection.connect()

/* 请求所有文章 */
app.get('/articles', (req, res) => {
    // 获取文章列表
    utils.connection.query(`select 
        id,
        title,
        created,
        visited,
        category,
        tags 
        from articles order by created DESC;`, function (err, rows, fields) {
        res.send(rows);
        // utils.connection.end();
    })
})

/* 获取指定文章，通过id指定 */
app.get('/article', (req, res) => {
    let id = req.query.id;
    let sql = `update articles set visited=visited+1,created=created where id = ${id};`
    utils.connection.query(sql, (err, rows, fields) => {
        sql = `select content from articles where id = ${id};`
        utils.connection.query(sql, (err, rows, fields) => {
            let content = rows[0].content;
            res.send(content);
        })
    })

})

/* 按照内容搜索指定文章 */
app.get('/search', (req, res) => {
    let keyword = req.query.keyword;
    let sql = `
    select id,content from articles where 
    content like '%${keyword}%' 
    or 
    tags like '%${keyword}%' 
    or 
    category like '%${keyword}%' 
    or 
    title like '%${keyword}%';
    `
    utils.connection.query(sql, (err, rows, fields) => {
        let result = [];
        rows.forEach(v => {
            let c = v.content;
            let index = c.indexOf(keyword);
            let sliceLength = 100
            if (index > 0 && index < sliceLength / 2) {
                c = c.substr(0, sliceLength);
            } else if (index >= sliceLength / 2) {
                c = c.substr(index - sliceLength / 2, sliceLength);
            } else {
                c = '';
            }

            result.push({
                id: v.id,
                content: c,
            });
        })
        res.send(result);
    })
})

/* 获取热榜数据 */
app.get('/hot', (req, res) => {
    let platform = req.query.platform;
    switch (platform) {
        case 'zhihu':
            hot.getZhihuInfo().then(data => { res.send(data) }); break;
        case 'weibo':
            hot.getWeiBoInfo().then(data => { res.send(data) }); break;
        case 'kr':
            hot.getKr().then(data => { res.send(data) }); break;
        default: res.send("NULL");
    }
})

/* Contact邮件联系 */
app.get('/email', (req, res) => {
    let username = req.query.username,
        useremail = req.query.useremail,
        msg = req.query.msg;

    utils.email(username, useremail, msg).then(result => {
        res.sendStatus(200);
    }).catch(err => {
        res.sendStatus(500);
    })
})

// 登录信息 localhost:3000/login
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // // 登录就是为了获取cookie
    if (username === utils.info.username && password === utils.info.password) {
        utils.info.cookie = Math.random().toString(36) + Math.random().toString(36);
        res.cookie('isVisit', utils.info.cookie, { maxAge: utils.info.cookie_age });
        res.send({
            key: 'isVisit',
            value: utils.info.cookie,
            expire: utils.info.cookie_age,
            code: 200
        });
    } else {
        res.sendStatus(403);
    }
})


// 认证cookie
// app.get('/verity', (req, res) => {
//     let cookie = req.query.cookie;
//     console.log('local cookie:',cookie,'\t\tutils.info.cookie:',utils.info.cookie);
//     if(cookie === utils.info.cookie && cookie.lenght){
//         res.send('200');
//     }else{
//         res.send('500')
//     }
// })


// 按照id更新
app.post('/update',(req,res)=>{
    let {id,title,tags,category,created,visited,content} = req.body;
    utils.connection.promise().query
    ('UPDATE `articles` SET `title`=?,`created`=?,`visited`=?,`tags`=?,`category`=?,`content`=? WHERE `id`=?',[title,created,visited,tags,category,content,id])
    .then(result=>{
       res.sendStatus(200);
    }).catch(err=>{
        res.sendStatus(500);
    })
})


// 添加新文章
app.post('/add',(req,res)=>{
    let {title,tags,category,created,visited,content} = req.body;
    utils.connection.promise().query('INSERT INTO articles SET ?', {
        title,
        created,
        visited,
        tags,
        category,
        content,
    })
    .then(result=>{

       res.sendStatus(200);
    }).catch(err=>{
        res.sendStatus(500);
    })
})

// 删除文章
app.post('/del',(req,res)=>{
    let {id} = req.body;
    utils.connection.promise().query(`DELETE FROM articles WHERE id = ${id};`)
    .then(result=>{
       res.sendStatus(200);
    }).catch(err=>{
        res.sendStatus(500);
    })
})























































































// 错误处理
app.use((req, res, next) => { res.status(404).send('404') })

app.listen(utils.info.server_port, '0.0.0.0', () => console.log('NodeJS Service On http://localhost:' + utils.info.server_port))
