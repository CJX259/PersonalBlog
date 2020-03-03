let blogDao = require("../dao/blogDao");
let BlogTagMapping = require('../dao/BlogTagMapping');
let tagsDao = require('../dao/tagsDao');
let respUtil = require('../util/respUtil');
let timeUtile = require("../util/timeUtil");
let url = require('url');
let path = new Map();

function editBlog(request, response) {
    request.on('data', function (data) {
        datas = JSON.parse(data.toString());
        let { title, tags, content } = datas;
        // let content = datas.content.replace(/%C2%A0+/g,'%20');
        // content = decodeURI(content);
        blogDao.addBlog(content, title, tags, timeUtile.getNow(), timeUtile.getNow(), 0, function (blogResult) {
            let blogId = blogResult.insertId;
            //遍历tags的标签，查找数据源，有该标签就设置映射，没有就添加标签再设置映射
            let tagArr = tags.split('，');
            for (let i = 0; i < tagArr.length; i++) {
                tagsDao.queryTagByTagName(tagArr[i], function (tagResult) {
                    if (tagResult && tagResult.length > 0) {  //有该标签,放入映射
                        BlogTagMapping.insertBlogTagMapping(blogId, tagResult[0].id, timeUtile.getNow(), timeUtile.getNow(), function (result) { });
                    }
                    else {    //没有标签，添加再映射
                        tagsDao.insertTag(tagArr[i], timeUtile.getNow(), timeUtile.getNow(), function (newTagsResult) {
                            BlogTagMapping.insertBlogTagMapping(blogId, newTagsResult.insertId, timeUtile.getNow(), timeUtile.getNow(), function (result) { });
                        });
                    }
                })
            }
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "成功", null));
            response.end();
        })
    })
}

path.set('/editBlog', editBlog);

function getBlogByPage(request, response) {
    let params = url.parse(request.url, true).query;
    let offset = params.offset;
    let limit = params.limit;
    // let tag = params.tagId;
    // if (!tag) {       //没有tag,正常走
    blogDao.queryBlogByPage(parseInt(offset), parseInt(limit), function (result) {
        // 对每个文章去除图片等标签
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/<\/[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
            result[i].ctime = timeUtile.timeFormat(result[i].ctime);
            if (result[i].content.length > 100) {
                result[i].content = result[i].content.substr(0, 100) + "...";
            }
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", result))
        response.end();
    })
    // } 
    // else {
    //     BlogTagMapping.queryBlogsByTagsByPage(tag, parseInt(offset), parseInt(limit), function (result) {
    //         let results = [];
    //         // blog_id   再去找blog   有一堆id，怎么找一堆blog，回调函数执行时机不同
    //         // console.log(result[0].length);
    //         for (let i = 0; i < result.length; i++) {
    //             if (i == result.length - 1) {
    //                 blogDao.queryBlogById(parseInt(result[0].blog_id), function (innerResult) {
    //                     results.push(innerResult[0]);
    //                     // 此时results为所有的文章 
    //                     for (let j = 0; j < results.length; j++) {
    //                         results[j].content = results[j].content.replace(/<[a-zA-Z]+>/g, "");
    //                         results[j].content = results[j].content.replace(/<\/[a-zA-Z]+>/g, "");
    //                         results[j].content = results[j].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
    //                         results[j].ctime = timeUtile.timeFormat(results[j].ctime);
    //                         if (results[j].content.length > 300) {
    //                             results[j].content = results[j].content.substr(0, 300);
    //                         }
    //                     }
    //                     response.writeHead(200);
    //                     response.write(respUtil.writeResult("success", "成功", results))
    //                     response.end();
    //                 })
    //             }
    //             blogDao.queryBlogById(parseInt(result[0].blog_id), function (innerResult) {
    //                 results.push(innerResult[0]);
    //             })
    //         }

    //     })
    // }
}
path.set('/getBlogByPage', getBlogByPage);

function queryBlogsByTagsByPage(request, response) {
    let params = url.parse(request.url, true).query;
    let offset = params.offset;
    let limit = params.limit;
    let tag = params.tagId;
    BlogTagMapping.queryBlogsByTagsByPage(tag, parseInt(offset), parseInt(limit), function (result) {
        let results = [];
        // blog_id   再去找blog   有一堆id，怎么找一堆blog，回调函数执行时机不同
        // console.log(result[0].length);
        for (let i = 0; i < result.length; i++) {
            if (i == result.length - 1) {
                blogDao.queryBlogById(parseInt(result[i].blog_id), function (innerResult) {
                    results.push(innerResult[0]);
                    // console.log(results);
                    // 此时results为所有的文章 
                    for (let j = 0; j < results.length; j++) {
                        results[j].content = results[j].content.replace(/<[a-zA-Z]+>/g, "");
                        results[j].content = results[j].content.replace(/<\/[a-zA-Z]+>/g, "");
                        results[j].content = results[j].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
                        results[j].ctime = timeUtile.timeFormat(results[j].ctime);
                        if (results[j].content.length > 100) {
                            results[j].content = results[j].content.substr(0, 100) + "...";
                        }
                    }
                    response.writeHead(200);
                    response.write(respUtil.writeResult("success", "成功", results))
                    response.end();
                })
            }
            blogDao.queryBlogById(parseInt(result[i].blog_id), function (innerResult) {
                results.push(innerResult[0]);
            })
        }

    })
}
path.set("/queryBlogsByTagsByPage", queryBlogsByTagsByPage);

// 拿到tag对应的blog总数
function getBlogsByTagMappingCount(request, response) {
    let params = url.parse(request.url, true).query;
    BlogTagMapping.queryBlogsByTagMappingCount(parseInt(params.tagId), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", result));
        response.end();
    })
}
path.set("/getBlogsByTagMappingCount", getBlogsByTagMappingCount);

function getBlogById(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), function (result) {
        blogDao.addViews(result[0].id, function (result) { });
        response.writeHead(200);
        // 设置时间格式
        result[0].ctime = timeUtile.timeFormat(result[0].ctime);
        response.write(respUtil.writeResult("success", "成功", result));
        response.end();
    })
}
path.set('/getBlogById', getBlogById);
function getTotalBlogs(request, response) {
    blogDao.queryTotalBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", result));
        response.end();
    })
}
path.set('/getTotalBlogs', getTotalBlogs);

function getAllBlogs(request, response) {
    blogDao.queryAllBlogs(function (result) {
        for (let i = 0; i < result.length; i++) {
            result[i].ctime = timeUtile.timeFormat(result[i].ctime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", result));
        response.end();
    })
}
path.set('/getAllBlogs', getAllBlogs);

function getHotBlogs(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryHotBlogs(parseInt(params.limit), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", result));
        response.end();
    })
}
path.set('/getHotBlogs', getHotBlogs);

module.exports.path = path;
