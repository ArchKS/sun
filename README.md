## 顺序执行

1. 安装数据库
2. 创建用户
```
grant all privileges on *.* to 'justin'@'%' identified by 'justin';
```

3. 创建node运行环境
4. 导入数据
```
node sql.js
```




## 相关信息
- ip: 106.15.107.100
- port: 3306
- db: mysql-innodb
- user: justin
- passwd: justin



## CentOS7 创建数据库
```sql
create database blog;
use blog;

# 创建表单
create table articles (
	id INT PRIMARY KEY  NOT NULL AUTO_INCREMENT,
	title VARCHAR(40) NOT NULL,
	created Timestamp NOT NULL,
	visited INT,
    category VARCHAR(10),
    tags VARCHAR(40),
	content TEXT
) DEFAULT CHARSET=utf8mb4;

# 插入数据测试
insert into articles (title,createt,updatet,visit,content) values ('王阳明心学精髓',NOW(),'2021-03-07 14:18:12',10,'这里还没有内容');

# 查询结果
select * from articles;

# 删除表单
drop table articles;
```



>开启云服务器3306端口，用tcping测试是否能够连通
>
>tcping 106.15.107.100 -p 3306

## CentOS7 node环境

```bash
# 安装node
wget https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz
tar -xvf node-v14.16.1*
rm node-v14.16.1*.tar.xz -f
mv node-v14.16.1* node-v14
ln -s  node-v14/bin/npm /usr/bin/
ln -s  node-v14/bin/node /usr/bin/

# 查看版本
[root@blog-service code]# node -v
v14.16.1

# 后台运行
yum -y install screen 
screen node api.js &
```