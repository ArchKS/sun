<template>
  <transition name="slide-down">
    <div
      class="navagation flex items-center bg-gray-100 text-black dark:bg-gray-900 dark:text-white"
      v-if="ifShowNav"
    >
      <div class="menu-totle-wrapper">
        <div id="resp-menu" class="responsive-menu" @click="respClick">
          <i class="icon-uniE903"></i> Menu
        </div>

        <div
          class="menu-wrapper bg-gray-100 text-black dark:bg-gray-900 dark:text-gray-50"
          ref="menu"
        >
          <div
            class="title-wrapper subTitle"
            @click="navClick(0)"
            :class="{ selected: ifViewVisible === 0 }"
          >
            <div class="title font-semibold">{{ $t("nav.home") }}</div>
          </div>
          <div
            class="recommand-wrapper subTitle"
            @click="navClick(1)"
            :class="{ selected: ifViewVisible === 1 }"
          >
            <div class="recommand font-semibold">{{ $t("nav.recommand") }}</div>
          </div>
          <div
            class="feature-wrapper subTitle"
            @click="navClick(2)"
            :class="{ selected: ifViewVisible === 2 }"
          >
            <div class="feature font-semibold">{{ $t("nav.about") }}</div>
          </div>
        </div>
      </div>
      <!-- 过滤 -->
      <div class="filter-wrapper">
        <filter-bar></filter-bar>
      </div>
      <!-- 搜索的方框 -->
      <div class="search-warpper text-3xl flex items-center">
        <div class="container">
          <input
            type="text"
            placeholder="Search..."
            v-model="inpVal"
            @keyup.enter.exact="search"
            @keyup.esc.exact="cancel"
            @click="clickSearch"
          />
          <div class="search"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import api from "@/api/index.js";
import filterBar from "./filterBar.vue";
export default {
  data() {
    return {
      inpVal: "",
      ifSlideDown: false,
    };
  },
  components: {
    filterBar,
  },
  methods: {
    clickSearch() {
      this.setSearchVisible(true);
    },
    search() {
      // 进行搜索，将searchContent进行修改，则需要用到的地方监听searchContent
      this.inpVal = this.inpVal.trim();
      this.modifySearchContent(this.inpVal);
      api
        .search(this.inpVal)
        .then((result) => {
          this.setSearchResult(result);
        })
        .catch((reason) => {
          this.error(reason);
        });
      this.setSearchVisible(false);
    },
    cancel() {
      // 取消搜索
      this.inpVal = "";
      this.setSearchVisible(false);
      this.clearAllTags();
    },
    navClick(n) {
      this.setIfViewVisible(n);
      this.info("navgation 82-lines: click " + n);
      if (window.innerWidth < 768) {
        this.$refs.menu.style.display = "none";
      }
    },
    respClick(e) {
      e.preventDefault();
      if (window.innerWidth < 768) {
        let ifDisplay = this.$refs.menu.style.display;
        if (ifDisplay == "none" || ifDisplay == "") {
          this.$refs.menu.style.display = "block";
        } else if (ifDisplay == "block") {
          this.$refs.menu.style.display = "none";
        } else {
          this.$refs.menu.style.display = "none";
        }
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.setIfShowNav(true);
    }, 500);
  },
};
</script>

<style lang='scss' scoped>
@import "@/assets/styles/global.scss";
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");
@import url("https://fonts.googleapis.com/css?family=Inconsolata:700");

.icon-cancel {
  color: #9ca3af !important;
  font-weight: normal !important;
}

