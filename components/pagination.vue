<template>
  <ul class="pagination">
    <li :class="['first',pageNo==1?'activity':'']"><a @click="first" >«</a></li>
    <li class="pre"><a @click="pre" >&lt;</a></li>
    <li v-for="item in totalPage" :key="item" :class="['pageNo',pageNo==item+start?'active':'']">
        <a @click="go(item+start)">{{item+start}}</a>
    </li>
    <li class="next"><a @click="next" >&gt;</a></li>
    <li class="end"><a @click="last">»</a></li>

  </ul>
</template>

<script>
    export default {
      props:['totalPage','pageNo'],

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
           this.pageNo=1;
           this.$router.push('/'+this.pageNo);
         },
         pre(){
           this.pageNo=parseInt(this.pageNo)-1>0?parseInt(this.pageNo)-1:1;
           this.counter=(this.counter-1)>0?(this.counter-1):0;
           this.$router.push('/'+this.pageNo);
         },
        next(){
          this.pageNo=parseInt(this.pageNo)+1>this.totalPage?this.totalPage:(parseInt(this.pageNo)+1);
          this.counter=(this.counter+1)>this.totalPage?this.totalPage:(this.counter+1);
          console.log(this.pageNo);
          this.$router.push('/'+this.pageNo);
        },
        go(pageNo){
          this.pageNo=pageNo;
          this.$router.push('/'+this.pageNo);
        },
        last(){
          this.pageNo=this.totalPage;
          this.$router.push('/'+this.pageNo);
        }
      }
    }
</script>

<style scoped>

</style>
