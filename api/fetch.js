import  axios from 'axios';
import  api from './api';

var instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

//添加一个响应拦截器
instance.interceptors.response.use(async function(res){
  //在这里对返回的数据进行处理
  let {config}=res;
  let {url}=config;
  //自动注入顶级栏目信息
  if(url.indexOf('channel')==-1&&res.data.topChannels==null){
    let data=await api.indexQuery.getChannelData();
    res.data.topChannels=data.models;
    return res;
  }else{
    return res;
  }
},function(err){
  return Promise.reject(err);
})
let fetch={
    get(url){
      return instance.get(url);
    },
    post(url,body){
      return instance.post(url,body);
    }
}
export default fetch;
