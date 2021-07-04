// menu button  https://codepen.io/aybukeceylan/pen/zYNpWdj

<template>
  <div class="menu-button">
    <div class="list-container" :class="{ active: ifActive }">
      <button class="more-button" aria-label="Menu Button" @click="actbtn">
        <div class="menu-icon-wrapper">
          <div class="menu-icon-line half first"></div>
          <div class="menu-icon-line"></div>
          <div class="menu-icon-line half last"></div>
        </div>
      </button>
      <ul class="more-button-list">
        <li class="more-button-list-item" @click="setMode()">
          <span class="icon icon-dark" v-if="this.ifDarkMode"></span>
          <span class="icon icon-day" v-else></span>
          <span class="text">{{ $t("menu.mode") }}</span>
        </li>
        <li class="more-button-list-item" @click="setLange()">
          <span class="icon icon-zh-en" v-if="currentLang==='zh'"></span>
          <span class="icon icon-en-zh" v-else></span>
          <span class="text">{{ $t("menu.lang") }}</span>
        </li>
        <li class="more-button-list-item" @click="share()">
          <span class="icon icon-share"></span>
          <span class="text">{{ $t("menu.share") }}</span>
        </li>
        <li class="more-button-list-item" @click="toTop()">
          <span class="icon icon-totop"></span>
          <span class="text">{{ $t("menu.toTop") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { saveLocale } from '@/utils/localstorage'
export default {
  data() {
    return {
      ifActive: false,
      currentLang: '',
    };
  },

  methods: {
    actbtn() {
      this.ifActive = !this.ifActive;
    },
    setMode(){
      if(this.ifDarkMode){
        this.setIfDarkMode(false)
      }else{
        this.setIfDarkMode(true)
      }
    },
    setLange(){
      if(this.$i18n.locale === 'zh'){
        this.$i18n.locale= 'en';
      }else{
        this.$i18n.locale= 'zh';
      }
      this.currentLang = this.$i18n.locale;
      saveLocale(this.currentLang);
    },
    share(){
      // 分享到QQ
      let URL = window.location.href;
      let TITLE = document.title;
      let SOURCE = TITLE;
      let DESCRIPTION = TITLE;
      let IMAGE = "https://ymlog.cn/img/avatar.png";

      let templateQQ = `http://connect.qq.com/widget/shareqq/index.html?url=${URL}&title=${TITLE}&source=${SOURCE}&desc=${DESCRIPTION}&pics=${IMAGE}&summary=`
      window.open(templateQQ);
    },
    toTop(){
      document.documentElement.scrollTo(0,0);
    }
  },
  created(){
    this.currentLang = this.$i18n.locale;
  }
};
</script>
<style lang='scss' scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
* {
  box-sizing: border-box;
  user-select: none;
}
.menu-button{
  z-index: 100;
}
$button-bg: #fd3838;
$list-bg: rgb(247, 242, 242);
$text-color: #252c41;
$text-color-hover: red;
$menu-icon-transition: transform 300ms cubic-bezier(0.52, -0.8, 0.52, 0.52);
.list-container {
  position: relative;

  &.active {
    .more-button-list {
      opacity: 1;
      transform: scale(1);
    }

    .more-button-list-item {
      animation: fadeInItem 0.6s 0.2s forwards;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding-right: 1.6rem;


      .icon {
        // font-weight: bold;
        font-size: 1.5rem !important;
        width: 18px;
        height: 18px;
        margin-right: .1rem;
      }

      &:nth-child(2) {
        animation-delay: 0.4s;
      }
      &:nth-child(3) {
        animation-delay: 0.6s;
      }
      &:nth-child(4) {
        animation-delay: 0.8s;
      }
    }

    .more-button {
      animation: onePulse 0.6s forwards linear;
    }

    .menu-icon-wrapper {
      transform: rotate(-45deg);
    }

    .menu-icon-line {
      &.first {
        transform: rotate(-90deg) translateX(1px);
      }

      &.last {
        transform: rotate(-90deg) translateX(-1px);
      }
    }
  }
}

.more-button {
  background-color: $button-bg;
  // box-shadow: 0px 0px 0px 4px rgba(92, 103, 255, 0.3);
  box-shadow: 0px 0px 0px 4px rgba(162, 164, 190, 0.3);
  border-radius: 50%;
  width: 3.8rem;
  height: 3.8rem;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: relative;
  z-index: 2;

  &:hover,
  &:focus {
    box-shadow: 0px 0px 0px 8px rgba(96, 96, 99, 0.3);
    background-color: darken($button-bg, 4%);
  }

  &:focus {
    outline: 0;
  }

  &-list {
    background-color: $list-bg;
    border-radius: .8rem;
    list-style-type: none;
    width: 14rem;
    height: 12rem;
    box-shadow: 0px 0px 4px 4px rgba(150, 157, 249, 0.16);
    padding: 0;
    padding: .5rem;
    position: absolute;
    right: 1.5rem;
    bottom: 0;
    opacity: 0;
    transform: scale(0);
    transform-origin: bottom right;
    transition: all 0.3s ease 0.1s;
    @media screen and (max-width: 768px) {
      height: 17rem;
    }
    li {
      opacity: 0;
    }
  }

  &-list-item {
    display: flex;
    align-items: center;
    color: $text-color;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    transition: 0.2s ease-in;
    transform: translatex(-10px);

    &:hover {
      color: $text-color-hover;
    }

    &:after {
      content: "";
      position: absolute;
      height: 1px;
      width: calc(100% - 24px);
      left: 12px;
      bottom: 0;
      background-color: rgba(132, 160, 244, 0.1);
    }
    &:last-child:after {
      display: none;
    }

    span {
      display: inline-block;
      line-height: 20px;
      font-size: 14px;
      margin-left: 8px;
    }
  }
}

@keyframes onePulse {
  0% {
    box-shadow: 0px 0px 0px 0px rgba(92, 103, 255, 0.3);
  }

  50% {
    box-shadow: 0px 0px 0px 12px rgba(92, 103, 255, 0.1);
  }

  100% {
    box-shadow: 0px 0px 0px 4px rgba(92, 103, 255, 0.3);
  }
}

@keyframes fadeInItem {
  100% {
    transform: translatex(0px);
    opacity: 1;
  }
}

.menu-icon-wrapper {
  border-radius: 2px;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 330ms ease-out;
}

.menu-icon-line {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 2px;

  &.half {
    width: 50%;
  }

  &.first {
    transition: $menu-icon-transition;
    transform-origin: right;
  }

  &.last {
    align-self: flex-end;
    transition: $menu-icon-transition;
    transform-origin: left;
  }
}
</style>
