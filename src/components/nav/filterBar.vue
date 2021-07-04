// 用于过滤标签和分类字段
<template>
<div class="filter-bar" v-if="ifShowFilterBar">
  <!-- 过滤分类 -->
  <div class="item category relative ml-3 rounded-md text-md bg-purple-400  p-1 px-3  flex items-center" v-if="category">
    <span class="text-md">{{ category }}</span>
    <span class="icon-error text-2xl cursor-pointer" @click="clearCategory()"></span>
  </div>

  <!-- 过滤标签 -->
  <div class="item tags ml-3 h-10 flex items-center" v-for="(item, index) in tags" :key="index">
    <div class="tag relative  p-1 px-3  rounded-md bg-green-400">
      <span class="text-md">{{ item }}</span>
      <span class="icon-error text-2xl cursor-pointer" @click="modifyTags(item)"></span>
    </div>
  </div>

  <!-- 过滤timeline -->
  <div class="item timeline relative ml-3 rounded-md text-md bg-yellow-400  p-1 px-3  flex items-center" v-if="selectTimeLine">
    <span class="text-md">{{ selectTimeLine }}</span>
    <span class="icon-error text-2xl cursor-pointer absolute error-icon" @click="clearTimeline()"></span>
  </div>

  <!-- 过滤searchContent -->
  <div class="item searchContent relative ml-3 rounded-md text-md bg-pink-400  p-1 px-3  flex items-center" v-if="searchContent">
    <span class="text-md">{{ searchContent }}</span>
    <span class="icon-error text-2xl cursor-pointer absolute error-icon" @click="clearSearchContent()"></span>
  </div>
</div>
</template>

<script>
export default {
  computed:{
    ifShowFilterBar(){
      if(this.tags.length !==0 || this.category.length !==0 || this.selectTimeLine.length !==0 || this.searchContent.length !==0){
        return true;
      }else{
        return false
      }
    }
  },
  methods: {
    // 从标签列表中移除指定标签
    modifyTags(t) {
      let newTag = [...this.tags].filter((v) => v !== t);
      this.defineTags(newTag);
    },
    // 删除分类
    clearCategory(){
      this.modifyCategory('');
    },
    // 删除timeline
    clearTimeline(){
      this.setSelectTimeLine('');
    },
    // 删除searchContent
    clearSearchContent(){
        this.modifySearchContent('');
        this.setSearchResult([]);
    },
    
  },
};
</script>
<style lang='scss' scoped>
.filter-bar{
  display: flex;
  align-items: center;
  z-index: 1000;
}
.tag,
.category,
.timeline,
.searchContent {
  .icon-error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: red;
    display: none;
  }
  &:hover {
    color: gray;
    .icon-error {
      display: block;
      opacity: 1;
    }
  }
}
.clear-all{
  &:hover{
    color: #333;
  }
  margin: 0 3rem;
    cursor: pointer;

}
.item{
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    // padding: .3rem .5rem;
  }
}
</style>