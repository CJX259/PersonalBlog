let dbutil = require("./dbutil");

function insertBlogTagMapping(blogId, tagId, ctime, utime, success) {
    let connection = dbutil.createConnection();
    let insertSql = "insert into tag_blog_mapping (`blog_id`, `tag_id`, `ctime`, `utime`) value(?,?,?,?);";
    let params = [blogId, tagId, ctime, utime];
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    })
    connection.end();
}

function queryBlogsByTagsByPage(tagId, offset, limit, success) {
    let connection = dbutil.createConnection();
    let querySql = "select * from tag_blog_mapping where tag_id = ? limit ?,?";
    let params = [tagId, offset, limit];
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error) {
            console.log("出错啦", error);
        } else {
            success(result);
        }
    })
    connection.end();
}
function queryBlogsByTagMappingCount(tagId, success) {
    let connection = dbutil.createConnection();
    let querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    let params = [tagId];
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error) {
            console.log("出错啦", error);
        } else {
            success(result);
        }
    })
    connection.end();
}

module.exports = {
    "insertBlogTagMapping": insertBlogTagMapping,
    "queryBlogsByTagsByPage": queryBlogsByTagsByPage,
    "queryBlogsByTagMappingCount": queryBlogsByTagMappingCount
}