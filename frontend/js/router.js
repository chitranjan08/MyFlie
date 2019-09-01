function loadPage(url){
    get(url, resp=>{
        document.body.innerHTML = resp;
    });
}

function goToSignupPage() {
    let url = SIGNUP_PAGE;
    loadPage(url);
}


function goToDeletePage(){
    let url = DELETE_PAGE;
    loadPage(url)
}

function goToActionPage(){
    let url = ACTION_PAGE;
    loadPage(url)
}

function goToUserInfoPage(){
    let url = USERINFO_PAGE;
    loadPage(url)

    }


