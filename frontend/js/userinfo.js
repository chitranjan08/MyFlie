function userinfo() {
    let username = document.getElementById("username");
    if (username && username.value.trim().length == 0) {
      alert("Empty username field");
      return;
    }
    
    let params = { 
      username : username.value.trim(), 
    };
    post(USERINFO_API, params, resp=>{
      alert(resp.msg);
    });
  }
  