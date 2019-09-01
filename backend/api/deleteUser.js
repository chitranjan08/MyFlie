let fs = require("fs");
let CONSTANTS = require("../constants");
exports.get = service;
function service(data, callback) {
  data = JSON.parse(data);
  let name = data.name;
  let username = data.username;
  let userdir = CONSTANTS.db_path + username;
  if (fs.existsSync(userdir)) {
    disableUser(userdir, name, resp => {
      if (resp) {
        callback({ result: true, msg: "user deleted successfully" });
      } else {
        callback({ result: false, msg: "user not deleted" });
      }
    });
  } else {
    callback({ result: false, msg: "user doesn't exists." });
  }

  function disableUser(path, name, cb) {
    validateName(name, resp => {
      if (resp) {
        fs.rename(userdir, userdir + ".disabled", err => {
          if (err) {
            cb(false);
          } else {
            cb(true);
          }
        });
      } else {
        cb(false);
      }
    });

    function validateName(name, cb) {
      let userDtailFile = userdir + "/userDetails.json";
      fs.readFile(userDtailFile, "utf8", (err, data) => {
        if (!err) {
          let name = JSON.parse(data).name;
          if (name == name) {
            cb(true);
          } else {
            cb(false);
          }
        }
      });
    }
  }
}
