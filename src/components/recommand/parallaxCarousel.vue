<template>
  <div
    class="parallax-carousel bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-100"
  >
    <div class="stage"></div>
    <div class="container">
      <div class="ring">
        <div
          v-for="(item, index) in parallaxShowArticles"
          :key="index"
          class="img relative"
        >
          <div class="title text-2xl font-bold" @click="linkTo(item.link)">
            {{ item.title }}
          </div>
          <div class="heat">
            <span class="icon icon-hot text-red-700"></span>
            <span class="text">{{ item.heat }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="select-platform-wrapper">
      <div class="select-platform">{{ selectPlatform }}</div>
    </div>

    <div class="cards">
      <span class="c1 c dark:text-white text-black" @click="load(1)"></span>
      <span class="c2 c dark:text-white text-black" @click="load(2)"></span>
      <span class="c3 c dark:text-white text-black" @click="load(3)"></span>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import $ from "zepto-webpack";
import api from "@/api/index.js";
export default {
  data() {
    return {
      parallaxShowArticles: [],
      maxShowNumber: 10,
      selectPlatform: "知乎",
    };
  },
  mounted() {
    let xPos = 0;
    gsap
      .timeline()
      .set(".ring", { rotationY: 180, cursor: "grab" })
      .set(".img", {
        rotateY: (i) => i * -36,
        transformOrigin: "50% 50% 500px",
        z: -500,
        // backgroundImage: (i) => "url(https://picsum.photos/id/" + (i + 32) + "/600/400/)",
        backgroundPosition: (i) => getBgPos(i),
        backfaceVisibility: "hidden",
      })
      .from(".img", {
        duration: 1.5,
        y: 200,
        opacity: 0,
        stagger: 0.1,
        ease: "expo",
      })
      .add(() => {
        $(".img").on("mouseenter", (e) => {
          let current = e.currentTarget;
          gsap.to(".img", {
            opacity: (i, t) => (t == current ? 1 : 0.5),
            ease: "power3",
          });
        });
        $(".img").on("mouseleave", (e) => {
          gsap.to(".img", { opacity: 1, ease: "power2.inOut" });
        });
      }, "-=0.5");

    $(window).on("mousedown touchstart", dragStart);
    $(window).on("mouseup touchend", dragEnd);

    function dragStart(e) {
      if (e.touches) e.clientX = e.touches[0].clientX;
      xPos = Math.round(e.clientX);
      gsap.set(".ring", { cursor: "grabbing" });
      $(window).on("mousemove touchmove", drag);
    }

    function drag(e) {
      if (e.touches) e.clientX = e.touches[0].clientX;

      gsap.to(".ring", {
        rotationY: "-=" + ((Math.round(e.clientX) - xPos) % 360),
        onUpdate: () => {
          gsap.set(".img", { backgroundPosition: (i) => getBgPos(i) });
        },
      });

      xPos = Math.round(e.clientX);
    }

    function dragEnd(e) {
      $(window).off("mousemove touchmove", drag);
      gsap.set(".ring", { cursor: "grab" });
    }

    function getBgPos(i) {
      return (
        100 -
        (gsap.utils.wrap(
          0,
          360,
          gsap.getProperty(".ring", "rotationY") - 180 - i * 36
        ) /
          360) *
          500 +
        "px 0px"
      );
    }
  },
  methods: {
    load(n) {
      if (n == 1) {
        // 加载微博
        api.getRecommandArticles("weibo").then((resz) => {
          this.setRecommandArticles(resz.data);
          this.selectPlatform = "微博";
          this.parallaxShowArticles = [...this.recommandArticles].slice(
            0,
            this.maxShowNumber
          );
        });
      } else if (n == 2) {
        // 加载知乎
        api.getRecommandArticles("zhihu").then((resz) => {
          this.setRecommandArticles(resz.data);
          this.selectPlatform = "知乎";
          this.parallaxShowArticles = [...this.recommandArticles].slice(
            0,
            this.maxShowNumber
          );
        });
      } else if (n == 3) {
        //   加载36kr
        api.getRecommandArticles("kr").then((resz) => {
          this.setRecommandArticles(resz.data);
          this.selectPlatform = "36Kr";
          this.parallaxShowArticles = [...this.recommandArticles].slice(
            0,
            this.maxShowNumber
          );
        });
      }
    },
  },
  created() {
    this.parallaxShowArticles = [...this.recommandArticles].slice(
      0,
      this.maxShowNumber
    );
  },
};
</script>

<style lang='scss' scoped>
.parallax-carousel,
.stage,
.ring,
.img {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  user-select: none;
}
.parallax-carousel {
  // width: 100%;
  // height: 90vh;
  // overflow: hidden;
}
.parallax-carousel,
.stage {
  overflow: hidden;
}
div,
svg {
  position: absolute;
}

.container {
  perspective: 2000px;
  width: 300px;
  height: 400px;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.ring {
  border: none;
  outline: none;
  box-shadow: none;
}
.title {
  text-indent: 2rem;
  top: 40%;
  transform: translate(0, -60%);
  cursor: pointer;
  padding: 0 2rem;
}
.heat {
  bottom: 2rem;
  left: 50%;
  transform: translate(-50%, 0);
}
.img {
  color: #1f2937;
  background-color: white;
  box-shadow: 0 8px 13px rgba(0, 0, 0, 0.14);
  &:hover {
    background-color: black;
    color: white;
  }
}
.select-platform-wrapper {
  position: absolute;
  bottom: 20%;
  left: 50%;
  z-index: 1000;
  width: 15rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  transform: translate(-50%, 0);
  .select-platform {
  }
}
.cards {
  position: absolute;
  bottom: 13%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 15rem;
  height: 1rem;
  .c {
    width: 4rem;
    height: 100%;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    &:hover {
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.15);
    }
    &:hover::before {
      position: absolute;
      top: -1.4rem;
      left: 50%;
      white-space: nowrap;
      transform: translate(-50%, 0);
    }
  }
  .c1 {
    background-color: #fbbf24;

    &:hover::before {
      content: "微博";
    }
  }
  .c2 {
    background-color: #34d399;
    &:hover::before {
      content: "知乎";
    }
  }
  .c3 {
    background-color: #60a5fa;
    &:hover::before {
      content: "36Kr";
    }
  }
}
</style>