function deleteUser(){
    let name = document.getElementById("name");
  let username = document.getElementById("username");
  let password = document.getElementById("password");

  if (name && name.value.trim().length == 0) {
    alert("Empty Name field");
    return;
  } else if (username && username.value.trim().length == 0) {
    alert("Empty Username field.");
    return;
  } else if (password && password.value.trim().length == 0) {
    alert("Empty Password field.");
    return;
  }

  let params = {
    name: name.value.trim(),
    username: username.value.trim(),
  };

  post(DELETE_API, params, resp => {
    alert(resp.msg);
  });

}