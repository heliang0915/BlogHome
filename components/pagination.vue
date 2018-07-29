<template>
  <ul class="pagination" v-show="totalPage>1">
    <li v-show="pageNo!=1" :class="['first',pageNo==1?'activity':'']"><a @click="first" >«</a></li>
    <li v-show="pageNo!=1"  class="pre"><a @click="pre" >
      <span>&lt;</span>
    </a></li>
    <li v-for="item in totalPage" :key="item" :class="['pageNo',pageNo==item+start?'active':'']">
        <a @click="go(item+start)">{{item+start}}</a>
    </li>
    <li v-show="pageNo!=totalPage" class="next">
      <a @click="next" >
        <span>&gt;</span>
      </a>
    </li>
    <li v-show="pageNo!=totalPage" class="end"><a @click="last">»</a></li>
  </ul>
</template>
<script>
    export default {
      props:['totalPage','pageNo','channelId'],
      data(){
        return {
          pageMaxNum:5
        }
      },
      computed:{
        start(){
          return this.pageNo>this.totalPage?this.pageNo-this.totalPage:0;
        },
        end(){
          return this.pageNo>this.totalPage?this.pageNo:this.totalPage;
        }
      },
      methods:{
         first(){
           let {channelId}=this;
           this.pageNo=1;
           window.location='/'+this.pageNo+(channelId==null?'':'-'+channelId);
         },
         pre(){
           let {channelId}=this;
           this.pageNo=parseInt(this.pageNo)-1>0?parseInt(this.pageNo)-1:1;
           this.counter=(this.counter-1)>0?(this.counter-1):0;
           window.location='/'+this.pageNo+(channelId==null?'':'-'+channelId);
         },
        next(){
          let {channelId}=this;
          this.pageNo=parseInt(this.pageNo)+1>this.totalPage?this.totalPage:(parseInt(this.pageNo)+1);
          this.counter=(this.counter+1)>this.totalPage?this.totalPage:(this.counter+1);
          window.location='/'+this.pageNo+(channelId==null?'':'-'+channelId);
        },
        go(pageNo){
          let {channelId}=this;
          this.pageNo=pageNo;
          window.location='/'+this.pageNo+(channelId==null?'':'-'+channelId);
        },
        last(){
          let {channelId}=this;
          this.pageNo=this.totalPage;
          window.location='/'+this.pageNo+(channelId==null?'':'-'+channelId);
        }
      }
    }
</script>

<style scoped>

</style>
