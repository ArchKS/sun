const fs = require('fs')
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
// require('dotenv').config()


const info = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    email: process.env.EMAIL,
    email_pass: process.env.EMAILPass,
    db_host: process.env.DBHost,
    db_user: process.env.DBUser,
    db_password: process.env.DBPassword,
    db_name: process.env.DBName,
    server_port: process.env.SERVERPort,
    cookie_age: 60*1000,
    cookie: '',

}
const transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secureConnection: true, // 使用了 SSL
    auth: {
        user: info.email,
        pass: info.email_pass,
    }
});

// 建立数据库连接
const connection = mysql.createConnection({
    host: info.db_host,
    user: info.db_user,
    password: info.db_password,
    database: info.db_name
});

// 格式化输出当前时间
function fmtItem(v) {
    v = String(v).length === 1 ? '0' + v : v;
    return v;
}
function fmtNowTime() {
    let date = new Date();
    let y = date.getFullYear();
    let M = fmtItem(date.getMonth() + 1);
    let d = fmtItem(date.getDate());
    let h = fmtItem(date.getHours());
    let m = fmtItem(date.getMinutes());
    let s = fmtItem(date.getSeconds());
    // 2021-03-07 14:18:12
    let fmt = `${y}-${M}-${d} ${h}:${m}:${s}`;
    return fmt
}


// 将文件读取构造为promise对象
function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}

// 邮件服务
function email(username, useremail, msg) {
    return new Promise((resolve, reject) => {
        let mailOptions = {
            from: info.email,
            to: info.email,
            subject: `From Blog Contact System  <${username} ${useremail}>`,
            html: `
            <div style="width: 100%; margin: 2rem 3rem 0;">
                <p>username: ${username}</p>
                <p>useremail: ${useremail}</p>
                <p>msg: ${msg}</p>
            </div>
        `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(500);
                return;
            }
            resolve(200)
        });
    })
}

module.exports = {
    fmtNowTime,
    readFile,
    connection,
    email,
    info
}
