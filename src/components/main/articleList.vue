<template>
  <div class="article-list w-full">
    <article-item
      v-for="(item, index) in dynamicItems"
      :key="index"
      :title="item.title"
      :id="item.id"
      :t="item.tags"
      :c="item.category"
      :created="item.created"
    >
    </article-item>
   <pagination class="pag-index "></pagination>
  </div>
</template>

<script>
import articleItem from "./articleItem";
import util from "@/utils/util.js"
import pagination from "./pagination.vue"

export default {
  watch: {
    tags(v) {
      this.getDynamicItems();
    },
    category(v) {
      this.getDynamicItems();
    },
    searchResult(v){
      this.getDynamicItems();
    },
    selectTimeLine(v){
      this.getDynamicItems();
    },
    searchContent(v){
      this.getDynamicItems();
    },
    articles(v){
      this.getDynamicItems();
    },
    currentIndex(v){
      this.getDynamicItems();
    }
  },

  components: {
    articleItem,
    pagination,
  },
  mounted() {
    this.articleList = [...this.articles];
    this.getDynamicItems();
  },
  methods: {
    modifiedArticleList() {
      this.articleList = [...this.articles].filter((v) => {
        let articleTag = v.tags;    // 文章自带标签
        let tags = [...this.tags];  // 用户想要的标签

        // 过滤标签
        let flag1 = true;
        if (tags.length === 0) {
          flag1 = true;
        } else {
          tags.forEach((t) => {
            if (!articleTag.includes(t)) {
              flag1 = false;
            }
          });
        }

        // 过滤分类
        let flag2 = false;
        if (this.category.length === 0) {
          flag2 = true;
        } else {
          if (this.category === v.category) {
            flag2 = true;
          }
        }

        // 过滤搜索
        let flag3 = false;
        if (this.searchContent.length === 0) {
          flag3 = true;
        }else{
          [...this.searchResult].forEach(result=>{
            if(result.id === v.id){
              flag3 = true;
            }
          })
        }

        // 过滤timeline
        let flag4 = false;
        let t = v.created.replace(/\/\d+$/,''); // 将2021/03/12 -> 2021/03
        if(this.selectTimeLine.length === 0){
          flag4 = true;
        }else if(this.selectTimeLine === t){
          flag4 = true;
        }

        return flag1 && flag2 && flag3 && flag4;
      });
    },
    getDynamicItems(){
      this.modifiedArticleList();
      let totalLength =this.articleList.length;
      if( totalLength !==0){
        let res  = util.group([...this.articleList],this.pageIndex);
        let pagesLength = res.length;
        this.setTotalIndex(pagesLength);
        if( totalLength < this.pageIndex ){
          this.clearCurrentIndex(0);
        }
        this.dynamicItems = res[this.currentIndex];
      }else{
        this.dynamicItems = [];
      }
    },
    nowday() {
      let [year, month, day] = this.getNowTime();
      return `${year}/${month}/${day}`;
    },
  },
  data() {
    return {
      articleList: [],
      dynamicItems: [],
    };
  },
};
</script>
<style lang='scss' scoped>
.pag-index{
  margin-bottom: 10rem;
}
 @media screen and (max-width: 768px){
  .pag-index{
    margin-top: -6rem;
  }
 }

</style>