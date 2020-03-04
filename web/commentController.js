let commentDao = require('../dao/commentDao');
let url = require("url");
let timeUtil = require('../util/timeUtil');
let respUtil = require('../util/respUtil');
let captcha = require("svg-captcha");
let path = new Map();

function sendComment(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.insertComment(params.bid, params.parent, params.parentName, params.name, params.comment, params.email, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", null));
        response.end();
    })
}
path.set("/sendComment", sendComment);

function getRandomCode(request, response) {
    let img = captcha.create({ fontSize: 50, width: 100, height: 34 });
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "成功", img));
    response.end();
}
path.set("/getRandomCode", getRandomCode);

function getCommentsByBlogId(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.getCommentsByBlogId(params.bid, function (result) {
        for (let i = 0; i < result.length; i++) {
            result[i].ctime = timeUtil.timeFormat(result[i].ctime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", result));
        response.end();
    })
}
path.set("/getCommentsByBlogId", getCommentsByBlogId);

function getCommentsCountByBlogId(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.getCommentsCountByBlogId(params.bid, function (result) {

        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", result));
        response.end();
    })
}
path.set("/getCommentsCountByBlogId", getCommentsCountByBlogId);



function getNewComments(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.getNewComments(parseInt(params.limit), function (result) {
        for (let i = 0; i < result.length; i++) {
            result[i].ctime = timeUtil.timeFormat(result[i].ctime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "成功", result));
        response.end();
    })
}
path.set("/getNewComments", getNewComments);

module.exports.path = path;
