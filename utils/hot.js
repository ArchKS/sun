const axios = require("axios")
const cheerio = require("cheerio")
const utils  =  require('./utils')

const WEIBO = "https://s.weibo.com"
const URL = {
    weibo: "https://s.weibo.com/top/summary",
    zhihu: "https://www.zhihu.com/billboard",
    kr: "https://www.36kr.com/hot-list/renqi/"
}

let getZhihuInfo = () => {
    return new Promise((resolve, reject) => {
        axios.get(URL.zhihu).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            let res = [];
            let text = $.html($("#js-initialData"));
            let result = text.match(/"topstory".*?"hotList":(.*),"guestFeeds/);
            if(result.length !== 0 && Array.isArray(result)){
                result = result[1]
            }
            let arr = JSON.parse(result);
            for(let v of arr){
                res.push({
                    link: v.target.link.url,
                    title: v.target.titleArea.text,
                    heat: v.target.metricsArea.text
                })
            }
            resolve({
                name: '知乎热榜',
                text: 'zhihu',
                url: URL.zhihu,
                data: res,
            });
        })
    })
}


let getWeiBoInfo = () => {
    return new Promise((resolve, reject) => {
        axios.get(URL.weibo).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const list = $(".list_a li");
            let res = [];
            for (let i = 0; i < list.length; i++) {
                let item = list.eq(i);
                let title= item.find("a span").text().trim();
                let heat = item.find("a span em").text() || 0;
                let id = item.find('a .hot').text().trim();
                let link = WEIBO + item.find('a').attr('href');
                let fmtItem = {
                    id,
                    title: title.replace(heat,''),
                    heat,
                    link
                }
                res.push(fmtItem);
            }
            resolve({
                name: '微博',
                text: 'weibo',
                url: URL.weibo,
                data: res,
            });
        })
    })
}


let getKr = () => {
    let index = 1;
    URL.kr = "https://www.36kr.com/hot-list/renqi/" + utils.fmtNowTime().split(' ')[0] + '/'+ index;
    return new Promise((resolve, reject) => {
        axios.get(URL.kr).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const list = $(".article-list .article-wrapper");
            let res = [];
            for (let i = 0; i < list.length; i++) {
                let item = list.eq(i);
                let title= item.find(".article-item-info p a").text().trim();
                let link = item.find(".article-item-info p a").attr('href');
                let heat = item.find(".article-item-info .kr-flow-bar-hot span").text().trim() || 0;
                link = "https://www.36kr.com" + link;
                let fmtItem = {
                    title,
                    heat,
                    link
                }
                res.push(fmtItem);
            }
            resolve({
                name: '36kr',
                text: '36kr',
                url: URL.kr,
                data: res,
            });
        }).catch(reason=>{
            reject(reason);
        })
    })
}




module.exports = {
    getZhihuInfo,
    getWeiBoInfo,
    getKr,
}