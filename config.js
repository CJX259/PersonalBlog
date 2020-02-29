let fs = require("fs");
let globalConfig = {};

let confs = fs.readFileSync(__dirname + "\\server.conf");
let confArr = confs.toString().split("\n");
for (let i = 0; i < confArr.length; i++){
    globalConfig[confArr[i].split('=')[0].trim()] = confArr[i].split("=")[1].trim();

}
module.exports  = globalConfig;