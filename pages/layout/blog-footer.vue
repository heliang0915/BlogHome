<template>
  <!-- 底部 -->
  <div class="footer">
    尾部
  </div>
</template>

<script>
    export default {
       mounted(){
         //百度统计
         var _hmt = _hmt || [];
        (function() {
                 var hm = document.createElement("script");
                 hm.src = "https://hm.baidu.com/hm.js?9c4d21245f10f5a51f94bf71da71d7c2";
                 var s = document.getElementsByTagName("script")[0];
           s.parentNode.insertBefore(hm, s);
        })();
       //百度自动推送
       (function(){
         var bp = document.createElement('script');
         var curProtocol = window.location.protocol.split(':')[0];
         if (curProtocol === 'https'){
           bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
         }
         else{
           bp.src = 'http://push.zhanzhang.baidu.com/push.js';
         }
         var s = document.getElementsByTagName("script")[0];
         s.parentNode.insertBefore(bp, s);
       })();
	// var tip= document.querySelector('#tip')
        //  setTimeout(function(){
        //    tip.className="tip-center move-top"
        //  },100)
       }
    }
</script>

<style scoped>

</style>
