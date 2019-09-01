function action() {
  let username = document.getElementById("username");
  let action = document.getElementById("action").value;
  if (username && username.value.trim().length == 0) {
    alert("Empty Username field.");
    return;
  }
  let API = "";
  if(action == "UNBLOCKUSER") {
    API = UNBLOCKUSER_API;
  } else {
    API = ACTIVATEUSER_API;
  }

  let param = { username: username.value.trim() };

  post(API, param, resp => {
      alert(resp.msg);
  });
}
