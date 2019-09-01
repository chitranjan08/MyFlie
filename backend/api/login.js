let fs = require("fs");
let CONSTANTS = require("../constants");
exports.get = service;

function service(data, callback) {
  data = JSON.parse(data);
  let username = data.username;
  let password = data.password;
  let user_dir = CONSTANTS.db_path + username;
  
  checkUserDisability(username, resp => {
    if (!resp) {
      checkUserExistance(username, resp => {
        if (resp) {
          checkUserAlreadyBlocked(username, resp => {
            if (!resp) {
              checkPasswordValidation(password, resp => {
                if (resp) {
                  fs.unlink(user_dir + "/incorrectCount", err => {});

                  callback({ result: true, msg: "user validation successful" });
                } else {
                  incorrectCount(username, count => {
                    if (count == 3) {
                      fs.unlink(user_dir + "/incorrectCount", err => {});
                      fs.writeFile(user_dir + "/userBlocked", "", err => {
                        callback({
                          result: false,
                          msg: "User Blocked Permanently. Contact Admin team."
                        });
                      });
                    } else {
                      callback({ result: false, msg: "Wrong Credentials" });
                    }
                  });
                }
              });
            } else {
              callback({
                result: false,
                msg: "User Already Blocked Permanently. Contact Admin team."
              });
            }
          });
        } else {
          callback({ result: false, msg: "Wrong Credentials" });
        }
      });
    } else {
      callback({
        result: true,
        msg: "Login failed. User is already disabled. Please contact admin."
      });
    }
  });

  function checkUserAlreadyBlocked(user, cb) {
    let blockedUser_File = user_dir + "/userBlocked";

    if (fs.existsSync(blockedUser_File)) {
      cb(true);
    } else {
      cb(false);
    }
  }

  function checkUserDisability(user, cb) {
    let userDir_Disabled_Path = CONSTANTS.db_path + user + ".disabled";
    if (fs.existsSync(userDir_Disabled_Path)) {
      cb(true);
    } else {
      cb(false);
    }
  }

  function checkUserExistance(user, cb) {
    if (fs.existsSync(CONSTANTS.db_path + user)) {
      cb(true);
    } else {
      cb(false);
    }
  }

  function checkPasswordValidation(pass, cb) {
    let user_Details_File = user_dir + "/userDetails.json";

    fs.readFile(user_Details_File, "utf8", (err, data) => {
      if (!err) {
        let password = JSON.parse(data).password;

        if (password == pass) {
          cb(true);
        } else {
          cb(false);
        }
      } else {
        cb({ result: false });
      }
    });
  }

  function incorrectCount(user, cb) {
    let incorrectCount_file = user_dir + "/incorrectCount";

    fs.readFile(incorrectCount_file, "utf8", (err, data) => {
      if (err) {
        fs.writeFile(incorrectCount_file, "1", err => {});
        cb(1);
      } else {
        let count = parseInt(data.toString().trim());
        count++;
        fs.writeFile(incorrectCount_file, count, err => {});
        cb(count);
      }
    });
  }
}
