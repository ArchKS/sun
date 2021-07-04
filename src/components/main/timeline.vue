<template>
  <div class="time-line">
    <div class="tline-wrapper py-5">
      <div class="Filing-wrapper py-2 flex items-center select-none ">
        <span class="icon-logs text-2xl pl-5"></span>
        <span class="text-xl px-2 leading-8 mb-1">{{ $t('card.filing') }}</span>
      </div>
      <div
        class="item flex justify-between px-5 py-2 cursor-pointer px-6 hover:bg-gray-200 dark:hover:bg-gray-500"
        v-for="(item, index) in timeLines"
        :key="index"
        @click="filterByTime(item.created)"
        :class="{'selected' : item.created === selectTimeLine }"
      >
        <div class="time pl-3">{{ item.created }}</div>
        <div class="count pr-4">{{ item.count }} {{ $t('card.unit') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    timeLines() {
      let obj = {};
      let articles = [...this.articles];
      for (let item of articles) {
        let { created } = item;
        created = created.split("/");
        created.pop();
        created = created.join("/");
        if(obj[created]){
          obj[created] += 1;
        }else{
          obj[created] = 1;
        }
      }
      let res = [];
      for(let v in obj){
        res.push({created: v,count:obj[v]})
      }
      return res;
    },
  },
  methods:{
    filterByTime(time){
      // 2021/04
      this.setSelectTimeLine(time);
    },
  },
};
</script>
<style lang='scss' scoped>
.item{
  @media screen and (max-width: 768px) {
    padding: 1rem 2rem;
  }
}
.time-line {
  border: 1px solid #eee;
 box-shadow: 0px 1rem 7.5rem rgba(34, 35, 58, 0.2);
}
.time-line:hover {
  .Filing-wrapper {
    -webkit-background-clip: text;
    background-clip: text;
    cursor: pointer;
    background-image: linear-gradient(
      0deg,
      rgb(255, 0, 0),
      rgb(255, 128, 0),
      rgb(255, 255, 0),
      rgb(0, 255, 0),
      rgb(0, 255, 128),
      rgb(0, 255, 255),
      rgb(0, 128, 255),
      rgb(0, 0, 255),
      rgb(128, 0, 255),
      rgb(255, 0, 255),
      rgb(255, 0, 128)
    );
    -webkit-text-fill-color: transparent;
    animation: iconAnimate 3s linear infinite alternate;
  }
}

@keyframes iconAnimate {
  100% {
    filter: hue-rotate(360deg);
  }
}

.selected{
  background: #F59E0B !important;
  color: white !important;
  .time{
    color: white !important;
  }
}
</style>