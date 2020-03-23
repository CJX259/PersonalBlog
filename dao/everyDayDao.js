let dbutil = require("./dbutil");

function insertEveryDay(content, ctime, success){
    let connection = dbutil.createConnection();
    let insertSql = "insert into every_day (`content`, `ctime`) value(?,?);";
    let params = [content, ctime];
    connection.connect();
    connection.query(insertSql, params, function (error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
}
function queryEveryDay(success){
    let connection = dbutil.createConnection();
    let querySql = "select * from every_day order by id desc limit 1;";
    connection.connect();
    let params = [];
    connection.query(querySql, params, function (error , result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end()
}
module.exports = {
    "insertEveryDay" : insertEveryDay,
    "queryEveryDay" : queryEveryDay
}