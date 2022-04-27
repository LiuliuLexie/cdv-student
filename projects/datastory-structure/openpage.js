let enter= document.getElementById("checkbox");

document.getElementById("button").addEventListener("click", nextPage);

function nextPage() {
    if (enter.checked==true){
        window.location.href="mainpage.html";
    }
}
