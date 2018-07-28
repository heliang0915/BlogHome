<template>
  <div class="wrap">
    <!-- 头部 -->
    <blog-header :channels="channels" :allChannels="allChannels" :channelName="channelName"></blog-header>
    <div class="main">
      <div class="main-inner">
        <div class="blog-lf">
          <ul class="blog-list" v-if="blogList&&blogList.length>0">

            <li  class="blog-item" @click="gotoDetail(blog.uuid,(index+1)+((pageNo-1)*pageSize))" :key="index" v-for="(blog,index) in blogList">
              <h3>
                <a href="###">{{blog.title}}</a>
              </h3>
              <div class="blog-info">
                <span><a class="blog-time" href="#">{{blog.date&&blog.date.indexOf('')>-1?blog.date.split(' ')[0]:blog.date}}</a></span>
                <span><a class="blog-type" href="#">{{blog.channelName}}</a></span>
                <span><a class="blog-comment" href="#">{{blog.pubUser==null?'系统':blog.pubUser}}发布</a></span>
                <span><a class="blog-read" href="#">{{blog.pv}}次阅读</a></span>
                <!--<span><a class="blog-zan" href="#">{{blog.zanSize}}人点赞</a></span>-->
              </div>
              <p>{{blog.contentTxt|ellipsis}}</p>
            </li>
          </ul>
          <ul class="blog-list" v-else>
            <li  class="blog-item blog-no-data" >
              很抱歉，没有找到任何内容。
            </li>
          </ul>
          <!--分页-->
          <pagination :totalPage="totalPage" :pageNo="pageNo"></pagination>
        </div>
         <blogRight v-if="recentList&&hotList&&recommendList " :recentList="recentList" :hotList="hotList" :recommendList="hotList"></blogRight>
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
  import util from '../util/util';

  export default {
    data() {
      return {
        channels: [],
        allChannels:[],
        blogList:[],
        totalPage:10,
        pageSize:0,
        pageNo:0,
        channelId:0,
        channelName:'',
        index:0,
        total:0,
      }
    },
    filters:{
      ellipsis(val){
        let len=130;
        let temp=val;
        if(temp&&temp.length){
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
    methods:{
      gotoDetail(uuid,pageNo){
        //this.$router.push(`/detail/${uuid}`);
        window.location=`/detail/${uuid}`;
      }
    },
    async asyncData({params}) {
      let queryStr=params.page;
      console.log("同构方法开始调用...."+queryStr);
      let startTime=Date.now();
      let channelId=0;
      let pageNo=0;
      // let queryStr=params.page;
      if(queryStr&&queryStr.indexOf('-')>-1){
        channelId=queryStr.split('-')[1];
        pageNo=queryStr==null?1:queryStr.split('-')[0];
      }else{
        pageNo=params.page==null?1:params.page;
      }
      pageNo=parseInt(pageNo);
      //左侧列表
      let data=await api.blogQuery.getBlogList(pageNo,7,channelId);
      let {models,topChannels,total,pageSize,recentList,recommendList,hotList,allChannels}=data;
      let channelName=util.getChannelName(channelId,allChannels);
      if(channelId=="about"){
        channelName="关于我";
      }
      let endTime=Date.now();
      console.log('同构方法调用完毕,方法耗时...'+(endTime-startTime)+"ms");
      return {channels:topChannels,allChannels,recentList,hotList,recommendList,total,pageSize,pageNo,channelId,channelName,blogList:models,totalPage:Math.ceil(total/pageSize)}
    }
  }
</script>
