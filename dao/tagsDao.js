let dbutile = require('./dbutil');

function insertTag(tag, ctime, utime, success) {
    let connection = dbutile.createConnection();
    let insertSql = ("insert into tags(`tag`, `ctime`, `utime`) value(?, ? ,?);");
    let params = [tag, ctime, utime];
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
function queryTagById(tagId, success) {
    let connection = dbutile.createConnection();
    let querySql = ("select * from tags where id = ? ;");
    let params = [tagId];
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
function queryTagByTagName(tag, success){
    let connection = dbutile.createConnection();
    let querySql = ("select * from tags where tag = ? ;");
    let params = [tag];
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error) {
            console.log("query出错",error);
        } else {
            success(result);
        }
    })
    connection.end();
}
function queryAllTags(success){
    let connection = dbutile.createConnection();
    let querySql = ("select * from tags;");
    let params = [];
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error) {
            console.log("query出错",error);
        } else {
            success(result);
        }
    })
    connection.end();
}
// insertTag("贼难", 2020, 2020, function(result){
//     console.log("插入成功", result);
// })

// insertTag("标签1", 2020, 2020, function (result){
//     console.log("成功");
// });

// queryTag(1,function (result){
//     console.log(result);
// })

module.exports = {
    "insertTag": insertTag,
    "queryTagById" : queryTagById,
    "queryTagByTagName" : queryTagByTagName,
    "queryAllTags" : queryAllTags
}