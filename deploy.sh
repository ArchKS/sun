# 宿主机安装环境 git wget node

[ `rpm -qa git | wc -l` -eq 0  ] && yum -y install git
[ `rpm -qa wget | wc -l` -eq 0  ] && yum -y install wget net-tools
[ `rpm -qa docker | wc -l` -eq 0  ] && yum -y install docker


if [[ `node -v | wc -l` -eq 0  ]];then
    wget https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz 
    tar --strip-components 1 -xvf node-v14.16.1-linux-x64.tar.xz -C /usr/local
    rm node-v14.16.1-linux-x64.tar.xz -f
fi


# ------------------- 部署数据库
passwd=$(tr -dc 'A-Z0-9a-z@#' </dev/urandom | head -c 10;echo | tr '&' '2')
docker run -itd -p 3306:3306 -e MYSQL_ROOT_PASSWORD=${passwd} --name db --restart=always mariadb:10.4

for i in $(seq 20);
do
    mysql -h127.0.0.1 -uroot -p${passwd} -e 'show databases;' &> /dev/null
    [ $? -ne 0 ] && sleep 1;
    echo "MySQL启动中.... ${i}s "
done


mysql -h127.0.0.1 -uroot -p${passwd} -e "grant all privileges on *.* to 'justin'@'%' identified by 'justin';"
mysql -h127.0.0.1 -uroot -p${passwd} -e "create database blog;"

mysql -h127.0.0.1 -uroot -p${passwd} blog < blog.sql

passwd=""



# ------------------- 部署服务端

docker run -p 3000:3000 -itd \
    -e USERNAME="alex" \
    -e PASSWORD="es-2015" \
    -e EMAIL="2212585023@qq.com" \
    -e EMAILPass="bmjahdtrydetdidf" \
    -e DBHost="106.15.107.100" \
    -e DBUser="justin" \
    -e DBPassword="justin" \
    -e DBName="blog" \
    -e SERVERPort="3000" \
    --name server --restart=always registry.cn-hangzhou.aliyuncs.com/zendu/node-server:v1

# ---------------------- 部署客户端
# 客户端相关信息在.env文件中，酌情修改

# git clone http://github.com.cnpmjs.org/ArchKS/zenlog client 
# cd client 
# yarn
# yarn build

# docker rm client -f
docker run -p 80:80 -itd --name client nginx
docker cp  dist/. client:/usr/share/nginx/html/


netstat -tnlp | grep -E '\<3306\>|\<3000\>|\<80\>'
echo "------------------"
docker ps -a | grep -E '\<client\>|\<db\>|\<server\>'