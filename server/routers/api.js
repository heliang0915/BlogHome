const router= require('express').Router();
let  blogQuery=require('../query/blogQuery');
router.get('/',(req,res,next) => {
     res.send("wellcome~~~ API")


});

//获取blog列表
router.post('/getBlogList',(req,res)=>{
     let {page,params,pageSize}=req.body;

     blogQuery.getBlogList(page,pageSize,params).then((data)=>{
        res.send(data);
     }).catch((e)=>{
        console.log("出现错误...."+e.message);
        res.send(e);

     })
})

//获取子频道
router.get('/getChannelChild/:uuid',(req,res)=>{
    let {uuid}=req.params;
     blogQuery.getChannelChildren(uuid).then((data)=>{
        res.send(data);
     }).catch((e)=>{
        res.send(e);
     })
})
//获取首页栏目名称
router.get('/getTopChannel',(req,res)=>{
  console.log( `获取首页栏目名称::::::::::`);
     blogQuery.getChannelData().then((data)=>{
        res.send(data);
     }).catch((e)=>{
        res.send(e);
     })
})
//获取blog详情
router.get('/getBlog/:uuid',(req,res)=>{
    console.log( `获取blog详情::::::::::`);
    let {uuid}=req.params;
     blogQuery.getBlog(uuid).then((data)=>{
        res.send(data);
     }).catch((e)=>{
        res.send(e);
     })
})


//获取blog总数
router.get('/getBlogTotal',(req,res)=>{
    console.log( `获取blog总数::::::::::`);
     blogQuery.getBlogTotal().then((data)=>{
        res.send(data);
     }).catch((e)=>{
        res.send(e);
     })
})



module.exports = router;
