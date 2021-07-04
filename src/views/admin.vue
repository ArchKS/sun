<template>
    <div class="admin-page">
      <admin></admin>
    </div>
</template>

<script>
import admin from '@/components/admin/index.vue'
export default {
  components:{
    admin
  }
}
</script>
<style lang='scss' scoped>
.admin-page{
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>