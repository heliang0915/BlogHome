<template>
  <ul class="pagination">
    <li class="first"><a href="">«</a></li>
    <li class="pre"><a href="">&lt;</a></li>
    <li class="pageNo"> <nuxt-link to="/1">1</nuxt-link></li>
    <li class="pageNo active"><nuxt-link to="/2">2</nuxt-link></li>
    <li class="pageNo"><nuxt-link to="/3">3</nuxt-link></li>
    <li class="pageNo"><nuxt-link to="/4">4</nuxt-link></li>
    <li class="pageNo"><nuxt-link to="/5">5</nuxt-link></li>
    <li class="next"><a href="">&gt;</a></li>
    <li class="end"><a href="">»</a></li>
  </ul>
</template>

<script>
    export default {
        name: "pagination.vue"
    }
</script>

<style scoped>

</style>
