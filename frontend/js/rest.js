function get(url, cb) {
  fetch(url)
    .then(resp => {
      resp.text().then(function(text) {
        cb(text);
      });
    })
    .catch(err => {
      console.log(err);

      cb("404 Not Found");
    });
}

async function post(url, data, cb) {
  let rawResp = await fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });

  let content = await rawResp.json();

  cb(content);
}
