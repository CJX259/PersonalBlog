let dbutil = require("./dbutil");

function insertComment(blogId, parent, parentName, userName, comment, email, ctime, utime, success) {
    let connection = dbutil.createConnection();
    let insertSql = "insert into comments (`blog_id`, `parent`,`parent_name` , `user_name`, `comments`, `email`, `ctime`, `utime`) value(?,?,?,?,?,?,?,?);";
    let params = [blogId, parent, parentName, userName, comment, email, ctime, utime];
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
// insertComment(1, -1, "陈建希", "我草拟吗", "1049602251@qq.com", 2020, 2020, function (result){
//     console.log(result)
// })
function getCommentsByBlogId(blogId, success) {
    let connection = dbutil.createConnection();
    let querySql = "select * from comments where blog_id = ?;";
    let params = [blogId];
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error) {
            console.log("dao错误" + error);
        } else {
            success(result);
        }
    })
    connection.end();
}
function getCommentsCountByBlogId(blogId, success){
    let connection = dbutil.createConnection();
    let querySql = "select count(1) as count from comments where blog_id = ?;";
    let params = [blogId];
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error) {
            console.log("dao错误" + error);
        } else {
            success(result);
        }
    })
    connection.end();
}
function getNewComments(limit, success){
    let connection = dbutil.createConnection();
    let querySql = "select * from comments order by ctime desc limit ?";
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
// getCommentsCountByBlogId(36, function (result){
//     console.log(result);
// })
module.exports = {
    "insertComment": insertComment,
    "getCommentsByBlogId" : getCommentsByBlogId,
    "getCommentsCountByBlogId" : getCommentsCountByBlogId,
    "getNewComments" : getNewComments
}