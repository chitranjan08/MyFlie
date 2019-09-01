function login() {
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  if (username && username.value.trim().length == 0) {
    alert("Empty username field");
    return;
  } else if (password && password.value.trim().length == 0) {
    alert("Empty password field.");
    return;
  }
  let params = { 
    username: username.value.trim(), 
    password: password.value.trim()
  };
  post(LOGIN_API, params, resp=>{
    
    alert(resp.msg);
  });
}