.navagation {
  width: 100%;
  box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.15);
  position: fixed;
  width: 100%;
  height: 4rem;
  top: 0;
  left: 0;
  z-index: 1000;
  .menu-totle-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    #resp-menu {
      display: none;
      text-transform: uppercase;
      font-weight: 600;
      text-align: right;
      font-size: 1.6rem;
    }

    .menu-wrapper {
      position: absolute;
      right: 0;
      display: flex;
    }
  }
  .filter-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media screen and (max-width: 768px) {
    height: 5rem;
    .menu-totle-wrapper {
      display: block;
      width: 100%;
      user-select: none;
      background: transparent;
      #resp-menu {
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-10%, -50%);
        cursor: pointer;
        user-select: none;
      }
      .menu-wrapper {
        user-select: none;
        display: none;
        margin-top: 5rem;
        .subTitle {
          display: block;
          padding: 1rem 2rem;
          margin: 0;
          div {
            font-size: 1.6rem !important;
          }
          text-align: right;
          &:hover {
            background-color: #f10215;
            color: white;
          }
        }
      }
    }
  }
  .search-warpper {
    position: absolute;
    left: 1rem;
    @media screen and (max-width: 768px) {
      width: 30% !important;
    }
  }
  .selected {
    color: #fd3838;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: bold;
  }
}

.subTitle {
  @apply text-xl cursor-pointer dark:hover:text-blue-600;
  text-transform: uppercase;
  div {
    font-family: "Fira Sans", sans-serif !important;
    font-size: 1.4rem;
  }
  margin: 0 1rem;
  &:nth-child(1) {
    margin-left: 2rem;
  }
  &:hover {
    color: #53ac82;
  }
  @media screen and (max-width: 768px) {
    // margin-left: 1rem;
  }
}
.icon {
  @apply font-bold hover:text-blue-600;
  font-size: 1.6rem;
}

.container {
  position: absolute;
  margin: auto;
  // 决定放大镜图标位置
  top: 50%;
  left: 0;
  width: 3rem;
  height: 3rem;
  transform: translate(0, -50%);
  .search {
    // 搜索图标背景样式
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 3rem;
    height: 3rem;
    background: crimson;
    border-radius: 50%;
    transition: all 1s;
    z-index: 4;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);
    @media screen and (max-width: 768px) {
      height: 3.5rem;
      width: 3.5rem;
    }
    &:hover {
      cursor: pointer;
    }
    &::before {
      // 搜索图标字体样式
      content: "";
      position: absolute;
      margin: auto;
      top: 1.2rem;
      right: 0;
      bottom: 0;
      left: 1.2rem;
      width: 0.9rem;
      height: 0.12rem;
      background: white;
      transform: rotate(45deg);
      transition: all 0.3s;
    }
    &::after {
      // 搜索图标字体样式
      content: "";
      position: absolute;
      margin: auto;
      top: -5px;
      right: 0;
      bottom: 0;
      left: -5px;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      border: 2px solid white;
      transition: all 0.3s;
    }
  }
  input {
    font-family: "Inconsolata", monospace;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 8rem;
    height: 2.8rem;
    outline: none;
    border: none;
    background: crimson;
    color: white;
    text-shadow: 0 0 10px crimson;
    // 控制search输入框里面的内容
    padding: 0 1.2rem 0 1.2rem;
    border-radius: 2rem;
    // box-shadow: 0 0 1.5rem 0 crimson,
    //             0 1.5rem 1.5rem 0 rgba(0, 0, 0, 0.2);
    transition: all 0.6s;
    opacity: 0;
    z-index: 5;
    font-weight: bolder;
    letter-spacing: 0.1em;
    @media screen and (max-width: 768px) {
      height: 3.3rem;
    }
    &:hover {
      cursor: pointer;
    }
    &:focus {
      // 控制输入框长度
      width: 13rem;

      opacity: 1;
      cursor: text;
    }
    &:focus ~ .search {
      // 正数相左，负数向右
      right: -20rem;
      background: #151515;
      z-index: 6;
      &::before {
        top: 0;
        left: 0;
        width: 1.5rem;
      }
      &::after {
        top: 0;
        left: 0;
        width: 1.5rem;
        height: 2px;
        border: none;
        background: white;
        border-radius: 0%;
        transform: rotate(-45deg);
      }
    }
    &::placeholder {
      color: white;
      opacity: 0.5;
      font-weight: bolder;
    }
  }
}
</style>