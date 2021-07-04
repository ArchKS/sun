FROM centos:7
LABEL maintainer="zendu <2212585023@qq.com>"


# git clone https://github.com/ArchKS/zenlog-server.git server 
COPY ./server/ /

RUN yum -y install wget \
    && wget https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz  \
    && tar --strip-components 1 -xvf node-v14.16.1-linux-x64.tar.xz -C /usr/local  \
    && rm node-v14.16.1-linux-x64.tar.xz -f \
    && npm i --registry=https://registry.npm.taobao.org 


EXPOSE 3000

CMD [ "node", "/api.js" ]


# git clone https://github.com/ArchKS/zenlog-server.git server 
# cp server/Dockerfile-Node .
# docker build -t blog/server:v1 -f ./Dockerfile-Node .