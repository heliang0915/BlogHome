<template>
  <div class="wrap">
    <!-- 头部 -->
    <blog-header :channels="channels"></blog-header>
    <div class="main">
      <div class="main-inner">
        <div class="blog-lf">
          <ul class="blog-list">
            <li class="blog-item" @click="gotoDetail" :key="index" v-for="(blog,index) in blogList">
              <h3>
                <a href="###">{{blog.title}}{{page}}</a>
              </h3>
              <div class="blog-info">
                <span><a class="blog-time" href="#">五月 25, 2018</a></span>
                <span><a class="blog-type" href="#">支付接口</a></span>
                <span><a class="blog-comment" href="#">0条评论</a></span>
                <span><a class="blog-read" href="#">56次阅读</a></span>
                <span><a class="blog-zan" href="#">2人点赞</a></span>
              </div>
              <p>{{blog.contentTxt|ellipsis}}</p>
            </li>
          </ul>
          <!--分页-->
          <pagination></pagination>
        </div>
         <blogRight></blogRight>
      </div>
    </div>
    <blogFooter></blogFooter>
  </div>
</template>
<script>
  import blogHeader from './layout/blog-header';
  import blogFooter from './layout/blog-footer';
  import pagination from '../components/pagination';
  import blogRight from './layout/blog-rg';
  import api from '../api/api';
  // import axios from 'axios';

  export default {
    data() {
      return {
        channels: [],
        blogList:[],
        page:this.$route.params.page
      }
    },
    filters:{
      ellipsis(val){
        let len=130;
        return (val.length>len)?(val.substr(0,len)+"..."):val;
      }
    },
    components: {
      blogHeader,
      blogFooter,
      blogRight,
      pagination
    },
    methods:{
      gotoDetail(){
        this.$router.push('/detail/1');
      }
    },
    async asyncData({params}) {
      let {models,topChannels}=await api.indexQuery.getBlogList();
      return {channels:topChannels,blogList:models}
    }
  }
</script>
