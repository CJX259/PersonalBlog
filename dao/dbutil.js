let mysql = require("mysql");

function createConnection() {
    let connection = mysql.createConnection({
        host: "cdb-oqaw3yte.cd.tencentcdb.com",
        port: "10020",
        user: "root",
        password: "567890xw",
        database: "my_blog"
    });
    return connection;
}

module.exports.createConnection = createConnection;
