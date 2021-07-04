<template>
    <div class="me-view" v-if="ifViewVisible === 2">
        <about></about>
    </div>
</template>

<script>
import about from "./about.vue"

export default {
    components:{
        about,
    }
}
</script>
<style lang='scss' scoped>
.me-view{
    margin-top: -5rem;
    width: 100%;
    // height: 30rem;
}
</style>