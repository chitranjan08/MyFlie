let fs = require("fs");
let CONSTANTS = require("../constants");
exports.get = service;

function service(data, callback) {
  data = JSON.parse(data);
  let username = data.username;
  let user_dir = CONSTANTS.db_path + username;
  let userDir_Disabled_Path = user_dir + ".disabled";

  checkUserDisability(username, resp => {
    if (resp) {
      activateUser(username, resp => {});
      callback({
        result: true,
        msg: "User account activated. Try Login now."
      }); 
     
  }
    else {
      checkUserExistance(username, resp => {
        if (resp) {
          callback({
            result: false,
            msg: "User already in active mode."
          });
        } else {
          callback({
            result: false,
            msg: "User doesn't exists."
          });
        }
      });
    }
  });

  function checkUserDisability(path, cb) {
    let userDir_Disabled_Path = user_dir + ".disabled";
    if (fs.existsSync(userDir_Disabled_Path)) {
      cb(true);
    } else {
      cb(false);
    }
  }

  function checkUserExistance(user, cb) {
    if (fs.existsSync(user_dir)) {
      cb(true);
    } else {
      cb(false);
    }
  }
  function activateUser(username, cb) {
    fs.rename(userDir_Disabled_Path, user_dir, err => {
      if (!err) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }
}

