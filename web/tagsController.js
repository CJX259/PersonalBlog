var tagsDao = require("../dao/tagsDao");
let respUtil = require("../util/respUtil");
let path = new Map();
function getTagsCloud(request, response) {
    tagsDao.queryAllTags(function (result) {
        result.sort(function () {
            return 0.5 - Math.random();
        });
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", result))
        response.end();
    });
}
path.set("/getTagsCloud", getTagsCloud);

module.exports.path = path;
