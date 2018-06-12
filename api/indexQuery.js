import  fetch from './fetch';

let indexQuery={
     //获取首页栏目名称
     getChannelData(){
        return new Promise((resolve, reject)=>{
          fetch.post(`/channel/list`,{
            pageSize:100,
            sort:1,
            page:{
              cur: 1,
              params:{
                rank:1
              }
            }
          }).then((data)=>{
            resolve(data.data);
          }).catch((err)=>{
            reject(err);
          })
        })
     },
    getBlogList(pageNo){
      return new Promise((resolve, reject)=>{
        fetch.post(`/article/list`,{page: pageNo, params: {title: "", tag: ""}}).then((data)=>{
          resolve(data.data);
        }).catch((err)=>{
          console.log(err);
          reject(err);
        })
      })
    }
}
export  default indexQuery;
