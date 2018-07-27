const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const express=require('express');
const path=require('path');
const app = require('express')()
const api = require('./routers/api');
var morgan = require('morgan')
//导入nuxt配置文件
const nuxtConfig=require('../nuxt.config');
// Body parser，用来封装 req.body
app.use(bodyParser.json())
app.use(morgan('dev'));
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,X-Requested-With");

    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//api路由
app.use('/api',api);
// 我们用这些选项初始化 Nuxt.js：
app.use(express.static(path.join(__dirname, 'static')));
// app.use(express.static(path.join(__dirname, '.next')));
const isProd = process.env.NODE_ENV === 'production'
//设置开发变量
nuxtConfig.dev= !isProd;
const nuxt = new Nuxt(nuxtConfig)
// 生产模式不需要 build
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

app.listen(5000)
console.log('Server is listening on http://localhost:5000')
