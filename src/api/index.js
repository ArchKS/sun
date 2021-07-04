import axios from 'axios'
const T = 2000;
// const defaultURL = "http://localhost:30000"; 
const defaultURL = process.env.VUE_APP_API_ADDRESS ; 

export default {
    /*
    articleListFormat: { 
        title: '前端Web安全1', 
        link: 'https://ymlog.cn/', 
        created: '2018/4/1', 
        tag: 'vue,html', 
        category: '后端', 
        visited: '1', 
        id: 'x'
    },
    */
    articleLists() {
        return new Promise((resolve, reject) => {
            axios({
                url: defaultURL + "/articles",
                method: 'get',
                timeout: 2000
            }).then(res => {
                let arr = [];
                for (let item of res.data) {
                    let { id, created, title, tags, category, visited } = item;
                    // 格式化标题
                    title = title.replace(/\.md/g, '');
                    // 
                    // 格式化标签数组
                    tags = tags.split(/,/).map(v => v.trim());
                    // 
                    // 格式化时间
                    created = created.replace(/T.*/g, '').replace(/-/g, '/');
                    let [year, month, day] = created.split("/");
                    month.length !== 2 ? (month = "0" + month) : null;
                    day.length !== 2 ? (day = "0" + day) : null;
                    created = `${year}/${month}/${day}`;

                    arr.push({
                        id,
                        created,
                        title,
                        tags,
                        category,
                        visited
                    })
                }
                // 按照时间排序
                arr.sort((a,b)=>{
                    return new Date(b.created) - new Date(a.created);
                });
                resolve(arr)
            }).catch(rea => {
                reject(rea);
            })
        })
    },
    search(keyword){
        return new Promise((resolve,reject)=>{
            axios({
                url: defaultURL + "/search?keyword=" + keyword,
                method: 'get',
                timeout: 2000
            }).then(res=>{
                let arr = res.data;
                arr = arr.map(({id,content})=>{
                    return {
                        id,
                        content: content.split(/\n/).join('').replace(/[=,· ·、\.。\?！~@#￥% \r\n]/,'').replace(/^[·《》]/,'').replace(/[·《》]$/,'').replace(/(·| )/g,'').replace(/  /g,' '),
                        keyword
                    }
                })
                resolve(arr);
            }).catch(rea=>{
                reject(rea);
            })
        })
    },
    getRecommandArticles(platform){
        return new Promise((resolve,reject)=>{
            axios({
                url: defaultURL + "/hot?platform=" + platform,
                method: 'get',
                timeout: 2000
            }).then(result=>{
                resolve(result.data);
            }).catch(reason=>{
                reject(reason)
            })
        })
    },
    getOneArticle(articleId){
        return new Promise((resolve,reject)=>{
            axios({
                url: defaultURL + "/article?id=" + articleId,
                method: "get",
                timeout:T,
                }).then((res) => {
                resolve(res);
                }).catch(err=>{
                    reject(err);
                })
        })
    },
    updateEdit(item){
        return new Promise((resolve,reject)=>{
            axios.post( defaultURL + "/update",item).then((res) => {
                resolve(res);
              }).catch(err=>{
                  reject(err);
              })
        })
    },
    addNewArticle(item){
        return new Promise((resolve,reject)=>{
            axios.post( defaultURL + "/add",item).then((res) => {
                resolve(res);
              }).catch(err=>{
                  reject(err);
              })
        })
    },
    delArticle(articleId){
        return new Promise((resolve,reject)=>{
            axios.post( defaultURL + "/del",{id: articleId}).then((res) => {
                resolve(res);
              }).catch(err=>{
                  reject(err);
              })
        })
    },
    verify(cookie){
        return new Promise((resolve,reject)=>{
            axios({
                url: defaultURL + '/verity?cookie='+cookie,
                method: 'get',
                timeout: T,
            }).then(res=>{
                console.log('cookie res: ',res);
                resolve(res)
            }).catch(err=>{
                reject(err);
            })
        })
    }
}