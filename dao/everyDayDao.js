let dbutil = require("./dbutil");


//success是成功后的回调函数，查询数据库成功后把结果传给success来执行
function insertEveryDay(content, ctime, success){
    //这是刚刚写的连接数据库的函数  createConnection
    let connection = dbutil.createConnection();
    //这是数据库的查询语句，哪都通用的
    let insertSql = "insert into every_day (`content`, `ctime`) value(?,?);";
    let params = [content, ctime];
    //开启连接
    connection.connect();
    //查询，传入参数，写回调函数
    connection.query(insertSql, params, function (error, result){
        if(error){
            console.log(error);
        }else{
            //把查询的结果传给success
            success(result);
        }
    })
    //关闭
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