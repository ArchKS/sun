[ `rpm -qa git | wc -l` -eq 0  ] && yum -y install git

git clone http://github.com.cnpmjs.org/ArchKS/zenlog client

cp client/Dockerfile-Vue .
cp -r client/dist .

docker build -t blog/client:v1 -f ./Dockerfile-Vue .
docker run -p 8080:80 -itd --name client blog/client:v1





