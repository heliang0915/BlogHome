<template>
      <div class="header">
        <div class="header-inner">
          <h1>
            <a href="#">前端日记</a>
          </h1>
          <ul class="nav">
            <li  @mouseover="getSecondChannel()">
              <nuxt-link to="/1" >首页</nuxt-link>
            </li>

            <li v-for="(channel,index) in channels" @mouseover="getSecondChannel(channel,$event)" :key="index">
              <nuxt-link :to="'/1-'+channel.uuid">{{channel.name}}</nuxt-link>
            </li>
            <li @mouseover="getSecondChannel()">
              <nuxt-link to="/1-about">关于我 </nuxt-link>
            </li>
          </ul>
          <ul class="second-tip" v-show="isShow" :style="{top:top+'px',left:left+'px'}">
            <li v-for="(child,index) in children" :key="index">
              <nuxt-link :to="'/1-'+child.uuid">{{child.name}}</nuxt-link>
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
    export default {
      props:['channels','channelName'],
      data(){
        return {
            children:[],
            top:0,
            left:0,
            isShow:false,
            showClass:false
        }
      },
      mounted(){
        setTimeout(()=>{
          this.showClass=true
        })
      },
      methods:{
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
        getSecondChannel(channel,e){
          if(channel){
            let {target}=e;
            let {left,top,height,width}=this.offset(target);
            let offsetLeft=document.querySelector(".header-inner").offsetLeft;
            left+=16;
            let {uuid}=channel;
            blogQuery.getChannelChildren(uuid).then((data)=>{
              if(data.length){
                this.children=data;
                this.top=top+height+5;
                this.left=left-offsetLeft-width/2+30;
                this.isShow=true;
              }else{
                this.children=[];
                this.isShow=false;
              }
            })
          }else{
            this.children=[];
            this.isShow=false;

          }
        }
      }
    }
</script>

