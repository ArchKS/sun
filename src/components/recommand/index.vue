<template>
  <div class="recommand w-full h-full relative" v-if="ifViewVisible === 1">
    <div class="center w-full h-full ">
      <parallax-carousel></parallax-carousel>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
import parallaxCarousel from "@/components/recommand/parallaxCarousel.vue";

export default {
  components: {
    parallaxCarousel,
  },
  created() {
    api.getRecommandArticles("zhihu").then((resz) => {
        this.setRecommandArticles(resz.data);
    });
  },
};
</script>
<style lang='scss' scoped>
</style>
