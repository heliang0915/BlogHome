<template>
      <div class="header">
        <div class="header-inner">
          <h1>
            <a href="#">科技日记</a>
          </h1>
          <ul class="nav">
            <li>
              <nuxt-link to="/1">首页</nuxt-link>
            </li>

            <li v-for="(channel,index) in channels" :key="index">
              <nuxt-link to="/detail/1">{{channel.name}}</nuxt-link>
            </li>
            <li><a href="">关于我</a></li>
          </ul>
          <div class="tip-center" id="tip">
            <h3>Code Farmer</h3>
            <p>让Hello World变得更加精彩</p>
          </div>
        </div>
      </div>
</template>
<script>
    export default {
      props:['channels'],
      async asyncData ({ params }) {
        console.log("asyncData....header");
        let { data } = await axios.post(`http://localhost:8080/channel/list`,{sort:{order:1},pageSize:100,page: {cur: 1, params: {rank:2}}})
        return { channels: data.models }
      }
    }
</script>

