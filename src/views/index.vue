<template>
  <div @mousewheel="mswheel" class="index" @mousemove="msmove">
    <div class="nav">
      <!-- 导航菜单 -->
      <my-nav></my-nav>
    </div>

    <div class="detail-pages">
      <!-- 首页 -->
      <main-view></main-view>
      <!-- 推荐页 -->
      <recommand-view></recommand-view>
      <!-- 自我介绍 -->
      <me-view></me-view>
    </div>

    <div class="menu-abs">
      <my-menu></my-menu>
    </div>

  </div>
</template>

<script>
import mainView from "@/components/main/index.vue";
import recommandView from "@/components/recommand/index.vue";
import meView from "@/components/me/index.vue";
import myNav from "@/components/nav/index.vue";
import myMenu from "@/components/common/menu.vue";


export default {
  data() {
    return {
      task: null,
    };
  },
  components: {
    mainView,
    recommandView,
    myNav,
    meView,
    myMenu,
  },
  methods: {
    mswheel(e) {
      let deltaY = e.deltaY;
      //
      let flag =
        !!this.searchContent.length ||
        !!this.searchResult.length ||
        !!this.tags.length ||
        !!this.category.length ||
        !!this.selectTimeLine.length;

      if (deltaY < 0 || flag === true) {
        if (flag) {
          setTimeout(() => {
            this.setSearchVisible(true);
          }, 300);
        }
        this.setIfShowNav(true);
      } else {
        this.setSearchVisible(false);
        this.setIfShowNav(false);
      }
    },
    msmove(e) {
      if (this.task) return;
      let Y = e.clientY;
      // console.log(Y);
      if (Y < 200 && this.ifShowNav === false) {
        this.setIfShowNav(true);
        setTimeout(() => {
          this.setSearchVisible(true);
        }, 300);
      }
      this.task = setTimeout(() => {
        this.task = null;
      }, 500);
    },
    
  },
  beforeMount() {
    this.getArticles();
  },
};
</script>
<style lang='scss' scoped>
.index {
  width: 100%;
  height: 100%;
  .nav {
    height: 4rem;
    width: 100%;
  }
  .detail-pages {
    margin-top: 2rem;
    width: 100%;
    height: 100%;
  }
  .menu-abs {
    position: fixed;
    bottom: 1.5rem;
    right: 1rem;
  }
}
</style>