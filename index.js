let express = require("express");
let app = new express();
let globalConfig = require("./config.js");
let loader = require('./loader');
app.use(express.static(__dirname + "/" + globalConfig.page_path));
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

app.listen(globalConfig.port, function (){
    console.log("服务已启动");
});
