<template>
  <div class="hot-artilces">
    <div class="title-bar centerflex h-10 p-2 px-4 text-lg">
      <span class="">{{ $t("card.hot") }}</span>
      <span
        class="icon-open text-2xl cursor-pointer icon"
        @click="hideHotList"
        :class="{ selected: ifShow }"
      ></span>
    </div>

    <transition name="height-zero">
      <div
        class="content-area overflow-hidden flex flex-col h-76"
        v-if="ifShow"
      >
        <div
          class="h-item centerflex py-3 cursor-pointer px-6 hover:bg-gray-200 dark:hover:bg-gray-500"
          v-for="(item, index) in haticles"
          :key="index"
          @click="showArticle(item.id)"
        >
          <div class="title">{{ item.title }}</div>
          <div class="visited">
            <span> {{ item.visited }} </span>
            <span class="icon-hot text-red-600"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      haticles: [],
      tmpAtcles: [],
      ifShow: true,
      task: "",
    };
  },
  watch:{
    articles(v){
      this.updateArticles();
    }
  },
  methods: {
    hideHotList() {
      this.ifShow = !this.ifShow;
    },
    updateArticles() {
      this.tmpAtcles = [...this.articles]
        .sort((a, b) => {
          return b.visited - a.visited;
        })
        .slice(0, this.limit);
      this.haticles = this.tmpAtcles;
    },
  },
  created() {
    this.updateArticles()
  },
};
</script>


<style lang='scss' scoped>
.hot-artilces {
  box-shadow: 0px 1rem 7.5rem rgba(34, 35, 58, 0.2);
}
.h-item {
  &:nth-last-child(1) {
    padding-bottom: 1rem;
  }
}

.height-zero-enter-to,
.height-zero-leave {
  height: 10rem;
}
.height-zero-leave-to,
.height-zero-enter {
  height: 0rem;
}
.height-zero-enter-active,
.height-zero-leave-active {
  transition: all 0.3s linear;
}

.darkmode {
  @apply dark:text-gray-500 dark:hover:text-blue-400;
}
.centerflex {
  @apply flex items-center justify-between;
}

.icon {
  color: #fd3838;
  // transform: rotateZ(180deg);
  transition: all 0.3s linear;
}
.selected {
  transform: rotateZ(-90deg);
}
</style>