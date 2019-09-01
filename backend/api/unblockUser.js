let fs = require("fs");
let CONSTANTS = require("../constants");
exports.get = service;

function service(data, callback) {
  data = JSON.parse(data);
  let username = data.username;
  let user_dir = CONSTANTS.db_path + username;

  checkUserDisability(username, resp => {
    if (!resp) {
      checkUserExistance(username, resp => {
        if (resp) {
          checkUserBlocked(username, resp => {
            if (!resp) {
              callback({
                result: false,
                msg: "your account is already in activde status. You can login."
              });
            } else {
              unblockUser(username, resp => {});
              callback({
                result: true,
                msg: "User unblocked. You can Login now."
              });
            }
          });
        } else {
          callback({ result: false, msg: "User doesn't exist." });
        }
      });
    } else {
      callback({ result: false, msg: "your account is in disable mode." });
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

  function checkUserBlocked(user, cb) {
    let blockedUser_File = user_dir + "/userBlocked";

    if (fs.existsSync(blockedUser_File)) {
      cb(true);
    } else {
      cb(false);
    }
  }

  function unblockUser(username, cb) {
    let blockedUser_File = user_dir + "/userBlocked";
    fs.unlink(blockedUser_File, err => {});
    cb(true);
  }
}
