<template>
  <!-- 底部 -->
  <div class="footer">
    尾部
  </div>
</template>

<script>
    export default {
       mounted(){
        var tip= document.querySelector('#tip')
         setTimeout(function(){
           tip.className="tip-center move-top"
         },100)
       }
    }
</script>

<style scoped>

</style>
