import  fetch from './fetch';
let blogQuery={
     //获取首页栏目名称
     getChannelData(){
       console.log('获取首页栏目名称 ::::::::::::::::::');
        return new Promise((resolve, reject)=>{
          fetch.post(`/api/getTopChannel`,{
            pageSize:100,
            sort:1,
            page:{
              cur: 1,
              params:{
                rank:2
              }
            }
          }).then((data)=>{
            resolve(data.data);
          }).catch((err)=>{
            reject(err);
          })
        })
     },
    //获取子栏目
    getChannelChildren(uuid){
      return new Promise((resolve, reject)=> {
        fetch.get(`/api/getChannelChild/${uuid}`).then((data) => {
          resolve(data.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    //获取博客列表
    getBlogList(pageNo,pageSize,channelId,search_field){
      channelId= channelId==0?"":channelId
      var startTime=Date.now();
      return new Promise((resolve, reject)=>{
        console.log("getBlogList开始调用....");
        pageSize=pageSize==null?7:pageSize;
        let options={title: "",search_field, tag: channelId};
        if(search_field){
          options['search_field']=search_field;
        }

        console.log("params:::"+JSON.stringify({page: pageNo,pageSize, params: options}))
        //调用本地API
        fetch.post(`/api/getBlogList`,{page: pageNo,pageSize, params: options}).then((data)=>{
          var endTime=Date.now();
          console.log('getBlogList方法总耗时：：：：'+(endTime-startTime)+'ms')
          resolve(data.data);
        }).catch((err)=>{
          console.log(err);
          reject(err);
        })
      })
    },
    //获取博客详情
    getBlog(uuid){
      return new Promise((resolve, reject)=>{
        fetch.get(`/api/getBlog/${uuid}`).then((data)=>{
          resolve(data.data);
        }).catch((err)=>{
          console.log(err);
          reject(err);
        })
      })
    },
     //获取博客总数
     getBlogTotal(){
       return new Promise((resolve, reject)=>{
         fetch.get(`/api/getBlogTotal`).then((data)=>{
           resolve(data);
         }).catch((err)=>{
           console.log(err);
           reject(err);
         })
       })
     }
}
export  default blogQuery;
