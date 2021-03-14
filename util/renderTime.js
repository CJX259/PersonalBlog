let { v4 } = require('uuid');
let { writeResult } = require('./respUtil');
let fs = require('fs');
let path = require('path');
let start = [];
module.exports = function (req, res, next) {
  if (req.path === '/index.html') {
    if (req.cookies.seq) {
      // 可能重启了
      //需要看start里有没有这个seq，没有，就要重新赋
      for (var i = 0; i < start.length; i++) {
        if (start[i].seq === req.cookies.seq) {
          next();
          return;
        }
      }
    }
    let time = new Date();
    let seq = v4();
    start.push({
      seq,
      time
    });
    // 先看看有无cookie
    res.cookie('seq', seq, { maxAge: 1000 * 60 * 10 });
  } else if (req.path === '/renderTime') {
    let seq = req.cookies.seq || '';
    let time = new Date();
    let renderTime = 0;
    let haveIndex = null;
    start.forEach((item, index) => {
      if (item.seq === seq && !item.renderTime) {
        renderTime = time - item.time;
        haveIndex = index;
      }
    })
    if (haveIndex || haveIndex === 0) {
      start[haveIndex].renderTime = renderTime;
      // 保存renderTime
      let savePath = path.resolve(__dirname, "../renderTime.txt");
      fs.writeFile(savePath, `user:${req.cookies.seq}, renderTime:${renderTime}ms\r\n`, { flag: 'a' }, () => {
        console.log('写入完毕');
      });
      res.send(writeResult(200, "renderTime", renderTime));
    } else {
      res.send(writeResult(200, 'renderTime', "不是初次渲染"));
    }
  }
  next();
  return;
}