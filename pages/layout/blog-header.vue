<template>
      <div class="header" :style="{background:'url(' + bg + ')'}">
        <div class="header-inner">
          <h1>
            <a href="#">前端日记</a>
          </h1>
          <ul class="nav">
            <li  @mouseover="getSecondChannel()">
              <a href="/1">首页</a>
            </li>
            <li v-for="(channel,index) in channels" @mouseover="getSecondChannel(channel,$event)" :key="index">
              <a :href="'/1-'+channel.uuid">{{channel.name}}</a>
            </li>
            <li @mouseover="getSecondChannel()">
                <a href="/1-about">关于我</a>
            </li>
          </ul>
          <ul class="second-tip" v-show="isShow" :style="{top:top+'px',left:left+'px'}">
            <li v-for="(child,index) in children" :key="index">
              <a @click="gotoChild(child.uuid)">{{child.name}}</a>
            </li>
          </ul>
          <div :class="['tip-center',showClass?'move-top':'']" id="tip">
            <div v-if="channelName==''">
              <h3>Code Farmer</h3>
              <p>让Hello World变得更加精彩</p>
            </div>
            <div v-else>
              <h3>{{channelName}}</h3>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
    import blogQuery from '../../api/blogQuery';
    let config=require('../../config');
    let {staticUrl}=config;
    export default {
      props:['channels','channelName','allChannels'],
      data(){
        return {
            children:[],
            top:0,
            left:0,
            isShow:false,
            showClass:false,
            bg:''
        }
      },
      mounted(){
        let _this=this;
        setTimeout(()=>{
          this.showClass=true;
        })
          this.bg=`${staticUrl}/images/index-bg.jpg`;
        setTimeout(()=>{
  //        _this.loadBaidu();
//          _this.load360();
        },5000)
      },
      methods:{
        loadBaidu(){
          var bp = document.createElement('script');
          var curProtocol = window.location.protocol.split(':')[0];
          if (curProtocol === 'https') {
              bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
          }
          else {
              bp.src = 'http://push.zhanzhang.baidu.com/push.js';
          }
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(bp, s);
        },
        load360(){
          var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?5d5a190fe0d02f805bc321f332cf446a":"https://jspassport.ssl.qhimg.com/11.0.1.js?5d5a190fe0d02f805bc321f332cf446a";
          document.write('<script src="' + src + '" id="sozz"><\/script>');
        },
         offset(elem){
            var obj={
              left:elem.offsetLeft,
              top:elem.offsetTop,
              width:elem.offsetWidth,
              height:elem.offsetHeight
            }
            while(elem != document.body){
              elem = elem.offsetParent ;
              obj.left += elem.offsetLeft ;
              obj.top += elem.offsetTop ;
            }
            return obj;
       },
       // 内存中匹配
       getChannelChildren(e,uuid){
         let {allChannels}=this;
         let children=[];
         let {target}=e;
         let {left,top,height,width}=this.offset(target);
         let offsetLeft=document.querySelector(".header-inner").offsetLeft;
         left+=16;
           allChannels.forEach((channel)=>{
              if(channel.pid==uuid){
                children.push(channel);
              }
           })
           if(children.length){
             this.children=children;
             this.top=top+height+5;
             this.left=left-offsetLeft-width/2+30;
             this.isShow=true;
           }else{
             this.children=[];
             this.isShow=false;
           }
       },
        getSecondChannel(channel,e){
          if(channel){
            let {uuid}=channel;
            this.getChannelChildren(e,uuid);
          }else{
            this.children=[];
            this.isShow=false;
          }
        },
        gotoChild(url){
          this.isShow=false;
          window.location='/1-'+url;
        }
      }
    }
</script>
