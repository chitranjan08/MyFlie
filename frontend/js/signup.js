function signup() {
  let name = document.getElementById("name");
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let mobile = document.getElementById("mobile");


  if (name && name.value.trim().length == 0) {
    alert("Empty Name field");
    return;
  } else if (username && username.value.trim().length == 0) {
    alert("Empty Username field.");
    return;
  } else if (password && password.value.trim().length == 0) { 
    alert("Empty Password field.");
    return;
  } else if(mobile && mobile.value.trim().length == 0) {
    alert("Empty mobile field");
  }

  let params = {
    name: name.value.trim(),
    username: username.value.trim(),
    password: password.value.trim(),
    mobile: mobile.value.trim()
  };

  post(SIGNUP_API, params, resp => {
    alert(resp.msg);
  });
}
