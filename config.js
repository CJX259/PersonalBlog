let fs = require("fs");
let globalConfig = {};
let path = require("path");

let confs = fs.readFileSync(path.resolve(__dirname, './server.conf'));
let confArr = confs.toString().split("\n");
for (let i = 0; i < confArr.length; i++){
    globalConfig[confArr[i].split('=')[0]] = confArr[i].split("=")[1];
}
module.exports  = globalConfig;