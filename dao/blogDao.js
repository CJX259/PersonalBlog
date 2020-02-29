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


// queryHotBlogs(3, function (result){
//     console.log(result);
// })

module.exports = {
    "addBlog": addBlog,
    "queryBlogById": queryBlogById,
    "queryBlogByPage": queryBlogByPage,
    "queryTotalBlogCount": queryTotalBlogCount,
    "queryAllBlogs": queryAllBlogs,
    "addViews" : addViews,
    "queryHotBlogs" : queryHotBlogs
}