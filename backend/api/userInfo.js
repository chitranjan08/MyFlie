let fs = require("fs");
let CONSTANTS = require("../constants");
exports.get = service;
function service(data, callback) {
  data = JSON.parse(data);
  let username = data.username;
  let userDir = CONSTANTS.db_path + username;