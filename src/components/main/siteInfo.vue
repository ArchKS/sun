// 网站咨询
// 站点运行时间
// 文章数量
// 最近一次更新
<template>
  <div class="site-info" v-if="articleCount !== 0">
    <div class="title-wrapper text-xl px-1 pt-3 cursor-pointer hover:text-blue-400   flex items-center">
      <span class="icon-lighting text-3xl icon mt-1"></span>
      <span class="title font-bold">{{ $t('card.siteinfo') }}</span>
    </div>
    <div class="item article-count flex justify-between items-center py-2 mt-1 ">
      <div class="mx-6">{{ $t('card.articleCount') }}:</div>
      <div class="mx-6">{{articleCount}} {{ $t('card.unit') }}</div>
    </div>
    <div class="item site-time-wrapper flex justify-between items-center py-2 ">
      <div class="mx-6">{{ $t('card.runTime') }}:</div>
      <div class="mx-6">{{ runTime }} {{ $t('card.day') }}</div>
    </div>
    <div
      class="item last-modified-wrapper flex justify-between items-center py-2 mb-1  pb-4"
    >
      <div class="mx-6">{{ $t('card.latestUpdate') }}:</div>
      <div class="mx-6">{{ lastModified }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    articleCount() {
      return [...this.articles].length;
    },
    lastModified() {
      let sublist = [...this.articles];
      let lastArticle = sublist.sort((a, b) => {
        return new Date(b.created) - new Date(a.created) ;
      });
      let lastMdify = lastArticle[0].created || new Date().toLocaleDateString();
      return lastMdify;
    },
    runTime() {
      let days =
        (new Date() - new Date(process.env.VUE_APP_RUN_TIME)) /
        (1000 * 60 * 60 * 24);
      return parseInt(days);
    },
  },
};
</script>
<style lang='scss' scoped>
.site-info{
  border: 1px solid #eee;
  user-select: none;
 box-shadow: 0px 1rem 7.5rem rgba(34, 35, 58, 0.2);
}
.icon{
  color: #fd3838;
}
.item{
  @media screen and (max-width: 768px) {
    padding: 1rem 1rem;
  }
}
</style>