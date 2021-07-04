import Vue from 'vue'
import Vuex from 'vuex'
import util from "@/utils/util.js"
import api from "@/api/index.js"
import {setCurrentIndex,getCurrentIndex,setDarkMode,getDarkMode,saveIfViewVisible,getIfViewVisible} from "@/utils/localstorage.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 显示信息
    ifViewVisible: 0, // 0 首页 1 推荐 2 关于我
    ifShowNav: false,       // 是否显示导航栏
    searchVisible: false,   // 是否显示导航栏搜索框
    ifDarkMode: true,    // 是否开启暗黑模式

    // 过滤字段
    searchContent: '',  // 导航栏搜索框的内容
    searchResult: [],   // 导航栏搜索结果
    tags: [],           // 用户选择的标签，提供过滤效果
    category: '',       // 分类过滤
    selectTimeLine: '', // 选中的timeline
    
    articles: [],       // 文章列表
    currentIndex: 0,    // 当前页数
    pageIndex: 3,       // 4篇文章一页
    totalIndex: null,   // 总页数
    
    limit: 4,           // 热门文章最多展示多少篇
    currentArticle: '', // 当前打开的文章
    
    // 热榜文章，主要是知乎、36Kr、微博的一些文章
    recommandArticles: [], 
    
    // 友情链接
    friendLink: [       
      { title: '云芒的博客', link: 'https://ymlog.com' },
      { title: '面向信仰编程', link: 'https://draveness.me/' },
      { title: '美团技术团队', link: 'https://tech.meituan.com/' },
      { title: '张鑫旭', link: 'https://www.zhangxinxu.com/wordpress/' },
      { title: 'CoolShell', link: 'https://coolshell.cn/featured' },
    ],
  },



  mutations: {
    modifySearchContent(state, option) {state.searchContent = option;},
    modifyCategory(state, option) {state.category = option;},
    pushTags(state, option) {!state.tags.includes(option)?state.tags.push(option):null;},
    popTags(state) {state.tags.pop();},
    clearTags(state) {state.tags = [];},
    defineTags(state, options) {state.tags = options;},
    modifyArticles(state, options) {state.articles = options;},
    setCurrentArticle(state, options) {state.currentArticle = options;},
    setSelectTimeLine(state, options) {state.selectTimeLine = options;},
    setSearchResult(state,options){state.searchResult = options;},
    setRecommandArticles(state,options){state.recommandArticles = options;},
    setIfViewVisible(state,options){
      console.log('保存ifViewVisible');
      saveIfViewVisible(options);
      state.ifViewVisible = options;
    },
    setIfShowNav(state,options){state.ifShowNav = options;},
    setSearchVisible(state,options){state.searchVisible = options;},
    setIfDarkMode(state,options){
      state.ifDarkMode = options;
      setDarkMode(options);
      if(options){ 
        document.documentElement.classList.add("dark")
      }else{
        document.documentElement.classList.remove("dark");
      }
    },
    addCurrentIndex(state){
      if(!state.totalIndex){
        state.totalIndex = util.group(state.articles,state.pageIndex).length;
      }
      if(state.currentIndex < state.totalIndex -1){
        state.currentIndex = state.currentIndex +1;
        setCurrentIndex(state.currentIndex); // 每一次加减页数，都将当前页码存放到localStorage中
      }
    },
    delCurrentIndex(state){ 
      if(state.currentIndex > 0){
        state.currentIndex = state.currentIndex -1 
        setCurrentIndex(state.currentIndex);
      }
    },
    clearCurrentIndex(state){
        state.currentIndex = 0; 
        setCurrentIndex(state.currentIndex);
    },
    setTotalIndex(state,option){
      state.totalIndex = option;
    }
  },
  getters: {
    navItems: state => state.navItems,
    searchContent: state => state.searchContent,
    tags: state => state.tags,
    category: state => state.category,
    articles: state => {
      if(!state.articles){
        api.articleLists().then(res=>{
          state.articles = res;
        })
      }
      return state.articles;
    },
    limit: state => state.limit,
    friendLink: state => state.friendLink,
    currentArticle: state => state.currentArticle,
    selectTimeLine: state => state.selectTimeLine,
    searchResult: state => state.searchResult,
    recommandArticles: state => state.recommandArticles,
    ifViewVisible: state => {
      let v = getIfViewVisible();
      if(typeof v === 'number'){
        state.ifViewVisible = v;
      }
      return state.ifViewVisible;
    },
    ifShowNav: state => state.ifShowNav,
    searchVisible: state => state.searchVisible,
    currentIndex: state => {
      let index = getCurrentIndex();
      if(index != null){
        state.currentIndex = index;
      }
      return state.currentIndex;
    },
    pageIndex: state => state.pageIndex,
    ifDarkMode: state => {
      let flag = getDarkMode();
      if(String(flag)){
        state.ifDarkMode = flag;
      }

      if(flag){ 
        document.documentElement.classList.add("dark")
      }else{
        document.documentElement.classList.remove("dark");
      }

      return state.ifDarkMode;
    },
    totalIndex: state=>{
      if(!state.totalIndex){
        state.totalIndex = util.group(state.articles,state.pageIndex).length;
      }
      return state.totalIndex;
    }
  },
})
