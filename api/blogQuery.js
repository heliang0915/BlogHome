import  fetch from './fetch';
let blogQuery={
     //获取首页栏目名称
     getChannelData(){
        return new Promise((resolve, reject)=>{
          fetch.post(`/channel/list`,{
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
    //
    getChannelChildren(uuid){
      return new Promise((resolve, reject)=> {
        fetch.get(`/web/channelChild/${uuid}`).then((data) => {
          resolve(data.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    //获取博客列表
    getBlogList(pageNo,pageSize,channelId,search_field){
      channelId= channelId==0?"":channelId
      return new Promise((resolve, reject)=>{
        pageSize=pageSize==null?7:pageSize;
        let options={title: "",search_field, tag: channelId};
        if(search_field){
          options['search_field']=search_field;
        }

        fetch.post(`/web/blogList`,{page: pageNo,pageSize, params: options}).then((data)=>{
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
        fetch.get(`/web/blogSingle/${uuid}`).then((data)=>{
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
         fetch.get(`/web/getBlogTotal`).then((data)=>{
           resolve(data);
         }).catch((err)=>{
           console.log(err);
           reject(err);
         })
       })
     }
}
export  default blogQuery;