let dbutil = require("./dbutil");
function addBlog(content, title, tags, ctime, utime, views, success) {
    let connection = dbutil.createConnection();
    let insertSql = "insert into blog (`content`, `title`, `tags`, `ctime`, `utime`, `views`) value(?,?,?,?,?,?);";
    let params = [content, title, tags, ctime, utime, views];
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error) {
            console.log("dao错误" + error);
        } else {
            success(result);
        }
    })
    connection.end()
}
function queryBlogById(blogId, success) {
    let connection = dbutil.createConnection();
    let insertSql = "select * from blog where id = ?";
    let params = [blogId];
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error) {
            console.log("dao错误" + error);
        } else {
            success(result);
        }
    })
    connection.end()
}
function queryBlogByPage(offset, limit, success) {
    let connection = dbutil.createConnection();
    let querySql = "select * from blog order by id desc limit ?,?;";
    let params = [offset, limit];
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    })
    connection.end();
}
function queryTotalBlogCount(success) {
    let connection = dbutil.createConnection();
    let querySql = "select count(1) as count from blog";
    connection.connect();
    connection.query(querySql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    })
    connection.end();
}

function queryAllBlogs(success) {
    let connection = dbutil.createConnection();
    let querySql = "select * from blog order by id desc";
    connection.connect();
    connection.query(querySql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    })
    connection.end();
}

function addViews(bid, success) {
    let connection = dbutil.createConnection();
    let querySql = "update blog set views = views + 1 where id = ?";
    let params = [bid];
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    })
    connection.end();
}

function queryHotBlogs(limit, success) {
    let connection = dbutil.createConnection();
    let querySql = "select * from blog order by views desc limit ?";
    let params = [limit];
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    })
    connection.end();
}

// 传入blog——id数组，返回所有对应的blog
function queryBlogsByIdArr(idArr, success) {
    let connection = dbutil.createConnection();
    let querySql = "select * from blog where id = ? ";
    for (let i = 0; i < idArr.length - 1; i++) {
        querySql += "or id = ? ";
    }
    let params = idArr;
    connection.connect();
    connection.query(querySql, params, function (error, result){
        if(error){
            console.log("dao error",error);
        }else{
            success(result);
        }
    })
    connection.end();
}

function queryBlogBySearch(search, success){
    let connection = dbutil.createConnection();
    var querySql = "select * from blog where title like concat(concat('%', ?), '%') or content like concat(concat('%', ?), '%');";
    let params = [search, search];
    connection.connect();
    connection.query(querySql, params, function(error , result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    });
    connection.end();
}

function queryBlogBySearchCount(search, success){
    let connection = dbutil.createConnection();
    var querySql = "select count(1) as count from blog where title like concat(concat('%', ?), '%') or content like concat(concat('%', ?), '%');";
    let params = [search, search];
    connection.connect();
    connection.query(querySql, params, function(error , result){
        if(error){
            console.log(error);
        }else{
            success(result[0].count);
        }
    });
    connection.end();
}
// queryBlogBySearchCount("测试", function (result){
//     console.log(result[0].count);
// })
module.exports = {
    "addBlog": addBlog,
    "queryBlogById": queryBlogById,
    "queryBlogByPage": queryBlogByPage,
    "queryTotalBlogCount": queryTotalBlogCount,
    "queryAllBlogs": queryAllBlogs,
    "addViews" : addViews,
    "queryHotBlogs" : queryHotBlogs,
    "queryBlogsByIdArr" : queryBlogsByIdArr,
    "queryBlogBySearch" : queryBlogBySearch,
    "queryBlogBySearchCount" : queryBlogBySearchCount
}