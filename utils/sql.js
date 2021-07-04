const utils = require('./utils.js')


/* sql.js 是为了向数据库中插入模拟数据，需要在fileList中写上你想要插入的文章，文章放在articles目录下 */


utils.connection.connect();

let filelist = [
    "2017书单.md",
    "2018书单.md",
    "2019书单.md",
    "2020书单.md",
    "禅门.md",
    "行为上瘾.md",
    "逃离互联网.md",
    "王阳明的心学精髓是什么.md"
]
/* 
	id INT PRIMARY KEY  NOT NULL AUTO_INCREMENT,
	title VARCHAR(40) NOT NULL,
	created Timestamp NOT NULL,
	visited INT,
    category VARCHAR(10),
    tags VARCHAR(40),
	content TEXT
*/
filelist.forEach((file, index) => {
    fileName = file;
    filePath = '../articles/' + file;
        (function (fileName, filePath, index) {
            utils.readFile(filePath).then(content => {
                return utils.connection
                    .promise()
                    .query('INSERT INTO articles SET ?', {
                        title: fileName,
                        created: utils.fmtNowTime(),
                        visited: Math.ceil(Math.random() * 100),
                        tags: 'js,vue,html',
                        category: '前端',
                        content: content,
                    })
            }).then(res => {
                if (index === filelist.length - 1) {
                    utils.connection.end();
                }
            }).catch(rea => {
            })
        })(fileName, filePath, index)
})