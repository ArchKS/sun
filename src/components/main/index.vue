<template>
  <div class="page relative flex flex-col  " v-if="this.ifViewVisible === 0">
    <div
      class="main bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-100 relative flex"
    >
      <!-- 左侧 -->
      <div class="left w-3/12">
        <!-- 用户信息 -->
        <div class="showcenter">
          <person-info class="mobile shadow-md h-72 w-72"></person-info>
        </div>

        <!-- 文章时间 X 篇/月 -->
        <div class="showcenter">
          <time-line class=" mobile article-time shadow-md w-72"></time-line>
        </div>

        <!-- 网站咨询 -->
        <div class="showcenter">
          <site-info class=" mobile site-info h-46 shadow-md w-72"></site-info>
        </div>
      </div>

      <!-- 中间 -->
      <div class="center w-4/12">
        <!-- 文章列表 -->
        <article-list></article-list>
        <!-- 分页 -->
         <!-- <pagination class="pag-index"></pagination> -->
      </div>

      <!-- 右侧 -->
      <div class="right w-3/12">
        <!-- 当前热门 -->
        <div class="showcenter">
          <hot-articles class="w-72"></hot-articles>
        </div>
        <!-- 友情链接 -->
        <div class="showcenter">
          <friend-link class="w-72"></friend-link>
        </div>
      </div>
    </div>
    <div class="footer mt-12 h-14">
      <wave-bar class="w-full absolute bottom-0 bg-blue-400"></wave-bar>
    </div>
  </div>
</template>

<script>
import personInfo from "@/components/main/personInfo.vue";
import timeLine from "@/components/main/timeline.vue";
import articleList from "@/components/main/articleList.vue";
import siteInfo from "@/components/main/siteInfo.vue";
import hotArticles from "@/components/main/hotArticles.vue";
import waveBar from "../footer/index.vue";
import friendLink from "@/components/main/friendLink.vue";
import pagination from "./pagination.vue"

export default {
  components: {
    personInfo,
    articleList,
    timeLine,
    siteInfo,
    hotArticles,
    friendLink,
    waveBar,
    pagination
  },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
.main {
  width: 100%;
  height: 100%;
  .left {
    margin: 0 4rem;
    .site-info {
      margin-top: 3rem;
    }
    .article-time {
      margin-top: 3rem;
    }
  }
  .center {
    margin-left: 4rem;
    margin-bottom: 4rem;
  }
  .right {
    margin: 0 4rem;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;

    .left {
      width: 100%;
      margin: 0;
      margin-top: -3rem;
      margin-bottom: 6rem;
      .showcenter{
        width: 100% !important;
      .mobile{
        width: 80% !important;
      }
      }
    }

    .center {
      margin: 0 !important;
      width: 100% !important;
    }
    .right {
      display: none;
    }
  }

}

.showcenter {
  @apply flex justify-center items-center;
}
</style>