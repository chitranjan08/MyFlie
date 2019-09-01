global.CONSTANTS = require("./constants");
let http = require("http");
let fs = require("fs");

http
  .createServer((req, res) => {
    let url = req.url;
    let apiPath = __dirname + "/" + url;
    let data = "";
    req.on("data", chunk => {
      data += chunk;
    });

    req.on("end", () => {
      callAPI(apiPath, data, resp => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.write(JSON.stringify(resp));
        res.end();
      });
    });
  })
  .listen(8080);

function callAPI(path, data, cb) {
  fs.access(path, err => {
    if (!err) {
      require(path).get(data, resp => {
        cb(resp);
      });
    } else {
        cb({result:false, msg:"404 not found"});
    }
  });
}
