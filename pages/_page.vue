<template>
  <div class="wrap">
    <!-- 头部 -->
    <blog-header :channels="channels"></blog-header>

    <div class="main">
      <div class="main-inner">
        <div class="blog-lf">
          <ul class="blog-list">
            <li class="blog-item" :key="index" v-for="(blog,index) in blogList">
              <h3><a href="###">{{blog.title}}</a></h3>
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
          <pagination :totalPage="totalPage" :pageNo="page"></pagination>
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
        totalPage:10,
        page:this.$route.params.page==null?1:this.$route.params.page
      }
    },
    filters:{
      ellipsis(val){
        let len=130;
        // console.log(val);
        let temp=val;
        if(temp){
          temp=val&&(val.length>len)?(val.substr(0,len)+"..."):val;
        }
        return temp;
      }
    },
    components: {
      blogHeader,
      blogFooter,
      blogRight,
      pagination
    },
    async asyncData({params}) {
      let data=await api.indexQuery.getBlogList();
      let pageNo=params.page==null?1:params.page
      let {models,topChannels,total,pageSize}=await api.indexQuery.getBlogList(pageNo);
      // console.log("totalPage>>>>>>>>>"+Math.ceil(total/pageSize));
      return {channels:topChannels,blogList:models,totalPage:Math.ceil(total/pageSize)}

    }
  }
</script>
