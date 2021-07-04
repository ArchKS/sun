<template>
  <div class="article-item" :class="{'test': title == 'test'}">
    <div class="item-card" v-if="title !== 'test'">
      <!-- 左侧图片 -->
      <div class="image-wrapper">
        <img
          src="@/assets/image/unsplash.jpg"
          alt=""
          v-if="!ifShowSearchContent"
        />
        <div
          class="text"
          v-html="articleContent"
          v-else
        ></div>
      </div>
      <!-- 右侧信息 -->
      <div class="info-wrapper" >
        <!-- 时间 -->
        <div class="time-wrapper">
          <div class="time">{{ fmtEn(created) }}</div>
        </div>
        <!-- 标题 -->
        <div class="title-wrapper">
          <div class="title" v-html="title"></div>
        </div>
        <!-- 描述信息，包括分类和标签 -->
        <div class="describe-wrapper">
          <div class="category-wrapper">
            <span class="desc" @click="modifyCategory(c)">{{ c }}</span>
          </div>
          <div class="tags-wrapper">
            <div class="tags" v-for="(t, index) in t" :key="index">
              <div class="desc" @click="pushTags(t)">{{ t }}</div>
            </div>
          </div>
        </div>

        <!-- 点击阅读 -->
        <div class="read-wrapper" @click="showArticle(id)">{{ $t('card.readmore') }}</div>
      </div>
    </div>
    <div class="decoration" v-if="title !== 'test'">
      <img src="@/assets/image/wave.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      default: -1,
    },
    created: {
      type: String,
      default: '2021/04/16',
    },
    t: {
      type: Array,
      default: ()=>[],
    },
    c: {
      type: String,
      default: 'NoC',
    },
  },
  watch: {
    searchResult(v) {
      this.searchResultChange();
    },
    searchContent(){
      this.searchResultChange();
    }
  },
  data() {
    return {
      ifShowSearchContent: false,
      ifMouseEnter: false,
      articleContent: "",
    };
  },
  methods: {
    addTags(t) {
      this.pushTags(t);
    },
    searchResultChange() {
      // 如果搜索内容和结果为空
      if ([...this.searchResult].length === 0 || this.searchContent.length === 0) {
        this.ifShowSearchContent = false;
        return;
      };
      
      let item = [...this.searchResult].filter((v) => v.id == this.id)[0];
      this.articleContent = item.content;
      if (this.articleContent.length === 0) return;

      let keyword = item.keyword;
      this.articleContent = "....." + this.articleContent + "......";
      this.articleContent = this.articleContent.replace(keyword,`<i style='color: #D97706; font-weight:bold;'>${keyword}</i>`);
      this.ifShowSearchContent = true;
    },
    // 水平滚动
    mswheel(e) {
      e.preventDefault();
      let step = e.deltaY > 0 ? 20 : -20;
      this.$refs.scroll.scrollLeft += step;
    },
  },
  mounted() {
    this.searchResultChange();
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');
*{
  font-family: 'Fira Sans', sans-serif !important;
}
.article-item {
    width: 100%;
    position: relative;
    max-width: 50rem;
    margin: 0 0 3rem 0;
    background: #fff;
    box-shadow: 0px 1rem 7.5rem rgba(34, 35, 58, 0.2);
    border-radius: 1.5rem;
    height: 18rem;
    
    transition: all 0.3s;
    &.test{
      box-shadow: none !important;
      background: transparent !important;
    }
    @media screen and (max-width: 992px) {
      max-width: 45rem;
    }    
    @media screen and (max-width: 768px) {
      width: 90%;
      height: 20rem;
      margin: 8rem auto;
      &:nth-child(1){
        margin-top: 8rem;
      }
      &:nth-last-child(1) {
        margin-bottom: 2rem ;
      }
    }
    @media screen and (max-height: 500px) and (min-width: 992px) {
          height: 24rem;
    }
  .item-card {
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    .image-wrapper {
        width: 15rem;
        height: 15rem;
        background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
        box-shadow: 4px .9rem 2rem 1px rgba(252, 56, 56, 0.2);
        border-radius: 1.4rem;
        transform: translateX(-5rem);
        overflow: hidden;
        opacity: .9;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
          border-radius: 20px;
          opacity: 0.8;
        }
      img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: .8;
          border-radius: 1.4rem;
          transition: all .3s;
      }
      .text{
        padding: 2rem;
      }
       @media screen and (max-width: 992px) {
          // width: 45%;
        }
        @media screen and (max-width: 768px) {
        transform: translateY(-50%);
          width: 80%;
        }
        @media screen and (max-width: 576px) {
          width: 80%;
          height: 10rem;
        }
        @media screen and (max-height: 500px) and (min-width: 992px) {
            height: 18rem;
        }
    }
    .info-wrapper {
      padding-left: .3rem;
      height: 18rem;
      overflow: hidden;
      
      @media screen and (max-width: 992px) {
        width: 55%;
      }
      @media screen and (max-width: 768px) {
        width: 100%;
        margin-top: -8rem;
        text-align: center;
        padding: 0 30px;
      }
      @media screen and (max-width: 576px) {
        padding: 0
      }
      > * {
        transform: translateY(25px);
        transition: all .4s; 
      }
      .time-wrapper {
        margin-top: 2rem;
        color: #7b7992;
        display: block;
        font-weight: 500;
      }
      .title-wrapper {
        margin-top: .8rem;
        font-size: 1.8rem;
        font-weight: 700;
        color: #0d0925;
      }
      .describe-wrapper {
        margin-top: .8rem;
        color: #4e4a67;
        line-height: 1.5em;
        display: flex;
        justify-content: flex-start;
        z-index: 10000;

 @media screen and (max-width: 768px) {
      justify-content: center;
      }

        .category-wrapper{}
        .tags-wrapper{
          display: flex;
        }
        .desc{
          cursor: pointer;
          color: #4e4a67;
          padding: 0 .2rem;
        }
      }
      .read-wrapper {
         margin-top: 1.2rem;
         margin-left: -.3rem;
        display: inline-flex;
        padding: .8rem 1.4rem;
        border-radius: 2rem;
        font-weight: 500;
        text-decoration: none;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        letter-spacing: 1px;
        color: #fff;
        background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
        box-shadow: 0px 1rem 3rem rgba(252, 56, 56, 0.4);
        @media screen and (max-width: 576px) {
          // width: 10rem;
        }
      }
    }
  }
  .decoration{
    pointer-events: none;
    position: absolute;
    width: 30rem;
    height: 6rem;
    bottom: 0;
    right: 0;
    border-radius: 0 0 1.6rem 0;
    overflow: hidden;
    img{
      position: absolute;
      bottom: -1.5rem;
      left: 30%;
    }
  }
}
</style>