//console.log("!!!!");

var clickButton = document.getElementById("click");
var testButton = document.getElementById("testButton");
var box = document.getElementById("flex-container");

// testButton.addEventListener("click", () => {
//     console.log("function called!!!");
// });

function myFunction() {
    //console.log("function called");

    box.innerHTML = ""; //clean the page when the number changes

    var x = document.getElementById("myNumber").value;

    for (let i = 0; i < x; i++) {
        let myNumber = document.getElementById('myNumber');
        var dialog = document.createElement('div');

        // add class
        dialog.className = 'dialog';
        box.appendChild(dialog);
    }


}