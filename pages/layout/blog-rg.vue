<template>
  <div class="blog-rg">
    <!--小板块-->
    <div class="blog-block">
      <h3><a href="">近期文章</a></h3>
      <ul class="blog-block-item">
        <li v-for="(item,index) in recentList" v-if="recentList&&recentList.length" :key="item.uuid+'_'+index">
          <a :href="'/detail/'+item.uuid" class="blog-pen">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <!--小板块2-->
    <div class="blog-block">
      <h3><a href="">最热文章</a></h3>
      <ul class="blog-block-item">
        <li v-for="(item,index) in hotList" v-if="hotList&&hotList.length" :key="item.uuid+'_'+index">
          <a :href="'/detail/'+item.uuid" class="blog-book">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <!--小板块3-->
    <div class="blog-block">
      <h3><a href="">推荐文章</a></h3>
      <ul class="blog-block-item">
        <li v-for="(item,index) in recommendList"  v-if="recommendList&&recommendList.length" :key="item.uuid+'_'+index">
          <a :href="'/detail/'+item.uuid" class="blog-tj">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
    export default {
        props:['recentList','hotList','recommendList']
    }
</script>
