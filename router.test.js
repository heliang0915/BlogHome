let fetch=require('./api/fetch');
function getList() {
  // return api.blogQuery.getBlogList(pageNo,7,'6d0a767bb53643e39aec30530de0fc56');
  let pageSize=7;
  let channelId='6d0a767bb53643e39aec30530de0fc56';
  let search_field=null;
  let pageNo=1;
  return new Promise((resolve, reject)=>{
    console.log("getBlogList开始调用....");
    pageSize=pageSize==null?7:pageSize;
    let options={title: "",search_field, tag: channelId};
    if(search_field){
      options['search_field']=search_field;
    }
    fetch.post(`/web/blogList`,{page: pageNo,pageSize, params: options}).then((data)=>{
      var endTime=Date.now();
      // console.log('getBlogList方法总耗时：：：：'+(endTime-startTime)+'ms')
      resolve(data.data);
    }).catch((err)=>{
      console.log(err);
      reject(err);
    })
  })
}

function loop() {
  let startTime=Date.now();
  getList().then(()=>{
    let endTime=Date.now();
    console.log("耗时:::::"+(endTime-startTime)+"ms");
  })
}

setInterval(()=>{
  loop();
},3000)
