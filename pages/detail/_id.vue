<template>
  <div class="wrap">
    <!-- 头部 -->
    <blog-header :channels="channels" :channelName="channelName"></blog-header>
    <div class="main">
      <div class="main-inner">
        <div class="blog-lf" :class="leftClass">
          <div class="detail-wrap">
            <div class="blog-area">
              <h1> {{blog.title}}</h1>
              <div class="blog-info">
                <span><label class="blog-time" href="#">{{blog.date&&blog.date.indexOf('')>-1?blog.date.split(' ')[0]:blog.date}}</label></span>
                <span><label class="blog-type" href="#">{{blog.channelName}}</label></span>
                <span><label class="blog-comment" href="#">{{blog.pubUser==null?'系统':blog.pubUser}}发布</label></span>
                <span><label class="blog-read" href="#">{{blog.pv}}次阅读</label></span>
              </div>
              <div class="blog-content">
                <div style="line-height: 30px;" v-html="blog.content"></div>
              </div>
              <!--打赏 点赞-->
              <!--<div class="blog-ds">-->
                <!--<button class="btn-bg blue-outer blog-zan">打赏</button>-->
                <!--<button class="btn-bg org-outer blog-zan">点赞</button>-->
                <!--<button class="btn-bg green-outer blog-zan">分享</button>-->
              <!--</div>-->
            </div>

            <div class="blog-page">
              <!--<span  style="visibility: visible" class="pre-btn" @click="pre">&lt;上一篇</span>-->
              <span  style="visibility: visible" class="pre-btn" @click="back">&lt;返回</span>
              <!--<span  class="next-btn" @click="next">下一篇 &gt;</span>-->
            </div>

            <!--<div class="comment-area">-->
              <!--<h4>发表评论</h4>-->
              <!--<div class="comment-content" style="height: 250px;">-->
                <!--<quill-editor style="height:220px;" ref="content" @change="onEditorChange" :options="editorOption" ></quill-editor>-->
              <!--</div>-->
              <!--<div class="blog-ds">-->
                <!--<button @click="publish" class="btn-bg blue-outer blog-publish">发表</button>-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </div>
        <blogRight :moveClass="rightClass" :recentList="recentList" :hotList="hotList" :recommendList="recommendList"></blogRight>
      </div>
    </div>
    <blogFooter></blogFooter>
  </div>
</template>
<script>
  import blogHeader from '../layout/blog-header';
  import blogFooter from '../layout/blog-footer';
  import blogRight from '../layout/blog-rg';
  import api from '../../api/api';
  import util from '../../util/util';
  export default {
    components: {
      blogHeader,
      blogFooter,
      blogRight
    },

    data(){
      return{
        blog:{},
        comment:'',
        pageNo:0,
        uuid:0,
        total:0,
        channelName:'',
        id:this.$route.params.id,
        editorOption: {
          placeholder:'说点什么吧...',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'align': [] }]
            ]
          }
        },
        leftClass:'',
        rightClass:''
      }
    },
    //SEO-header
    head() {
      let {title}=this.blog;
      return this.$seo(`${title}`, `详情页面${title}`)
    },
    mounted(){
      this.leftClass="blog-lf-move";
      this.rightClass="blog-rg-move";
    },
    async asyncData({params}) {
      let uuid=params.id;
      let pageNo=0;
      let total=0;
      let tempUUID=0;
      console.log("uuid:::::::::"+uuid);
      if(uuid.indexOf('-')>-1){
        tempUUID=uuid.split('-')[0];
        pageNo=uuid.split('-')[1];
        total=uuid.split('-')[2];
      }else{
         tempUUID=uuid;
      }
      let data = await api.blogQuery.getBlog(tempUUID);
      let {topChannels,module,recentList,recommendList,hotList,allChannels}=data;
      console.log(module)
      let channelName="";
      if(module.tag){
        channelName=util.getChannelName(module.tag,allChannels);
      }
      //let channelName=util.getChannelName(module.tag,allChannels);
      if(tempUUID=="about"){
        channelName="关于我";
      }
      return {uuid:tempUUID,total,pageNo,channels: topChannels,blog:module,recentList,recommendList,hotList,channelName}
    },
    methods:{
      getBlogInfo(callback){
        api.blogQuery.getBlogList(this.pageNo,1).then((data)=>{
          let blog=data.models[0];
          this.blog=blog;
          this.uuid=blog.uuid;
          callback();
        })
      },
      back(){
        this.$router.back();
      },
      pre(){
        this.pageNo=parseInt(this.pageNo)-1>0?parseInt(this.pageNo)-1:1;
        this.getBlogInfo(()=>{
          window.location.href=`/detail/${this.uuid}-${this.pageNo}-${this.total}`;
        });
      },
      next(){
        this.pageNo=parseInt(this.pageNo)+1>this.total?this.total:(parseInt(this.pageNo)+1);
        this.getBlogInfo(()=>{
          window.location.href=`/detail/${this.uuid}-${this.pageNo}-${this.total}`;
        });
      },
      onEditorChange(editor) {
        let {text}=editor;
        this.comment=text;
      },
      //发表
      publish(){
        alert(this.comment)
      }
    }
  }
</script>
