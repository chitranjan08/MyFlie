let fs = require("fs");
let CONSTANTS = require("../constants");
exports.get = service;
function service(data, callback) {
  data = JSON.parse(data);
  let name = data.name;
  let username = data.username;
  let password = data.password;
  let mobile = data.mobile;

  let userDir = CONSTANTS.db_path + username;

  if (fs.existsSync(userDir)) {
    callback({ result: false, msg: "User already exists." });
  } else {
    makeUserDir(userDir, resp => {
      if (resp) {
        let userDetailsFile = userDir + "/userDetails.json";
        makeUserInfoFile(userDetailsFile, name, password, resp => {
          if (resp) {
            callback({ result: true, msg: "Registration process completed." });
          } else {
            //run dir deletion asynchronously.
            fs.rmdir(userDir, err => {
              if (err) {
                throw err;
              }
            });
            callback({ result: false, msg: "Error in registration process" });
          }
        });
      }
    });
  }

  function makeUserDir(path, cb) {
    fs.mkdir(path, err => {
      if (err) {
        cb(false);
      } else {
        cb(true);
      }
    });
  }

  function makeUserInfoFile(file, name, password, cb) {
    let contents =
      '{\n"name" : "' + name + '",\n"password" : "' + password + '"\n"mobile" : "' + mobile  + '"}';

      fs.writeFile(file, contents, err=>{
        if(err) {
            console.log("Err : ", err);
            
            cb(false);
        } else {
            cb(true);
        }
      });
  }
}
