let express = require("express");
let app = new express();
let path = require('path');
let globalConfig = require("./config.js");
let loader = require('./loader');
let history = require('connect-history-api-fallback');
let cookieParser = require('cookie-parser');

app.use(cookieParser());

// app.use(history({
//     index: "/index.html"
// }))
app.use(history());

// 得知用户的渲染时间
app.use(require('./util/renderTime'));
// app.get('/renderTime', require('./util/renderTime'));
//使用中间件处理history.api带来的问题,页面请求不到都跳转到jessy的index.html页面
// 设置缓存
app.use(express.static(__dirname + "\\" + globalConfig.page_path));
app.use(express.static(path.resolve(__dirname, './public')));

// app.use(express.static(__dirname + "\\" + globalConfig.page_path + "\\dist"));
app.post("/editEveryDay" , loader.get("/editEveryDay"));
app.get("/queryEveryDay" , loader.get("/queryEveryDay"));
app.post('/editBlog',  loader.get("/editBlog"));
app.get('/getBlogByPage', loader.get('/getBlogByPage'));
app.get('/getTotalBlogs', loader.get('/getTotalBlogs'));
app.get("/getBlogById", loader.get('/getBlogById'));
app.get("/sendComment", loader.get('/sendComment'));
app.get("/getRandomCode", loader.get('/getRandomCode'));
app.get("/getAllBlogs", loader.get('/getAllBlogs'));
app.get("/getTagsCloud" , loader.get("/getTagsCloud"));
app.get("/getHotBlogs" , loader.get("/getHotBlogs"));
app.get("/getNewComments" , loader.get("/getNewComments"));
app.get("/queryBlogsByTagsByPage", loader.get("/queryBlogsByTagsByPage"));
app.get('/getBlogsByTagMappingCount', loader.get('/getBlogsByTagMappingCount'));

app.get('/search', loader.get('/search'));


app.get("/getCommentsCountByBlogId", loader.get('/getCommentsCountByBlogId'));
app.get("/getCommentsByBlogId", loader.get('/getCommentsByBlogId'));

//globalConfig.port是你要监听的端口
app.listen(globalConfig.port, function (err){
    console.log("服务已启动");
    if(err){
        console.log(err);
    }
});