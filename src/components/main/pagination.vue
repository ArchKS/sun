// 首页分页
// https://codepen.io/hakimel/pen/gfIsk

<template>
  <div class="pagination-wrapper" v-if="articles.length !== 0">
    <!-- 翻页功能 -->
    <div class="pagination w-full h-20">
      <div class="counter text-black dark:text-white">{{currentIndex + 1}}/{{totalIndex}}</div>
        <button class="paginate left" @click="delCurrentIndex()" ref="left">
          <i></i><i></i>
        </button>
      <button class="paginate right" @click="addCurrentIndex()" ref="right">
          <i></i><i></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
    watch:{
        currentIndex(){
            this.setArrowStatus()
        }
    },
    methods:{
        // 根据页码改变箭头状态
        setArrowStatus(){
            if(this.currentIndex == 0){
                // 左侧到头了
                this.$refs.left.setAttribute('data-state','disabled');
                this.$refs.right.setAttribute('data-state','');
            }else if(this.currentIndex === this.totalIndex -1){
                // 右侧到头了
                this.$refs.right.setAttribute('data-state','disabled');
                this.$refs.left.setAttribute('data-state','');
            }else{
                this.$refs.left.setAttribute('data-state','');
                this.$refs.right.setAttribute('data-state','');
            }
        }
    },
    mounted(){
      if( this.articles.length !== 0){
        this.setArrowStatus();
      }
    }
};
</script>
<style lang='scss' scoped>
// @import "compass/css3";
$size: 2rem;
$thickness: 5px;
$angle: 40deg;
$angleHover: 30deg;
$angleActive: 25deg;

@mixin arrowTransform($angle, $x: 0, $y: 0) {
  i:first-child {
    transform: translate($x, $y) rotate($angle);
  }

  i:last-child {
    transform: translate($x, -$y) rotate(-$angle);
  }
}

button {
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  outline: 0;
}
.pagination{
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: -1rem;
}
.paginate {
  position: relative;
  width: $size;
  height: $size;
  cursor: pointer;
  transform: translate3d(0, 0, 0); // fixes flicker in webkit
  filter: drop-shadow(0 2px 0px rgba(0, 0, 0, 0.2));

  i {
    position: absolute;
    left: 0;
    width: $size;
    height: $thickness;
    border-radius: $thickness / 2;
    background: red;
    transition: all 0.15s ease;
  }

  &.left {
    // right: 58%;
    i {
      transform-origin: 0% 50%;
    }
    @include arrowTransform($angle, 0, -1px);
    &:hover {
      @include arrowTransform($angleHover, 0, -1px);
    }
    &:active {
      @include arrowTransform($angleActive, 1px, -1px);
    }
    &[data-state="disabled"] {
      @include arrowTransform(0deg, -5px, 0);

      &:hover {
        @include arrowTransform(0deg, -5px, 0);
      }
    }
  }

  &.right {
    // left: 58%;
    i {
      transform-origin: 100% 50%;
    }

    @include arrowTransform($angle, 0, 1px);

    &:hover {
      @include arrowTransform($angleHover, 0, 1px);
    }

    &:active {
      @include arrowTransform($angleActive, 1px, 1px);
    }

    &[data-state="disabled"] {
      @include arrowTransform(0deg, 5px, 0);

      &:hover {
        @include arrowTransform(0deg, 5px, 0);
      }
    }
  }

  &[data-state="disabled"] {
    opacity: 0.3;
    cursor: default;
  }
}
.counter {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 3rem;
  font-size: 2rem;
  font-family: Helvetica, sans-serif;
  text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.2);
//   color: #fff;
}
</style>